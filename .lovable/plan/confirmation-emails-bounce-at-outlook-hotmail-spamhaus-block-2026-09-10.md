# Confirmation emails bounce at Outlook/Hotmail (Spamhaus block)

## What the evidence shows

With the secured SSL mail settings, your own mail server now accepts the confirmation email:

```text
250 2.0.0 Ok: queued as ACC8B1AC8B6D
```

So the website and the mail server are both doing their job. Two seconds later the mail server tried to hand the message to Microsoft and got refused:

```text
550 5.7.1 Service unavailable, Client host [185.223.31.164]
blocked using Spamhaus
```

Microsoft is rejecting your server's IP address, not the message. Nothing in the website code can change that — the message never reaches the customer's inbox.

## Options

**Option A — Get the IP removed from the blocklist (free, may not stick)**
Request delisting for `185.223.31.164` at spamhaus.org. This is a shared hosting IP, so it can get relisted whenever another site on that server sends spam. Good short-term, unreliable long-term.

**Option B — Send through a dedicated email service (recommended)**
Point outgoing mail at a reputable sending service (for example Brevo, Mailgun, Postmark, or SendGrid) instead of the hosting server's own IP. Their IPs are trusted by Outlook and Gmail, and they handle SPF/DKIM signing. This is the durable fix.

**Option C — Do nothing about the customer confirmation**
Keep only the notification to support@ammarai.com (which works, since it stays on the same server) and drop the confirmation email to the visitor.

## What I would change in the app

For Option B, the work is small and lives entirely in the mail-sending settings:

- The contact form already reads its mail server, port, security, username and password from the server's environment settings. Switching provider means changing those values on the hosting panel — no code change required for basic sending.
- I would additionally make the status shown in Studio clearer: "Accepted by mail server" is accurate but reads like a warning. It should read as a success, with a note that final delivery depends on the recipient's provider.
- Optionally, log the sender domain in the diagnostics endpoint so a future delivery problem is easier to trace.

For Option A or C, no code change is needed beyond the same status-label clarification.

## Recommendation

Go with Option B and, in the meantime, submit the delisting request from Option A so the current setup works today. Tell me which provider you want and I will confirm the exact settings to enter on the hosting panel.
