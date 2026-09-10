# Contact form shows an error even though the message arrives

Your mail setup is working: the message reaches support@ammarai.com. The red error appears *after* the email is sent, while the page is saving the delivery record for the Studio messages list. That last step is failing and the visitor sees a scary failure for a submission that actually succeeded.

## What's going on

The submission runs in this order:

```text
1. save the message   -> works
2. send the emails    -> works (you receive it)
3. record delivery status for the CMS -> fails
4. reply to the browser
```

Step 3 uses a privileged database connection that needs a server-only key. On the Plesk server that key isn't available, so the step can fail hard and the whole reply turns into a generic server error. The page then shows "Something went wrong…", because the reply contains no readable message at all (the missing SMTP detail in your screenshot confirms this — an SMTP failure would have shown a code).

## The fix

1. **Never fail the visitor after the email is sent.** Once the team notification has been handed to the mail server, the visitor always gets the success screen — the delivery bookkeeping can only add a quiet note, never an error.
2. **Make the bookkeeping step fault-proof.** Wrap the whole write-back (including creating the privileged connection and the call itself) so any failure is logged and reported as a flag in the reply, not thrown.
3. **Fall back when the privileged key is absent.** If the server-only key isn't configured, skip the write-back cleanly instead of crashing, and note in the reply that delivery tracking is unavailable.
4. **Better message on genuine failures.** If sending really fails, show the actual reason instead of the generic sentence, so future problems are diagnosable from the page itself.
5. **Verify.** After deploying and restarting on Plesk, submit the form once: you should see the success screen, receive the email, and the Studio messages list should show either the delivery status or a clear "tracking unavailable" note.

## Technical notes

- Change is confined to `src/routes/api/contact.ts` (order of operations + guarded `recordConfirmationOutcome`) and the error text in `src/routes/contact.tsx`.
- No change to `src/lib/contact-smtp.server.ts` — the loopback/port 25/no-auth path is correct and proven by the received mail.
- The write-back uses `supabaseAdmin` from `client.server`, which requires the service-role key in the Plesk environment; if you'd rather keep full delivery tracking, that key must be present there. Otherwise tracking is simply skipped.
