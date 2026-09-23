import type { ToolCategory, ToolSummary } from "./types";

export type EcosystemPillar = "Create" | "Think" | "Automate" | "Grow";

export const pillarOrder: EcosystemPillar[] = ["Create", "Think", "Automate", "Grow"];

export const pillarDetails: Record<EcosystemPillar, { description: string; categories: ToolCategory[] }> = {
  Create: {
    description: "Write, design, produce video, build avatars, and create audio from one brief.",
    categories: ["AI Writing", "AI Image", "AI Video", "AI Voice", "AI Audio", "AI Transcription"],
  },
  Think: {
    description: "Research, chat with sources, inspect documents, analyze SEO, solve code, and clarify decisions.",
    categories: ["AI Chat", "AI SEO", "AI Vision", "AI Documents", "AI Code", "AI Education", "AI Career", "AI Legal", "AI Lifestyle", "AI Productivity"],
  },
  Automate: {
    description: "Build agents, phone assistants, CRM follow-ups, and repeatable multi-step workflows with oversight.",
    categories: ["AI Agents", "AI Sales & CRM"],
  },
  Grow: {
    description: "Turn ideas into campaigns, social publishing, sales content, ecommerce assets, and customer communication.",
    categories: ["AI Marketing", "AI Social Media", "AI Business", "AI E-commerce", "AI Email", "AI Templates"],
  },
};

export const categoryPillar = Object.fromEntries(
  pillarOrder.flatMap((pillar) => pillarDetails[pillar].categories.map((category) => [category, pillar])),
) as Record<ToolCategory, EcosystemPillar>;

export function pillarForTool(tool: Pick<ToolSummary, "slug" | "category">): EcosystemPillar {
  return categoryPillar[tool.category];
}

export function toolsInPillar<T extends ToolSummary>(tools: T[], pillar: EcosystemPillar): T[] {
  return tools.filter((tool) => pillarForTool(tool) === pillar);
}

export type FlagshipWorkflow = {
  slug: string;
  bring: string;
  process: string;
  get: string;
  useCaseSlugs: string[];
};

export const flagshipWorkflows: FlagshipWorkflow[] = [
  {
    slug: "ai-writer",
    bring: "A topic, audience, source notes, and the tone you want to keep.",
    process: "AmmarAI structures the idea, drafts the content, and helps refine each section.",
    get: "A usable article or campaign draft ready for human review and publishing.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-agencies", "ai-for-seo"],
  },
  {
    slug: "ai-chat",
    bring: "A question, document, image, saved skill, or research task.",
    process: "AmmarAI keeps the conversation focused and can use attached files, reusable skills, or live web results.",
    get: "An answer, plan, analysis, or draft you can verify and continue refining in one thread.",
    useCaseSlugs: ["ai-for-developers", "ai-for-productivity", "ai-for-students"],
  },
  {
    slug: "ai-image-generator",
    bring: "A visual brief, product direction, reference image, or campaign concept.",
    process: "AmmarAI turns the direction into images and lets you iterate on composition and style.",
    get: "Original visual options for products, campaigns, posts, and creative production.",
    useCaseSlugs: ["ai-for-ecommerce", "ai-for-content-creators", "ai-for-marketing"],
  },
  {
    slug: "ai-video-generator",
    bring: "A written prompt or image plus the scene, motion, format, and mood you need.",
    process: "AmmarAI generates the motion sequence and gives you a playable result to review.",
    get: "A video concept for product, social, promotional, or storytelling work.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-ecommerce", "ai-for-content-creators"],
  },
  {
    slug: "ai-avatar-generator",
    bring: "A photo or video avatar plus the script or voice recording you want it to deliver.",
    process: "AmmarAI animates the face and matches its lip movement and expressions to the speech.",
    get: "A finished talking-avatar video for explainers, training, social content, or announcements.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-content-creators", "ai-for-productivity"],
  },
  {
    slug: "ai-transcription",
    bring: "An audio or video recording from a meeting, interview, podcast, lecture, or call.",
    process: "AmmarAI converts the recording into timestamped text with speakers separated and labelled.",
    get: "A searchable, speaker-labelled transcript ready for summaries, quotes, action items, or subtitles.",
    useCaseSlugs: ["ai-for-productivity", "ai-for-content-creators", "ai-for-students"],
  },
  {
    slug: "ai-agent-builder",
    bring: "A repeatable task, the information it needs, connected steps, and approval rules.",
    process: "AmmarAI chains the workflow, runs it on a trigger or schedule, and pauses at the approval gates you set.",
    get: "A reusable agent that handles recurring work while sensitive actions stay supervised.",
    useCaseSlugs: ["ai-for-small-business", "ai-for-agencies", "ai-for-productivity"],
  },
  {
    slug: "ai-phone-agent",
    bring: "A call purpose, knowledge, conversation guidance, and the details to capture.",
    process: "AmmarAI handles the conversation, follows the guidance, and records the outcome.",
    get: "A repeatable phone workflow for reception, qualification, support, or bookings.",
    useCaseSlugs: ["ai-for-small-business", "ai-for-entrepreneurs", "ai-for-agencies"],
  },
  {
    slug: "ai-crm",
    bring: "Contacts, conversations, lead context, and the follow-ups your team needs to track.",
    process: "AmmarAI keeps customer context organized and makes next actions easier to follow.",
    get: "A clearer pipeline of contacts, conversations, and follow-up work in one place.",
    useCaseSlugs: ["ai-for-small-business", "ai-for-agencies", "ai-for-entrepreneurs"],
  },
  {
    slug: "ai-social-media-agent",
    bring: "Your business context, target channels, campaign goals, content themes, and approval preferences.",
    process: "AmmarAI plans and creates channel-ready posts, schedules them, and publishes after any approval step you choose.",
    get: "A coordinated social content schedule ready to reach Facebook, Instagram, X, and LinkedIn.",
    useCaseSlugs: ["ai-for-social-media", "ai-for-marketing", "ai-for-small-business"],
  },
];

