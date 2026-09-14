CREATE OR REPLACE FUNCTION public.cron_upsert_article(_id text, _token text, _row jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.cron_verify_token(_id, _token) THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  INSERT INTO public.syndicated_articles (
    slug, external_id, title, content_html, content_markdown, meta_description,
    hero_image_url, json_ld, faq_json_ld, language_code, published_at, synced_at, is_hidden,
    category, content_type
  )
  VALUES (
    _row->>'slug',
    _row->>'external_id',
    _row->>'title',
    _row->>'content_html',
    _row->>'content_markdown',
    _row->>'meta_description',
    _row->>'hero_image_url',
    CASE WHEN _row->'json_ld' = 'null'::jsonb THEN NULL ELSE _row->'json_ld' END,
    CASE WHEN _row->'faq_json_ld' = 'null'::jsonb THEN NULL ELSE _row->'faq_json_ld' END,
    COALESCE(_row->>'language_code', 'en'),
    NULLIF(_row->>'published_at','')::timestamptz,
    COALESCE(NULLIF(_row->>'synced_at','')::timestamptz, now()),
    COALESCE((_row->>'is_hidden')::boolean, false),
    NULLIF(_row->>'category',''),
    NULLIF(_row->>'content_type','')
  )
  ON CONFLICT (slug) DO UPDATE SET
    external_id = EXCLUDED.external_id,
    title = EXCLUDED.title,
    content_html = EXCLUDED.content_html,
    content_markdown = EXCLUDED.content_markdown,
    meta_description = EXCLUDED.meta_description,
    hero_image_url = EXCLUDED.hero_image_url,
    json_ld = EXCLUDED.json_ld,
    faq_json_ld = EXCLUDED.faq_json_ld,
    language_code = EXCLUDED.language_code,
    published_at = EXCLUDED.published_at,
    synced_at = EXCLUDED.synced_at,
    category = COALESCE(EXCLUDED.category, public.syndicated_articles.category),
    content_type = COALESCE(EXCLUDED.content_type, public.syndicated_articles.content_type),
    updated_at = now();
END;
$function$;