# Clearer message when sign-up is closed

## What you see now
- With "Allow new content studio accounts (sign-up)" off in Site settings, nobody can create a new account — not by email, and not by "Continue with Google".
- People who already have an account are unaffected; they can still sign in with email or Google.

## Change
- On the sign-in page (`src/routes/auth.tsx`), when the Google sign-in comes back rejected because sign-ups are disabled, show a friendly line: "New accounts are currently closed. Please sign in with an existing account." instead of the generic failure text.
- Same treatment for the email form if it ever reports a sign-up rejection while the setting is off.

## Technical details
- Detect the backend's signup-disabled error (message/code from the auth response, e.g. `signup_disabled` / "Signups not allowed") in both the OAuth return handling and the email submit handler.
- Only when `allowCmsSignup` is false; when the setting is on, behaviour stays exactly as today.
- No database or settings changes; no new dependencies.
