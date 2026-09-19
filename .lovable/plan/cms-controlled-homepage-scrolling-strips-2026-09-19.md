# CMS-controlled homepage scrolling strips

## What will change
- Add a **Show “Trusted by growing companies” strip** switch in **Studio → Pages → Site settings**.
- Keep the existing **Fade scrolling logos until touched** switch; it will apply only when the company strip is shown.
- Add a separate **Show AI models strip** switch in Site settings.
- Enable both strips by default so the current company strip remains visible and the new models strip appears immediately after the flagship tools.

## AI models strip
- Add a polished, continuously scrolling strip titled **“AI models in one workspace”** below the flagship and secondary tool carousels.
- Use a curated set from the supplied references, excluding stock-photo/search/API utility names: OpenAI, GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5, Gemini, Anthropic Claude, xAI Grok, DeepSeek, Meta Llama, OpenRouter, Perplexity, DALL·E 2, DALL·E 3, Stable Diffusion 3, fal.ai, ElevenLabs, and Azure AI.
- Present names as refined typographic badges rather than copying the screenshots or implying unavailable version-specific integrations.
- Make the loop seamless, pause it for hover/focus, and show a static wrapping row when reduced motion is enabled.

## Technical details
- Add `showHomepageTrustLogos` and `showHomepageAiModels` to the shared Site settings content type and bundled defaults.
- Add both boolean controls to the existing Site settings editor.
- Read the saved settings on the homepage and conditionally render each strip independently.
- Build the AI models strip as a focused reusable component and reuse the existing homepage tokens and marquee motion patterns.

## Verification
- Confirm both switches save and reload in Studio.
- Confirm each strip can be independently enabled or disabled.
- Check the model names, placement below flagship tools, seamless motion, keyboard behavior, reduced-motion mode, and mobile/desktop layouts.
- Confirm the company-logo fade setting still works and tutorials remain unchanged.
- Confirm the app builds cleanly with no browser errors.
