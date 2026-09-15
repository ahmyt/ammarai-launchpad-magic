/**
 * AmmarAI tutorials verified against both the public AmmarAI tool catalogue and
 * a corresponding end-user reference guide. Administrative and setup material
 * is intentionally excluded.
 */

export type TutorialCategory = "Chat & Documents" | "Image" | "Video" | "Video Marketing";

export interface TutorialCallout {
  type: "tip" | "note" | "warning";
  body: string;
}

export interface TutorialStep {
  title: string;
  body: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  };
}

export interface TutorialSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: TutorialStep[];
  table?: { head: string[]; rows: string[][] };
  callouts?: TutorialCallout[];
}

export interface Tutorial {
  slug: string;
  category: TutorialCategory;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  whenToUse?: string[];
  sections: TutorialSection[];
  relatedTools: string[];
  relatedTutorials: string[];
  cta: { toolName: string; toolSlug: string };
}

export const tutorialCategories: TutorialCategory[] = ["Chat & Documents", "Image", "Video", "Video Marketing"];

export const tutorials: Tutorial[] = [
  {
    slug: "how-to-use-ai-chat-pro",
    category: "Chat & Documents",
    title: "How to Use AI Chat Pro | AmmarAI Tutorials",
    description:
      "Use AmmarAI AI Chat Pro with model selection, skills, file uploads and web search for focused, well-grounded conversations.",
    h1: "How to use AI Chat Pro",
    intro: [
      "AI Chat Pro is AmmarAI’s conversational workspace for research, planning, analysis and drafting. You can choose the model that fits the task, add a reusable skill, attach source material and bring current web information into one thread.",
      "This guide covers only the Chat Pro controls available to AmmarAI users. Platform administration, extension installation, guest limits and system configuration are deliberately excluded.",
    ],
    whenToUse: [
      "You expect to refine an answer through several follow-up messages.",
      "Your answer needs to use a document, image or other uploaded source.",
      "You want a saved skill or current web results to guide the response.",
    ],
    sections: [
      {
        heading: "Start a focused conversation",
        steps: [
          {
            title: "Open AI Chat Pro",
            body: "Open AI Chat Pro from the AmmarAI workspace and begin a new thread. Use a separate thread when the subject or project changes so unrelated context does not affect the answer.",
          },
          {
            title: "Choose the model",
            body: "Open the model selector and choose an available model for the job. Keep the default for general work, or switch when you need a different balance of speed, reasoning or writing style.",
          },
          {
            title: "Add the tools the message needs",
            body: "Open the add menu in the message area. Select a saved skill, upload source material, turn on web search, add brand context or choose another available chat tool. Active tools remain visible with the message and can be removed before sending.",
          },
          {
            title: "Write and send the request",
            body: "State the goal, the important constraints and the format you want back. If you attached a source, tell the assistant to base its answer on that material rather than general knowledge.",
          },
          {
            title: "Refine in the same thread",
            body: "Ask follow-up questions, correct assumptions or request a different format. Keep the conversation together while it is serving the same goal so Chat Pro can use the earlier context.",
          },
        ],
      },
      {
        heading: "Use a reusable skill",
        paragraphs: [
          "Skills package repeatable instructions for jobs you perform often. Open the skills list from the chat input, select the skill you need and confirm that its name appears with the active message tools before sending.",
        ],
        bullets: [
          "Choose a skill manually when you need a specific workflow or output format.",
          "Use one focused skill rather than combining overlapping instructions.",
          "Review the active skill before sending confidential or high-stakes work.",
        ],
      },
      {
        heading: "Work with files and current information",
        table: {
          head: ["Need", "Chat Pro action"],
          rows: [
            ["Answer from your material", "Upload the relevant file and name it in the request."],
            ["Current public information", "Enable web search and ask for links to the sources used."],
            ["Consistent brand language", "Add the saved brand context before sending the message."],
            ["A reusable procedure", "Select the relevant skill from the message tools."],
          ],
        },
        callouts: [
          {
            type: "note",
            body: "Available models and chat tools can vary by plan. If an option is not shown in your workspace, continue with the controls that are available to your account.",
          },
        ],
      },
      {
        heading: "Practical example",
        paragraphs: [
          "To review a campaign brief, start a new thread, choose the model you normally use for analysis, upload the brief and select your brand skill. Ask for the audience, offer, required deliverables and unanswered questions in a table. Follow with a request for three campaign angles that stay within the uploaded brief.",
        ],
      },
      {
        heading: "Limits and good practice",
        bullets: [
          "A fluent answer can still be wrong. Verify important facts, figures and claims.",
          "Start a new thread when the task changes substantially.",
          "Attach the source instead of describing a complex document from memory.",
          "Do not upload material you are not authorised to process.",
        ],
      },
    ],
    relatedTools: ["ai-chat", "ai-personas", "ai-deep-research"],
    relatedTutorials: ["how-to-chat-with-documents"],
    cta: { toolName: "AI Chat Pro", toolSlug: "ai-chat" },
  },
  {
    slug: "how-to-chat-with-documents",
    category: "Chat & Documents",
    title: "How to Chat With Documents | AmmarAI Tutorials",
    description:
      "Upload a document to AmmarAI, attach it to a chat, ask a focused question and continue with grounded follow-up questions.",
    h1: "How to chat with documents in AmmarAI",
    intro: [
      "Document Chat lets you add a document to a conversation and ask questions about its content, structure and context. It is useful for obtaining a summary, locating a detail or exploring a long file without losing the source conversation.",
      "The sequence below follows the complete end-user upload and chat workflow. The screenshots are the original instructional images supplied by the reference documentation and are shown without cropping or alteration.",
    ],
    whenToUse: [
      "You need a quick overview of a long report or PDF.",
      "You want to locate clauses, dates, figures or decisions in a file.",
      "You want to ask follow-up questions while keeping the document attached to the conversation.",
    ],
    sections: [
      {
        heading: "Upload and question a document",
        steps: [
          {
            title: "Open the file control",
            body: "Open AI Chat Pro and select the add control beside the message field. This opens the file and content picker for the conversation.",
            image: {
              src: "/media/tutorials/document-chat-1.png",
              alt: "Chat input with the add-file control indicated beside the message field",
              caption: "Open the add-file control from the chat input.",
              width: 1810,
              height: 856,
            },
          },
          {
            title: "Upload the document",
            body: "Choose Upload Files, then drag the document into the upload area or select Browse Files. Wait until processing finishes before continuing.",
            image: {
              src: "/media/tutorials/document-chat-2.png",
              alt: "Content Manager upload window processing a selected document",
              caption: "Add the document and wait for processing to finish.",
              width: 1884,
              height: 872,
            },
          },
          {
            title: "Select the processed file",
            body: "Open the file list and select the document you uploaded. The selected file is then available to attach to the current conversation.",
            image: {
              src: "/media/tutorials/document-chat-3.png",
              alt: "Content Manager showing a processed PDF ready to select",
              caption: "Select the processed document from the file list.",
              width: 1898,
              height: 951,
            },
          },
          {
            title: "Ask the first question",
            body: "Confirm that the file appears with the message, write a clear question about its contents and send the message. A broad opening question can confirm that the correct document was attached.",
            image: {
              src: "/media/tutorials/document-chat-4.png",
              alt: "Chat input with an attached PDF, a document question and the send control",
              caption: "Attach the file, enter the question and send it together.",
              width: 1894,
              height: 858,
            },
          },
          {
            title: "Review the answer and continue",
            body: "Read the answer against the source, then continue in the same thread with narrower questions. Ask for the relevant passage or location when you need to verify an important detail.",
            image: {
              src: "/media/tutorials/document-chat-5.png",
              alt: "Document Chat conversation showing an answer based on an attached PDF",
              caption: "Review the document-grounded answer and ask follow-up questions.",
              width: 1798,
              height: 853,
            },
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Begin with a broad summary, then ask one precise question at a time. This makes it easier to compare each answer with the document.",
          },
        ],
      },
      {
        heading: "Questions to try",
        bullets: [
          "Summarise the document in ten points for a reader new to the subject.",
          "List every date and deadline, with the section where each appears.",
          "Extract the fees and payment terms into a table.",
          "Quote the passage that supports this answer.",
        ],
      },
      {
        heading: "What to expect",
        table: {
          head: ["Action", "Expected result"],
          rows: [
            ["Upload and process", "The document becomes selectable in the file picker."],
            ["Attach and send", "The question and document enter the same conversation."],
            ["Ask a follow-up", "The answer continues to use the attached document as context."],
            ["Request evidence", "The response identifies or quotes the relevant source passage when available."],
          ],
        },
      },
      {
        heading: "Limits and good practice",
        bullets: [
          "Check consequential answers against the original document before acting on them.",
          "Scanned pages, handwriting and complex layouts may be read less reliably.",
          "Split very large files when you need close analysis of a particular section.",
          "Do not upload confidential documents unless you are authorised to process them.",
        ],
        callouts: [
          {
            type: "warning",
            body: "Document Chat is a reading and analysis aid. It does not replace professional legal, medical or financial advice.",
          },
        ],
      },
    ],
    relatedTools: ["ai-document-analyzer", "ai-chat"],
    relatedTutorials: ["how-to-use-ai-chat-pro"],
    cta: { toolName: "AI Document Analyzer", toolSlug: "ai-document-analyzer" },
  },
  {
    slug: "how-to-use-ai-image-pro",
    category: "Image",
    title: "How to Use AI Image Pro | AmmarAI Tutorials",
    description: "Create images in AmmarAI AI Image Pro by setting a prompt, variations, style, ratio and model, then reviewing the results.",
    h1: "How to use AI Image Pro",
    intro: [
      "AI Image Pro turns a written idea into finished visual options. Its generator lets you control the number of results, visual style, aspect ratio and available image model before you create.",
      "This guide follows the regular-user workflow in the reference documentation. Administrator controls, guest limits, display settings and platform configuration are excluded.",
    ],
    whenToUse: [
      "You need original campaign, article or social imagery from a written brief.",
      "You want several visual interpretations to compare before choosing a direction.",
      "You need an image framed for a specific publishing format.",
    ],
    sections: [
      {
        heading: "Create an image",
        steps: [
          {
            title: "Open the generator and describe the image",
            body: "Open AI Image Pro and enter a clear description of the visual you want. Include the subject, setting, composition and lighting that matter to the result.",
            image: { src: "/media/tutorials/tutorial-image-pro-1.png", alt: "AmmarAI AI Image Pro prompt area for describing a new image", caption: "Start with a specific description of the image you want to create.", width: 1024, height: 450 },
          },
          {
            title: "Choose the number of variations",
            body: "Choose how many versions to create. Generate one result for a focused request or several variations when you want to compare interpretations of the same prompt.",
            image: { src: "/media/tutorials/tutorial-image-pro-2.png", alt: "AI Image Pro control for choosing the number of image variations", caption: "Select the number of variations before generating.", width: 1024, height: 459 },
          },
          {
            title: "Select a visual style",
            body: "Open the style picker and select the preset that best matches the intended look. The visual presets make it easier to compare directions without adding a long style description.",
            image: { src: "/media/tutorials/tutorial-image-pro-3.png", alt: "AI Image Pro visual style preset gallery", caption: "Choose a preset that matches the visual direction you need.", width: 1024, height: 525 },
          },
          {
            title: "Choose the aspect ratio",
            body: "Select the shape that matches the destination, such as square, portrait or landscape. Setting the ratio before generation helps preserve the intended composition.",
            image: { src: "/media/tutorials/tutorial-image-pro-5.png", alt: "AI Image Pro aspect-ratio menu beside the prompt", caption: "Match the image shape to where it will be published.", width: 1024, height: 458 },
          },
          {
            title: "Choose an available model",
            body: "Open the model selector and choose an available image model. Model availability can vary, so use the options shown in your AmmarAI workspace.",
            image: { src: "/media/tutorials/tutorial-image-pro-6.png", alt: "AI Image Pro model selection menu", caption: "Select the available model for this generation.", width: 1024, height: 450 },
          },
          {
            title: "Generate and review the results",
            body: "Start the generation, then review the returned images. Compare subject accuracy, composition, edges and small details before choosing a result.",
            image: { src: "/media/tutorials/tutorial-image-pro-8.png", alt: "AI Image Pro generated image results below the prompt area", caption: "Review the generated options and select the strongest result.", width: 1024, height: 490 },
          },
        ],
      },
      {
        heading: "Use the image library",
        steps: [
          {
            title: "Browse generated and available images",
            body: "Open the image picker and use its sections to find the visual you need. Select an image after checking that it fits the subject, format and publishing context.",
            image: { src: "/media/tutorials/tutorial-image-pro-9.png", alt: "AI Image Pro image library with generated visual thumbnails", caption: "Browse the image library and select a suitable visual.", width: 1024, height: 493 },
          },
        ],
      },
      {
        heading: "Controls at a glance",
        table: {
          head: ["Control", "What it changes"],
          rows: [
            ["Number of images", "How many visual variations are returned."],
            ["Style preset", "The broad visual treatment applied to the prompt."],
            ["Aspect ratio", "The shape and framing of the generated image."],
            ["Model", "The available image engine used for generation."],
          ],
        },
      },
      {
        heading: "Limits and good practice",
        bullets: [
          "Review faces, hands, lettering, logos and small details before publishing.",
          "Use a clear composition and intended format instead of disconnected keywords.",
          "Do not request protected characters, brand assets or a real person’s likeness without permission.",
          "Available styles, models and output limits can vary by account.",
        ],
      },
    ],
    relatedTools: ["ai-image-generator", "ai-vision", "ai-image-to-video"],
    relatedTutorials: ["how-to-use-ai-video-pro"],
    cta: { toolName: "AI Image Pro", toolSlug: "ai-image-generator" },
  },
  {
    slug: "how-to-use-ai-video-pro",
    category: "Video",
    title: "How to Use AI Video Pro | AmmarAI Tutorials",
    description: "Generate a video in AmmarAI AI Video Pro by choosing a model, entering a prompt or image, adjusting settings and creating the result.",
    h1: "How to use AI Video Pro",
    intro: [
      "AI Video Pro creates short videos from a written prompt or a source image. Available controls let you choose the generation approach and set options such as duration, resolution or style when the selected model supports them.",
      "This guide includes only the end-user creation workflow. Provider keys, integrations and administrator configuration are excluded.",
    ],
    whenToUse: [
      "You want to turn a written scene description into a short video clip.",
      "You want to add motion to a still image.",
      "You need visual material for a product demo, short story or social post.",
    ],
    sections: [
      {
        heading: "Generate a video",
        steps: [
          {
            title: "Open AI Video Pro and choose an action",
            body: "Open AI Video Pro, then choose the action that matches your source. Use text-to-video for a written scene or image-to-video when you have a still image to animate.",
            image: { src: "/media/tutorials/tutorial-video-pro-1.png", alt: "AmmarAI AI Video Pro with action, prompt and generate controls", caption: "Choose the video action, provide the source and generate the clip.", width: 1024, height: 401 },
          },
          { title: "Choose an available model", body: "Select a video model from the options shown in your workspace. Models can support different source types and controls, so confirm the selected action before continuing." },
          { title: "Enter a prompt or upload an image", body: "For text-to-video, describe the subject, action, setting, camera movement and lighting. For image-to-video, upload the source image and describe the motion you want." },
          { title: "Adjust the available settings", body: "Set the resolution, duration and style controls offered by the selected model. Keep the first test short so you can refine the direction before creating a longer result." },
          { title: "Generate and review the video", body: "Start the generation and wait for the video to finish. Review motion, subject consistency, framing and unwanted visual changes before downloading or using the clip." },
        ],
      },
      {
        heading: "Write a stronger video prompt",
        table: {
          head: ["Prompt detail", "Example"],
          rows: [
            ["Subject", "A ceramic coffee cup on a wooden counter"],
            ["Action", "Steam curls upward as morning light moves across the surface"],
            ["Camera", "Slow push-in from a medium shot"],
            ["Look", "Natural light, realistic texture, warm editorial color"],
          ],
        },
      },
      {
        heading: "Choose the right starting point",
        bullets: [
          "Use text-to-video when the scene does not need to preserve an exact existing subject.",
          "Use image-to-video when the starting composition, product or character already matters.",
          "Keep motion instructions simple and physically plausible for the cleanest first result.",
        ],
      },
      {
        heading: "Limits and good practice",
        bullets: [
          "Generated motion can change faces, hands, products, text and fine details between frames.",
          "Review every clip before publishing, especially when it represents a real product or person.",
          "Model choices and their supported settings can vary by plan and availability.",
          "Use only source images and likenesses you are authorised to process.",
        ],
      },
    ],
    relatedTools: ["ai-video-generator", "ai-image-to-video", "ai-image-generator"],
    relatedTutorials: ["how-to-use-ai-image-pro"],
    cta: { toolName: "AI Video Pro", toolSlug: "ai-video-generator" },
  },
  {
    slug: "how-to-create-viral-clips",
    category: "Video Marketing",
    title: "How to Create Viral Clips | AmmarAI Tutorials",
    description: "Turn a long video or video URL into short, shareable social clips with AmmarAI’s AI URL to Video tool.",
    h1: "How to create viral clips from a long video",
    intro: [
      "Viral Clips turns long-form footage into shorter moments for social publishing. Use it to repurpose webinars, interviews, podcasts and other extended videos into focused clips.",
      "This guide follows the complete regular-user reference workflow. Provider integration, API keys, default-engine selection and administrator settings are excluded.",
    ],
    whenToUse: [
      "You want to repurpose a webinar, podcast or interview for social channels.",
      "You need short highlights from an existing long-form video.",
      "You have either a public video URL or a video file to upload.",
    ],
    sections: [
      {
        heading: "Generate clips from a long video",
        steps: [
          {
            title: "Start a new viral-clips project",
            body: "Open AI URL to Video & Influencer, choose the viral-clips option and select Generate New.",
            image: { src: "/media/tutorials/tutorial-viral-clips-1.png", alt: "AmmarAI video workspace with the viral-clips option and Generate New action indicated", caption: "Choose the viral-clips workflow and start a new project.", width: 1819, height: 737 },
          },
          {
            title: "Enter the video URL and details",
            body: "Paste the source video URL, complete the required fields and select Next to continue.",
            image: { src: "/media/tutorials/tutorial-viral-clips-2.png", alt: "Viral Clips form for a source video URL and clip preferences", caption: "Add the source URL, complete the required options and continue.", width: 1537, height: 919 },
          },
          {
            title: "Upload the video instead",
            body: "If you do not want to use a URL, switch to the upload option and add the source video file manually, then complete the same clip settings.",
            image: { src: "/media/tutorials/tutorial-viral-clips-3.png", alt: "Viral Clips form showing the manual video upload option", caption: "Upload a source file when a video URL is not available.", width: 1402, height: 917 },
          },
        ],
      },
      {
        heading: "Before you generate",
        bullets: [
          "Use a clear source with intelligible speech and a stable picture.",
          "Choose a target language and clip duration suited to the destination.",
          "Review each extracted moment before publishing it out of its original context.",
        ],
      },
    ],
    relatedTools: ["ai-url-to-video", "ai-video-editor", "ai-captions"],
    relatedTutorials: ["how-to-create-ai-influencer-videos", "how-to-use-ai-video-pro"],
    cta: { toolName: "AI URL to Video", toolSlug: "ai-url-to-video" },
  },
  {
    slug: "how-to-create-ai-influencer-videos",
    category: "Video Marketing",
    title: "How to Create AI Influencer Videos | AmmarAI Tutorials",
    description: "Create product-powered ads and presenter-led influencer videos with AmmarAI’s AI URL to Video & Influencer tool.",
    h1: "How to create AI influencer videos",
    intro: [
      "AI URL to Video & Influencer creates product-led ads from a product link or uploaded assets and presenter-led videos from a script. The workflow combines product details, format choices, a presenter, a voice and captions before rendering.",
      "This guide preserves the regular-user creation sequences from the reference documentation. Provider keys, engine selection and administrator configuration are excluded.",
    ],
    whenToUse: [
      "You want a short product ad for Reels, TikTok or YouTube Shorts.",
      "You have a product page or product images to use as the source.",
      "You want a presenter-style video from your own script.",
    ],
    sections: [
      {
        heading: "Create a product-powered ad video",
        steps: [
          {
            title: "Start a product ad",
            body: "Open AI URL to Video & Influencer and select Generate New under the product-ad option.",
            image: { src: "/media/tutorials/tutorial-influencer-1.png", alt: "AmmarAI influencer-video workspace with the product-ad Generate New action indicated", caption: "Choose the product-powered ad workflow.", width: 1398, height: 728 },
          },
          {
            title: "Add the product information",
            body: "Choose whether to supply a product link or upload product images, then add the product source and continue.",
            image: { src: "/media/tutorials/tutorial-influencer-2.png", alt: "Product information step with product-link and uploaded-asset options", caption: "Provide a product link or upload product assets.", width: 1640, height: 838 },
          },
          {
            title: "Choose the video details",
            body: "Set the language, duration and aspect ratio for the destination, then select Next.",
            image: { src: "/media/tutorials/tutorial-influencer-3.png", alt: "Video details step with language, duration and aspect-ratio controls", caption: "Set the language, length and format of the ad.", width: 1588, height: 736 },
          },
          {
            title: "Choose a presenter",
            body: "Browse the available presenters, select the one that fits the video and continue to the voice step.",
            image: { src: "/media/tutorials/tutorial-influencer-4.png", alt: "Composition step showing a gallery of presenter choices", caption: "Select the presenter for the video.", width: 1589, height: 828 },
          },
          {
            title: "Select the voice",
            body: "Preview the available voices and select the voice you want to use for the presenter.",
            image: { src: "/media/tutorials/tutorial-influencer-5.png", alt: "Composition step showing voice preview and selection controls", caption: "Preview and select the presenter voice.", width: 1598, height: 839 },
          },
          {
            title: "Choose the caption style and preview",
            body: "Select a caption treatment, then choose Preview Video to create preview options.",
            image: { src: "/media/tutorials/tutorial-influencer-6.png", alt: "Composition step showing caption styles and the preview-video action", caption: "Pick a caption style and generate previews.", width: 1591, height: 854 },
          },
          {
            title: "Wait for rendering",
            body: "The selected composition begins rendering. Keep the page open while the preview is prepared.",
            image: { src: "/media/tutorials/tutorial-influencer-7.png", alt: "Preview-video step showing the rendering state", caption: "Wait while AmmarAI prepares the video previews.", width: 1569, height: 729 },
          },
          {
            title: "Choose the finished preview",
            body: "Review the generated preview videos, select the strongest version and continue with the chosen result.",
            image: { src: "/media/tutorials/tutorial-influencer-8.png", alt: "Preview-video step showing three rendered product-ad options", caption: "Compare the generated previews and choose a result.", width: 1541, height: 709 },
          },
        ],
      },
      {
        heading: "Create a presenter video from a script",
        steps: [
          {
            title: "Start an influencer-style video",
            body: "Return to the AI URL to Video & Influencer workspace and select Generate New under the influencer-video option.",
            image: { src: "/media/tutorials/tutorial-influencer-avatar-1.png", alt: "AmmarAI influencer-video workspace with the presenter-video Generate New action indicated", caption: "Choose the presenter-led influencer-video workflow.", width: 1880, height: 740 },
          },
          {
            title: "Choose the presenter and enter the script",
            body: "Select a presenter, enter the script the presenter should deliver and select Generate Video to start creation.",
            image: { src: "/media/tutorials/tutorial-influencer-avatar-2.png", alt: "AI influencer presenter gallery with script field and Generate Video action", caption: "Select a presenter, add the script and generate the video.", width: 1798, height: 813 },
          },
        ],
      },
      {
        heading: "Review before publishing",
        bullets: [
          "Confirm that product claims match the source page and your approved messaging.",
          "Check the presenter, voice, captions and aspect ratio in the final render.",
          "Use only product assets, scripts and likenesses you are authorised to process.",
        ],
      },
    ],
    relatedTools: ["ai-url-to-video", "ai-avatar-generator", "ai-captions"],
    relatedTutorials: ["how-to-create-viral-clips", "how-to-use-ai-video-pro"],
    cta: { toolName: "AI URL to Video & Influencer", toolSlug: "ai-url-to-video" },
  },
];

