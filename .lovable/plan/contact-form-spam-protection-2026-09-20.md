# Contact form spam protection

Add a Cloudflare Turnstile check plus invisible bot checks to the contact form, with an on/off switch in Site settings.

## What you'll need to do

Create a free Turnstile widget in your Cloudflare account (Turnstile → Add widget, domain `ammarai.com`, type "Managed"). It gives you two values: a **site key** and a **secret key**. I'll ask for them and store them safely. Until they're added, the form keeps working with the invisible checks only.

## What gets built

1. **Turnstile widget on the contact form** — a small, usually invisible verification box above the Send button. The form can't be submitted until it passes, and the visitor sees a clear message if verification expires.

2. **Server-side verification** — the contact endpoint checks the visitor's token with Cloudflare before saving or emailing anything. A missing, reused, or invalid token is rejected with a friendly message and nothing is stored or sent.

3. **Invisible checks (work with or without Turnstile)**
   - A hidden field no human ever sees; if it's filled in, the submission is silently discarded.
   - A minimum fill time (about 3 seconds) — instant submissions are rejected.
   - One message per visitor per minute, and a small daily cap per sender address, checked against the stored messages.

4. **Site settings switch** — "Require captcha on the contact form", on by default. Turning it off keeps the invisible checks running but skips the Turnstile widget. The invisible checks are always on.

5. **Self-hosting note** — SELF_HOSTING.md gets the two new environment variables so the Plesk deployment behaves the same.

## Technical notes

- Site key ships in the build as `VITE_TURNSTILE_SITE_KEY`; the secret is stored as a server secret `TURNSTILE_SECRET_KEY` and read inside the POST handler only.
- Verification calls `https://challenges.cloudflare.com/turnstile/v0/siteverify` with the token and the caller's IP. If the secret isn't configured, the endpoint logs it and falls back to the invisible checks rather than blocking real visitors.
- Rate limiting counts recent rows in `contact_messages` by email and by IP hash (IP is hashed, never stored raw).
- Validation order in the handler: schema → honeypot → timing → rate limit → Turnstile → store → email. Existing storage, CMS sender settings, SMTP path and delivery tracking are unchanged.
- Files touched: `src/routes/contact.tsx`, `src/routes/api/contact.ts`, `src/data/types.ts`, `src/data/pages.ts`, `src/lib/cms-fields.ts`, `SELF_HOSTING.md`, plus a small Turnstile widget component.
