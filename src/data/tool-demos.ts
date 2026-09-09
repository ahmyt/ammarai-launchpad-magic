import avatarDemo from "@/assets/demo-avatar-video.mp4.asset.json";
import avatarDemo2 from "@/assets/demo-avatar-video-2.mp4.asset.json";
import imageToVideoDemo from "@/assets/demo-image-to-video.mp4.asset.json";
import imageToVideoDemo2 from "@/assets/demo-image-to-video-2.mp4.asset.json";
import textToVideoDemo from "@/assets/demo-text-to-video.mp4.asset.json";
import textToVideoDemo2 from "@/assets/demo-text-to-video-2.mp4.asset.json";
import videoGeneratorDemo from "@/assets/demo-video-generator.mp4.asset.json";
import videoGeneratorDemo2 from "@/assets/demo-video-generator-2.mp4.asset.json";
import urlToVideoAdDemo from "@/assets/demo-url-to-video-ad.mp4.asset.json";
import urlToVideoClipDemo from "@/assets/demo-url-to-video-clip.mp4.asset.json";
import urlToVideoAvatarDemo from "@/assets/demo-url-to-video-avatar.mp4.asset.json";
import voiceAdRead from "@/assets/demo-voice-ad-read.mp3.asset.json";
import voiceCourse from "@/assets/demo-voice-course.mp3.asset.json";
import ttsArticle from "@/assets/demo-tts-article.mp3.asset.json";
import ttsStudy from "@/assets/demo-tts-study.mp3.asset.json";
import sttDictation from "@/assets/demo-stt-dictation.mp3.asset.json";
import sttMemo from "@/assets/demo-stt-memo.mp3.asset.json";
import transcriptionInterview from "@/assets/demo-transcription-interview.mp3.asset.json";
import transcriptionWalkthrough from "@/assets/demo-transcription-walkthrough.mp3.asset.json";
import musicAdBed from "@/assets/demo-music-ad-bed.mp3.asset.json";
import musicAmbientBed from "@/assets/demo-music-ambient-bed.mp3.asset.json";
import sourceSneaker from "@/assets/i2v-source-sneaker.jpg";
import sourceMountains from "@/assets/i2v-source-mountains.jpg";
import imageOutWorkbench from "@/assets/imggen-out-workbench.jpg";
import imageOutCyclist from "@/assets/imggen-out-cyclist.jpg";
import visionBikeWheel from "@/assets/vision-in-bike-wheel.jpg";
import visionRevenueChart from "@/assets/vision-in-revenue-chart.jpg";
import seoReportUrlAudit from "@/assets/seo-report-url-audit.jpg";
import seoReportTextAnalysis from "@/assets/seo-report-text-analysis.jpg";
import seoReportKeywords from "@/assets/seo-report-keywords.jpg";


export type ToolDemoScene = {
  /** Small label above the animated scene, e.g. "Live call". */
  label: string;
  /** Steps revealed one by one while the demo plays. */
  steps: { actor: string; text: string; meta?: string }[];
  /** Closing summary line under the scene. */
  result?: string;
};

export type ToolDemoMedia = {
  /** Output media kind. Omit for tools whose real output is text. */
  kind?: "video" | "audio" | "image" | "code" | "scene";
  /** Output media URL (video, audio or image). Omit for text/code output. */
  url?: string;
  caption?: string;
  /** Output source code, streamed into a code block (kind: "code"). */
  code?: string;
  /** Language label shown on the code block. */
  language?: string;
  /** Animated step-by-step scene for tools with no single file output (kind: "scene"). */
  scene?: ToolDemoScene;
  /** Optional source still shown alongside the prompt (image-led tools). */
  inputImage?: string;
  inputImageAlt?: string;
  /** Optional source recording shown alongside the prompt (audio-led tools). */
  inputAudio?: string;
  inputAudioLabel?: string;
  /** Optional attached-file chip shown alongside the prompt (document tools). */
  inputFileLabel?: string;
};



/**
 * Sample media per tool, one entry per example in the same order as the tool's
 * `examples` array, so each tab shows input and output matching its own prompt.
 */
