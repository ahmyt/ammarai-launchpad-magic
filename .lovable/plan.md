# Fix homepage 404 flash on Plesk — ModSecurity body limit

## Diagnosis (confirmed by the Plesk log)

The log shows two entries for the same request to `/`:

1. `ModSecurity: Output filter: Response body too large (over limit of 1048576, total not specified) [hostname "ammarai.com"] [uri "/"]`
2. `404 GET / HTTP/1.1`

The homepage HTML is larger than ModSecurity's response-body inspection limit (1 MB). When the limit is exceeded, ModSecurity aborts the response and the request falls through to the 404 error document — which is exactly the "404 for a few seconds, then the app loads" behavior seen in the browser. Other pages (`/ai-tools` etc.) return 200 because their HTML is under the limit.

This is a server/firewall configuration issue, not an app bug — the same app returns 200 on the Lovable-hosted copy.

## Fix (in Plesk — user action)

Websites & Domains → ammarai.com → **Web Application Firewall (ModSecurity)**:

- **Option A (simplest):** set the firewall to **"Detection only"** or **"Off"** for this domain. The app does not need ModSecurity — it is a Node.js app behind Plesk, and its own server code handles input.
- **Option B:** keep the firewall on but **raise the response-body limit**: in the ModSecurity custom directives, add
  `SecResponseBodyLimit 8388608` (8 MB) — or `SecResponseBodyLimitAction ProcessPartial` so oversized responses pass through instead of being aborted.
- If those controls are also greyed out, open a ticket with the hosting provider and quote the exact log line: *"ModSecurity: Output filter: Response body too large (over limit of 1048576)"* for `ammarai.com /`, and ask them to either raise `SecResponseBodyLimit` or switch the domain to Detection-only mode.

The earlier greyed-out "custom error documents" setting no longer matters — it was only showing the symptom, not causing it.

## Optional app-side hardening (this project)

- Reduce the homepage's initial HTML payload (defer non-critical inline JSON/markup below the fold) so it stays under 1 MB even if the firewall limit is never raised. This is a nice-to-have; the Plesk change above is the actual fix.

## Verification

After the Plesk change:
1. `curl -s -o /dev/null -w "%{http_code}" https://ammarai.com/` returns **200** (currently 404).
2. Refresh the homepage in the browser — no 404 flash.
3. Plesk log no longer shows the ModSecurity body-limit error for `/`.
