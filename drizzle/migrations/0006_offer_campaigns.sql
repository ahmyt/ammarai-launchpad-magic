-- Discount campaigns: one live campaign at a time, its activity log, and the
-- functions the public site and the studio use. Visitors never read these
-- tables directly; the site goes through get_active_offer(), claim_offer() and
-- record_offer_event(), which are security definer.

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null default '',
  headline text not null,
  discount_label text not null default '',
  terms text not null default '',
  code text not null,
  use_type text not null default 'multi_use',
  max_uses integer,
  used_count integer not null default 0,
  starts_at timestamp with time zone,
  expires_at timestamp with time zone,
  is_active boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint offers_use_type_check check (use_type in ('single_use', 'multi_use')),
  constraint offers_max_uses_check check (max_uses is null or max_uses > 0),
  constraint offers_used_count_check check (used_count >= 0)
);

create table if not exists public.offer_events (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.offers (id) on delete cascade,
  event text not null,
  source text not null,
  page text not null default '',
  ip_hash text not null default '',
  created_at timestamp with time zone not null default now(),
  constraint offer_events_event_check check (event in ('seen', 'copied', 'claimed')),
  constraint offer_events_source_check check (source in ('exit_intent', 'timed', 'sticky', 'inline', 'direct'))
);

create index if not exists offer_events_offer_created_idx
  on public.offer_events (offer_id, created_at desc);
create index if not exists offer_events_offer_ip_idx
  on public.offer_events (offer_id, ip_hash, created_at desc);

-- Visitors reach the tables only through the functions below, so the anonymous
-- role holds no table privileges at all. Administrators write through the row
-- level policies; the studio's own reads use the signed-in user.
revoke all on public.offers from anon;
revoke all on public.offer_events from anon;
grant select, insert, update, delete on public.offers to authenticated;
grant select on public.offer_events to authenticated;
grant all on public.offers to service_role;
grant all on public.offer_events to service_role;

alter table public.offers enable row level security;
alter table public.offer_events enable row level security;

drop policy if exists "Admins manage offers" on public.offers;
create policy "Admins manage offers"
  on public.offers for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can read offer events" on public.offer_events;
create policy "Admins can read offer events"
  on public.offer_events for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- The single live campaign a visitor should see, or nothing.
create or replace function public.get_active_offer()
 returns table (
   id uuid, slug text, label text, headline text, discount_label text, terms text,
   code text, use_type text, starts_at timestamp with time zone,
   expires_at timestamp with time zone, remaining integer
 )
 language sql
 stable
 security definer
 set search_path to 'public'
as $$
  select o.id, o.slug, o.label, o.headline, o.discount_label, o.terms,
         o.code, o.use_type, o.starts_at, o.expires_at,
         case when o.max_uses is null then null
              else greatest(o.max_uses - o.used_count, 0) end
  from public.offers o
  where o.is_active
    and (o.starts_at is null or o.starts_at <= now())
    and (o.expires_at is null or o.expires_at > now())
    and o.used_count < case when o.use_type = 'single_use' then 1
                            else coalesce(o.max_uses, 2147483647) end
  order by (o.expires_at is null), o.expires_at nulls last, o.created_at desc
  limit 1;
$$;

-- Spend one use of a campaign. The caller's fingerprint is a hash, never an
-- address; a single-use code can be re-claimed by the visitor who took it.
create or replace function public.claim_offer(_offer_id uuid, _source text, _page text, _ip_hash text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $$
declare
  _offer public.offers%rowtype;
  _same_ip boolean;
begin
  if _source not in ('exit_intent', 'timed', 'sticky', 'inline', 'direct') then
    raise exception 'Invalid source';
  end if;
  if _page is null or length(_page) > 300 then
    raise exception 'Invalid page';
  end if;
  if _ip_hash is null or length(_ip_hash) > 128 then
    raise exception 'Invalid request';
  end if;

  select * into _offer from public.offers where id = _offer_id for update;
  if not found then
    return jsonb_build_object('claimed', false, 'reason', 'missing');
  end if;
  if not _offer.is_active then
    return jsonb_build_object('claimed', false, 'reason', 'inactive');
  end if;
  if _offer.starts_at is not null and _offer.starts_at > now() then
    return jsonb_build_object('claimed', false, 'reason', 'not_started');
  end if;
  if _offer.expires_at is not null and _offer.expires_at <= now() then
    return jsonb_build_object('claimed', false, 'reason', 'expired');
  end if;

  if _offer.use_type = 'single_use' and _offer.used_count >= 1 then
    select exists (
      select 1 from public.offer_events
      where offer_id = _offer.id and event = 'claimed' and ip_hash = _ip_hash
    ) into _same_ip;
    if _same_ip then
      insert into public.offer_events (offer_id, event, source, page, ip_hash)
      values (_offer.id, 'claimed', _source, left(_page, 300), _ip_hash);
      return jsonb_build_object('claimed', true, 'replay', true, 'code', _offer.code);
    end if;
    return jsonb_build_object('claimed', false, 'reason', 'exhausted');
  end if;

  if _offer.use_type = 'multi_use'
     and _offer.max_uses is not null
     and _offer.used_count >= _offer.max_uses then
    return jsonb_build_object('claimed', false, 'reason', 'exhausted');
  end if;

  update public.offers
     set used_count = used_count + 1
   where id = _offer.id;

  insert into public.offer_events (offer_id, event, source, page, ip_hash)
  values (_offer.id, 'claimed', _source, left(_page, 300), _ip_hash);

  return jsonb_build_object(
    'claimed', true,
    'code', _offer.code,
    'used_count', _offer.used_count + 1
  );
end;
$$;

-- Log a view or a copy. Claims are written by claim_offer() instead.
create or replace function public.record_offer_event(_offer_id uuid, _event text, _source text, _page text, _ip_hash text)
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $$
begin
  if _event not in ('seen', 'copied') then
    raise exception 'Invalid event';
  end if;
  if _source not in ('exit_intent', 'timed', 'sticky', 'inline', 'direct') then
    raise exception 'Invalid source';
  end if;
  if not exists (select 1 from public.offers where id = _offer_id) then
    raise exception 'Unknown offer';
  end if;
  insert into public.offer_events (offer_id, event, source, page, ip_hash)
  values (
    _offer_id, _event, _source,
    left(coalesce(_page, ''), 300),
    left(coalesce(_ip_hash, ''), 128)
  );
end;
$$;

-- Campaign results for the studio, administrators only.
create or replace function public.admin_offer_stats(_offer_id uuid)
 returns jsonb
 language plpgsql
 stable
 security definer
 set search_path to 'public'
as $$
declare
  _out jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Forbidden';
  end if;
  select jsonb_build_object(
    'seen', count(*) filter (where event = 'seen'),
    'copied', count(*) filter (where event = 'copied'),
    'claimed', count(*) filter (where event = 'claimed'),
    'by_source', coalesce(
      jsonb_object_agg(source, n) filter (where source is not null), '{}'::jsonb),
    'last_claimed', max(created_at) filter (where event = 'claimed')
  ) into _out
  from (
    select event, source, created_at,
           count(*) over (partition by source) as n
      from public.offer_events
     where offer_id = _offer_id
  ) e;
  return coalesce(_out, '{}'::jsonb);
end;
$$;