/**
 * Hand-written Bring → AmmarAI → Get workflows for the remaining major
 * full-product tools. Template-library tools are intentionally excluded.
 */
export const toolWorkflows: FlagshipWorkflow[] = [
  // Agents & engagement
  {
    slug: "ai-blogger-agent",
    bring: "Your niche, tone preferences, and the schedule you want to publish on.",
    process: "AmmarAI researches keywords, plans non-overlapping articles, writes them with headings, FAQs and internal links, and sets titles, meta descriptions and alt text.",
    get: "Finished posts published to your blog on schedule, or held in a review queue for your approval.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-seo", "ai-for-content-creators"],
  },
  {
    slug: "ai-dm-comment-agent",
    bring: "Your social channels, approved replies, and the keywords that trigger campaign flows.",
    process: "AmmarAI answers comments and DMs, captures lead details, and hands complex or sensitive messages to a human.",
    get: "A handled inbox across Instagram, Facebook, TikTok and YouTube, with every interaction logged.",
    useCaseSlugs: ["ai-for-social-media", "ai-for-small-business", "ai-for-ecommerce"],
  },
  {
    slug: "ai-deep-research",
    bring: "A research question and the depth of investigation you need.",
    process: "AmmarAI runs live web searches, reads the relevant pages, compares where sources agree and disagree, and compiles the findings.",
    get: "A structured report with sources and citations you can verify, export, and refresh later.",
    useCaseSlugs: ["ai-for-students", "ai-for-marketing", "ai-for-productivity"],
  },
  {
    slug: "ai-chat-bots",
    bring: "A question or task for a specialist — a career counselor, chef, financial analyst, travel guide and dozens more.",
    process: "AmmarAI answers in the professional format of the role: plans, scripts, critiques, checklists and breakdowns, with follow-ups in context.",
    get: "Expert-style advice you can refine in the thread or move straight into the writing and image tools to turn into assets.",
    useCaseSlugs: ["ai-for-productivity", "ai-for-students", "ai-for-entrepreneurs"],
  },
  {
    slug: "ai-marketing-bot",
    bring: "Your WhatsApp and Telegram contacts, audience segments, and the campaign you want to send.",
    process: "AmmarAI helps write and translate the message, schedules or sends it with rich media, and handles replies in a unified inbox.",
    get: "A delivered, measurable campaign with delivery and engagement tracking — and human handoff when a reply needs it.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-small-business", "ai-for-ecommerce"],
  },
  // Voice & audio
  {
    slug: "ai-voice-generator",
    bring: "A script written for the ear, plus the voice, accent and register you want.",
    process: "AmmarAI directs pace, pitch, emphasis and pronunciation line by line, and re-renders single lines without redoing the whole read.",
    get: "Clean narration audio — in one language or several — ready to drop into a video timeline.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-marketing", "ai-for-ecommerce"],
  },
  {
    slug: "ai-text-to-speech",
    bring: "An article, document, notes or reading list you want as audio.",
    process: "AmmarAI converts the full text with structure-aware pauses, at the speed and in the voice you set.",
    get: "A single consistent audio file for accessibility, study, or listening versions of written content.",
    useCaseSlugs: ["ai-for-students", "ai-for-content-creators", "ai-for-productivity"],
  },
  {
    slug: "ai-speech-to-text",
    bring: "A voice memo, dictation, or short recording in one or more languages.",
    process: "AmmarAI converts it into punctuated text with automatic language handling.",
    get: "Clean text you can send straight into AI Writer for shaping into notes, drafts or messages.",
    useCaseSlugs: ["ai-for-productivity", "ai-for-students"],
  },
  {
    slug: "sound-studio",
    bring: "Voiceovers, music and audio clips that need to become one track.",
    process: "AmmarAI merges tracks, balances background music under voice, fixes speed and loudness, and trims the rough edges.",
    get: "A single finished audio file where nothing jumps, distorts or disappears.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-marketing"],
  },
  {
    slug: "ai-music-generator",
    bring: "A mood, genre and the length your video, ad, podcast or presentation needs.",
    process: "AmmarAI generates original tracks and several variants of the same brief, matched to the content length.",
    get: "Background music you can publish as-is or send to Sound Studio to mix under a voiceover.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-marketing", "ai-for-ecommerce"],
  },
  // Image & design
  {
    slug: "ai-image-to-video",
    bring: "A strong still image and one movement you want — a push in, a pan, parallax, or ambient motion.",
    process: "AmmarAI animates the image with directed camera movement and depth-aware parallax, in the ratio you need.",
    get: "A short motion clip that turns a static photo into scroll-stopping social or background footage.",
    useCaseSlugs: ["ai-for-social-media", "ai-for-content-creators", "ai-for-ecommerce"],
  },
  {
    slug: "ai-vision",
    bring: "A photo, screenshot, chart, diagram or product image and a specific question about it.",
    process: "AmmarAI describes the scene, extracts visible text, tags attributes, or compares two images.",
    get: "Answers, alt text, structured tags or plain-language explanations you can use downstream.",
    useCaseSlugs: ["ai-for-ecommerce", "ai-for-developers", "ai-for-productivity"],
  },
  {
    slug: "ai-image-editor",
    bring: "An original photo and the change you want — background, object removal, relighting, colourways, or upscaling.",
    process: "AmmarAI applies the edit, lets you stack and refine further changes, and can batch one edit across a whole folder.",
    get: "Finished images at the size you need, from social crops to print resolution.",
    useCaseSlugs: ["ai-for-ecommerce", "ai-for-marketing", "ai-for-content-creators"],
  },
  {
    slug: "ai-photoshoot",
    bring: "One good product photo and the direction — studio sweep, lifestyle scene, seasonal set.",
    process: "AmmarAI places the product into the scene with realistic shadows, reflections and scale, in every ratio you need.",
    get: "A matching set of product images for a whole range, with one consistent lighting recipe.",
    useCaseSlugs: ["ai-for-ecommerce", "ai-for-marketing", "ai-for-small-business"],
  },
  {
    slug: "ai-virtual-try-on",
    bring: "A flat-lay garment photo and the model, body type and setting you want to show it in.",
    process: "AmmarAI renders the garment worn — keeping prints, seams and trims accurate — across models, colourways and views.",
    get: "Front, side and detail shots for the product page, with one consistent model across a collection.",
    useCaseSlugs: ["ai-for-ecommerce", "ai-for-marketing"],
  },
  {
    slug: "ai-creative-suite",
    bring: "A brand brief and the set of designs you need — ads, social formats, pitch visuals, event graphics.",
    process: "AmmarAI generates editable layouts with copy and composition on an infinite canvas, with mask-and-instruct editing for precise changes.",
    get: "A coordinated campaign set across every format, refined by direction instead of image-by-image edits.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-agencies", "ai-for-social-media"],
  },
  // Video
  {
    slug: "ai-video-editor",
    bring: "Your raw footage and a description of the finished cut — pacing, colour, transitions and sound.",
    process: "AmmarAI trims weak takes, reorders scenes, grades colour, cleans dialogue, balances music and reframes for vertical.",
    get: "A playable finished video, exported from a timeline you reviewed.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-marketing", "ai-for-social-media"],
  },
  {
    slug: "ai-captions",
    bring: "A spoken video that needs to work muted, on social, and for accessible playback.",
    process: "AmmarAI transcribes the speech, times every line, and styles the captions for the platform.",
    get: "Accurately timed, styled captions ready for social feeds and accessible viewing.",
    useCaseSlugs: ["ai-for-social-media", "ai-for-content-creators", "ai-for-marketing"],
  },
  {
    slug: "ai-dubbing",
    bring: "A video in one language and the languages your audience actually speaks.",
    process: "AmmarAI translates the speech, generates natural voices, and matches the timing to the original.",
    get: "A finished localised video that sounds native in each language.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-marketing", "ai-for-ecommerce"],
  },
  {
    slug: "ai-ugc-generator",
    bring: "A product brief — what it is, who it is for, and the angle you want.",
    process: "AmmarAI builds a creator-style video with a hook, demonstration and call to action.",
    get: "An authentic-feeling product video ready for social ads and organic posts.",
    useCaseSlugs: ["ai-for-ecommerce", "ai-for-social-media", "ai-for-marketing"],
  },
  {
    slug: "ai-youtube-publisher",
    bring: "Source footage and the goal for the channel — a full video or a Short.",
    process: "AmmarAI cuts the video, writes the title and description, sets the thumbnail direction, and schedules the release.",
    get: "A packaged YouTube video or Short, ready on schedule without the upload busywork.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-marketing"],
  },
  {
    slug: "ugc-factory",
    bring: "A script and a presenter — cast a virtual actor from the roster or build a digital twin of a real one.",
    process: "AmmarAI generates lip-synced delivery to camera with voiceover in the actor's voice, in batches of variants.",
    get: "A volume of creator-style vertical clips, exported ready for social.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-ecommerce", "ai-for-agencies"],
  },
  {
    slug: "viral-clips",
    bring: "One long recording — a podcast, webinar, interview or stream.",
    process: "AmmarAI finds the quotable moments, cuts each into a standalone short, reframes to vertical around the active speaker, and adds captions.",
    get: "A set of short clips ready for TikTok, Reels and Shorts from footage you already had.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-social-media", "ai-for-marketing"],
  },
  {
    slug: "ai-video-enhancer",
    bring: "A clip that is soft, noisy or compressed, and the quality you need it at.",
    process: "AmmarAI upscales and restores the footage frame by frame while keeping the original cut and audio intact.",
    get: "A sharper, higher-resolution version of the same video, compared side by side before export.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-marketing"],
  },
  {
    slug: "ai-url-to-video",
    bring: "A product URL and the format you need — vertical, square or widescreen.",
    process: "AmmarAI reads the page, writes the ad script, and builds the video with voiceover, captions and an avatar presenter.",
    get: "A complete product video ad, with multiple hook variants ready to test.",
    useCaseSlugs: ["ai-for-ecommerce", "ai-for-marketing", "ai-for-social-media"],
  },
  // Writing & platform
  {
    slug: "ai-document-analyzer",
    bring: "A long document — or a whole set — and what you need out of it.",
    process: "AmmarAI summarises at your chosen detail level, answers questions with citations to the source section, and extracts dates, parties, amounts and obligations.",
    get: "Structured answers, comparisons between versions, and plain-language explanations of dense clauses.",
    useCaseSlugs: ["ai-for-productivity", "ai-for-developers", "ai-for-students"],
  },
  {
    slug: "ai-presentation-maker",
    bring: "A topic, brief or pasted document, and the deck length you want.",
    process: "AmmarAI structures the deck, applies professional layouts and themes, matches visuals to each slide, and regenerates single slides on request.",
    get: "A finished presentation exported as PPTX, ready to present or polish further.",
    useCaseSlugs: ["ai-for-productivity", "ai-for-entrepreneurs", "ai-for-students"],
  },
  {
    slug: "ai-plagiarism-detector",
    bring: "Text or a document you need to trust before publishing.",
    process: "AmmarAI scans for duplicated content, links each flagged passage to its matching online source, and estimates AI-generated likelihood.",
    get: "An originality score with passage-level evidence — and a clean re-scan once the rewrite resolves the match.",
    useCaseSlugs: ["ai-for-students", "ai-for-seo", "ai-for-content-creators"],
  },
  {
    slug: "ai-rewriter",
    bring: "Existing text and the direction — different tone, shorter, simpler, more formal, more direct.",
    process: "AmmarAI rewrites while keeping the meaning intact, removes repetition and filler, and offers several wordings.",
    get: "A version that reads the way you need it to, chosen by comparison instead of guesswork.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-productivity", "ai-for-students"],
  },
  {
    slug: "ai-editor",
    bring: "A long document to draft or revise — an article, report or manuscript.",
    process: "AmmarAI works inside the page: expand or condense a selected passage, rewrite one paragraph without losing the rest, continue from where you stopped.",
    get: "A restructured, finished document exported from one place — no copy-pasting between tools.",
    useCaseSlugs: ["ai-for-content-creators", "ai-for-productivity", "ai-for-marketing"],
  },
];

/** Every tool with a workflow story: flagships first, then the other major tools. */
export const allToolWorkflows: FlagshipWorkflow[] = [...flagshipWorkflows, ...toolWorkflows];

export const outcomeShortcuts = [
  { label: "Write a complete product launch campaign", slug: "ai-writer" },
  { label: "Create a product demo video", slug: "ai-video-generator" },
  { label: "Turn a document into a presentation", slug: "ai-presentation-maker" },
  { label: "Build a customer support AI agent", slug: "ai-agent-builder" },
  { label: "Create an AI phone receptionist", slug: "ai-phone-agent" },
  { label: "Plan an SEO article and its metadata", slug: "ai-seo-analyzer" },
  { label: "Create social content for my business", slug: "ai-social-media-agent" },
  { label: "Research a topic and produce a cited report", slug: "ai-deep-research" },
] as const;