export const toolDemoMedia: Record<string, ToolDemoMedia[]> = {
  "ai-avatar-generator": [
    {
      kind: "video",
      url: avatarDemo.url,
      caption: "Sample output — a founder headshot delivering the launch announcement with AI lip-sync.",
    },
    {
      kind: "video",
      url: avatarDemo2.url,
      caption: "Sample output — a template presenter re-voiced for a localised course lesson.",
    },
  ],
  "ai-image-to-video": [
    {
      kind: "video",
      url: imageToVideoDemo.url,
      caption: "Sample output — the uploaded product still lifted into a rotating hero shot with light sweeps and drifting smoke.",
      inputImage: sourceSneaker,
      inputImageAlt: "Source still: a matte black sneaker lit with amber and teal studio light",
    },
    {
      kind: "video",
      url: imageToVideoDemo2.url,
      caption: "Sample output — the same sunrise photo turned into a drifting aerial with real parallax between ridges.",
      inputImage: sourceMountains,
      inputImageAlt: "Source still: snow-capped mountain ridges at golden sunrise",
    },
  ],
  "ai-text-to-video": [
    {
      kind: "video",
      url: textToVideoDemo.url,
      caption: "Sample output — a macro gold-splash beauty shot generated from the prompt alone.",
    },
    {
      kind: "video",
      url: textToVideoDemo2.url,
      caption: "Sample output — a neon hyperlapse through rain-slick Tokyo streets, no footage required.",
    },
  ],
  "ai-video-generator": [
    {
      kind: "video",
      url: videoGeneratorDemo.url,
      caption: "Sample output — a vertical product explainer cut from the written brief.",
    },
    {
      kind: "video",
      url: videoGeneratorDemo2.url,
      caption: "Sample output — a punchy ad cut with kinetic captions, ready to run as a paid variant.",
    },
  ],
  "ai-url-to-video": [
    {
      kind: "video",
      url: urlToVideoAdDemo.url,
      caption:
        "Sample output — a finished vertical ad built from the esimnow.net product page, with avatar presenter, voiceover and burned-in captions.",
    },
    {
      kind: "video",
      url: urlToVideoClipDemo.url,
      caption:
        "Sample output — one of the five short clips cut from the 45-minute podcast, opening on a hook with captions burned in for Reels and TikTok.",
    },
    {
      kind: "video",
      url: urlToVideoAvatarDemo.url,
      caption:
        "Sample output — an influencer-style avatar delivering the written script on camera with natural lip-sync, expressions and captions.",
    },
  ],
  "ai-voice-generator": [
    {
      kind: "audio",
      url: voiceAdRead.url,
      caption: "Sample output — the ad read with a natural beat before the second line and emphasis on \"cash-flow\".",
    },
    {
      kind: "audio",
      url: voiceCourse.url,
      caption: "Sample output — a calm lesson narration at a slower pace with the pronunciation correction applied.",
    },
  ],
  "ai-text-to-speech": [
    {
      kind: "audio",
      url: ttsArticle.url,
      caption: "Sample output — the opening of the article's audio version, with a clean break at the section heading.",
    },
    {
      kind: "audio",
      url: ttsStudy.url,
      caption: "Sample output — revision audio at a slightly slower pace with acronyms spoken out.",
    },
  ],
  "ai-music-generator": [
    {
      kind: "audio",
      url: musicAdBed.url,
      caption: "Sample output — upbeat electronic bed that builds to a lift for the call to action.",
    },
    {
      kind: "audio",
      url: musicAmbientBed.url,
      caption: "Sample output — warm minimal ambient bed, no drums, sitting comfortably under narration.",
    },
  ],
  "ai-speech-to-text": [

    {
      inputAudio: sttDictation.url,
      inputAudioLabel: "dictation-q4-priorities.mp3",
    },
    {
      inputAudio: sttMemo.url,
      inputAudioLabel: "voice-memo-walk.mp3",
    },
  ],
  "ai-transcription": [
    {
      inputAudio: transcriptionInterview.url,
      inputAudioLabel: "customer-interview.mp3",
    },
    {
      inputAudio: transcriptionWalkthrough.url,
      inputAudioLabel: "product-walkthrough.mp3",
    },
  ],
  "ai-image-generator": [
    {
      kind: "image",
      url: imageOutWorkbench,
      caption: "Sample output — a wide 16:9 editorial header in a warm, matte photographic style, usable without cropping.",
    },
    {
      kind: "image",
      url: imageOutCyclist,
      caption: "Sample output — a 4:5 concept scene with negative space in the lower third for a caption.",
    },
  ],
  "ai-vision": [
    {
      inputImage: visionBikeWheel,
      inputImageAlt: "Uploaded photo: a mechanic in a green apron truing a bicycle wheel on a workstand",
    },
    {
      inputImage: visionRevenueChart,
      inputImageAlt: "Uploaded screenshot: a quarterly revenue bar chart rising through Q3 then dipping in Q4",
    },
  ],
  "ai-code-generator": [
    {
      kind: "code",
      language: "typescript",
      caption: "Sample output — a dependency-free generic groupBy plus the Vitest file covering the edge cases named in the prompt.",
      code: `export function groupBy<T, K>(
  items: readonly T[],
  keyOf: (item: T) => K,
): Map<K, T[]> {
  const groups = new Map<K, T[]>();
  for (const item of items) {
    const key = keyOf(item);
    const bucket = groups.get(key);
    if (bucket) bucket.push(item);
    else groups.set(key, [item]);
  }
  return groups;
}

// groupBy.test.ts
import { describe, expect, it } from "vitest";

describe("groupBy", () => {
  it("returns an empty map for empty input", () => {
    expect(groupBy([], (n: number) => n).size).toBe(0);
  });

  it("preserves insertion order of keys and members", () => {
    const rows = [
      { team: "b", id: 1 },
      { team: "a", id: 2 },
      { team: "b", id: 3 },
    ];
    const result = groupBy(rows, (r) => r.team);
    expect([...result.keys()]).toEqual(["b", "a"]);
    expect(result.get("b")!.map((r) => r.id)).toEqual([1, 3]);
  });

  it("does not collide numeric and string keys", () => {
    const result = groupBy([1, "1"], (v) => v);
    expect(result.size).toBe(2);
  });
});`,
    },
    {
      kind: "code",
      language: "sql",
      caption: "Sample output — the monthly active users query, with the index note the model attached to it.",
      code: `-- Monthly active users, last 12 complete months
SELECT
  date_trunc('month', e.created_at) AS month,
  count(DISTINCT e.user_id)        AS monthly_active_users
FROM events e
WHERE e.created_at >= date_trunc('month', now()) - interval '12 months'
  AND e.created_at <  date_trunc('month', now())
GROUP BY 1
ORDER BY 1;

-- Note: this scans events by created_at and de-duplicates by user.
-- Add a composite index so it stays cheap as the table grows:
CREATE INDEX CONCURRENTLY IF NOT EXISTS events_user_created_idx
  ON events (user_id, created_at);`,
    },
  ],
  "ai-seo-analyzer": [
    {
      kind: "image",
      url: seoReportUrlAudit,
      caption:
        "Sample output — the URL Analysis report for esimnow.net: score, page information as the crawler sees it, the two issues found, and the technical checks.",
    },
    {
      kind: "image",
      url: seoReportTextAnalysis,
      caption:
        "Sample output — the Text Analysis report: content stats, readability, keyword density and the four edits it recommends first.",
    },
    {
      kind: "image",
      url: seoReportKeywords,
      caption:
        "Sample output — the Keywords report: demand for the head term plus related variants ranked by volume, difficulty and CPC.",
    },
  ],
  "ai-document-analyzer": [
    { inputFileLabel: "service-agreement.pdf — 41 pages" },
    { inputFileLabel: "6 research PDFs — 148 pages total" },
  ],
  "ai-agent-builder": [
    {
      kind: "scene",
      caption: "Sample run — the morning briefing agent working through its steps on schedule.",
      scene: {
        label: "Agent run · 07:00 daily",
        steps: [
          { actor: "Trigger", text: "Schedule fired — daily at 07:00", meta: "0.0s" },
          { actor: "Step 1", text: "Read 34 unread emails, kept 6 that need a reply", meta: "3.1s" },
          { actor: "Step 2", text: "Pulled today's calendar — 4 meetings, one clash at 14:00", meta: "4.8s" },
          { actor: "Step 3", text: "Checked yesterday's sales: 18 orders, £2,140", meta: "6.2s" },
          { actor: "Step 4", text: "Wrote the briefing and posted it to #team-daily", meta: "8.9s" },
        ],
        result: "Delivered to Slack at 07:00:09 — no human involved.",
      },
    },
    {
      kind: "scene",
      caption: "Sample run — the inbox agent drafting a reply the moment a message lands.",
      scene: {
        label: "Agent run · on new email",
        steps: [
          { actor: "Trigger", text: "New email from a customer: \"Can I change my plan?\"", meta: "0.0s" },
          { actor: "Step 1", text: "Looked up the account — Pro plan, renews 3 May", meta: "1.4s" },
          { actor: "Step 2", text: "Matched the billing policy in the knowledge base", meta: "2.6s" },
          { actor: "Step 3", text: "Drafted a reply with the two upgrade options", meta: "4.5s" },
          { actor: "Step 4", text: "Held it for approval and pinged you on Telegram", meta: "4.9s" },
        ],
        result: "One tap to send. The agent never sends money-related replies on its own.",
      },
    },
  ],
  "ai-phone-agent": [
    {
      kind: "scene",
      caption: "Sample call — an inbound booking answered and confirmed without a human.",
      scene: {
        label: "Inbound call · 00:41",
        steps: [
          { actor: "Ring", text: "Incoming call — answered on the second ring", meta: "00:02" },
          { actor: "Agent", text: "Good afternoon, Marlow Dental. How can I help?", meta: "00:04" },
          { actor: "Caller", text: "I'd like to book a check-up, ideally Thursday morning.", meta: "00:09" },
          { actor: "Agent", text: "I have 9:20 or 11:05 on Thursday. Which suits you?", meta: "00:15" },
          { actor: "Caller", text: "Nine twenty, please.", meta: "00:22" },
          { actor: "Agent", text: "Booked for Thursday 9:20. I've texted you the confirmation.", meta: "00:31" },
        ],
        result: "Appointment written to the calendar, SMS sent, call summary saved to the CRM.",
      },
    },
    {
      kind: "scene",
      caption: "Sample call — an outbound follow-up that qualifies the lead and books the demo.",
      scene: {
        label: "Outbound call · 01:12",
        steps: [
          { actor: "Dial", text: "Calling a lead who downloaded the pricing guide", meta: "00:00" },
          { actor: "Agent", text: "Hi Sam — you looked at our pricing yesterday. Is now a bad time?", meta: "00:06" },
          { actor: "Caller", text: "Two minutes is fine.", meta: "00:11" },
          { actor: "Agent", text: "How many people would be using it?", meta: "00:14" },
          { actor: "Caller", text: "About twelve, in support.", meta: "00:19" },
          { actor: "Agent", text: "That's our Team plan. I can put 30 minutes in with Aisha on Tuesday.", meta: "00:34" },
        ],
        result: "Lead scored, demo booked, transcript and next step logged on the deal.",
      },
    },
  ],
  "ai-crm": [
    {
      kind: "scene",
      caption: "Sample session — asking the CRM a question and getting the record updated.",
      scene: {
        label: "CRM assistant",
        steps: [
          { actor: "You", text: "Which deals have gone quiet for more than two weeks?" },
          { actor: "CRM", text: "Five: Northgate £8.4k, Vella £3.2k, Orbit £12k, Farrow £1.9k, Pike £6k" },
          { actor: "You", text: "Move Orbit to Negotiation and set a call for Friday." },
          { actor: "CRM", text: "Orbit moved Proposal → Negotiation. Task created: call Friday 10:00." },
          { actor: "CRM", text: "Pipeline updated — £31.5k now sitting in Negotiation." },
        ],
        result: "Same answers over WhatsApp and Telegram, without opening the dashboard.",
      },
    },
    {
      kind: "scene",
      caption: "Sample session — a month's sales turned into a report you can send.",
      scene: {
        label: "CRM assistant",
        steps: [
          { actor: "You", text: "Summarise March and tell me what changed." },
          { actor: "CRM", text: "Closed £48,200 across 21 deals — up 14% on February." },
          { actor: "CRM", text: "Win rate 31%. Average deal size fell from £2,600 to £2,295." },
          { actor: "CRM", text: "Referrals converted best (46%); paid search worst (12%)." },
          { actor: "You", text: "Turn that into slides for Monday." },
          { actor: "CRM", text: "Six-slide deck built from live CRM data — ready to download." },
        ],
        result: "No exports, no spreadsheets — the assistant reads the records directly.",
      },
    },
  ],
  "ai-social-media-agent": [
    {
      kind: "scene",
      caption: "Sample run — a month of posts planned, written and scheduled on its own.",
      scene: {
        label: "Monthly plan · 4 accounts",
        steps: [
          { actor: "Brief", text: "Sustainable skincare brand, 3 posts a week, warm and plain-spoken" },
          { actor: "Plan", text: "12 posts mapped across the month — 4 education, 4 product, 4 community" },
          { actor: "Write", text: "Captions, hashtags and image directions drafted for each" },
          { actor: "Schedule", text: "Instagram Tue 18:40, TikTok Thu 20:10, LinkedIn Wed 08:15" },
          { actor: "Learn", text: "Week 2: reels beat carousels 3:1 — the plan shifts to more reels" },
        ],
        result: "Calendar filled for the month; you approve or edit anything before it goes out.",
      },
    },
    {
      kind: "scene",
      caption: "Sample run — the agent reacting to what performed and changing the plan.",
      scene: {
        label: "Weekly review",
        steps: [
          { actor: "Read", text: "Last week: 41.2k views, 2,180 engagements, 96 profile taps" },
          { actor: "Spot", text: "Behind-the-scenes clips out-performed product shots by 240%" },
          { actor: "Spot", text: "Posts after 20:00 got half the reach of the 18:30 slot" },
          { actor: "Adjust", text: "Next week: 4 behind-the-scenes, all posts moved to 18:30" },
          { actor: "Queue", text: "7 posts written and queued, waiting on your approval" },
        ],
        result: "The strategy changes with the numbers, week after week.",
      },
    },
  ],
  "ai-blogger-agent": [
    {
      kind: "scene",
      caption: "Sample run — a month of researched posts published straight to WordPress.",
      scene: {
        label: "Bulk run · 12 posts",
        steps: [
          { actor: "Input", text: "Topic: home EV charging. 12 posts, one every Tuesday." },
          { actor: "Research", text: "Pulled 38 live sources; picked 12 keywords with real demand" },
          { actor: "Outline", text: "Each post mapped to one search intent, no overlap between them" },
          { actor: "Write", text: "Drafted 12 articles, 1,400–1,900 words, internal links between them" },
          { actor: "Publish", text: "Post 1 live now, posts 2–12 scheduled weekly to WordPress" },
        ],
        result: "Titles, meta descriptions, headings and image alt text handled automatically.",
      },
    },
    {
      kind: "scene",
      caption: "Sample run — one scheduled post going live overnight.",
      scene: {
        label: "Scheduled post · 06:00",
        steps: [
          { actor: "Pick", text: "Next in queue: \"How much does it cost to charge an EV at home?\"" },
          { actor: "Check", text: "Refreshed the tariff figures against current sources" },
          { actor: "Write", text: "1,620 words, comparison table, 6 FAQs, 3 internal links" },
          { actor: "SEO", text: "Title 54 chars, meta 148 chars, one H1, keyword in two H2s" },
          { actor: "Publish", text: "Live on the blog at 06:00 with a featured image" },
        ],
        result: "You wake up to a finished post, not a draft to fix.",
      },
    },
  ],
};



/** @deprecated use `toolDemoMedia` */
export const toolDemoVideos = toolDemoMedia;
