# Fix Google `redirect_uri_mismatch`

## Confirmed diagnosis
- The screenshot is still Google's `Error 400: redirect_uri_mismatch`.
- The current AmmarAI backend sends this exact callback to Google:
  `https://ibaacwfkyipgzyvfpjsw.supabase.co/auth/v1/callback`
- The backend already trusts `https://ammarai.com/**` and uses `https://ammarai.com` as its main site URL.
- Therefore, this is now entirely a Google Cloud OAuth-client configuration mismatch—not a website code or AmmarAI redirect-list issue.

## Fix in Google Cloud Console
1. Retry Google sign-in and open **Error details** on Google's error page.
2. Note the displayed **client_id** and **redirect_uri**. The redirect URI must be exactly:
   `https://ibaacwfkyipgzyvfpjsw.supabase.co/auth/v1/callback`
3. In Google Cloud Console, open **APIs & Services → Credentials**.
4. Open the **Web application** OAuth client whose Client ID exactly matches the `client_id` from Error details. This is important: adding the callback to a different OAuth client will not resolve the error.
5. Under **Authorized redirect URIs**, add the exact callback above:
   - HTTPS
   - no spaces
   - no wildcard
   - no trailing slash
6. Save and allow several minutes for Google’s configuration to propagate.
7. Ensure the Client ID and its matching Client Secret from that same OAuth client are saved under **Backend → Users → Authentication Settings → Google**.

## Verify
- Retry from a private/incognito window at `https://ammarai.com/auth`.
- Google should show the account/consent screen instead of `redirect_uri_mismatch`.
- After authorization, the browser should return to AmmarAI and open `/admin`.

## If the next error changes
- `Unable to exchange external code` means the redirect mismatch is fixed, but the backend has a Client Secret that does not match the configured Client ID. Replace both together from the same Google OAuth client.

No website code change is required.
