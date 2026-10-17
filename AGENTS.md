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
- Compose pricing pop-ups from shared tier inclusion groups and plan-specific allowances; this keeps inherited tools complete without inheriting lower-tier credit, trial, seat or call limits.
- Load the external live chatbot once through the shared provider after initial paint; open it through its native launcher and hide it on admin/auth pages because the vendor exposes no teardown API.
