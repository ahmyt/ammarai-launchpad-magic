/**
 * AmmarAI tutorials verified against both the public AmmarAI tool catalogue and
 * a corresponding end-user reference guide. Administrative and setup material
 * is intentionally excluded.
 */

export type TutorialCategory = "Chat & Documents" | "Automation" | "Image" | "Video" | "Video Marketing" | "Fashion" | "Audio" | "Productivity";

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

export const tutorialCategories: TutorialCategory[] = ["Chat & Documents", "Automation", "Image", "Video", "Video Marketing", "Fashion", "Audio"];

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
      "This guide follows the complete regular-user workflow for starting a project, supplying the source video and choosing the clip settings.",
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
      "This guide covers both regular-user creation paths: a product-powered ad and a presenter-led video made from a script.",
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
  {
    slug: "how-to-use-fashion-studio",
    category: "Fashion",
    title: "How to Use Fashion Studio | AmmarAI Tutorials",
    description:
      "Create AI photoshoots, virtual try-on images, model swaps, edits and fashion videos with AmmarAI’s Fashion Studio workflow.",
    h1: "How to use Fashion Studio",
    intro: [
      "Fashion Studio is AmmarAI’s creative suite for visualising, styling and marketing apparel. Whether you run an e-commerce brand, style digitally or create content, it brings photoshoots, try-on, model swaps, editing and video into one workspace.",
      "Fashion Studio uses the existing credit system. Image actions — model and background generation, photoshoots and edits — draw on your image credits, and video creation draws on your video credits.",
    ],
    whenToUse: [
      "You need editorial product imagery without booking a physical set.",
      "You want to see how a garment looks on a real human figure before shooting it.",
      "You want to animate a static fashion image into a short cinematic clip.",
    ],
    sections: [
      {
        heading: "The Fashion Studio dashboard",
        paragraphs: [
          "The dashboard is your creative headquarters. Built for speed and precision, it gives immediate access to the core generative tools, so you can define your brand aesthetic, animate your designs and preview garments from one screen.",
        ],
        bullets: [
          "Model selection: choose from a diverse library of AI models, filtering by ethnicity, age and body type so your brand representation is inclusive and accurate.",
          "Style customisation: control the look with the style editor, adjusting hair, makeup and lighting environments to match the campaign mood.",
          "Video generation: bring static images to life with cinematic catwalks or 360-degree product showcases for social media and high-impact ads.",
          "Virtual try-on: drag a garment from your wardrobe onto a selected model for an instant, high-fidelity preview of fit and fabric drape.",
        ],
        steps: [
          {
            title: "Open the Fashion Studio dashboard",
            body: "Open Fashion Studio from the side menu to reach the model, style, video and try-on tools.",
            image: { src: "/media/tutorials/tutorial-fashion-1.png", alt: "AmmarAI Fashion Studio dashboard showing the core creative tools", caption: "The Fashion Studio dashboard.", width: 1804, height: 910 },
          },
        ],
      },
      {
        heading: "AI Photoshoot",
        paragraphs: [
          "The AI Photoshoot module creates high-end editorial imagery without the logistics of a physical set. You can combine existing assets, your own products and AI-generated designs in a single scene.",
        ],
        steps: [
          {
            title: "1. Product selection — library products",
            body: "You can feature up to three products in one photoshoot. Select items from the curated catalogue already available in the system.",
            image: { src: "/media/tutorials/tutorial-fashion-2.png", alt: "Photoshoot product selection showing library products", caption: "Choose products from the built-in catalogue.", width: 1795, height: 892 },
          },
          {
            title: "1. Product selection — upload your own",
            body: "Import your own product photos or flat lays to see them modelled in three dimensions.",
            image: { src: "/media/tutorials/tutorial-fashion-3.png", alt: "Photoshoot product selection showing the upload option for your own product photos", caption: "Upload your own product photos or flat lays.", width: 1809, height: 897 },
          },
          {
            title: "1. Product selection — prompt to product",
            body: "If you do not have a physical item yet, describe a garment — for example, “A silk emerald green midi dress with puff sleeves” — and the AI generates it for the shoot.",
            image: { src: "/media/tutorials/tutorial-fashion-4.png", alt: "Photoshoot product selection showing a text prompt used to generate a garment", caption: "Describe a garment and generate it for the shoot.", width: 1817, height: 887 },
          },
          {
            title: "2. Model & style — select a model",
            body: "Once your products are set, choose who will wear them. Pick a specific model from the diverse library to keep brand consistency.",
            image: { src: "/media/tutorials/tutorial-fashion-5.png", alt: "Photoshoot model selection library", caption: "Select a model from the library.", width: 1777, height: 901 },
          },
          {
            title: "2. Model & style — randomised selection",
            body: "If you do not select a model, the system intelligently chooses a random model that best fits the garment style.",
            image: { src: "/media/tutorials/tutorial-fashion-6.png", alt: "Photoshoot model step with no model chosen, using random selection", caption: "Leave the model unset for an automatic match.", width: 1793, height: 902 },
          },
          {
            title: "2. Model & style — style editor",
            body: "Adjust the model’s look with the style controls to match the campaign mood.",
            image: { src: "/media/tutorials/tutorial-fashion-7.png", alt: "Photoshoot style customisation controls", caption: "Refine hair, makeup and lighting for the shoot.", width: 1779, height: 908 },
          },
          {
            title: "3. Posing & composition — manual pose",
            body: "Select from a variety of poses — from high-fashion editorial to casual walking — to highlight specific product details.",
            image: { src: "/media/tutorials/tutorial-fashion-8.png", alt: "Photoshoot pose selection options", caption: "Choose a pose that shows the product best.", width: 1766, height: 911 },
          },
          {
            title: "3. Posing & composition — dynamic posing",
            body: "If no pose is selected, the system defaults to a random pose, giving you a fresh perspective every time.",
            image: { src: "/media/tutorials/tutorial-fashion-9.png", alt: "Photoshoot pose step left unset for dynamic posing", caption: "Leave the pose unset for a new perspective each run.", width: 1817, height: 910 },
          },
          {
            title: "3. Posing & composition — compare results",
            body: "Review how the chosen pose changes the composition before moving on to the background.",
            image: { src: "/media/tutorials/tutorial-fashion-10.png", alt: "Photoshoot composition preview for a selected pose", caption: "Check the composition before continuing.", width: 1803, height: 909 },
          },
          {
            title: "4. Background & environment — custom backgrounds",
            body: "Choose from the environment presets, such as Milan streetwear, luxury minimalist studio or tropical beach.",
            image: { src: "/media/tutorials/tutorial-fashion-11.png", alt: "Photoshoot background presets", caption: "Pick an environment preset for the scene.", width: 1809, height: 908 },
          },
          {
            title: "4. Background & environment — AI environments",
            body: "Leave the background blank to let the system generate a random background that complements the lighting and colours of your chosen products.",
            image: { src: "/media/tutorials/tutorial-fashion-12.png", alt: "Photoshoot background step left blank for an AI-generated environment", caption: "Leave it blank for an automatically matched background.", width: 1828, height: 912 },
          },
          {
            title: "4. Background & environment — review the scene",
            body: "Confirm the final combination of products, model, pose and environment before generating the photoshoot.",
            image: { src: "/media/tutorials/tutorial-fashion-13.png", alt: "Photoshoot scene review before generating", caption: "Review the full scene before you generate.", width: 1823, height: 913 },
          },
        ],
      },
      {
        heading: "Virtual Try-On",
        paragraphs: [
          "Virtual Try-On is a visualisation tool that shows how any garment looks on a real human figure. By pairing a model image with a clothing image, the AI drapes the fabric precisely, accounting for proportion and fit.",
          "The process is a simple three-step pair-and-generate workflow.",
        ],
        steps: [
          {
            title: "Pair the model and garment, then generate",
            body: "Upload a high-resolution photo of a person — for the most accurate results use a ghost mannequin or a model in a neutral pose against a plain background. Upload a clear image of the garment you want to try on; this can be a flat-lay photo, a product packshot or even a cropped image of a specific texture or pattern. Then click Generate, and the AI analyses the model’s proportions and the garment’s dimensions to produce a realistic composite image.",
            image: { src: "/media/tutorials/tutorial-fashion-14.png", alt: "Virtual Try-On screen with model image, clothing image and the Generate action", caption: "Pair a model image with a garment image and generate.", width: 1801, height: 848 },
          },
        ],
      },
      {
        heading: "Change Model",
        paragraphs: [
          "Change Model swaps the person in an existing fashion photograph while keeping the original clothing and setting intact — ideal for refreshing brand aesthetics or diversifying a campaign. You need two images: the source image containing the model you want to replace (the AI detects the garments so they are preserved), and the target image of the new model, whose features, skin tone and body structure are analysed for a seamless fit.",
        ],
        steps: [
          {
            title: "Upload the original, add the new model and process",
            body: "Drop your current campaign or product photo into the source slot, drop the image of the desired model into the replacement slot, then click Change Model. The system transfers the clothing from the original photo onto the new model, maintaining the original lighting, background and garment details.",
            image: { src: "/media/tutorials/tutorial-fashion-15.png", alt: "Change Model screen with source image, replacement model image and the Change Model action", caption: "Swap the model while keeping the clothing and scene.", width: 1808, height: 845 },
          },
        ],
      },
      {
        heading: "Edit Image",
        paragraphs: [
          "Edit Image lets you modify existing visuals with plain language. Instead of starting from scratch, take a generated or uploaded photo and instruct the AI to change specific elements.",
        ],
        steps: [
          {
            title: "Upload, describe the changes and generate",
            body: "Start by uploading the photo you want to modify — a photoshoot result, a product shot or a personal image. In the prompt box, type exactly what you want to change. The AI analyses your request and applies the edits while maintaining the original composition and lighting.",
            image: { src: "/media/tutorials/tutorial-fashion-16.png", alt: "Edit Image screen with an uploaded photo and a prompt box describing the change", caption: "Describe the change and let the AI apply it.", width: 1786, height: 832 },
          },
        ],
      },
      {
        heading: "My Photoshoots",
        paragraphs: [
          "My Photoshoots is your cloud-hosted gallery where every creation is archived, so your creative history stays available.",
        ],
        bullets: [
          "Unified library: all your AI photoshoots, virtual try-on results and edited images are stored in one place.",
          "Video archive: access AI-generated catwalks, 360-degree views and cinematic clips, previewable directly in the dashboard.",
          "High-resolution downloads: every asset is available for high-quality export for social media, e-commerce sites or marketing presentations.",
        ],
        steps: [
          {
            title: "Browse your generated images",
            body: "Open My Photoshoots to see every image you have created in the studio.",
            image: { src: "/media/tutorials/tutorial-fashion-17.png", alt: "My Photoshoots gallery of generated fashion images", caption: "All generated images in one library.", width: 1767, height: 885 },
          },
          {
            title: "Preview a result",
            body: "Select any asset to preview it at full size before downloading.",
            image: { src: "/media/tutorials/tutorial-fashion-18.png", alt: "My Photoshoots preview of a single generated image", caption: "Preview any result in place.", width: 1756, height: 890 },
          },
          {
            title: "Open the video archive",
            body: "Switch to the video results to preview and download generated clips.",
            image: { src: "/media/tutorials/tutorial-fashion-19.png", alt: "My Photoshoots video archive with generated fashion clips", caption: "Generated videos are archived alongside images.", width: 1795, height: 833 },
          },
        ],
      },
      {
        heading: "My Wardrobe",
        paragraphs: [
          "The Wardrobe is your centralised asset library, bridging your real-world inventory and your digital creations so you can organise, preview and reuse products across Fashion Studio. It is organised into three categories.",
        ],
        bullets: [
          "Predefined products: a curated library of high-quality, ready-to-use fashion items, ideal for quick prototyping or testing new looks and backgrounds.",
          "Uploaded images: your personal inventory of product photos, flat lays and reference images, processed and stored so they can instantly be worn by a model.",
          "Created images: your final AI-generated outputs — successful try-ons and editorial photoshoots — stored for easy access and re-download.",
        ],
        steps: [
          {
            title: "Open the predefined products",
            body: "Browse the curated library of ready-to-use fashion items.",
            image: { src: "/media/tutorials/tutorial-fashion-20.png", alt: "My Wardrobe predefined product library", caption: "Ready-to-use items for quick prototyping.", width: 1798, height: 904 },
          },
          {
            title: "Review your uploaded images",
            body: "Find the product photos and reference images you have uploaded, ready to be worn by a model.",
            image: { src: "/media/tutorials/tutorial-fashion-21.png", alt: "My Wardrobe uploaded product images", caption: "Your own uploaded product inventory.", width: 1789, height: 883 },
          },
          {
            title: "Reuse your created images",
            body: "Open the created images section to access and re-download your best generated results.",
            image: { src: "/media/tutorials/tutorial-fashion-22.png", alt: "My Wardrobe created images from previous generations", caption: "Reuse your strongest generated results.", width: 1811, height: 830 },
          },
        ],
      },
      {
        heading: "AI video generation",
        paragraphs: [
          "Video generation brings fashion photography to life. Combine a static image with a descriptive prompt to turn a still portrait into a cinematic video, such as a model walking.",
        ],
        steps: [
          {
            title: "Upload a base image, enter a motion prompt and generate",
            body: "Choose a high-quality photo from your device or select a previously generated image from My Photoshoots; this is the starting frame and visual anchor for your video. In the video prompt field, describe the movement or action you want — for example, “Model walking towards the camera on a windy city street, hair blowing naturally,” or “A 360-degree slow-motion pan around the model to showcase the dress texture.” Then click Generate Video, and the AI analyses the garment’s physics and the background to create a seamless, high-definition clip.",
            image: { src: "/media/tutorials/tutorial-fashion-23.png", alt: "Fashion video generation screen with a base image, motion prompt field and Generate Video action", caption: "Animate a still image with a motion prompt.", width: 1830, height: 843 },
          },
        ],
      },
      {
        heading: "Photoshoot settings",
        paragraphs: [
          "The photoshoot settings panel gives you control over the technical output. Before you generate, use these settings so the images meet the requirements of your channel.",
        ],
        bullets: [
          "Number of images: choose how many variations to generate in one batch (for example 1, 2 or 4). Multiple variations let you compare lighting and pose nuances to find the best result.",
          "Resolution: standard is best for quick previews and social media drafts; high definition is ideal for website assets and professional lookbooks.",
          "Aspect ratio: portrait (2:3 / 9:16) for Stories, TikTok and mobile shopping apps; square (1:1) for social feeds and e-commerce thumbnails; landscape (16:9 / 3:2) for website hero banners and cinematic presentations.",
        ],
        steps: [
          {
            title: "Set the output options",
            body: "Open the settings panel and set the number of images, resolution and aspect ratio before generating.",
            image: { src: "/media/tutorials/tutorial-fashion-24.png", alt: "Photoshoot settings panel with image count, resolution and aspect ratio controls", caption: "Match the output to your destination channel.", width: 1733, height: 833 },
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Use only garments, product photography and likenesses you are authorised to process.",
          },
        ],
      },
    ],
    relatedTools: ["ai-photoshoot", "ai-virtual-try-on", "ai-image-generator"],
    relatedTutorials: ["how-to-use-ai-image-pro", "how-to-use-ai-video-pro"],
    cta: { toolName: "AI Photoshoot", toolSlug: "ai-photoshoot" },
  },
  {
    slug: "how-to-dub-a-video",
    category: "Video",
    title: "How to Dub a Video | AmmarAI Tutorials",
    description:
      "Translate and re-voice an existing video into another language with AmmarAI AI Dubbing, from source selection to download.",
    h1: "How to dub a video into another language",
    intro: [
      "AI Dubbing translates and re-voices existing videos into other languages automatically. You supply a video by URL or direct upload, choose a target language and speaker configuration, and AmmarAI produces a dubbed version you can preview and download.",
      "This guide follows the regular-user workflow only.",
    ],
    whenToUse: [
      "You want to reach an audience in another language with existing footage.",
      "You have a public video URL or a video file on your device.",
      "You need a dubbed version you can preview and download.",
    ],
    sections: [
      {
        heading: "Getting started",
        paragraphs: [
          "Open AI Dubbing from the side menu. The page shows the dubbing configuration panel and your previously dubbed videos. Monthly usage is tracked and displayed at the top of the page.",
        ],
        steps: [
          {
            title: "Open AI Dubbing",
            body: "Navigate to AI Dubbing from the side menu to reach the configuration panel and your dubbing history.",
            image: { src: "/media/tutorials/tutorial-dubbing-1.png", alt: "AmmarAI AI Dubbing page with the configuration panel and previously dubbed videos", caption: "The AI Dubbing workspace.", width: 1782, height: 908 },
          },
        ],
      },
      {
        heading: "How to dub a video",
        steps: [
          {
            title: "Choose the source type",
            body: "Pick one of the three source tabs: a YouTube video URL, a TikTok video URL, or Upload to add a video file directly from your device.",
            image: { src: "/media/tutorials/tutorial-dubbing-2.png", alt: "AI Dubbing source tabs for YouTube, TikTok and direct upload", caption: "Choose how the source video is supplied.", width: 1784, height: 855 },
          },
          {
            title: "Choose the target language",
            body: "Select the language to dub the video into from the Target Language dropdown. Available languages depend on the dubbing engine active on your workspace, ranging from a core set of widely used languages to an extended list with regional variants.",
            image: { src: "/media/tutorials/tutorial-dubbing-3.png", alt: "AI Dubbing target language dropdown", caption: "Pick the language for the dubbed version.", width: 1751, height: 843 },
          },
          {
            title: "Set the number of speakers",
            body: "Use the Number of Speakers field. Choose Auto Detect so the system identifies speakers automatically, or set a value manually between 1 and 10. This preserves voice dynamics in multi-speaker content.",
            image: { src: "/media/tutorials/tutorial-dubbing-4.png", alt: "AI Dubbing number of speakers field with auto detect and manual values", caption: "Auto-detect speakers or set the count yourself.", width: 1561, height: 805 },
          },
          {
            title: "Expand the advanced options",
            body: "Open Advanced Options for extra control. The options shown depend on the active dubbing engine and can include: Source Language — set the original language manually or leave it on Auto; Resolution — a highest-resolution toggle or a quality/fast mode; Background Audio — keep or drop the original music and ambient sound; Profanity Filter — on or off to filter spoken profanity in the dubbed output; Audio-only Translation — translate the audio without processing the video; and Lip-sync — align dubbed speech to the speaker’s mouth movements.",
            image: { src: "/media/tutorials/tutorial-dubbing-5.png", alt: "AI Dubbing advanced options panel", caption: "Advanced controls for language, resolution, audio and lip-sync.", width: 1466, height: 764 },
          },
          {
            title: "Title the video and generate",
            body: "Enter a title in the Title field to identify the dubbed video, then click Generate. The dubbed video is processed and added to the created-previously section below, where you can preview and download it.",
          },
        ],
      },
      {
        heading: "Previously dubbed videos",
        paragraphs: [
          "All previously dubbed videos are listed below the generation panel with a thumbnail, duration and target-language label — for example “Dubbed to Turkish” or “Dubbed to Hindi”. Click any video to preview or download it.",
        ],
      },
    ],
    relatedTools: ["ai-dubbing", "ai-captions", "ai-video-editor"],
    relatedTutorials: ["how-to-create-ugc-videos", "how-to-use-ai-video-pro"],
    cta: { toolName: "AI Dubbing", toolSlug: "ai-dubbing" },
  },
  {
    slug: "how-to-use-ai-captions",
    category: "Video",
    title: "How to Use AI Captions | AmmarAI Tutorials",
    description:
      "Upload a portrait video, choose a caption style and generate styled subtitles with AmmarAI AI Captions.",
    h1: "How to use AI Captions",
    intro: [
      "AI Captions adds animated, styled subtitles to short portrait videos. Upload the source video, preview the available caption templates and generate the captioned result before continuing in the video editor.",
      "This guide covers the regular-user creation workflow only. Installation, API keys, plan allocation and administrator controls are excluded.",
    ],
    whenToUse: [
      "You want readable captions for a short vertical social video.",
      "You want to apply a ready-made animated caption style.",
      "You want to continue refining the generated result in the video editor.",
    ],
    sections: [
      {
        heading: "Open AI Captions and upload the video",
        steps: [
          {
            title: "Open AI Captions",
            body: "Choose AI Captions from the AmmarAI side menu. The workspace opens with the video upload area, caption-style selector, Generate action and your previously created videos.",
            image: { src: "/media/tutorials/tutorial-captions-1.png", alt: "AmmarAI AI Captions workspace showing the side menu and portrait-video upload area", caption: "Open AI Captions and upload the source video.", width: 1851, height: 851 },
          },
          {
            title: "Upload a portrait video",
            body: "Select Upload Video and choose a 9:16 portrait video from your device. The source file can be up to 50 MB and five minutes long.",
          },
        ],
      },
      {
        heading: "Choose the caption style",
        steps: [
          {
            title: "Open the caption-template picker",
            body: "Select the caption-style preview to open the template picker. Browse the animated previews and choose the treatment that fits the video; available examples include Medusa, line-by-line treatments and other emphasized word styles.",
            image: { src: "/media/tutorials/tutorial-captions-2.png", alt: "AI Captions workspace with an animated caption style selected beneath the video uploader", caption: "Select the caption-style preview to browse templates.", width: 1859, height: 860 },
          },
          {
            title: "Preview and select a template",
            body: "Preview the templates in the picker, then select the caption design you want to apply. The chosen template is outlined and its preview plays automatically so you can check the typography and animation before generating.",
            image: { src: "/media/tutorials/tutorial-captions-3.png", alt: "AI Captions template picker with animated caption designs and the selected style outlined", caption: "Preview the available designs and select one caption template.", width: 1898, height: 928 },
          },
        ],
      },
      {
        heading: "Generate and continue editing",
        steps: [
          {
            title: "Generate the captioned video",
            body: "Return to the AI Captions panel and click Generate. AmmarAI processes the upload with the selected caption style and adds the result to the previously created videos area.",
          },
          {
            title: "Open the result in the video editor",
            body: "Preview the generated video. When you need further changes, open it in the AI Video Editor and continue editing the captioned result there.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "AI Captions accepts portrait 9:16 videos up to 50 MB and five minutes long. Prepare the source in that format before uploading it.",
          },
        ],
      },
    ],
    relatedTools: ["ai-captions", "ai-video-editor", "ai-dubbing"],
    relatedTutorials: ["how-to-dub-a-video", "how-to-use-ai-video-pro"],
    cta: { toolName: "AI Captions", toolSlug: "ai-captions" },
  },
  {
    slug: "how-to-create-ugc-videos",
    category: "Video Marketing",
    title: "How to Create UGC Videos | AmmarAI Tutorials",
    description:
      "Generate realistic user-generated-content videos with AmmarAI’s AI UGC Generator — script, voice, actor and scene in one pass.",
    h1: "How to create UGC videos",
    intro: [
      "The AI UGC Generator lets you create realistic user-generated-content videos for social media and marketing without actors, studios or cameras. You write a script, choose a voice, pick a pre-built AI actor and select a scene, and AmmarAI renders the finished video.",
      "This guide covers the regular-user creation workflow only.",
    ],
    whenToUse: [
      "You want authentic-looking social ads without a shoot.",
      "You have a script, a recording or an audio file ready.",
      "You need several scene variations of the same message.",
    ],
    sections: [
      {
        heading: "Getting started",
        paragraphs: [
          "Open the AI UGC Generator from the side menu. The page shows the video creation interface with options for script input, voice selection, actor selection and scene selection. Click View All Videos to browse previously generated videos.",
        ],
        steps: [
          {
            title: "Open the UGC workspace",
            body: "Navigate to the AI UGC Generator from the side menu to reach the creation interface.",
            image: { src: "/media/tutorials/tutorial-ugc-1.png", alt: "AmmarAI UGC generator workspace with script, voice, actor and scene options", caption: "The UGC creation interface.", width: 1337, height: 626 },
          },
        ],
      },
      {
        heading: "How to create a UGC video",
        paragraphs: [
          "The input panel has three tabs, and only one is used at a time — the active tab determines how the audio for the video is provided.",
          "Text — type or paste your script into the text field; the script is converted to speech using the selected voice. Use this when you want to write the content and have the AI deliver it.",
          "Audio — upload a pre-recorded audio file, which is used directly as the voiceover, bypassing voice selection. Use this when you already have a finished recording.",
          "Record — record your voiceover in the browser with your microphone; the recording is used as-is. Use this when you want to deliver the script yourself in real time.",
        ],
        steps: [
          {
            title: "Provide the audio and choose a voice",
            body: "On the Text tab, choose a voice from the Voice dropdown; the selected voice converts your written script to speech in the generated video. Voices are listed with their name and style description, for example “Roger — Laid-back”. Voice selection is not used when the Audio or Record tab is active, because you provide the audio directly.",
            image: { src: "/media/tutorials/tutorial-ugc-2.png", alt: "UGC generator script tabs with the voice dropdown open", caption: "Write the script and pick the delivery voice.", width: 1730, height: 846 },
          },
          {
            title: "Select an actor",
            body: "Choose one of three options in the actor panel: Pick an Actor to use the built-in AI actor library, Upload Your Actor to add a custom actor image or video, or Create New Actor to build a new custom actor from scratch. The built-in library includes pre-built actors.",
            image: { src: "/media/tutorials/tutorial-ugc-3.png", alt: "UGC generator actor panel with library, upload and create options", caption: "Pick, upload or create the actor.", width: 1738, height: 901 },
          },
          {
            title: "Select a scene and generate",
            body: "Choose the scene or context the actor appears in — options include a skin-care routine, at the café, while doing makeup, travelling, chatting in the car, in the kitchen, on the way to work, recording a podcast, walking on the street, top view, taking a break at the office, and in a cosy home. Then click Generate to produce the video; the system combines the audio from the active tab, the chosen actor and the selected scene into the final UGC video.",
            image: { src: "/media/tutorials/tutorial-ugc-4.png", alt: "UGC generator scene selection with the Generate action", caption: "Choose the scene, then generate the video.", width: 1763, height: 910 },
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Use only scripts, recordings, likenesses and product claims you are authorised to publish.",
          },
        ],
      },
    ],
    relatedTools: ["ai-ugc-generator", "ai-captions", "ai-url-to-video"],
    relatedTutorials: ["how-to-create-ai-influencer-videos", "how-to-dub-a-video"],
    cta: { toolName: "AI UGC Generator", toolSlug: "ai-ugc-generator" },
  },
  {
    slug: "how-to-build-an-ai-agent",
    category: "Automation",
    title: "How to Build an AI Agent | AmmarAI Tutorials",
    description:
      "Build, test and monitor a multi-step workflow with AmmarAI AI Agent Builder using plain-language instructions, triggers and connected tools.",
    h1: "How to build an AI agent",
    intro: [
      "AI Agent Builder turns a plain-language job description into a workflow that can run on demand, on a schedule or when a message arrives. Each step can use the result from the step before it.",
      "This guide covers the regular-user workflow for creating and monitoring an agent. Workspace installation, provider credentials and plan controls are intentionally excluded.",
    ],
    whenToUse: [
      "A repeated task requires several decisions or tools, not one generated answer.",
      "You want the workflow to run on a schedule or react to incoming messages.",
      "You need a visible run history before trusting an automation.",
    ],
    sections: [
      {
        heading: "Start from the Agent Builder",
        steps: [
          {
            title: "Open the agent dashboard",
            body: "Open AI Agent Builder. Start with the plain-language description box, open the visual builder, or choose a featured starting point such as a daily report, weekly summary or morning briefing.",
            image: { src: "/media/tutorials/tutorial-agent-builder-01.png", alt: "AmmarAI Agent Builder dashboard with a plain-language agent description field and featured workflows", caption: "Choose a starting point for the workflow.", width: 1644, height: 815 },
          },
          {
            title: "Connect only the services the job needs",
            body: "Open Manage Connectors, select Add Connector and link the account needed by this workflow. Keep access narrow: an email workflow needs its mailbox, while an unrelated service can remain disconnected.",
            image: { src: "/media/tutorials/tutorial-agent-builder-02.png", alt: "AmmarAI Agent Builder dashboard with the Manage Connectors action highlighted", caption: "Open the connector manager from the agent dashboard.", width: 1523, height: 490 },
          },
          {
            title: "Choose the relevant connector",
            body: "Select the service the agent should use. The available actions shown for each connector make it clear whether the agent can read messages, create drafts, send mail, manage contacts or update a calendar.",
            image: { src: "/media/tutorials/tutorial-agent-builder-03.png", alt: "Agent connector picker showing email services and their available actions", caption: "Choose a connector by the actions your workflow requires.", width: 951, height: 293 },
          },
        ],
      },
      {
        heading: "Describe and refine the workflow",
        steps: [
          {
            title: "Describe the complete job",
            body: "State what should happen, when it should run and where the result belongs. For example: every weekday morning, summarize yesterday’s messages and send the briefing to a chosen channel. Continue the conversation to refine the workflow.",
            image: { src: "/media/tutorials/tutorial-agent-builder-04.png", alt: "AmmarAI Agent Builder description box and workflow starting options", caption: "Describe the goal, timing and destination in one clear brief.", width: 1637, height: 839 },
          },
          {
            title: "Set the trigger and chain the actions",
            body: "Choose a schedule or an incoming channel message as the trigger. Add the required actions in order and pass useful output forward, such as reading messages, summarizing them and sending the final report.",
          },
          {
            title: "Test, save and activate",
            body: "Run a test, inspect the result and correct any vague instruction. Save the agent only when the test follows the intended path, then switch it to Active. You can pause it at any time.",
          },
        ],
      },
      {
        heading: "Monitor agents and conversations",
        steps: [
          {
            title: "Review every agent from one list",
            body: "Open Agents to compare statuses and last-run times. Use the options menu to edit, pause or remove a workflow, or start a conversation with an agent directly.",
            image: { src: "/media/tutorials/tutorial-agent-builder-05.png", alt: "AmmarAI agents list with status, last-run information and agent options", caption: "Check status and recent activity across all agents.", width: 1736, height: 639 },
          },
          {
            title: "Inspect messages and run details",
            body: "Open Channel Messages, select a conversation and read the full history. Use Details and Logs to verify what the agent received, which steps ran and what it produced before expanding the workflow’s responsibility.",
            image: { src: "/media/tutorials/tutorial-agent-builder-06.png", alt: "AmmarAI agent conversation with Details and Logs for a completed workflow", caption: "Use the conversation history and logs to audit each run.", width: 1693, height: 661 },
          },
        ],
        callouts: [{ type: "tip", body: "Begin with one narrow job and review its first runs in full before increasing its schedule or access." }],
      },
    ],
    relatedTools: ["ai-agent-builder", "ai-blogger-agent", "ai-social-media-agent"],
    relatedTutorials: ["how-to-use-ai-blogger-agent", "how-to-use-ai-chat-pro"],
    cta: { toolName: "AI Agent Builder", toolSlug: "ai-agent-builder" },
  },
  {
    slug: "how-to-use-ai-blogger-agent",
    category: "Automation",
    title: "How to Use AI Blogger Agent | AmmarAI Tutorials",
    description:
      "Plan, schedule, review and measure a recurring content workflow with AmmarAI AI Blogger Agent.",
    h1: "How to use AI Blogger Agent",
    intro: [
      "AI Blogger Agent organizes recurring content around a defined topic, format and schedule. Its dashboard brings drafts, scheduled posts, the calendar and recent activity into one working view.",
      "This guide follows the complete regular-user workflow from creating an agent to reviewing posts, calendar activity and performance.",
    ],
    whenToUse: [
      "You want a consistent publishing rhythm instead of creating every post manually.",
      "Different topics or brands need separate content instructions.",
      "You want drafts and scheduled work visible in one calendar and post library.",
    ],
    sections: [
      {
        heading: "Read the content dashboard",
        steps: [
          { title: "Check the current queue", body: "Use the opening dashboard to review new drafts, scheduled work and the next item requiring attention.", image: { src: "/media/tutorials/tutorial-blogger-agent-01.png", alt: "AmmarAI Blogger Agent dashboard with content summary and latest activity", caption: "The dashboard summarizes the active content queue.", width: 1917, height: 857 } },
          { title: "Review the calendar and latest posts", body: "Scan the calendar for published and scheduled items, then review the latest-post cards to spot gaps or open a draft that needs editing.", image: { src: "/media/tutorials/tutorial-blogger-agent-02.png", alt: "Blogger Agent calendar showing scheduled and published content", caption: "Use the calendar to see coverage over time.", width: 1843, height: 557 } },
          { title: "Open a recent post", body: "Use the latest-post area to inspect a draft or published item without losing the wider schedule view.", image: { src: "/media/tutorials/tutorial-blogger-agent-03.png", alt: "Blogger Agent latest-post cards with content previews", caption: "Recent items remain available for quick review.", width: 1843, height: 672 } },
        ],
      },
      {
        heading: "Create a focused blogger agent",
        steps: [
          { title: "Start a new agent", body: "Open Agents and select Add Agent. Keep one clear niche or publishing purpose per agent so its drafts remain consistent.", image: { src: "/media/tutorials/tutorial-blogger-agent-04.png", alt: "AmmarAI Blogger Agent list with the Add Agent action", caption: "Create a separate agent for each distinct content strategy.", width: 1918, height: 946 } },
          { title: "Define the niche and article type", body: "Enter the main subject, then choose the article format that best fits the audience and publishing destination.", image: { src: "/media/tutorials/tutorial-blogger-agent-05.png", alt: "Blogger Agent setup asking for the content niche", caption: "Begin with one specific subject area.", width: 1912, height: 877 } },
          { title: "Set the content preferences", body: "Choose whether posts should include images, emojis or current web research, and set the language and tone required for this agent.", image: { src: "/media/tutorials/tutorial-blogger-agent-07.png", alt: "Blogger Agent setup with content preference fields", caption: "Set the output rules before scheduling posts.", width: 1911, height: 857 } },
          { title: "Choose the schedule", body: "Select the posting days, time and frequency. Use a sustainable cadence that leaves enough time to review early drafts.", image: { src: "/media/tutorials/tutorial-blogger-agent-09.png", alt: "Blogger Agent schedule step with posting cadence controls", caption: "Choose when and how often the agent should prepare content.", width: 1915, height: 815 } },
          { title: "Name and create the agent", body: "Give the agent a recognizable name, check the summary and create it. The name will identify its work in the post library and reports.", image: { src: "/media/tutorials/tutorial-blogger-agent-10.png", alt: "Final Blogger Agent setup step with agent name and create action", caption: "Name the agent so its posts are easy to trace.", width: 1911, height: 845 } },
        ],
      },
      {
        heading: "Manage posts, dates and results",
        steps: [
          { title: "Filter the post library", body: "Open Posts and sort or filter by date, status or title. Drafts remain editable, while scheduled and published items provide a clear record of the queue.", image: { src: "/media/tutorials/tutorial-blogger-agent-11.png", alt: "AmmarAI Blogger Agent post library with filters and status columns", caption: "Use the post library to find drafts and scheduled work quickly.", width: 1907, height: 863 } },
          { title: "Use the full calendar", body: "Open Calendar for a month-level view of every scheduled and published item. Check for empty stretches and crowded publishing days before changing the cadence.", image: { src: "/media/tutorials/tutorial-blogger-agent-15.png", alt: "AmmarAI Blogger Agent monthly content calendar", caption: "The calendar shows the complete publishing rhythm.", width: 1914, height: 937 } },
          { title: "Review reports and analytics", body: "Use Reports and Analytics to compare posting volume and activity by agent. Use what you learn to adjust future topics, formats and frequency.", image: { src: "/media/tutorials/tutorial-blogger-agent-16.png", alt: "AmmarAI Blogger Agent reports and analytics dashboard", caption: "Measure activity before revising the content plan.", width: 1920, height: 864 } },
        ],
      },
    ],
    relatedTools: ["ai-blogger-agent", "ai-agent-builder", "keyword-generator"],
    relatedTutorials: ["how-to-build-an-ai-agent", "how-to-use-ai-chat-pro"],
    cta: { toolName: "AI Blogger Agent", toolSlug: "ai-blogger-agent" },
  },
  {
    slug: "how-to-use-ai-music-pro",
    category: "Audio",
    title: "How to Use AI Music Pro | AmmarAI Tutorials",
    description:
      "Generate an original track in AmmarAI AI Music Pro by defining its sound, duration and musical style.",
    h1: "How to use AI Music Pro",
    intro: [
      "AI Music Pro creates an original track from three creative inputs: a written description, a duration and a musical style.",
      "This guide covers the complete creation workflow. Provider keys and workspace configuration are not part of the end-user process and are excluded.",
    ],
    whenToUse: [
      "A video, advertisement, podcast or presentation needs an original music bed.",
      "The track must match a specific emotion, instrumentation or tempo.",
      "You need a defined duration rather than trimming a longer stock track.",
    ],
    sections: [
      {
        heading: "Define the track",
        steps: [
          { title: "Write a precise music description", body: "Describe the intended mood, pace and prominent instruments. A useful brief combines all three, such as an optimistic electronic track with light percussion, warm synths and a steady mid-tempo build.", image: { src: "/media/tutorials/tutorial-music-pro-01.png", alt: "AmmarAI Music Pro description field for a new track", caption: "Describe the mood, instrumentation and movement of the track.", width: 1811, height: 629 } },
          { title: "Set the duration", body: "Enter the required length in seconds so the result fits its destination, whether it is a short social clip, an advertisement or a longer presentation segment.", image: { src: "/media/tutorials/tutorial-music-pro-02.png", alt: "AmmarAI Music Pro duration control with track length entered", caption: "Match the duration to the content that will use the music.", width: 1801, height: 585 } },
          { title: "Choose the musical style", body: "Open the style list and select the genre or foundation closest to the desired result. The description supplies the detail; the style gives the composition its broad musical structure.", image: { src: "/media/tutorials/tutorial-music-pro-03.png", alt: "AmmarAI Music Pro style selector open with musical genres", caption: "Choose the genre that best anchors the written brief.", width: 1898, height: 636 } },
        ],
      },
      {
        heading: "Generate and evaluate",
        steps: [
          { title: "Generate the track", body: "Check the description, duration and style together, then generate. Listen to the full result in context rather than judging only its opening seconds." },
          { title: "Refine one variable at a time", body: "If the result misses the brief, change one element—such as tempo, instrument or mood—and generate again. Keeping the other inputs stable makes each revision easier to evaluate." },
        ],
        callouts: [{ type: "note", body: "Keep a record of the prompt and generated result you select, and confirm that your final use complies with AmmarAI’s current plan and usage terms." }],
      },
    ],
    relatedTools: ["ai-music-generator", "sound-studio", "ai-video-generator"],
    relatedTutorials: ["how-to-use-ai-video-pro", "how-to-create-ugc-videos"],
    cta: { toolName: "AI Music Pro", toolSlug: "ai-music-generator" },
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
