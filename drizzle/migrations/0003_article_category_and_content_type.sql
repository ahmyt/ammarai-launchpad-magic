ALTER TABLE public.syndicated_articles
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS content_type text;

UPDATE public.syndicated_articles SET category = v.category, content_type = v.content_type
FROM (VALUES
  ('ad-copy-generator-for-video-audio-and-social','AI Marketing','use-case'),
  ('ai-video-editing','AI Video','guide'),
  ('realtime-voice-chat-talk-naturally-with-ai','AI Voice','use-case'),
  ('marketing-research-ai','AI for Business','guide'),
  ('ama-post-generator-launch-better-q-a-sessions','AI Social Media','use-case'),
  ('marketing-plan-generator-build-a-practical-strategy','AI Marketing','use-case'),
  ('ai-dubbing-localise-videos-with-ammarai','AI Video','use-case'),
  ('ai-personas-reuse-your-best-ai-instructions','AI Productivity','use-case'),
  ('podcast-transcription-ai','AI Audio','use-case'),
  ('youtube-shorts-publisher-package-and-schedule','AI Video','use-case'),
  ('ai-event-planner-build-a-practical-event-plan','AI Productivity','use-case'),
  ('ai-proposal-writing','AI for Business','guide'),
  ('ai-email-writing','AI Writing','guide'),
  ('tone-of-voice-guide','AI Marketing','guide'),
  ('ai-workflow-automation','AI Automation','guide'),
  ('ai-marketing-plan','AI Marketing','guide'),
  ('ai-internal-linking','AI SEO','guide'),
  ('automate-social-media','AI Social Media','guide'),
  ('knowledge-base-ai','AI Writing','guide')
) AS v(slug, category, content_type)
WHERE public.syndicated_articles.slug = v.slug;