export const tutorialBySlug = new Map(tutorials.map((tutorial) => [tutorial.slug, tutorial]));

export function getTutorial(slug: string): Tutorial | undefined {
  return tutorialBySlug.get(slug);
}

export const tutorialByTool = new Map<string, Tutorial>();
for (const tutorial of tutorials) {
  tutorialByTool.set(tutorial.cta.toolSlug, tutorial);
}

export function tutorialsByCategory(category: TutorialCategory): Tutorial[] {
  return tutorials.filter((tutorial) => tutorial.category === category);
}

export function searchTutorials(query: string): Tutorial[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];
  const words = normalizedQuery.split(/\s+/).filter(Boolean);
  return tutorials
    .map((tutorial) => {
      const sectionText = tutorial.sections
        .flatMap((section) => [
          section.heading,
          ...(section.paragraphs ?? []),
          ...(section.bullets ?? []),
          ...(section.steps ?? []).flatMap((step) => [step.title, step.body]),
        ])
        .join(" ");
      const haystack = `${tutorial.h1} ${tutorial.title} ${tutorial.description} ${tutorial.category} ${tutorial.intro.join(" ")} ${sectionText}`.toLowerCase();
      let score = haystack.includes(normalizedQuery) ? 10 : 0;
      for (const word of words) if (word.length > 2 && haystack.includes(word)) score += 2;
      return { tutorial, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ tutorial }) => tutorial);
}

export function adjacentTutorials(slug: string): {
  prev?: Tutorial | undefined;
  next?: Tutorial | undefined;
} {
  const index = tutorials.findIndex((tutorial) => tutorial.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? tutorials[index - 1] : undefined,
    next: index < tutorials.length - 1 ? tutorials[index + 1] : undefined,
  };
}
