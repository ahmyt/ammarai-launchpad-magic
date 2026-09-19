# Fix the homepage "404" flash by asking your host to change one thing

## What is actually happening

Your homepage is the only address on the site that the web server mishandles. When a browser asks for `https://ammarai.com/`, the server does not hand that request to your site application. It first tries to find a physical file or folder for `/`, fails, and then hands the request to Plesk's built-in "error documents" page — which arrives at your application as the address `/error_docs`. Your application correctly says "page not found" for that, and shows its 404 screen for a few seconds until the real page loads in the browser.

Everything else works: `/ai-tools`, `/about`, `/pricing`, `/blog`, `/tutorials` and every tool page are passed straight to your application and return 200.

## Evidence from live checks on 19 Sep 2026

```text
https://ammarai.com/                -> 404   (1,040,256 bytes)  application saw "/error_docs"
https://ammarai.com/about           -> 200   (1,046,891 bytes)
https://ammarai.com/features        -> 200   (1,049,993 bytes)
https://ammarai.com/pricing         -> 200   (1,053,690 bytes)
https://ammarai.com/tutorials       -> 200   (1,079,953 bytes)
https://ammarai.com/ai-chat         -> 200   (1,082,502 bytes)
https://ammarai.com/ai-tools        -> 200   (1,173,698 bytes)
https://ammarai.com/error_docs      -> 301   (folder exists in the document root)
https://ammarai.com/error_docs/     -> 403   (Plesk's error-documents folder, reachable)
```

Two further details from the response headers: the homepage reply carries only `x-powered-by: Phusion Passenger`, while every working page also carries `x-powered-by: PleskLin` and `vary: Accept-Encoding` — proof that `/` travels through a different server rule than all other addresses.

## What this is NOT

- Not page size, and not the web application firewall. The homepage is *smaller* than `/about`, `/pricing`, `/faq` and `/ai-tools`, all of which serve normally, and the firewall is not exposed on your shared hosting plan anyway.
- Not a bug in the site code, and not a routing, URL or sitemap problem. Nothing here needs changing in the project.
- Not something you can switch off yourself: "Custom error documents" is greyed out and "Apache & nginx Settings" is not offered on your plan.

## What the host needs to change

Any one of these fixes is enough — the host decides which suits their setup:

1. Stop intercepting the domain root, so `/` goes directly to the Passenger application (usually "Serve static files directly by nginx" / "smart static files" switched off for this domain, or the root `try_files $uri $uri/` rule removed / a `location = /` block added for the app).
2. Stop Plesk's custom error documents from rewriting this domain's responses, so `/error_docs` is never passed to the application.
3. Confirm the domain's document root and Passenger application root are correct for a Node app with no physical index file, so a request for `/` is never treated as a missing file.

## Message to send your hosting support (copy and paste)

```text
Subject: ammarai.com - root URL / is being served as a 404 via error_docs (needs server-level fix)

Domain: ammarai.com (shared hosting, Plesk + Passenger/Node.js)

Problem:
A request for https://ammarai.com/ returns HTTP 404 instead of being passed to my
Node.js application. All other URLs on the same domain work correctly.

Evidence (measured 19 Sep 2026):
  GET https://ammarai.com/          -> HTTP/2 404, server: nginx,
                                       x-powered-by: Phusion Passenger 6.1.8
                                       (~1.04 MB body, no "vary: Accept-Encoding",
                                       no "x-powered-by: PleskLin")
  GET https://ammarai.com/ai-tools  -> HTTP/2 200 (1.17 MB, includes vary + PleskLin)
  GET https://ammarai.com/about     -> HTTP/2 200 (1.05 MB)
  GET https://ammarai.com/pricing   -> HTTP/2 200 (1.05 MB)
  GET https://ammarai.com/error_docs  -> 301
  GET https://ammarai.com/error_docs/ -> 403

The HTML returned for / is my application's own "page not found" screen, and its
router state shows the application received the path "/error_docs" rather than "/".
So the web server is resolving / to a missing file/folder in the document root and
then passing the request to Plesk's custom error documents before my application
ever sees the real URL.

Please apply one of the following for ammarai.com:
  1. Route / directly to the Passenger application - disable "Serve static files
     directly by nginx" (smart static) for this domain, or remove the root
     try_files $uri $uri/ handling / add a "location = /" rule that enables
     Passenger, so a request for / is never treated as a missing file.
  2. Or disable Plesk custom error documents for this domain at the server /
     service-plan level, so /error_docs is never injected.
  3. Or confirm the domain's document root and Passenger application root are
     correct for a Node.js app that intentionally has no physical index file.

Why it matters: Google and other crawlers are currently receiving a 404 status for
my homepage, which puts the homepage out of the index.

I cannot make these changes myself: "Custom error documents" is greyed out in my
Plesk panel and "Apache & nginx Settings" is not available on this plan.

Two small things while you are in there:
  - Please confirm the Node.js application is running on the "22" runtime (the
    pinned value 22.23.2 is not installed via nodenv on this server and fails to
    start).
  - Please confirm whether automatic IP blocking (fail2ban or similar) is active on
    this account, and that it will not block routine uptime checks or my own
    monitoring.

After the change, a plain GET of https://ammarai.com/ should return HTTP 200 with
the same headers as /ai-tools (vary: Accept-Encoding, x-powered-by: PleskLin).
```

## How to confirm they fixed it

1. Reload `https://ammarai.com/` with a hard refresh (Ctrl+Shift+R). The "Page not found" screen should not appear at all.
2. Check the first response in your browser's developer tools (Network tab, first document entry, or right-click Inspect then Network): the homepage should say 200, not 404.
3. Once the flash is gone, open Search Console, run URL Inspection on `https://ammarai.com/`, and request indexing — the homepage should no longer report "Not found (404)".

## Notes

- The site briefly refused connections from my checking machine today; it loads normally for you, so that was almost certainly an automatic block of my checking address after repeated requests, not an outage. Avoid re-running the same checks many times in a row, and ask the host the fail2ban question above so uptime monitoring is not caught by it.
- No project files change for this fix: no code, no URLs, no sitemap, no metadata. Nothing on the site needs rebuilding or redeploying, and the homepage stays fully live and dynamic.
