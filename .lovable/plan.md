# Offer & Discount System for ammarai.com

## What visitors will see

An offer appears without being asked for an email first. They see the deal, the code, and how long it lasts:

```
┌─ Launch offer ────────────────────────────────┐
│  20% off your first three months             │
│                                              │
│  Code  WELCOME20            [ Copy code ]    │
│  Ends in 3 days, 4 hours                     │
│                                              │
│  [ Start creating free ]                     │
│  One subscription, every AI tool included.   │
│  Small print: applies to new accounts…       │
└──────────────────────────────────────────────┘
```

Four placements, all driven by one active offer:

- **Desktop:** a card that appears on exit-intent (mouse moves toward closing the tab).
- **Desktop:** a second chance after 30 seconds or half-way down the page, whichever comes first.
- **Mobile:** a slim dismissible bar pinned to the bottom (no pop-up — phones punish them).
- **High-intent pages:** a permanent block on pricing and the busiest tool pages, no interruption.

Returning visitors see it again after a few days if they never claimed it. Once someone on a device claims it, that device stops being interrupted. Keyboard users can close with Escape, the card traps focus while open, and nothing slides or animates for people who prefer reduced motion.

## What you set in the content studio

A new **Offers** tab (admins only) where each offer has:

- Label and headline ("Launch offer", "20% off your first three months")
- The code itself, and whether it is **single use** or **multiple use**
- **Maximum uses** when multiple use, plus a live "used so far" count you can reset
- **Starts at** and **expires at** — date and time, so a campaign ends on the minute you choose
- Small print / terms
- Active switch — turn a campaign off instantly without deleting it

A new **Offers** block in Site settings controls display: master switch, which of the four placements are on, the delay in seconds, how many days before a dismissed offer comes back, and which pages carry the inline block. Everything saves live, no rebuild.

## How a campaign behaves

- An offer only shows when it is active, inside its date window, and has uses left. Single-use offers vanish the moment they are claimed.
- Claiming a code (pressing Copy code, or opening signup from the offer) counts as a use and is recorded with the placement and page it came from, so you can see which position actually converts.
- When the uses run out or the expiry passes, every placement goes quiet on its own — no manual clean-up between campaigns.
- Only one offer can be live at a time; a second active offer is refused with a clear message rather than showing both.

## Honest limits

- Your site can count claims, but it cannot see how many people actually paid with the code — that lives in the app's billing. The cap therefore stops the *offer display* at your limit; the real redemption count stays in your billing dashboard.
- Because the code is shown openly, anyone could use it without being shown the offer. The cap and expiry are what keep that bounded, which is why single-use and short windows matter.

## Technical details

**Database (one migration, GRANTs in the same file)**

- `public.offers` — id, slug, label, headline, terms, discount_label, code, use_type (`single_use` | `multi_use`), max_uses, used_count, starts_at, expires_at, is_active, created_at, updated_at. No anon grant; `authenticated` SELECT and `service_role` ALL; RLS policies scoped to `has_role(auth.uid(),'admin')`.
- `public.offer_events` — id, offer_id, event (`seen` | `claimed` | `copied`), source (which placement), page path, ip_hash, created_at. No anon grant; admin SELECT only.
- `public.get_active_offer()` — `security definer`, granted EXECUTE to anon. Returns the safe public projection (headline, terms, discount label, code, expiry) only when active, in-window and under cap. This keeps codes out of the `content` table, which is publicly readable and would leak draft campaigns.
- `public.claim_offer(offer_id, source, page, ip_hash)` — `security definer`, granted EXECUTE to anon. Atomically checks the window and cap, increments `used_count`, writes the event, and returns whether the claim succeeded. Single statement, so two visitors cannot take the last use.

**Server functions** (`src/lib/offers.functions.ts`, public, no bearer token)

- `getActiveOffer` (GET) and `claimOffer` (POST), both thin wrappers over the two functions above. `claimOffer` is rate-limited per hashed IP in-process (the pattern already used for the contact form) so `used_count` cannot be inflated by a script.

**Frontend**

- `src/components/site/OfferProvider.tsx` mounted once in `SiteShell` (`src/routes/__root.tsx`) — fetches the active offer **client-side after mount**, never from a loader, so the homepage HTML stays around 120 KB and well under the server firewall limit that caused the earlier outage.
- `src/components/site/OfferCard.tsx` (exit-intent + timed modal, focus trap, Escape, `role="dialog"`), `OfferBar.tsx` (mobile sticky region, not a modal), `OfferInline.tsx` (the permanent block, placed in `src/routes/pricing.tsx` and the high-intent tool pages).
- Copy to clipboard with a visible confirmation, then the signup link opens in the same tab. If the app's checkout accepts a prefilled coupon parameter, the link becomes `app.ammarai.com/register?coupon=CODE` — a one-line change once you confirm the parameter name.
- Frequency capping in `localStorage` under `ammarai-offer`: seen, dismissed, claimed, next eligible date. `prefers-reduced-motion` disables the slide.
- All colours and shadows from the existing design tokens; new `.offer-*` rules in `src/styles.css`; touch targets 44px or larger.

**Studio**

- `src/routes/admin.offers.tsx` following the existing bespoke admin screens (Reviews, Messages), `staticData: { sitemap: false }`, noindex head, admin-only, linked from the studio nav for admins.
- Writes go through `requireSupabaseAuth` server functions that verify `has_role(auth.uid(),'admin')` before touching `public.offers`.
- Site settings fields added to `Page` (`src/data/types.ts`), defaults in `src/data/pages.ts`, and labels in `pageSettingsFields` (`src/lib/cms-fields.ts`).

**Verification**

- Playwright: exit-intent fires on desktop and not on mobile; timed trigger at 30s and at half scroll; mobile bar at 411×801 with no overflow; copy button writes the code and records a use in the database; expired offer and exhausted single-use offer disappear from all four placements; Escape and Tab behave; reduced-motion path renders; no console errors.
- Studio: create, edit, deactivate, reset counter, refuse a second active offer.
- Build clean, homepage payload still near 120 KB, and the site reaches production through your usual GitHub pull.
