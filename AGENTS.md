<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Country filtering waits for the once-per-minute settings refresh and a shared dual-provider first-visit lookup, because access decisions must not change after refresh.
- Country bypass ownership is atomically claimed and verified in durable database functions on every bypass request; admin resets revoke immediately, and raw legacy/auth-looking cookies never authorize access.
- Compose pricing pop-ups from shared tier inclusion groups and plan-specific allowances; this keeps inherited tools complete without inheriting lower-tier credit, trial, seat or call limits.
- Keep Free-plan numeric allowances in a browser-safe data module with focused tests so the pricing banner uses verified, independently checkable values.
- Load the external chat and standalone voice widgets once through the shared provider after initial paint; preserve native launchers, keep them on opposite screen edges, and hide both on admin/auth pages because the vendors expose no teardown API.
- Country-filter VPN layer combines IP network-owner matching with a client-set device-timezone cookie checked server-side, so blocking stays a server 503 and adds no render-blocking work.
- Render tutorial step media through TutorialFigure with an accessible fit/original-size viewer so native-resolution reference controls remain inspectable on small screens.
- Register new video tools in the shared video catalogue and regenerate the lightweight index; associate existing tutorials without rewriting their verified copy so discovery, CMS and tutorial links stay aligned.
