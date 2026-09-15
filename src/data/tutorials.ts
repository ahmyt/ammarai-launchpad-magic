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
  cta: { toolName: string; toolSlug: string; kind?: "tool" | "feature" };
}

export const tutorialCategories: TutorialCategory[] = ["Chat & Documents", "Automation", "Image", "Video", "Video Marketing", "Fashion", "Audio", "Productivity"];

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
        heading: "Set the generation inputs",
        paragraphs: [
          "When you choose a video action that generates a clip from scratch, the form gives you a small set of inputs that control the result: an optional reference image, the prompt, the model, the duration and the output size.",
        ],
        steps: [
          {
            title: "Add a reference image (optional)",
            body: "Drop in a JPG or PNG to use as the first frame. The reference image has to match the width and height you request further down the form, otherwise the generation is rejected.",
            image: { src: "/media/tutorials/tutorial-video-pro-sora-1.png", alt: "Reference image upload area in AmmarAI AI Video Pro", caption: "The reference image is optional and must match the requested output size.", width: 1912, height: 776 },
          },
          {
            title: "Write the prompt",
            body: "Describe the subject, the setting, the action, the lighting and the camera movement in one clear paragraph. The prompt is required even when you supply a reference image, because it tells the model what should happen in the shot.",
            image: { src: "/media/tutorials/tutorial-video-pro-sora-2.png", alt: "Prompt field in AmmarAI AI Video Pro", caption: "Describe subject, action, setting, light and camera in the prompt field.", width: 1884, height: 762 },
          },
          {
            title: "Choose the model",
            body: "Pick the model variant you want to generate with. Variants differ in quality, speed and whether audio is generated alongside the picture, so check the label on the option before you run a longer clip.",
            image: { src: "/media/tutorials/tutorial-video-pro-sora-3.png", alt: "Model selector in AmmarAI AI Video Pro", caption: "The model selector controls generation quality, speed and audio support.", width: 1871, height: 781 },
          },
          {
            title: "Set the duration",
            body: "Choose the target length of the clip in seconds. Start with the shortest option while you are still testing the prompt, then re-run at full length once the direction is right.",
            image: { src: "/media/tutorials/tutorial-video-pro-sora-4.png", alt: "Duration selector in AmmarAI AI Video Pro", caption: "Duration sets the target length of the generated clip.", width: 1871, height: 781 },
          },
          {
            title: "Set the size and generate",
            body: "Select the output resolution and aspect ratio for the platform you are posting to, then select Generate. Vertical sizes suit Reels, Shorts and TikTok, while landscape suits YouTube and site embeds.",
            image: { src: "/media/tutorials/tutorial-video-pro-sora-5.png", alt: "Output size selector and Generate button in AmmarAI AI Video Pro", caption: "Pick the output resolution and aspect ratio before generating.", width: 1871, height: 781 },
          },
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
  {
    slug: "how-to-create-ai-presentations",
    category: "Productivity",
    title: "How to Create AI Presentations | AmmarAI Tutorials",
    description:
      "Build a complete slide deck in AmmarAI AI Presentation Maker: write the brief, set language, theme, slide count and images, then generate and download.",
    h1: "How to create a presentation with AI",
    intro: [
      "AI Presentation Maker turns a short written brief into a finished deck, with slide structure, written content, layout and imagery generated together.",
    ],
    whenToUse: [
      "You need a first full draft of a deck rather than an empty template.",
      "A topic must be turned into a structured narrative across a fixed number of slides.",
      "The deck needs a consistent visual theme and matching imagery without manual design work.",
    ],
    sections: [
      {
        heading: "Write the presentation brief",
        steps: [
          {
            title: "Describe the presentation",
            body: "In the creation field, write what the deck is about. A specific brief produces a stronger outline: name the subject, the audience and the angle, for example a market overview of electric vehicles in 2030 for an investor audience.",
            image: {
              src: "/media/tutorials/tutorial-presentation-1.png",
              alt: "AmmarAI AI Presentation Maker creation field with a presentation brief",
              caption: "Start with a clear subject, audience and angle.",
              width: 1600,
              height: 633,
            },
          },
          {
            title: "Set the language",
            body: "Open the language control and choose the language the slides should be written in. The outline, slide text and speaker-facing wording all follow this setting.",
            image: {
              src: "/media/tutorials/tutorial-presentation-2.png",
              alt: "AmmarAI presentation language selector below the brief field",
              caption: "The chosen language applies to all generated slide text.",
              width: 1600,
              height: 654,
            },
          },
        ],
      },
      {
        heading: "Choose structure and design",
        steps: [
          {
            title: "Pick a theme",
            body: "Select the visual theme. It controls the typography, colour treatment and slide backgrounds applied across the whole deck.",
            image: {
              src: "/media/tutorials/tutorial-presentation-3.png",
              alt: "AmmarAI presentation theme control showing the selected theme",
              caption: "The theme sets typography, colour and background for every slide.",
              width: 1600,
              height: 654,
            },
          },
          {
            title: "Browse the full theme gallery",
            body: "Open the theme gallery to compare all available designs. You can search by name or filter to light or dark options, and each card previews title, body and link styling before you commit.",
            image: {
              src: "/media/tutorials/tutorial-presentation-7.png",
              alt: "AmmarAI presentation theme gallery with light and dark theme previews",
              caption: "Filter by light or dark and preview each theme before choosing.",
              width: 1483,
              height: 871,
            },
          },
          {
            title: "Set the number of slides",
            body: "Enter how many slides the deck should contain. This determines how tightly the topic is summarised, so match it to the length of the session rather than to the amount of source material.",
            image: {
              src: "/media/tutorials/tutorial-presentation-4.png",
              alt: "AmmarAI presentation slide-count control",
              caption: "Choose the slide count that fits the time you have to present.",
              width: 1600,
              height: 654,
            },
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Fewer slides with a sharper narrative usually present better than a long deck that repeats the same point across several layouts.",
          },
        ],
      },
      {
        heading: "Refine with advanced options",
        steps: [
          {
            title: "Open Advanced Options",
            body: "Expand Advanced Options to control text mode, format, card split, tone, audience and imagery. These refine the draft without changing the brief itself.",
            image: {
              src: "/media/tutorials/tutorial-presentation-5.png",
              alt: "AmmarAI presentation advanced options with image model and image style controls",
              caption: "Advanced Options control tone, audience, layout density and imagery.",
              width: 1600,
              height: 757,
            },
          },
          {
            title: "Choose how images are produced",
            body: "Decide whether slides use AI-generated images, then set the image model and image style so the visuals stay consistent with the theme and the subject matter.",
          },
        ],
      },
      {
        heading: "Generate and download",
        steps: [
          {
            title: "Generate the deck",
            body: "With the brief and settings in place, start generation. The outline, slide copy, layouts and images are produced together into a complete draft deck.",
            image: {
              src: "/media/tutorials/tutorial-presentation-6.png",
              alt: "AmmarAI presentation generate control at the end of the brief panel",
              caption: "Generation produces structure, copy and imagery in one pass.",
              width: 1190,
              height: 533,
            },
          },
          {
            title: "Review slide by slide",
            body: "Work through the slide list and read each slide in order. Check that the narrative flows, that no point is duplicated and that any figures you rely on come from your own verified sources.",
          },
          {
            title: "Download the finished deck",
            body: "Open the download control in the top-right of the editor and export the deck for sharing or presenting.",
            image: {
              src: "/media/tutorials/tutorial-presentation-8.png",
              alt: "AmmarAI presentation editor with the download control highlighted",
              caption: "Export the finished deck from the editor toolbar.",
              width: 1600,
              height: 763,
            },
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Generated slides are a strong first draft. Always confirm claims, statistics and dates against your own sources before presenting.",
          },
        ],
      },
    ],
    relatedTools: ["ai-presentation-maker", "ai-image-generator", "ai-chat"],
    relatedTutorials: ["how-to-use-ai-image-pro", "how-to-use-ai-chat-pro"],
    cta: { toolName: "AI Presentation Maker", toolSlug: "ai-presentation-maker" },
  },
  {
    slug: "how-to-use-realtime-voice-chat",
    category: "Chat & Documents",
    title: "How to Use Realtime Voice Chat | AmmarAI Tutorials",
    description:
      "Hold a live spoken conversation with AmmarAI: open a chat, switch on real-time voice and talk naturally with spoken replies.",
    h1: "How to use Realtime Voice Chat",
    intro: [
      "Realtime Voice Chat turns a normal AmmarAI chat into a spoken conversation. You talk out loud and the assistant answers in voice, without typing or waiting for a full written reply.",
    ],
    whenToUse: [
      "You want to think out loud and work through an idea conversationally.",
      "Your hands are busy and typing is impractical.",
      "You are rehearsing a pitch, interview or language practice session.",
    ],
    sections: [
      {
        heading: "Start a voice conversation",
        steps: [
          {
            title: "Open a chat",
            body: "Go to AI Chat and open an existing conversation or start a new one. Realtime voice runs inside a normal chat, so anything already in the conversation stays available as context.",
          },
          {
            title: "Switch on real-time voice",
            body: "In the message bar, select the real-time voice control. The chat switches from typed messages to a live spoken session.",
            image: {
              src: "/media/tutorials/tutorial-voice-chat-1.png",
              alt: "AmmarAI chat message bar with the real-time voice control highlighted",
              caption: "The real-time voice control sits in the message bar of any chat.",
              width: 2724,
              height: 1313,
            },
          },
          {
            title: "Allow microphone access",
            body: "Your browser asks for permission to use the microphone the first time you start a voice session. Accept it, and check that the correct input device is selected if you use a headset.",
          },
        ],
      },
      {
        heading: "Hold the conversation",
        steps: [
          {
            title: "Speak naturally",
            body: "Talk in ordinary sentences rather than short commands. The assistant listens continuously and answers out loud, so you can interrupt, follow up and change direction as you would with a person.",
          },
          {
            title: "End the session",
            body: "Close the voice session when you are finished. The conversation stays in your chat history, so you can return to it or continue in text.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "A quiet room and a headset microphone noticeably improve recognition accuracy, especially for names, numbers and technical terms.",
          },
        ],
      },
    ],
    relatedTools: ["realtime-voice-chat", "ai-chat", "ai-text-to-speech"],
    relatedTutorials: ["how-to-use-ai-chat-pro", "how-to-chat-with-documents"],
    cta: { toolName: "Realtime Voice Chat", toolSlug: "realtime-voice-chat" },
  },
  {
    slug: "how-to-edit-videos-with-the-ai-video-editor",
    category: "Video",
    title: "How to Edit Videos with the AI Video Editor | AmmarAI Tutorials",
    description:
      "Create a project, arrange clips on the timeline and use the AI, voice and music panels inside the AmmarAI AI Video Editor, then export the finished video.",
    h1: "How to edit videos with the AI Video Editor",
    intro: [
      "The AI Video Editor is a timeline editor built into AmmarAI. You create a project, bring in footage, arrange it across video, audio and text tracks, and export the result without moving between separate applications.",
      "Alongside the standard editing tools, side panels let you generate new clips, voiceovers and background music directly onto the timeline. This guide follows that end-user flow only.",
    ],
    whenToUse: [
      "You need to assemble or trim footage rather than generate a single clip.",
      "A video needs narration or background music added to the same timeline.",
      "The same footage has to be delivered in different aspect ratios for different platforms.",
    ],
    sections: [
      {
        heading: "Start a project",
        steps: [
          {
            title: "Open the AI Video Editor and create a project",
            body: "Open AI Video Editor from the workspace menu. The page lists every existing project with its aspect ratio, name and creation date. Select New Project, give the project a name, then choose the aspect ratio that matches where the video will be published.",
            image: {
              src: "/media/tutorials/tutorial-video-editor-1.png",
              alt: "AmmarAI AI Video Editor new project dialog with project name and aspect ratio",
              caption: "Name the project and set the aspect ratio before opening the timeline.",
              width: 1888,
              height: 850,
            },
          },
          {
            title: "Choose the right aspect ratio",
            body: "1:1 suits square social feeds, 16:9 suits YouTube and presentations, and 9:16 suits vertical formats such as Reels and Shorts. Setting this at the start avoids recomposing shots later.",
          },
        ],
        table: {
          head: ["Aspect ratio", "Shape", "Best for"],
          rows: [
            ["1:1", "Square", "Instagram and Facebook feed posts"],
            ["16:9", "Landscape", "YouTube, websites and presentations"],
            ["9:16", "Portrait", "Reels, TikTok and YouTube Shorts"],
          ],
        },
      },
      {
        heading: "Build the timeline",
        steps: [
          {
            title: "Add media from the library",
            body: "Open the Library panel and upload your footage, images and audio, or pick from what is already stored. Filter by video, image or audio to find assets quickly, then drop them onto the timeline in the order the story should play.",
            image: {
              src: "/media/tutorials/tutorial-video-editor-2.png",
              alt: "AmmarAI AI Video Editor library panel with uploaded video, image and audio files",
              caption: "The Library panel holds every asset available to the project.",
              width: 1894,
              height: 929,
            },
          },
          {
            title: "Arrange, trim and layer",
            body: "Use the timeline to trim clips, split them and change their order. Video, audio and text sit on separate tracks, so narration, music and captions can run underneath the picture. The preview updates as you work, and projects save automatically.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Lay down the picture edit first and add voice, music and text afterwards. Timing changes are far quicker before extra tracks are aligned to the cut.",
          },
        ],
      },
      {
        heading: "Use the AI panels",
        paragraphs: [
          "Three side panels bring AmmarAI generation into the editor itself, so new material lands straight on the timeline instead of being produced elsewhere and imported.",
        ],
        steps: [
          {
            title: "Generate video in the AI panel",
            body: "Open the AI tab, describe the clip you need and choose the model. The generated clip is placed on the timeline ready to trim and position with the rest of the edit.",
            image: {
              src: "/media/tutorials/tutorial-video-editor-3.png",
              alt: "AmmarAI AI Video Editor AI generation panel with prompt and model selection",
              caption: "Generated clips are added straight to the timeline.",
              width: 1835,
              height: 921,
            },
          },
          {
            title: "Add a voiceover in the Voice panel",
            body: "Open the Voice tab, enter the script, choose the language and voice, and generate. The narration is added as an audio track you can move and trim against the picture.",
            image: {
              src: "/media/tutorials/tutorial-video-editor-4.png",
              alt: "AmmarAI AI Video Editor voiceover panel with script, language and voice controls",
              caption: "Narration arrives as a normal audio track on the timeline.",
              width: 1816,
              height: 932,
            },
          },
          {
            title: "Add background music in the Music panel",
            body: "Open the Music tab, describe the mood or style you want behind the edit and generate a track. Place it on an audio track and lower its level so narration stays clear.",
            image: {
              src: "/media/tutorials/tutorial-video-editor-5.png",
              alt: "AmmarAI AI Video Editor music panel with a music description field",
              caption: "Generated music sits on its own audio track under the narration.",
              width: 1811,
              height: 933,
            },
          },
        ],
      },
      {
        heading: "Save and export",
        steps: [
          {
            title: "Review the full edit",
            body: "Play the project from the start and check pacing, audio balance and the readability of any on-screen text at the size viewers will actually see.",
          },
          {
            title: "Export the video",
            body: "Use Save to keep working later, or Export to render the finished video in the project's aspect ratio. Completed projects stay on the editor home screen and can be reopened at any time.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Longer timelines with several generated tracks take longer to render. Export a short test section first when you are checking a new look or audio mix.",
          },
        ],
      },
    ],
    relatedTools: ["ai-video-editor", "ai-video-generator", "ai-captions"],
    relatedTutorials: ["how-to-use-ai-video-pro", "how-to-use-ai-captions"],
    cta: { toolName: "AI Video Editor", toolSlug: "ai-video-editor" },
  },
  {
    slug: "how-to-use-the-ai-creative-suite",
    category: "Image",
    title: "How to Use the AI Creative Suite | AmmarAI Tutorials",
    description:
      "Generate images with your chosen AI engine, start from a template or artboard, then refine type, colour and layout in the AmmarAI AI Creative Suite canvas.",
    h1: "How to use the AI Creative Suite",
    intro: [
      "The AI Creative Suite joins image generation and design editing in one canvas. You generate a visual with the engine you prefer, then refine it with type, colour, layout and export controls without leaving the workspace.",
      "This guide follows the everyday design flow: generate, choose a starting layout, edit on the canvas and export the finished artwork.",
    ],
    whenToUse: [
      "Marketing, product or social visuals need text and layout on top of a generated image.",
      "A campaign needs several sizes of the same design.",
      "You want a reusable project file rather than a one-off image download.",
    ],
    sections: [
      {
        heading: "Generate the base image",
        steps: [
          {
            title: "Choose the AI engine and describe the image",
            body: "Open the Creative Suite and write what the image should show. Select the generation engine you prefer for the subject, then generate. Different engines favour different results, so it is worth trying more than one for the same brief.",
            image: {
              src: "/media/tutorials/tutorial-creative-suite-1.png",
              alt: "AmmarAI Creative Suite image generation panel with engine selection",
              caption: "Pick the engine that suits the subject, then generate the base image.",
              width: 1895,
              height: 915,
            },
          },
          {
            title: "Bring the result onto the canvas",
            body: "Add the generated image to the canvas. You can keep generating alternatives and add more images to the same project, so several options can be compared side by side.",
          },
        ],
      },
      {
        heading: "Start from a template or artboard",
        steps: [
          {
            title: "Use a predefined template",
            body: "Templates give you a finished composition with type, spacing and colour already arranged. Choose one that matches the message, then replace the imagery and wording with your own.",
            image: {
              src: "/media/tutorials/tutorial-creative-suite-2.png",
              alt: "AmmarAI Creative Suite template gallery with predefined designs",
              caption: "Templates give a complete layout you can adapt.",
              width: 1883,
              height: 905,
            },
          },
          {
            title: "Pick a predefined artboard",
            body: "Artboards set the canvas to a standard size for a specific destination, such as a social post or an advertisement. Choosing the right artboard first keeps every element correctly positioned for the final format.",
            image: {
              src: "/media/tutorials/tutorial-creative-suite-4.png",
              alt: "AmmarAI Creative Suite artboard size options",
              caption: "Set the artboard so the design matches its destination from the start.",
              width: 1891,
              height: 907,
            },
          },
        ],
      },
      {
        heading: "Edit the design on the canvas",
        steps: [
          {
            title: "Set type, colour and alignment",
            body: "Select any text element to change the font, weight, size, spacing, colour and alignment. The left rail gives access to library assets, text, images, shapes, sizing and layers, so the whole composition is edited in one place.",
            image: {
              src: "/media/tutorials/tutorial-creative-suite-3.png",
              alt: "AmmarAI Creative Suite canvas with font, size, colour and alignment controls",
              caption: "Type, colour, size and layer controls sit around the canvas.",
              width: 1914,
              height: 903,
            },
          },
          {
            title: "Add more images and arrange layers",
            body: "Add further generated or uploaded images, then use the layer controls to set what sits in front of what. Keep important text clear of busy areas of the image so it stays readable.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Restrict a design to two typefaces and a small colour set. Generated imagery is already visually rich, so restrained type keeps the message legible.",
          },
        ],
      },
      {
        heading: "Export and reuse the project",
        steps: [
          {
            title: "Export the finished artwork",
            body: "Export the design when it is complete. Check it at the size it will actually be viewed, particularly small text on mobile feeds.",
          },
          {
            title: "Export and import projects",
            body: "Projects can be exported and imported again later, which makes it straightforward to reuse an approved layout for the next campaign rather than rebuilding it.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Confirm that any product photography, logo or claim you place on the artwork is approved for the campaign before it is published.",
          },
        ],
      },
    ],
    relatedTools: ["ai-creative-suite", "ai-image-generator", "ai-image-editor"],
    relatedTutorials: ["how-to-use-ai-image-pro", "how-to-edit-videos-with-the-ai-video-editor"],
    cta: { toolName: "AI Creative Suite", toolSlug: "ai-creative-suite" },
  },
  {
    slug: "how-to-create-a-video-ad-from-a-product-url",
    category: "Video Marketing",
    title: "How to Create a Video Ad from a Product URL | AmmarAI Tutorials",
    description: "Turn a product page link into a finished video ad in AmmarAI: add the product, choose language, duration and ratio, then pick an avatar, voice and captions before rendering.",
    h1: "How to create a video ad from a product URL",
    intro: [
      "AI URL to Video builds a complete short video ad from a product page. You supply the product link or your own product images, set the video details, then choose the presenter, the voice and the caption style before the finished cut is rendered.",
      "The workflow runs as a short wizard: Product, Detail, Composition and Render. Each step keeps what you selected before it, so you can step back and change one choice without starting again.",
    ],
    whenToUse: [
      "You have a live product page and need an ad for Reels, TikTok or Shorts.",
      "You want a presenter-led ad without filming anything.",
      "You need several ad variants of the same product to test against each other.",
    ],
    sections: [
      {
        heading: "Create the ad",
        steps: [
          {
            title: "Open the tool and start a new video",
            body: "Open AI Influencer from the sidebar and select Generate New on the card for generating an ad video from a product URL or uploaded assets.",
            image: { src: "/media/tutorials/tutorial-url-video-ad-1.png", alt: "AmmarAI AI Influencer page with the Generate New option for a product ad video", caption: "Start from the ad video card and select Generate New.", width: 1398, height: 728 },
          },
          {
            title: "Add the product information",
            body: "Choose Auto URL and paste the product page link, then select Analyze so the page is read for the product name, description and imagery. Choose Manual Upload instead when the product is not on a public page and you want to supply the details and images yourself. Select Next when the product is in place.",
            image: { src: "/media/tutorials/tutorial-url-video-ad-2.png", alt: "Add Product Information step with Auto URL and Manual Upload options", caption: "Paste a product URL and analyse it, or upload the product details manually.", width: 1640, height: 838 },
          },
          {
            title: "Choose the video details",
            body: "Set the spoken language, the target duration and the aspect ratio. Vertical suits Reels, TikTok and Shorts; keep the duration short for paid placements. Select Next to continue.",
            image: { src: "/media/tutorials/tutorial-url-video-ad-3.png", alt: "Choose Video Details step with language, duration and aspect ratio controls", caption: "Language, duration and aspect ratio are set before the composition step.", width: 1588, height: 736 },
          },
          {
            title: "Pick the avatar",
            body: "On the Composition step, stay on the Avatar tab and choose the presenter who will deliver the script. Use the search box to narrow the list, and match the setting of the avatar clip to the product you are selling.",
            image: { src: "/media/tutorials/tutorial-url-video-ad-4.png", alt: "Composition step showing the avatar gallery", caption: "Choose the presenter from the avatar gallery.", width: 1589, height: 828 },
          },
          {
            title: "Choose the voice",
            body: "Switch to the Voice tab and preview the available voices with the play control next to each name. Pick a voice whose pace and accent match the audience for the ad.",
            image: { src: "/media/tutorials/tutorial-url-video-ad-5.png", alt: "Voice tab in the composition step with previewable voices", caption: "Preview voices before selecting the one that fits the ad.", width: 1598, height: 839 },
          },
          {
            title: "Select the caption style",
            body: "Open the Captions tab and choose a caption treatment. High-contrast styles read best in silent autoplay feeds. When the avatar, voice and captions are set, select Preview videos.",
            image: { src: "/media/tutorials/tutorial-url-video-ad-6.png", alt: "Captions tab with caption style options", caption: "Pick a caption style, then generate the previews.", width: 1591, height: 854 },
          },
          {
            title: "Choose a preview and render",
            body: "Several preview versions are generated, each with a different hook. Play them, select the one you want, then choose Render Video to produce the finished ad for download.",
            image: { src: "/media/tutorials/tutorial-url-video-ad-7.png", alt: "Preview video options with the Render Video button", caption: "Select the strongest hook, then render the final ad.", width: 1541, height: 709 },
          },
        ],
      },
      {
        heading: "What each step controls",
        table: {
          head: ["Step", "What you decide"],
          rows: [
            ["Product", "The source of the ad: a product URL to analyse, or product details and images you upload"],
            ["Detail", "Spoken language, target duration and aspect ratio"],
            ["Composition", "Avatar presenter, voice and caption style"],
            ["Render", "Which generated preview becomes the final video"],
          ],
        },
      },
      {
        heading: "Get a better result",
        bullets: [
          "Point the tool at a product page with clear copy and good imagery — the ad is only as accurate as the page it reads.",
          "Keep the duration at the short end for paid placements and save longer cuts for organic posts.",
          "Render more than one preview when you plan to test hooks, rather than rewriting the product step each time.",
          "Match the avatar and voice to the audience rather than picking the first option in the list.",
        ],
      },
      {
        heading: "Limits and good practice",
        bullets: [
          "Check every claim in the generated script against the product page before publishing; the script is written from page content and can overstate a feature.",
          "Review captions for spelling of product and brand names.",
          "Use avatars and voices only in the ways the platform permits, and do not present a generated presenter as a real customer.",
          "Rendering takes time, and longer or higher-resolution videos take longer.",
        ],
      },
    ],
    relatedTools: ["ai-url-to-video", "ai-avatar-generator", "ai-video-generator"],
    relatedTutorials: ["how-to-create-viral-clips", "how-to-create-ai-influencer-videos"],
    cta: { toolName: "AI URL to Video", toolSlug: "ai-url-to-video" },
  },
  {
    slug: "how-to-use-the-content-manager",
    category: "Productivity",
    title: "How to Use the Content Manager Media Library | AmmarAI Tutorials",
    description: "Upload, find and insert images, videos, documents and stock media from the AmmarAI Content Manager, the shared library that opens from every upload button.",
    h1: "How to use the Content Manager media library",
    intro: [
      "The Content Manager is the shared media library that opens wherever AmmarAI offers an upload. Instead of hunting for a file on your computer every time, you upload once and reuse the same image, video or document across chats, editors and video tools.",
      "Everything you generate in AmmarAI is saved here too, so a picture created in one tool can be inserted straight into another. The library also searches free stock photos and stock video, so you can pull in a visual without leaving the screen you are working on.",
    ],
    whenToUse: [
      "You reuse the same brand images, product shots or documents across several tools.",
      "You want to insert something you generated earlier without downloading and re-uploading it.",
      "You need a quick stock photo or stock clip while you are mid-task.",
    ],
    sections: [
      {
        heading: "Use the library",
        steps: [
          {
            title: "Open the library from any upload button",
            body: "Select the upload or attach control in the tool you are using. The Content Manager opens as a window over your work, so you never lose the page you were on. The first tab, Upload Files, takes a new file by drag and drop or by browsing your computer; the window lists the accepted file types and the size limit.",
            image: { src: "/media/tutorials/tutorial-content-manager-1.png", alt: "AmmarAI Content Manager open on the Upload Files tab with a drag-and-drop area", caption: "Upload Files accepts drag and drop or a normal file browse.", width: 933, height: 449 },
          },
          {
            title: "Insert an image you already have",
            body: "Open the Images tab to see everything you have uploaded or generated. Select a thumbnail to tick it, then choose Insert Selected Image to drop it into the tool you came from.",
            image: { src: "/media/tutorials/tutorial-content-manager-2.png", alt: "Images tab of the Content Manager with a selected image and the Insert Selected Image button", caption: "Pick an image and insert it without leaving the tool.", width: 930, height: 446 },
          },
          {
            title: "Insert a video",
            body: "The Videos tab works the same way for video files. Select the clip you want and choose Insert Selected Video.",
            image: { src: "/media/tutorials/tutorial-content-manager-3.png", alt: "Videos tab of the Content Manager with a selected clip and the Insert Selected Video button", caption: "Stored and generated videos live in the Videos tab.", width: 930, height: 442 },
          },
          {
            title: "Insert a document",
            body: "Other Files holds documents such as PDFs, with the file size and upload date shown next to each one. Select the document and choose Insert Selected Files to attach it — this is the quickest route when you are asking questions about a document in chat.",
            image: { src: "/media/tutorials/tutorial-content-manager-4.png", alt: "Other Files tab of the Content Manager listing PDF documents with one selected", caption: "Documents are listed with their size and upload date.", width: 934, height: 447 },
          },
          {
            title: "Search free stock images",
            body: "Type a subject into the search box on the Stock Images tab to browse free stock photography. Select the photo you want and choose Download & Insert Selected Image; it is added to your library at the same time, so it is there next time.",
            image: { src: "/media/tutorials/tutorial-content-manager-5.png", alt: "Stock Images tab of the Content Manager showing search results for a keyword", caption: "Stock photo results appear as soon as you search a subject.", width: 924, height: 447 },
          },
          {
            title: "Search free stock video",
            body: "Stock Videos works in the same way for footage, with the length shown on each clip. Choose Download & Insert Selected Video to bring it into your project and your library.",
            image: { src: "/media/tutorials/tutorial-content-manager-6.png", alt: "Stock Videos tab of the Content Manager showing searchable stock footage results", caption: "Stock clips show their duration before you insert them.", width: 927, height: 443 },
          },
        ],
      },
      {
        heading: "What each tab holds",
        table: {
          head: ["Tab", "What you will find"],
          rows: [
            ["Upload Files", "Drag and drop or browse to add new files from your device"],
            ["Images", "Images you uploaded and images generated in AmmarAI"],
            ["Videos", "Video files you uploaded and videos generated in AmmarAI"],
            ["Other Files", "Documents such as PDFs and office files"],
            ["Stock Images", "Searchable free stock photography"],
            ["Stock Videos", "Searchable free stock footage"],
          ],
        },
      },
      {
        heading: "Work faster with it",
        bullets: [
          "Use the search box and the sort control instead of scrolling; the library grows quickly once you start generating.",
          "Generate once and reuse: an image made in an image tool can be inserted into a video or a chat without downloading it.",
          "Keep file names meaningful when you upload, because the name is what you will search on later.",
          "Check the stated file-type and size limits before you upload a large video.",
        ],
      },
      {
        heading: "Before you publish",
        bullets: [
          "Confirm you have the rights to any file you upload, and follow the licence terms attached to stock media.",
          "Remove files you no longer need so client or product material is not left sitting in a shared library.",
          "Check that the file you inserted is the current version, especially when several similar images are stored.",
        ],
      },
    ],
    relatedTools: ["ai-chat", "ai-image-editor", "ai-video-editor"],
    relatedTutorials: ["how-to-chat-with-documents", "how-to-use-the-ai-creative-suite"],
    cta: { toolName: "AI Chat", toolSlug: "ai-chat" },
  },
  {
    slug: "how-to-manage-sales-with-ai-crm",
    category: "Automation",
    title: "How to Manage Sales with AI CRM | AmmarAI Tutorials",
    description: "Use AmmarAI AI CRM to manage contacts, companies, deals, projects, tasks and calendar activity from one customer workspace.",
    h1: "How to manage sales with AI CRM",
    intro: [
      "AI CRM brings customer records and day-to-day sales work into one workspace. You can move from a contact to its company, deal, project, task and scheduled activity without rebuilding the context in separate tools.",
      "The CRM Assistant is available when you need a quick summary or draft. The structured views remain the source of truth, so review the underlying record before acting on an AI response.",
    ],
    whenToUse: [
      "You need one view of contacts, companies and active opportunities.",
      "You want to track deals through a visual pipeline.",
      "You need tasks, projects and calendar events tied to customer work.",
    ],
    sections: [
      {
        heading: "Start with the customer workspace",
        steps: [
          {
            title: "Open AI CRM",
            body: "Open AI CRM from the workspace. The overview gives you a quick route into contacts, deals and follow-up work, with recent pipeline activity visible below.",
            image: { src: "/media/tutorials/tutorial-crm-1.png", alt: "AmmarAI AI CRM overview with customer workspace shortcuts and pipeline activity", caption: "The overview keeps customer records and active work together.", width: 1857, height: 874 },
          },
          {
            title: "Ask the CRM Assistant",
            body: "Use the CRM Assistant for questions such as a pipeline summary, overdue tasks or the health of a project. Be specific about the customer, owner or date range when the answer needs to be narrow.",
            image: { src: "/media/tutorials/tutorial-crm-2.png", alt: "AmmarAI CRM Assistant with suggested questions and a message field", caption: "Ask a focused question about the records already held in your CRM.", width: 1899, height: 902 },
          },
        ],
      },
      {
        heading: "Organise customer records",
        steps: [
          {
            title: "Manage contacts",
            body: "Open Contacts to review people, their details and their current status. Add a contact when a new lead or customer enters your workflow, and keep the record current so later tasks and conversations stay connected to the right person.",
            image: { src: "/media/tutorials/tutorial-crm-3.png", alt: "AmmarAI AI CRM contacts table with contact records and status controls", caption: "Contacts are the people connected to your sales and delivery work.", width: 1863, height: 630 },
          },
          {
            title: "Group contacts by company",
            body: "Use Companies for the account-level view. This is where you can see the organisation behind several contacts and open a company record before reviewing its associated work.",
            image: { src: "/media/tutorials/tutorial-crm-4.png", alt: "AmmarAI AI CRM companies table and Add Company action", caption: "Company records keep related customer contacts together.", width: 1711, height: 723 },
          },
        ],
      },
      {
        heading: "Move work through the pipeline",
        steps: [
          {
            title: "Track opportunities on the deals board",
            body: "Open Deals to see opportunities grouped by stage. Add a deal for a qualified opportunity, then move it as the conversation progresses so the board reflects what is actually likely to close.",
            image: { src: "/media/tutorials/tutorial-crm-5.png", alt: "AmmarAI AI CRM deals pipeline with opportunity cards grouped by stage", caption: "The deals board shows each opportunity at its current stage.", width: 1705, height: 821 },
          },
          {
            title: "Follow delivery in Projects",
            body: "Once work moves beyond the sales conversation, use Projects to track ownership, priority, dates and status. Keep the project linked to its customer context so handoffs do not lose the original requirements.",
            image: { src: "/media/tutorials/tutorial-crm-6.png", alt: "AmmarAI AI CRM projects table with owners, dates, priorities and statuses", caption: "Projects carry customer work from agreement into delivery.", width: 1765, height: 823 },
          },
          {
            title: "Plan follow-up on the task board",
            body: "Use the task board to separate pending, in-progress and completed work. Give each task a clear owner and deadline, and update its stage as soon as the work changes.",
            image: { src: "/media/tutorials/tutorial-crm-7.png", alt: "AmmarAI AI CRM task board with pending, in-progress and completed columns", caption: "The task board makes ownership and progress visible.", width: 1705, height: 859 },
          },
          {
            title: "Review customer activity on the calendar",
            body: "Open the CRM Calendar to see scheduled work across the month. Use it to check for overlapping follow-ups, project deadlines and customer commitments before promising a new date.",
            image: { src: "/media/tutorials/tutorial-crm-8.png", alt: "AmmarAI CRM calendar showing scheduled customer and project activity", caption: "The calendar brings dated CRM activity into one view.", width: 1692, height: 787 },
          },
        ],
      },
      {
        heading: "Keep the CRM reliable",
        bullets: [
          "Use consistent names for companies and avoid creating a second record for the same customer.",
          "Update deal stages when the customer decision changes, not only at the end of the week.",
          "Give every task and project a clear owner and due date.",
          "Check AI-generated summaries against the underlying records before sharing them.",
        ],
      },
    ],
    relatedTools: ["ai-crm", "ai-phone-agent", "ai-agent-builder"],
    relatedTutorials: ["how-to-build-an-ai-agent", "how-to-create-outbound-ai-calls"],
    cta: { toolName: "AI CRM", toolSlug: "ai-crm" },
  },
  {
    slug: "how-to-create-an-ai-phone-agent",
    category: "Automation",
    title: "How to Create an AI Phone Agent | AmmarAI Tutorials",
    description: "Create an AmmarAI AI Phone Agent, define its greeting and instructions, choose its voice and train it with approved business information.",
    h1: "How to create an AI phone agent",
    intro: [
      "AI Phone Agent lets you create a voice agent for repeatable customer conversations such as enquiries, appointment requests and routine support calls.",
      "A useful agent starts with a narrow job, a clear welcome message and instructions that explain what it may do, what it must not claim and when it should hand the conversation to a person.",
    ],
    whenToUse: [
      "You receive recurring calls that follow a predictable structure.",
      "You want a voice agent to collect details or help with appointment requests.",
      "You need a consistent first response outside your staffed hours.",
    ],
    sections: [
      {
        heading: "Create the agent",
        steps: [
          {
            title: "Open AI Phone Agent",
            body: "Open AI Phone Agent and choose Add New Agent. Existing agents remain visible on the page, so you can return to one later to refine its instructions or training.",
            image: { src: "/media/tutorials/tutorial-phone-agent-1.png", alt: "AmmarAI AI Phone Agent page with existing agents and the Add New Agent button", caption: "Start a new voice agent or open an existing one.", width: 1845, height: 854 },
          },
          {
            title: "Define the conversation",
            body: "Give the agent a recognizable title, write the greeting callers hear first and add instructions for its role and behaviour. Choose the language, maximum call duration and voice. If the agent handles bookings, enable the booking option only when that belongs in its job.",
            image: { src: "/media/tutorials/tutorial-phone-agent-2.png", alt: "AmmarAI phone agent form with title, welcome message, instructions, language, duration and voice fields", caption: "Define the role, greeting, limits and voice before training the agent.", width: 1880, height: 894 },
          },
          {
            title: "Train it with approved information",
            body: "Add a website URL, PDF or text source that contains the information the agent may use. Prefer a focused FAQ, policy or service page over a broad source with unrelated material, then continue when the training source is ready.",
            image: { src: "/media/tutorials/tutorial-phone-agent-3.png", alt: "AmmarAI phone agent training screen with URL, PDF and Text source options", caption: "Use focused, current sources for the agent's answers.", width: 1741, height: 812 },
          },
          {
            title: "Return to the agent list",
            body: "After saving, return to My Phone Call Agents to confirm the new agent appears with the expected voice and status. Open it again whenever the greeting, instructions or source material changes.",
            image: { src: "/media/tutorials/tutorial-phone-agent-4.png", alt: "AmmarAI My Phone Call Agents list showing saved voice agents", caption: "Saved agents remain available for review and refinement.", width: 1758, height: 765 },
          },
        ],
      },
      {
        heading: "Write safer instructions",
        bullets: [
          "State the agent's purpose in one sentence before adding detailed rules.",
          "Tell it which details to collect and which details it must never request.",
          "Include a clear handoff rule for emergencies, complaints and questions outside its knowledge.",
          "Do not train it on confidential files unless every caller is authorised to receive that information.",
          "Test the greeting, interruptions, silence and an out-of-scope question before using the agent with customers.",
        ],
      },
    ],
    relatedTools: ["ai-phone-agent", "ai-crm", "ai-agent-builder"],
    relatedTutorials: ["how-to-create-outbound-ai-calls", "how-to-manage-sales-with-ai-crm"],
    cta: { toolName: "AI Phone Agent", toolSlug: "ai-phone-agent" },
  },
  {
    slug: "how-to-create-outbound-ai-calls",
    category: "Automation",
    title: "How to Create Outbound AI Calls | AmmarAI Tutorials",
    description: "Create individual or batch outbound calls with AmmarAI AI Phone Agent, then monitor each call from the outbound-call history.",
    h1: "How to create outbound AI calls",
    intro: [
      "Outbound Calls lets an existing AI Phone Agent place a single call or work through a contact list. It is designed for specific, permission-based tasks such as reminders, requested follow-ups and customer qualification.",
      "Before starting, decide the purpose of the call, the information the agent needs and what outcome should be recorded. A short, explicit call brief produces a more predictable conversation than a broad sales prompt.",
    ],
    whenToUse: [
      "A customer has requested a callback or follow-up.",
      "You need to send appointment or service reminders to an opted-in list.",
      "You want to qualify a known set of leads using the same approved questions.",
    ],
    sections: [
      {
        heading: "Place an outbound call",
        steps: [
          {
            title: "Open Outbound Calls",
            body: "Open Outbound Calls from AI Phone Agent. The page separates batch calls from individual outbound calls and keeps the call history below the creation controls.",
            image: { src: "/media/tutorials/tutorial-outbound-calls-1.png", alt: "AmmarAI Outbound Calls page with Place a Call and New Batch Call actions", caption: "Choose a single call or a batch according to the job.", width: 1848, height: 692 },
          },
          {
            title: "Place a single call",
            body: "Choose Place a Call, select the phone agent, enter the destination number and write a concise instruction for this conversation. Review the number and the brief, then create the call.",
            image: { src: "/media/tutorials/tutorial-outbound-calls-2.png", alt: "AmmarAI Place a Call dialog with agent, phone number and instruction fields", caption: "A single call needs an agent, a destination and a clear brief.", width: 1777, height: 738 },
          },
          {
            title: "Create a batch call",
            body: "Choose New Batch Call when the same approved workflow applies to several recipients. Name the batch, choose the agent, add the contact source and write the shared instruction. Check the list before starting so every recipient belongs in this campaign.",
            image: { src: "/media/tutorials/tutorial-outbound-calls-3.png", alt: "AmmarAI New Batch Call dialog with batch name, agent, phone numbers and instruction fields", caption: "Use a batch only when one call brief fits every selected recipient.", width: 1478, height: 838 },
          },
          {
            title: "Monitor the call history",
            body: "Return to Outbound Calls to review batch progress and individual call status. Use the history to identify completed, unanswered or failed calls before deciding whether a person should follow up.",
            image: { src: "/media/tutorials/tutorial-outbound-calls-4.png", alt: "AmmarAI Outbound Calls history with batch and individual call statuses", caption: "Review call status before scheduling any further contact.", width: 1489, height: 721 },
          },
        ],
      },
      {
        heading: "Before calling",
        bullets: [
          "Call only people you are permitted to contact and honour opt-outs immediately.",
          "Use the recipient's local time and avoid inappropriate calling hours.",
          "Make the AI nature and purpose of the call clear where law or good practice requires it.",
          "Never put secrets, payment credentials or unnecessary personal data in the call instruction.",
          "Review recordings, transcripts and retained call data according to the laws that apply to your business and recipients.",
        ],
      },
    ],
    relatedTools: ["ai-phone-agent", "ai-crm", "ai-agent-builder"],
    relatedTutorials: ["how-to-create-an-ai-phone-agent", "how-to-manage-sales-with-ai-crm"],
    cta: { toolName: "AI Phone Agent", toolSlug: "ai-phone-agent" },
  },
  {
    slug: "how-to-build-and-embed-a-website-chatbot",
    category: "Chat & Documents",
    title: "How to Build and Embed a Website Chatbot | AmmarAI Tutorials",
    description:
      "Create an AmmarAI external chatbot, style it, train it on your own content and embed it on your website so visitors get answers day and night.",
    h1: "How to build and embed a website chatbot",
    intro: [
      "An external chatbot is the assistant your visitors talk to on your own website. You give it a name and a voice, tell it what it is allowed to talk about, train it on your pages and documents, then paste a small snippet into your site.",
      "This guide follows the whole creation flow: configure, customise, train, test and embed.",
    ],
    whenToUse: [
      "You answer the same questions from visitors over and over.",
      "You want help available on your site outside working hours.",
      "You want visitors to reach a human when the assistant cannot help.",
    ],
    sections: [
      {
        heading: "Create the chatbot",
        steps: [
          {
            title: "Open AI Bots",
            body: "Select AI Bots in the workspace menu. This is where every chatbot you build lives, together with the conversations visitors have had with them.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-1.png", alt: "AmmarAI workspace menu with AI Bots highlighted", caption: "AI Bots holds every chatbot you build.", width: 462, height: 764 },
          },
          {
            title: "Add a new chatbot",
            body: "Choose Add New Chatbot to start. If you already have bots, the same page lists them under Active Chatbots so you can pick one up again instead of starting over.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-3.png", alt: "Add New Chatbot action on the AmmarAI chatbot page", caption: "Start a new chatbot from the AI Bots page.", width: 1097, height: 812 },
          },
          {
            title: "Fill in the basics",
            body: "Give the chatbot a title, the short bubble message that invites people to open it, and the welcome message it opens with. In Chatbot Instructions, describe its role, what it should help with and what it should refuse. Turn on Do Not Go Beyond Instructions when you want it to stay strictly inside that brief, pick the language and choose the model. The live preview on the right updates as you type.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-4.png", alt: "Chatbot configure step with title, bubble message, welcome message, instructions, language and model fields beside a live preview", caption: "Everything you set here is visible in the preview straight away.", width: 2024, height: 1566 },
          },
          {
            title: "Decide how conversations are handled",
            body: "Set the interaction type to choose whether the assistant answers alone or can pass a conversation to a person, and write the connect message the visitor sees when that happens. The same panel has optional extras such as feedback collection, a voice call agent and booking or shopping help.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-5.png", alt: "Interaction type, connect message and optional assistant toggles in the chatbot editor", caption: "Decide what happens when the assistant cannot answer.", width: 1938, height: 1446 },
          },
          {
            title: "Offer starter questions",
            body: "Turn on Suggested Prompts/Questions and add a few openers, such as your pricing, delivery or booking questions. Visitors who do not know what to ask will usually pick one of these, which keeps the conversation on ground the assistant knows well.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-9.png", alt: "Suggested Prompts and Questions panel with an Add Prompt button", caption: "Starter prompts guide visitors into useful questions.", width: 850, height: 896 },
          },
        ],
      },
      {
        heading: "Style it for your site",
        steps: [
          {
            title: "Choose the look",
            body: "In the customise step, upload your logo, pick an avatar and an accent colour, then decide whether to show the logo and timestamps. You can set the size of the launcher and place it on the left or the right of the page.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-6.png", alt: "Chatbot customise step with logo upload, avatar choices, colour swatches and position controls", caption: "Match the assistant to your site before anyone sees it.", width: 756, height: 754 },
          },
          {
            title: "Pick the bubble design",
            body: "The bubble design controls what the closed launcher looks like on your page — a plain bubble, a link bubble, a modern style, a suggestion bubble or a promo banner. Choose the one that suits how much attention you want it to draw.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-10.png", alt: "Bubble design dropdown showing Blank, Plain, Links, Modern, Suggestions and Promo Banner options", caption: "The bubble design is the first thing a visitor sees.", width: 841, height: 771 },
          },
        ],
      },
      {
        heading: "Train, test and publish",
        steps: [
          {
            title: "Train it on your own content",
            body: "Training is optional but it is what makes the answers yours. Point it at your website, upload a PDF, paste text, or write question-and-answer pairs for the things you are asked most. Start with the pages you would send a customer to anyway.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-7.png", alt: "Chatbot training step with Website, PDF, Text and Q&A sources and an Add URL field", caption: "Website, PDF, text and Q&A are all accepted as training sources.", width: 753, height: 1148 },
          },
          {
            title: "Check it before it goes live",
            body: "Use the preview to ask the questions your customers actually ask, including one the assistant should refuse. Adjust the instructions or add training material until the answers read the way you would answer yourself.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-8.png", alt: "Chatbot editor preview pane showing a test conversation", caption: "Test the awkward questions, not just the easy ones.", width: 792, height: 637 },
          },
          {
            title: "Embed it on your website",
            body: "The final step gives you a small snippet and a width and height for the window. Copy the snippet and paste it just before the closing </body> tag of your site, then save and refresh the page to see the assistant appear.",
            image: { src: "/media/tutorials/tutorial-site-chatbot-2.png", alt: "Test and Embed step with the copyable embed snippet and window size controls", caption: "One snippet, pasted before the closing body tag.", width: 2034, height: 1507 },
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Re-train after any big change to pricing, policies or opening hours; the assistant only knows what you have given it.",
          },
        ],
      },
      {
        heading: "Let visitors talk to the assistant",
        steps: [
          {
            title: "Switch on the voice call agent",
            body: "In the chatbot configuration, turn on Enable Voice Call Agent. Visitors can then hold a spoken conversation with the assistant in the same window instead of typing.",
            image: { src: "/media/tutorials/tutorial-bot-voice-1.png", alt: "Chatbot configuration with the voice call agent switch turned on", caption: "The voice switch sits under the feedback option.", width: 838, height: 916 },
          },
          {
            title: "Write the first spoken line",
            body: "Fill in the first message of the voice agent. This is the greeting the assistant speaks when a visitor starts a call, so keep it short, warm and in the voice of your business.",
          },
        ],
      },
      {
        heading: "Before you publish",
        bullets: [
          "Read the instructions back as if you were a customer: anything vague will show up as a vague answer.",
          "Give the assistant a clear route to a human for refunds, complaints and anything with money attached.",
          "Do not train it on internal documents, price lists or customer data you would not publish on the page.",
          "Check the conversations in the first week and add the questions you did not anticipate.",
        ],
      },
    ],
    relatedTools: ["ai-chat", "ai-personas", "ai-agent-builder"],
    relatedTutorials: ["how-to-chat-with-documents", "how-to-take-bookings-with-your-website-chatbot"],
    cta: { toolName: "External Chatbot Builder", toolSlug: "external-chatbot" },
  },
  {
    slug: "how-to-run-a-social-media-agent",
    category: "Automation",
    title: "How to Run an AI Social Media Agent | AmmarAI Tutorials",
    description:
      "Set up an AmmarAI social media agent that plans, writes and schedules posts for your accounts, then review, adjust and track them from one place.",
    h1: "How to run an AI social media agent",
    intro: [
      "A social media agent takes the repetitive part of posting off your hands. You describe the brand, the accounts and the kind of posts you want, and it drafts a schedule you can review before anything goes out.",
      "This guide walks through the dashboard, creating an agent step by step, and the places you review, schedule and measure the work it produces.",
    ],
    whenToUse: [
      "You want to post consistently without writing every caption yourself.",
      "You manage several accounts and keep losing the thread between them.",
      "You would rather approve a plan than start from a blank page each week.",
    ],
    sections: [
      {
        heading: "Get your bearings",
        steps: [
          {
            title: "Open the social media dashboard",
            body: "Open AI Social Media from the workspace menu and start at the dashboard. It gives you today's summary in one screen, with the agent's report at the top and the week's activity below.",
            image: { src: "/media/tutorials/tutorial-social-agent-1.png", alt: "AmmarAI social media dashboard with the workspace menu open on AI Social Media", caption: "The dashboard is the daily starting point.", width: 1906, height: 893 },
          },
          {
            title: "Read the numbers at a glance",
            body: "The counters show scheduled posts, new posts and new impressions, so you can tell in a second whether the pipeline is full or running dry.",
            image: { src: "/media/tutorials/tutorial-social-agent-2.png", alt: "Dashboard counters showing scheduled posts, new posts and new impressions", caption: "Scheduled posts is the number to watch.", width: 1909, height: 906 },
          },
          {
            title: "Open the posts waiting for review",
            body: "When posts are ready for you, the report links straight to them. Approving or editing here is what keeps the schedule moving.",
            image: { src: "/media/tutorials/tutorial-social-agent-3.png", alt: "Dashboard notice linking to new posts that are ready for review", caption: "The report links to whatever needs your attention.", width: 1912, height: 784 },
          },
          {
            title: "Review a single post",
            body: "Open a post to see its image, the account it will go to, the date and time, and the full caption. Change any of these before it publishes, then move to the next post.",
            image: { src: "/media/tutorials/tutorial-social-agent-4.png", alt: "Single post review panel with image, account, date and time and caption", caption: "Every field in the draft can be edited before it goes out.", width: 1845, height: 889 },
          },
          {
            title: "Scan the latest posts",
            body: "The latest posts strip shows recent drafts and published posts side by side with their impressions and engagement, and each card has an Edit button if you want to change something.",
            image: { src: "/media/tutorials/tutorial-social-agent-5.png", alt: "Latest posts cards with captions, impressions and engagement figures", caption: "Recent work and its results in one row.", width: 1912, height: 901 },
          },
        ],
      },
      {
        heading: "Create an agent",
        steps: [
          {
            title: "Open Agents and add one",
            body: "Go to Agents to see the agents you already have, with their status and creation date, and choose Add Agent to build a new one.",
            image: { src: "/media/tutorials/tutorial-social-agent-6.png", alt: "Social media agents list with agent cards and the Add Agent button", caption: "Each agent can cover a different brand or account set.", width: 1909, height: 898 },
          },
          {
            title: "Start the setup",
            body: "The agent introduces itself and explains that it will plan, publish and optimise posts for you. Choose Let's Get Started to begin the seven short steps.",
            image: { src: "/media/tutorials/tutorial-social-agent-7.png", alt: "Social media agent welcome screen with a Let's Get Started button", caption: "Setup is seven short steps, not a long form.", width: 1908, height: 906 },
          },
          {
            title: "Choose where it publishes",
            body: "Pick one or more connected accounts. If the account you want is missing, link it here before you continue.",
            image: { src: "/media/tutorials/tutorial-social-agent-8.png", alt: "Platform selection step with connected social accounts and a link account option", caption: "An agent can cover one platform or several.", width: 1905, height: 897 },
          },
          {
            title: "Tell it about your business",
            body: "Add your website address so the agent can read your brand for itself, or write a short description instead. The more accurate this is, the less editing you will do later.",
            image: { src: "/media/tutorials/tutorial-social-agent-9.png", alt: "Brand step asking for a website URL or a written brand description", caption: "Your website is the fastest way to give it context.", width: 1910, height: 896 },
          },
          {
            title: "Describe who you are talking to",
            body: "Choose the audiences that match your customers, or leave the agent to decide automatically. You can regenerate the suggestions if none of them fit.",
            image: { src: "/media/tutorials/tutorial-social-agent-10.png", alt: "Audience step with selectable audience tags and an automatic option", caption: "Audience choice changes the tone of every caption.", width: 1906, height: 903 },
          },
          {
            title: "Pick the content mix",
            body: "Select the kinds of posts you want — announcements, product promotions, informative posts, customer stories, tips and so on. A mix keeps the feed from reading like an advert.",
            image: { src: "/media/tutorials/tutorial-social-agent-11.png", alt: "Content focus step with post type options such as announcements, promotions and tips", caption: "Choose several types so the feed stays varied.", width: 1912, height: 892 },
          },
          {
            title: "Fine-tune the style",
            body: "Decide whether posts include images, whether hashtags and emoji are used, and set the language, how often it posts and the tone of voice.",
            image: { src: "/media/tutorials/tutorial-social-agent-12.png", alt: "Personalisation step with image, hashtag, language, frequency and tone controls", caption: "Tone and frequency are the two settings people change most.", width: 1901, height: 893 },
          },
          {
            title: "Set the posting schedule",
            body: "Choose your own posting times or let the agent decide when engagement is likely to be highest, then finish setup. The agent starts drafting from there.",
            image: { src: "/media/tutorials/tutorial-social-agent-13.png", alt: "Schedule step asking when the agent should post, with an automatic option", caption: "Automatic timing is a sensible default to begin with.", width: 1909, height: 899 },
          },
        ],
      },
      {
        heading: "Run it week to week",
        steps: [
          {
            title: "Work through the posts archive",
            body: "The archive lists every post by account, with drafts and published posts together. Filter by platform, sort by date and edit anything before its slot comes round.",
            image: { src: "/media/tutorials/tutorial-social-agent-14.png", alt: "Posts archive filtered by platform with draft post cards", caption: "The archive is where bulk editing happens.", width: 1796, height: 866 },
          },
          {
            title: "Plan on the calendar",
            body: "The calendar shows the month laid out by day so you can spot gaps, clashes and days where you have scheduled too much. Move posts around until the rhythm looks right.",
            image: { src: "/media/tutorials/tutorial-social-agent-15.png", alt: "Monthly content calendar with scheduled posts on each day", caption: "Gaps and pile-ups are obvious in the month view.", width: 1911, height: 904 },
          },
          {
            title: "Check what actually worked",
            body: "Analytics covers engagement, followers, published posts and impressions over time. Use it to decide what the agent should do more of, then change the content mix or tone in the agent's settings.",
            image: { src: "/media/tutorials/tutorial-social-agent-16.png", alt: "Analytics screen with engagement, follower, post and impression charts", caption: "Feed the results back into the agent's settings.", width: 1905, height: 904 },
          },
          {
            title: "Manage connected accounts",
            body: "The accounts page is where you link, review and remove the profiles the agent posts to, with the status of each connection listed underneath.",
            image: { src: "/media/tutorials/tutorial-social-agent-17.png", alt: "Social accounts page listing connected profiles and their status", caption: "Reconnect an account here if posting stops working.", width: 1825, height: 893 },
          },
          {
            title: "Ask for something specific",
            body: "The chat is there for one-off requests: a launch plan, a trend check, a set of captions or a campaign idea. Anything you agree there can be turned into scheduled posts.",
            image: { src: "/media/tutorials/tutorial-social-agent-18.png", alt: "Social media chat with suggested requests such as analysing trends and creating captions", caption: "Use the chat for the work that falls outside the routine.", width: 1913, height: 908 },
          },
        ],
      },
      {
        heading: "Before you publish",
        bullets: [
          "Read the first week of drafts in full; corrections early save you correcting the same thing all month.",
          "Check claims, prices and dates yourself — the agent writes from what you told it, not from your systems.",
          "Keep the approval step on until the tone is consistently right.",
          "Follow each platform's rules on disclosure, promotions and competitions.",
        ],
      },
    ],
    relatedTools: ["ai-social-media-agent", "ai-dm-comment-agent", "ai-image-generator"],
    relatedTutorials: ["how-to-build-and-embed-a-website-chatbot", "how-to-manage-sales-with-ai-crm"],
    cta: { toolName: "AI Social Media Agent", toolSlug: "ai-social-media-agent" },
  },
  {
    slug: "how-to-hand-chats-to-a-human-agent",
    category: "Automation",
    title: "How to Hand Live Chats to a Human Agent | AmmarAI Tutorials",
    description:
      "Let your AmmarAI chatbot pass a conversation to a person, then answer, tag, note and export those live chats from the Smart Inbox.",
    h1: "How to hand live chats to a human agent",
    intro: [
      "An AI chatbot answers most questions on its own, but some conversations need a person — a refund, a complaint, a deal about to close. AmmarAI lets a visitor ask for a human and drops that conversation straight into your inbox.",
      "This guide covers switching a chatbot to live-chat handover, then working the inbox: replying, leaving private notes, reading who you are talking to, filtering by date and exporting a conversation.",
    ],
    whenToUse: [
      "Visitors ask questions your chatbot should not answer alone.",
      "You want one place for every live conversation instead of several tabs.",
      "You need a record of what was said to a customer.",
    ],
    sections: [
      {
        heading: "Turn on handover",
        steps: [
          {
            title: "Set the interaction type on your chatbot",
            body: "Open your chatbot and set Interaction type to AI & Live Chat. That keeps the AI answering first while giving visitors a way to reach you. Only AI and Only Live Chat are there if you want one or the other.",
            image: { src: "/media/tutorials/tutorial-live-agent-1.png", alt: "Chatbot settings with the interaction type set to AI and Live Chat", caption: "AI & Live Chat keeps the bot answering and still lets people reach you.", width: 1654, height: 1348 },
          },
          {
            title: "Write the connect message",
            body: "The connect message is what the visitor sees the moment they ask for a person — something like \"I've forwarded your request to a human agent.\" Set expectations here about how quickly someone will reply.",
            image: { src: "/media/tutorials/tutorial-live-agent-1.png", alt: "Connect message field beneath the interaction type setting", caption: "Say how long a reply will take, so nobody waits in silence.", width: 1654, height: 1348 },
          },
          {
            title: "Open the live conversations inbox",
            body: "Once handover is on, requests arrive in the inbox. The list on the left holds the conversations, the thread sits in the middle, and everything you need to answer is on the same screen.",
            image: { src: "/media/tutorials/tutorial-live-agent-2.png", alt: "Live agent inbox with a conversation list and an open thread", caption: "One inbox for every conversation that reaches a person.", width: 2922, height: 1416 },
          },
        ],
      },
      {
        heading: "Answer the conversation",
        steps: [
          {
            title: "Filter to the ones that need you",
            body: "Use the filter above the list to switch between All, AI Agent and Human Agent. Human Agent shows only the conversations a visitor has asked a person to join.",
            image: { src: "/media/tutorials/tutorial-live-agent-3.png", alt: "Inbox filter open with All, AI Agent and Human Agent options", caption: "Start with Human Agent when time is short.", width: 978, height: 343 },
          },
          {
            title: "Reply in the thread",
            body: "Type in the message box at the bottom and send. Your reply appears in the same thread the visitor is already reading, so the conversation continues without them changing anything.",
            image: { src: "/media/tutorials/tutorial-live-agent-4.png", alt: "Open conversation with the reply box at the bottom of the thread", caption: "The visitor stays in the same chat window throughout.", width: 974, height: 903 },
          },
          {
            title: "Send a saved reply",
            body: "For the questions you answer every day, pull in a saved reply instead of typing it again. Search, pick the one you want and edit it before sending if the situation needs it.",
            image: { src: "/media/tutorials/tutorial-live-agent-5.png", alt: "Saved reply panel open above the message box with a search field", caption: "Saved replies keep common answers consistent.", width: 1007, height: 930 },
          },
          {
            title: "Leave a private note",
            body: "Switch the send control from Reply to Note to write something only your team sees — context for whoever picks the conversation up next. Notes never reach the visitor.",
            image: { src: "/media/tutorials/tutorial-live-agent-6.png", alt: "Send control switched from Reply to Note", caption: "Notes are internal; check the control before you send.", width: 1065, height: 945 },
          },
        ],
      },
      {
        heading: "Know who you are talking to",
        steps: [
          {
            title: "Open the details panel",
            body: "The panel on the right shows the visitor, the channel they came from, when the conversation started and was last updated, their country and how long they have been on the site.",
            image: { src: "/media/tutorials/tutorial-live-agent-7.png", alt: "Conversation details panel with channel, status, created and updated times and country", caption: "Context before you answer, without asking the visitor for it.", width: 1431, height: 940 },
          },
          {
            title: "Tag the conversation",
            body: "Add a tag from the same panel to group conversations by topic, customer type or priority. Tags make the inbox searchable once the volume grows.",
            image: { src: "/media/tutorials/tutorial-live-agent-7.png", alt: "Tag control in the conversation details panel", caption: "Agree a small tag list with your team and stick to it.", width: 1431, height: 940 },
          },
          {
            title: "See the pages they visited",
            body: "The panel also lists the pages the visitor has been on, with page titles and time spent. A pricing page open for ten minutes tells you what the question is really about.",
            image: { src: "/media/tutorials/tutorial-live-agent-8.png", alt: "Visited pages list inside the conversation details panel", caption: "Their browsing history usually explains the question.", width: 1435, height: 874 },
          },
          {
            title: "Spot unread messages",
            body: "A counter marks conversations with new messages, so replies that arrive while you are elsewhere do not sit unanswered.",
            image: { src: "/media/tutorials/tutorial-live-agent-9.png", alt: "Inbox showing an unread message indicator on a conversation", caption: "Unread counts stop conversations going cold.", width: 1098, height: 313 },
          },
        ],
      },
      {
        heading: "Review and keep records",
        steps: [
          {
            title: "Filter by date range",
            body: "Pick a start and end date in the calendar and apply it to narrow the inbox to a week, a campaign or a single busy day.",
            image: { src: "/media/tutorials/tutorial-live-agent-10.png", alt: "Date range calendar with a selected range and an Apply button", caption: "Useful for reviewing a launch day after the fact.", width: 999, height: 795 },
          },
          {
            title: "Export one conversation",
            body: "From the conversation menu, choose Export Conversation and download it as text, CSV, PDF or JSON — handy for a support record or a handover to another team.",
            image: { src: "/media/tutorials/tutorial-live-agent-11.png", alt: "Export conversation menu with text, CSV, PDF and JSON download options", caption: "Four formats, so the record fits wherever it needs to go.", width: 1014, height: 795 },
          },
          {
            title: "Export the filtered list",
            body: "The export control above the list saves everything currently filtered as CSV, JSON or PDF — combine it with the date filter to pull a clean monthly report.",
            image: { src: "/media/tutorials/tutorial-live-agent-12.png", alt: "Export menu above the conversation list with CSV, JSON and PDF options", caption: "Set your filters first; the export follows them.", width: 1074, height: 329 },
          },
        ],
      },
      {
        heading: "Working well with handover",
        bullets: [
          "Tell visitors when a person is available; an honest message beats an unanswered chat.",
          "Keep notes factual — they can be exported with the conversation.",
          "Review tagged conversations weekly and feed the common questions back into the chatbot's training.",
          "Handle personal data in line with your privacy policy before you export anything.",
        ],
      },
    ],
    relatedTools: ["ai-smart-inbox", "external-chatbot", "ai-chat"],
    relatedTutorials: ["how-to-build-and-embed-a-website-chatbot", "how-to-manage-sales-with-ai-crm"],
    cta: { toolName: "AI Smart Inbox", toolSlug: "ai-smart-inbox" },
  },
  {
    slug: "how-to-compare-two-ai-models-in-one-chat",
    category: "Chat & Documents",
    title: "How to Compare Two AI Models in One Chat | AmmarAI Tutorials",
    description:
      "Answer the same prompt with two AI models side by side in AmmarAI AI Chat Pro, then keep the response you prefer and carry on the thread.",
    h1: "How to compare two AI models in one chat",
    intro: [
      "Different models answer the same question in different ways. One may be more concise, another more thorough or better at reasoning through numbers. AI Chat Pro lets you run a single prompt through two models at once and read both answers next to each other.",
      "When you have read both, you pick the one you want to keep and the conversation continues from that response.",
    ],
    whenToUse: [
      "The answer matters enough to be worth a second opinion.",
      "You are deciding which model suits a recurring task.",
      "A first answer felt thin and you want an alternative before rewriting the prompt.",
    ],
    sections: [
      {
        heading: "Run one prompt through two models",
        steps: [
          {
            title: "Open the model picker",
            body: "Start a thread in AI Chat Pro and open the model list above the message box. Each card shows the model name, its knowledge cut-off and its output limit, and the search field at the top finds a model by name.",
            image: { src: "/media/tutorials/tutorial-multi-model-1.png", alt: "AI model gallery with two models selected and an Apply button", caption: "Tick a second model to compare answers side by side.", width: 512, height: 299 },
          },
          {
            title: "Select two models and apply",
            body: "Tick the two models you want to hear from, then choose Apply. Both names stay visible at the top of the thread so you always know which pair is answering.",
          },
          {
            title: "Send your prompt once",
            body: "Type the prompt as you normally would and send it. The question goes to both models and the two answers appear in parallel columns, so you can read the difference in depth, structure and tone without repeating yourself.",
            image: { src: "/media/tutorials/tutorial-multi-model-2.png", alt: "Two AI answers to the same question shown side by side in AI Chat Pro", caption: "Both models answer the same prompt in parallel columns.", width: 512, height: 251 },
          },
          {
            title: "Keep the answer you prefer",
            body: "Under the column you want, choose the option to prefer that response. The chosen answer becomes part of the thread and every follow-up message continues from it.",
            image: { src: "/media/tutorials/tutorial-multi-model-3.png", alt: "The preferred response kept in the AI Chat Pro thread", caption: "The preferred answer becomes the thread you carry on with.", width: 512, height: 251 },
          },
        ],
      },
      {
        heading: "Getting useful comparisons",
        bullets: [
          "Compare on a real task, not a trivia question — differences show up in reasoning and structure.",
          "Pair a fast model with a stronger one when you want a sanity check rather than two long answers.",
          "Comparing uses the credits of both models, so use it where the decision is worth it.",
          "A confident answer can still be wrong. Agreement between two models is not proof.",
        ],
      },
    ],
    relatedTools: ["ai-chat", "ai-personas", "ai-deep-research"],
    relatedTutorials: ["how-to-use-ai-chat-pro", "how-to-chat-with-documents"],
    cta: { toolName: "AI Chat Pro", toolSlug: "ai-chat" },
  },
  {
    slug: "how-to-take-bookings-with-your-website-chatbot",
    category: "Chat & Documents",
    title: "How to Take Bookings With Your Website Chatbot | AmmarAI Tutorials",
    description:
      "Turn on the booking assistant in your AmmarAI website chatbot, decide when it should offer a meeting and paste in your scheduling embed code.",
    h1: "How to take bookings with your website chatbot",
    intro: [
      "A chatbot that answers questions is useful. A chatbot that books the meeting while the visitor is still interested is better. The booking assistant adds a scheduler inside the chat window, so an interested visitor picks a slot without leaving the conversation.",
      "You decide when the scheduler appears, and you connect it to the calendar service you already use by pasting its inline embed code.",
    ],
    whenToUse: [
      "Your sales or support process ends in a call or demo.",
      "Visitors ask about availability, pricing or a walkthrough.",
      "You lose enquiries between the chat and a separate booking page.",
    ],
    sections: [
      {
        heading: "Turn on the booking assistant",
        steps: [
          {
            title: "Open the chatbot configuration",
            body: "Open the chatbot you want to change and scroll the configuration panel to the assistant switches, below the interaction type and connect message.",
            image: { src: "/media/tutorials/tutorial-bot-booking-1.png", alt: "Chatbot configuration panel with the booking assistant switch turned on", caption: "The booking assistant sits with the other chatbot switches.", width: 814, height: 885 },
          },
          {
            title: "Switch on Booking Assistant",
            body: "Turn the Booking Assistant switch on. Two further controls appear: the instructions that decide when the scheduler is offered, and the field for your scheduling embed code.",
          },
          {
            title: "Choose when the scheduler appears",
            body: "Select Edit next to the booking instructions and tick the situations that should trigger an offer to book — for example when a visitor asks to schedule a meeting, asks to see a demo, mentions team size, or hesitates. Save the instructions when you are done.",
            image: { src: "/media/tutorials/tutorial-bot-booking-2.png", alt: "When to show booking assistant dialog with selectable conditions", caption: "Tick the moments where a booking offer makes sense.", width: 1048, height: 870 },
          },
          {
            title: "Paste your scheduling embed code",
            body: "Copy the inline embed code from your scheduling service and paste it into the Booking Assistant Embed Code box. Inline is the right format here because the calendar is shown inside the chat window rather than in a pop-up. Continue with Next and save the chatbot.",
            image: { src: "/media/tutorials/tutorial-bot-booking-3.png", alt: "Booking assistant embed code field in the chatbot configuration", caption: "The inline embed code connects your calendar to the chat.", width: 869, height: 901 },
          },
          {
            title: "Test it in the preview",
            body: "Open the chatbot preview and ask for a meeting in plain language. The scheduler should appear in the conversation with your real availability; if it does not, re-check that the embed code is the inline variant and that a matching condition is ticked.",
          },
        ],
      },
      {
        heading: "Good practice",
        bullets: [
          "Keep the conditions narrow. A scheduler offered on every message feels pushy.",
          "Hide page details and cookie banners in the embed so the calendar fits the chat window.",
          "Keep your availability current — a booking assistant is only as good as the calendar behind it.",
        ],
      },
    ],
    relatedTools: ["external-chatbot", "ai-chat-bots", "ai-smart-inbox"],
    relatedTutorials: ["how-to-build-and-embed-a-website-chatbot", "how-to-hand-chats-to-a-human-agent"],
    cta: { toolName: "External Chatbot", toolSlug: "external-chatbot" },
  },
  {
    slug: "how-to-answer-shop-questions-with-your-chatbot",
    category: "Chat & Documents",
    title: "How to Answer Shop Questions With Your Chatbot | AmmarAI Tutorials",
    description:
      "Connect your online store to an AmmarAI website chatbot so it can answer order, tracking and product questions, and choose which shop details it may use.",
    h1: "How to answer shop questions with your chatbot",
    intro: [
      "Most store enquiries are the same few questions: where is my order, is this in stock, what does delivery cost. The shopping assistant lets your website chatbot read that information from your store and answer it in the conversation.",
      "You choose which store it reads from and which parts of the shop it is allowed to talk about.",
    ],
    whenToUse: [
      "Order status and tracking questions take up your support time.",
      "Shoppers ask about stock, shipping or returns before buying.",
      "You want answers that reflect the store right now, not a static FAQ.",
    ],
    sections: [
      {
        heading: "Connect the store",
        steps: [
          {
            title: "Switch on Shopping Assistant",
            body: "Open the chatbot configuration and turn on the Shopping Assistant switch, below the booking and voice options.",
          },
          {
            title: "Pick the shop source",
            body: "Open the Shop Source list and choose the platform your store runs on. The fields underneath change to match the platform you pick, asking for your own store address and its connection details.",
            image: { src: "/media/tutorials/tutorial-bot-shop-1.png", alt: "Shop source dropdown in the chatbot configuration", caption: "Choose the platform your store runs on.", width: 782, height: 893 },
          },
          {
            title: "Enter your store connection details",
            body: "Fill in your store address and the access details it issues for read access. These belong to your own shop, so generate them from your store admin and keep them private.",
          },
        ],
      },
      {
        heading: "Choose what the assistant may discuss",
        steps: [
          {
            title: "Open Shop Features",
            body: "Select Edit next to Shop Features. This is where you decide how much of the shop the assistant may pull into a conversation.",
            image: { src: "/media/tutorials/tutorial-bot-shop-2.png", alt: "Shop features edit button in the chatbot configuration", caption: "Shop Features controls what the assistant may use.", width: 756, height: 894 },
          },
          {
            title: "Select the shop details to expose",
            body: "Tick the areas you want available — payment methods, shipping methods, coupons and product reviews are each optional. Leave anything off that you would rather answer yourself, then save the features.",
            image: { src: "/media/tutorials/tutorial-bot-shop-3.png", alt: "Shop features dialog with payment, shipping, coupon and review options", caption: "Only the ticked areas are available to the assistant.", width: 1039, height: 908 },
          },
          {
            title: "Test with a real order",
            body: "Save the chatbot, open the preview and ask about a genuine order number and a product you stock. Confirm the reply matches what your store shows before you put the chatbot in front of customers.",
          },
        ],
      },
      {
        heading: "Good practice",
        bullets: [
          "Grant read access only — the assistant never needs to change orders.",
          "For anything wordy, such as a returns policy, training the chatbot on that page often reads better than pulling raw shop data.",
          "Re-test after a store change; renamed fields or revoked access stop the answers silently.",
        ],
      },
    ],
    relatedTools: ["external-chatbot", "ai-chat-bots", "ai-smart-inbox"],
    relatedTutorials: ["how-to-build-and-embed-a-website-chatbot", "how-to-take-bookings-with-your-website-chatbot"],
    cta: { toolName: "External Chatbot", toolSlug: "external-chatbot" },
  },
  {
    slug: "how-to-use-temporary-chat",
    category: "Chat & Documents",
    title: "How to Use Temporary Chat in AI Chat Pro | AmmarAI Tutorials",
    description:
      "Turn on temporary chat in AmmarAI's AI Chat Pro to hold a one-off conversation that is not kept in your chat history, and know exactly when it switches off again.",
    h1: "How to use temporary chat",
    intro: [
      "Temporary chat is for conversations you do not want kept. Switch it on and the exchange runs normally, but it is not written to your chat history.",
      "It is a per-conversation switch, not a setting you configure once, so it is easy to turn on for a quick question and forget about afterwards.",
    ],
    whenToUse: [
      "You are testing a prompt and do not want the attempt cluttering your history.",
      "The conversation involves details you would rather not keep on file.",
      "You want a clean, one-off answer with no follow-up thread.",
    ],
    sections: [
      {
        heading: "Turn it on",
        steps: [
          {
            title: "Open AI Chat Pro",
            body: "Start a new conversation. The row of icons at the right of the message box holds the extra chat controls, including the temporary chat icon.",
            image: { src: "/media/tutorials/tutorial-temporary-chat-1.png", alt: "Message box in AI Chat Pro with the temporary chat icon at the right", caption: "The temporary chat icon sits in the message box controls.", width: 1268, height: 195 },
          },
          {
            title: "Select the temporary chat icon",
            body: "Click it once. The icon fills in and a short notice appears above the message box confirming that the conversation will not be saved to your chat history.",
            image: { src: "/media/tutorials/tutorial-temporary-chat-2.png", alt: "Temporary chat enabled notice above the message box", caption: "The notice above the box confirms temporary mode is active.", width: 1262, height: 270 },
          },
          {
            title: "Chat as normal",
            body: "Write your prompt and continue the conversation as usual. Everything else behaves the same; only the saving of the thread changes.",
          },
        ],
      },
      {
        heading: "When it switches off",
        paragraphs: [
          "Temporary mode is deliberately short-lived. It stays on until you click the icon again to unselect it, move to another page, or refresh the page — after any of those it turns off by itself and later conversations are saved again.",
        ],
        callouts: [
          {
            type: "note",
            body: "The conversation is not stored in your chat history, but anything you upload or generate during it can still appear in your content library.",
          },
          {
            type: "tip",
            body: "Check that the icon is still filled in before you send a sensitive message — a page refresh quietly returns you to a normal, saved chat.",
          },
        ],
      },
    ],
    relatedTools: ["ai-chat", "web-page-chat", "ai-command-search"],
    relatedTutorials: ["how-to-use-ai-chat-pro", "how-to-compare-two-ai-models-in-one-chat"],
    cta: { toolName: "AI Chat Pro", toolSlug: "ai-chat" },
  },
  {
    slug: "how-to-edit-part-of-an-image-with-annotations",
    category: "Image",
    title: "How to Edit Part of an Image With Annotations | AmmarAI Tutorials",
    description:
      "Mark a region on an image in the AmmarAI Creative Suite canvas, attach an instruction to it, and have the edit applied to that area only while the rest stays untouched.",
    h1: "How to edit part of an image with annotations",
    intro: [
      "Broad prompts change more of an image than you intended. Annotations let you draw on the exact area you want changed and attach the instruction to that region, so the rest of the picture is left alone.",
      "This works on any image placed on the Creative Suite canvas.",
    ],
    whenToUse: [
      "One detail is wrong and a full re-generation would lose the rest.",
      "You need to describe a change by pointing at it rather than in words alone.",
      "Several people are reviewing a design and want to mark up specific spots.",
    ],
    sections: [
      {
        heading: "Enter annotation mode",
        steps: [
          {
            title: "Select the image on the canvas",
            body: "Click the image element you want to change. A small toolbar appears above it with tabs for the image, replacing the image, and annotating.",
          },
          {
            title: "Choose Annotate",
            body: "Select Annotate in that toolbar. The canvas switches to annotation view and a drawing toolbar appears along the bottom of the screen.",
            image: { src: "/media/tutorials/tutorial-annotation-1.png", alt: "Creative Suite canvas with the image toolbar and the Annotate tab", caption: "Annotate sits in the toolbar above the selected image.", width: 1550, height: 808 },
          },
        ],
      },
      {
        heading: "Mark the area and describe the change",
        steps: [
          {
            title: "Pick a drawing tool",
            body: "The bottom toolbar offers a colour picker plus rectangle, oval, freehand brush and lasso shapes, along with comment and speech-bubble markers for notes tied to a point.",
            image: { src: "/media/tutorials/tutorial-annotation-2.png", alt: "Annotation toolbar with colour picker, shape, brush, lasso and comment tools", caption: "Draw with shapes, a brush or a lasso, and add comments to a point.", width: 1593, height: 964 },
          },
          {
            title: "Draw over the region",
            body: "Draw around the part of the image you want changed. You can place several marks, but only one can be selected for submission at a time; the active one is highlighted.",
          },
          {
            title: "Write the instruction and submit",
            body: "With the mark selected, type what should change in that region and choose Done. Only the marked area is re-generated, and the rest of the image is left exactly as it was.",
          },
        ],
      },
      {
        heading: "Good practice",
        bullets: [
          "Draw a little wider than the object so edges blend naturally.",
          "Describe the result you want in the region, not the tool you would use.",
          "Each submission is a separate AI edit, so it uses credits the same way a generation does.",
          "Work one region at a time and review between edits rather than stacking marks.",
        ],
      },
    ],
    relatedTools: ["ai-creative-suite", "ai-image-generator", "ai-image-editor"],
    relatedTutorials: ["how-to-use-the-ai-creative-suite", "how-to-use-ai-image-pro"],
    cta: { toolName: "AI Creative Suite", toolSlug: "ai-creative-suite" },
  },
  {
    slug: "how-to-invite-teammates-to-your-workspace",
    category: "Productivity",
    title: "How to Invite Teammates to Your Workspace | AmmarAI Tutorials",
    description:
      "Invite colleagues into your AmmarAI workspace by email, see how they accept, and understand how team members draw on the workspace owner's credits.",
    h1: "How to invite teammates to your workspace",
    intro: [
      "A workspace can be shared. Invite a colleague by email and they work alongside you with the same brand profiles, templates and assistants, instead of each person starting from a blank prompt box.",
      "Invited members work from the workspace owner's allowance, so there is one balance to watch rather than one per person.",
    ],
    whenToUse: [
      "Two or more people write, design or publish from the same brand.",
      "You want new joiners to inherit the prompts and templates you have already refined.",
      "An agency runs a separate workspace per client and needs staff in each one.",
    ],
    sections: [
      {
        heading: "Send the invitation",
        steps: [
          {
            title: "Open your team settings",
            body: "Sign in as the workspace owner and open the team area of your account. Seat-based team access is part of the Ultimate plan, so make sure your plan includes the seats you need before inviting.",
          },
          {
            title: "Enter a colleague's email address",
            body: "Type the email address of the person you want to add and send the invitation. Repeat for each colleague — one address per invitation.",
            image: { src: "/media/tutorials/tutorial-team-invite-1.png", alt: "Team invitation panel with an email address field and an invite button", caption: "Invite colleagues by email address, one at a time.", width: 1080, height: 845 },
          },
          {
            title: "Let them accept",
            body: "Each person receives an email with a link. Opening it takes them to sign in or create an account, and once that is done they join your workspace automatically.",
          },
        ],
      },
      {
        heading: "How shared usage works",
        bullets: [
          "Team members spend from the workspace owner's allowance, not a separate personal balance.",
          "Keep an eye on usage across the workspace so a busy month does not run the balance down unexpectedly.",
          "Seats are tied to your plan, so add seats before inviting more people than the plan covers.",
          "Agencies should keep one workspace per client so brand voices and templates never mix.",
        ],
        callouts: [
          {
            type: "tip",
            body: "Set up your brand profiles and reusable templates before inviting people — new members then start from your house style rather than their own.",
          },
        ],
      },
    ],
    relatedTools: ["ai-writer", "ai-chat", "ai-image-editor"],
    relatedTutorials: ["how-to-use-the-content-manager", "how-to-use-ai-chat-pro"],
    cta: { toolName: "Team Workspaces", toolSlug: "team-workspaces", kind: "feature" },
  },
  {
    slug: "how-to-publish-a-post-to-wordpress",
    category: "Productivity",
    title: "How to Publish a Post to WordPress | AmmarAI Tutorials",
    description:
      "Connect your WordPress site to AmmarAI once, then send finished articles straight to your blog from the editor without copying and pasting.",
    h1: "How to publish a post to WordPress",
    intro: [
      "Writing the article is only half the job. Getting it onto the blog — with the headings, links and formatting intact — is where most of the fiddling happens.",
      "Connect your WordPress site to AmmarAI once and every finished draft can be sent to your blog with a single button, exactly as it was written.",
    ],
    whenToUse: [
      "Your blog runs on WordPress and you publish regularly.",
      "You are tired of pasting drafts into the WordPress editor and re-fixing the formatting.",
      "You want your AI Blogger Agent articles to land on the live site automatically.",
    ],
    sections: [
      {
        heading: "Connect your WordPress site",
        steps: [
          {
            title: "Open the integrations page",
            body: "In your AmmarAI account, open Integrations from the left-hand menu. This is where the blog connections live.",
            image: {
              src: "/media/tutorials/tutorial-wordpress-1.png",
              alt: "Integrations page showing a WordPress card with an Integrate button, with red arrows pointing at the Integration menu item and the button",
              caption: "Open Integrations, then press Integrate on the WordPress card.",
              width: 1094,
              height: 838,
            },
          },
          {
            title: "Add your site details",
            body: "Press Integrate on the WordPress card and enter your blog address together with the username and application password of the account that is allowed to publish. Save to finish the connection.",
          },
          {
            title: "Check the connection",
            body: "Once saved, the card shows the site as connected. If it does not, the usual cause is a mistyped address or a password that belongs to an account without publishing rights.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Use an application password created inside WordPress rather than your normal login password — it can be revoked at any time without changing how you sign in.",
          },
        ],
      },
      {
        heading: "Send an article to your blog",
        steps: [
          {
            title: "Open the finished document",
            body: "Go to your documents and open the article you want to publish. Everything you wrote — headings, lists and links — travels with it.",
          },
          {
            title: "Read it through and press Share",
            body: "Make any last edits in the editor, then press Share. The article is sent to your connected WordPress site as a new post.",
            image: {
              src: "/media/tutorials/tutorial-wordpress-2.png",
              alt: "Share to WordPress screen showing the finished article in the editor with a Share button below it",
              caption: "The finished article, ready to send to WordPress with the Share button.",
              width: 1334,
              height: 738,
            },
          },
          {
            title: "Review it on your blog",
            body: "Open the post in WordPress to set the category, featured image and publish time. Publishing from AmmarAI gets the writing in place; the final presentation is still yours to decide.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Pair this with the AI Blogger Agent so researched, written and internally linked articles arrive on your blog on a schedule instead of one at a time.",
          },
        ],
      },
    ],
    relatedTools: ["ai-blogger-agent", "article-wizard", "ai-writer"],
    relatedTutorials: ["how-to-use-ai-blogger-agent", "how-to-use-the-content-manager"],
    cta: { toolName: "AI Blogger Agent", toolSlug: "ai-blogger-agent" },
  },
  {
    slug: "how-to-read-whatsapp-and-telegram-messages-in-one-inbox",
    category: "Automation",
    title: "How to Read WhatsApp and Telegram Messages in One Inbox | AmmarAI Tutorials",
    description:
      "Bring WhatsApp, Telegram and your other message channels into a single AmmarAI inbox, filter by channel and reply without switching apps.",
    h1: "How to read WhatsApp and Telegram messages in one inbox",
    intro: [
      "Messages arrive everywhere: the website chat, a WhatsApp number, a Telegram account, social replies. Checking four apps is how a good lead goes cold.",
      "The Smart Inbox pulls those conversations into one threaded list. You can look at everything together or narrow it to a single channel, and reply from the same screen.",
    ],
    whenToUse: [
      "Customers message you on more than one platform.",
      "Two people share the replying and nobody is sure what has been answered.",
      "You want one place to catch questions instead of a phone, a laptop and a browser tab.",
    ],
    sections: [
      {
        heading: "Open the inbox and pick a channel",
        steps: [
          {
            title: "Open Inbox",
            body: "Choose Inbox from the left-hand menu. Every conversation from your connected channels appears in the middle column, newest first.",
          },
          {
            title: "Filter by channel",
            body: "Use the channel selector at the top of the list. Leave it on all channels for the full picture, or pick WhatsApp or Telegram when you want to work through one platform at a time.",
            image: {
              src: "/media/tutorials/tutorial-unified-inbox-1.png",
              alt: "Message list with the channel selector open, showing options for all channels, Telegram and WhatsApp, with red arrows pointing at each option",
              caption: "The channel selector switches between all conversations and a single platform.",
              width: 1903,
              height: 932,
            },
          },
          {
            title: "Open a conversation",
            body: "Select a thread to see its whole history in the panel on the right, including which channel it came from and who you are talking to.",
          },
        ],
      },
      {
        heading: "Reply and keep the queue moving",
        steps: [
          {
            title: "Write your reply",
            body: "Type in the message box at the bottom of the thread and send. The reply goes out on the channel the person used, so they receive it where they wrote to you.",
          },
          {
            title: "Let the AI take the routine ones",
            body: "Opening hours, prices, delivery times and other repeat questions can be answered automatically, with a draft waiting for your approval on anything less obvious.",
          },
          {
            title: "Hand over what needs a person",
            body: "Complaints, refunds and real buying signals are worth taking over yourself. Assign the thread to a teammate with a note so it is picked up rather than passed around.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Work channel by channel when the list is long — filtering to one platform keeps the tone and the context consistent while you reply.",
          },
        ],
      },
    ],
    relatedTools: ["ai-smart-inbox", "external-chatbot", "ai-crm"],
    relatedTutorials: ["how-to-hand-chats-to-a-human-agent", "how-to-build-and-embed-a-website-chatbot"],
    cta: { toolName: "AI Smart Inbox", toolSlug: "ai-smart-inbox" },
  },
  {
    slug: "how-to-clone-your-own-voice-for-voiceovers",
    category: "Audio",
    title: "How to Clone Your Own Voice for Voiceovers | AmmarAI Tutorials",
    description:
      "Record a short sample, create a clone of your own voice in AmmarAI, and use it for narration across videos, courses and product audio.",
    h1: "How to clone your own voice for voiceovers",
    intro: [
      "A cloned voice lets you narrate a video at midnight without setting up a microphone, and keeps every video in the same voice even when the script changes at the last minute.",
      "You record one clear sample, AmmarAI builds the clone, and from then on it sits alongside the standard voices whenever you generate a voiceover.",
    ],
    whenToUse: [
      "You narrate your own videos and want a consistent sound without re-recording.",
      "Scripts change often and re-recording every tweak is not realistic.",
      "You want your voice, in your language, reading material you wrote.",
    ],
    sections: [
      {
        heading: "Record a usable sample",
        steps: [
          {
            title: "Record at least a minute of speech",
            body: "Read naturally for a minute or more in a quiet room, at your normal pace. Avoid music, background chatter and heavy room echo — the clone copies whatever it hears.",
          },
          {
            title: "Keep it to one speaker",
            body: "Only your voice should be in the recording. A second person in the background makes the clone sound uneven.",
          },
        ],
        callouts: [
          {
            type: "warning",
            body: "Only clone a voice you own or have clear permission to use. Cloning someone else's voice without consent is not acceptable use.",
          },
        ],
      },
      {
        heading: "Create the clone and use it",
        steps: [
          {
            title: "Open the voice cloning area",
            body: "Go to AI Voiceover & Voice Clone from the left-hand menu and choose to add a new cloned voice.",
          },
          {
            title: "Upload the recording and name the voice",
            body: "Upload your audio file and give the voice a name you will recognise later, such as your own name or the brand it belongs to. Save to start the cloning process.",
          },
          {
            title: "Pick it when you generate a voiceover",
            body: "Once processing finishes, the cloned voice appears in the voice list, usually at the top. Select it, paste your script and generate as you would with any other voice.",
          },
          {
            title: "Direct the delivery",
            body: "Adjust pace, emphasis and pauses on individual lines until it sounds like you reading, not you being read out.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Record the sample in the language you will narrate in most often — the clone is strongest in the accent and language it heard.",
          },
        ],
      },
    ],
    relatedTools: ["ai-voice-generator", "ai-text-to-speech", "ai-dubbing"],
    relatedTutorials: ["how-to-dub-a-video", "how-to-use-ai-captions"],
    cta: { toolName: "AI Voiceover & Voice Clone", toolSlug: "ai-voice-generator" },
  },
  {
    slug: "how-to-get-keyword-and-question-ideas-in-the-article-wizard",
    category: "Productivity",
    title: "How to Get Keyword and Question Ideas in the Article Wizard | AmmarAI Tutorials",
    description:
      "Use live keyword suggestions and real search questions inside the AmmarAI Article Wizard so your article answers what people are actually searching for.",
    h1: "How to get keyword and question ideas in the Article Wizard",
    intro: [
      "An article only earns traffic if it matches what people type into a search box. Guessing at that is the slowest way to find out you guessed wrong.",
      "The Article Wizard can suggest keywords drawn from recent searches, and show the questions people are asking around your topic, while you are still building the outline.",
    ],
    whenToUse: [
      "You are writing for search, not just for the blog archive.",
      "You have a topic but are not sure which phrasing people actually use.",
      "You want the article's sections to answer real questions rather than invented ones.",
    ],
    sections: [
      {
        heading: "Start with keyword suggestions",
        steps: [
          {
            title: "Open the Article Wizard and enter your topic",
            body: "Start a new article and describe what the piece is about in plain words — the product, the problem or the subject.",
          },
          {
            title: "Ask for keyword suggestions",
            body: "At the keyword step, request suggestions. You get phrases based on recent searches around your topic rather than a generic word list.",
          },
          {
            title: "Keep the ones that match your intent",
            body: "Choose the phrases a buyer or reader would genuinely type. Two or three well-matched phrases beat a long list you then have to force into sentences.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Suggestions are a starting point, not a quota. Write the sentence the reader needs and let the phrase fit naturally.",
          },
        ],
      },
      {
        heading: "Turn real questions into sections",
        steps: [
          {
            title: "Move to the outline step",
            body: "Once your keywords are chosen, continue to the outline where the wizard proposes the article's structure.",
          },
          {
            title: "Pull in the questions people search",
            body: "Ask for search questions on your topic. These are the things people are asking right now, which makes them the strongest candidates for headings.",
          },
          {
            title: "Answer each one properly",
            body: "Turn the questions you keep into sections and answer them directly in the first sentence underneath. Readers and search engines both reward a straight answer.",
          },
          {
            title: "Write and review section by section",
            body: "Let the wizard draft each section, then edit for accuracy. Anything you cannot verify should come out before you publish.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Save the questions you did not use — each one is a candidate for the next article, and together they build a topic cluster.",
          },
        ],
      },
    ],
    relatedTools: ["article-wizard", "keyword-generator", "ai-seo-analyzer"],
    relatedTutorials: ["how-to-use-ai-blogger-agent", "how-to-publish-a-post-to-wordpress"],
    cta: { toolName: "Article Wizard", toolSlug: "article-wizard" },
  },
  {
    slug: "how-to-connect-your-chatbot-to-messaging-channels",
    category: "Chat & Documents",
    title: "How to Connect Your Chatbot to WhatsApp, Telegram and Instagram | AmmarAI Tutorials",
    description:
      "Use the Channel step in the AmmarAI chatbot builder to let the same trained bot answer on WhatsApp, Telegram, Messenger and Instagram as well as your website.",
    h1: "How to connect your chatbot to messaging channels",
    intro: [
      "A chatbot that only lives on your website misses everyone who messages you on WhatsApp or replies to a story on Instagram.",
      "The Channel step of the chatbot builder points the bot you already trained at those apps, so the answers are identical wherever the question arrives — and every conversation still lands in your inbox.",
    ],
    whenToUse: [
      "Customers reach you on messaging apps more often than through the website.",
      "You want one trained bot answering everywhere instead of a different script per app.",
      "You want channel conversations to arrive in the same inbox as website chats.",
    ],
    sections: [
      {
        heading: "Open the Channel step",
        steps: [
          {
            title: "Edit the bot you want to connect",
            body: "Go to your chatbots, open the bot you have already configured, styled and trained, and move through the builder to the final Channel step.",
            image: {
              src: "/media/tutorials/tutorial-channels-1.png",
              alt: "Chatbot builder on the Channel step, with the Channel tab highlighted in red and a connected WhatsApp channel listed below the channel tile",
              caption: "The Channel step sits at the end of the builder, after Configure, Customize, Train and Embed.",
              width: 3000,
              height: 1506,
            },
          },
          {
            title: "Pick a channel",
            body: "Choose the app you want the bot to answer in — WhatsApp, Telegram, Messenger or Instagram. The step is optional, so a website-only bot can skip it entirely.",
            image: {
              src: "/media/tutorials/tutorial-channels-2.png",
              alt: "Channel tiles for Telegram, WhatsApp, Messenger and Instagram with a connection dialog open and a red arrow pointing at the sign-in button",
              caption: "Each channel opens its own short connection dialog.",
              width: 972,
              height: 705,
            },
          },
          {
            title: "Complete the short connection dialog",
            body: "Some channels ask you to sign in to the account you want to answer from; others ask for the identifier of the number or account. Fill in what the dialog asks for and save.",
          },
          {
            title: "Confirm the channel is live",
            body: "A connected channel appears in the list underneath with its status. If it shows as pending, the connection has not finished — reopen it and complete the sign-in.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Connect a channel once the bot is trained and you are happy with its answers. Whatever it says on your site is what it will say in the messaging app.",
          },
        ],
      },
      {
        heading: "Work the conversations that arrive",
        steps: [
          {
            title: "Read them in one place",
            body: "Messages from connected channels flow into the Smart Inbox alongside website chats, each thread labelled with the app it came from.",
          },
          {
            title: "Take over when it matters",
            body: "With human handover enabled, a visitor can ask for a person on any channel and the conversation moves to you with the full transcript attached.",
          },
          {
            title: "Keep improving the training",
            body: "Messaging apps surface phrasing your website visitors never use. Feed the questions the bot could not answer back into its training every week.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Start with one channel. Get the answers right there before adding the rest, so you are only fixing one conversation stream at a time.",
          },
        ],
      },
    ],
    relatedTools: ["external-chatbot", "ai-smart-inbox", "ai-chat"],
    relatedTutorials: ["how-to-build-and-embed-a-website-chatbot", "how-to-hand-chats-to-a-human-agent"],
    cta: { toolName: "External Chatbot Builder", toolSlug: "external-chatbot" },
  },
  {
    slug: "how-to-audit-a-page-with-the-ai-seo-analyzer",
    category: "Productivity",
    title: "How to Audit a Page With the AI SEO Analyzer | AmmarAI Tutorials",
    description:
      "Score a live URL, check a draft before you publish and size up a keyword — and learn which of the reported issues to fix first.",
    h1: "How to audit a page with the AI SEO Analyzer",
    intro: [
      "Most SEO advice is a list of everything that could possibly matter. That is not useful when you have one page and an hour.",
      "The AI SEO Analyzer scores the page you actually have, lists the issues behind that score, and lets you re-run the check after a fix to confirm the number moved.",
    ],
    whenToUse: [
      "A page ranks below where you expect and you want to know why before rewriting it.",
      "You are about to publish a draft and want a readability and density check first.",
      "You are choosing between two keywords and need volume and difficulty side by side.",
    ],
    sections: [
      {
        heading: "Score a live page",
        steps: [
          {
            title: "Run a URL analysis",
            body: "Open the SEO Analyzer, stay on URL Analysis, paste the full address of the page including https, and run the check.",
          },
          {
            title: "Read the score with the issues, not on its own",
            body: "The score is a summary; the issue list underneath is the actionable part. Work down it rather than chasing the number.",
          },
          {
            title: "Check the crawler's view of the page",
            body: "Confirm the title, meta description, status code and load time are what you intended. A wrong title or a slow response explains more rankings problems than most content edits.",
          },
          {
            title: "Confirm the technical basics",
            body: "HTTPS, mobile rendering, a reachable sitemap and a sane robots.txt all show in one card. Any red here outranks every content fix on your list.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Fix one thing, re-run, and note the change. A single fix per run is the only way to learn which of them actually moves the score on your site.",
          },
        ],
      },
      {
        heading: "Check a draft before it goes live",
        steps: [
          {
            title: "Switch to Text Analysis",
            body: "Paste the draft instead of a URL. You get word count, reading time, readability and keyword density without needing the page published first.",
          },
          {
            title: "Treat density as a ceiling, not a target",
            body: "If your keyword is over-represented, cut instances rather than adding synonyms. Readers notice repetition long before a search engine penalises it.",
          },
          {
            title: "Act on the suggested edits",
            body: "The report names specific sentences and structures to change. Apply the ones that also make the draft easier to read and ignore any that would make it worse.",
          },
        ],
      },
      {
        heading: "Size up a keyword before committing",
        steps: [
          {
            title: "Open the Keywords tab",
            body: "Enter the term you are considering and read monthly volume, difficulty, CPC and competition together.",
          },
          {
            title: "Pick the variant you can realistically win",
            body: "Scan the related terms. A lower-volume phrase you can rank for this quarter beats a high-volume one you cannot.",
          },
          {
            title: "Hand the chosen keyword to the writer",
            body: "Take the term straight into the Article Wizard so the outline and headings are built around it from the start.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "High CPC on a keyword is a buying-intent signal. Those terms convert, which is usually why they are also the hardest to rank for.",
          },
        ],
      },
    ],
    relatedTools: ["ai-seo-analyzer", "article-wizard", "ai-blogger-agent"],
    relatedTutorials: ["how-to-get-keyword-and-question-ideas-in-the-article-wizard"],
    cta: { toolName: "AI SEO Analyzer", toolSlug: "ai-seo-analyzer" },
  },
  {
    slug: "how-to-run-a-cited-research-report-with-ai-deep-research",
    category: "Productivity",
    title: "How to Run a Cited Research Report With AI Deep Research | AmmarAI Tutorials",
    description:
      "Frame the question, choose the depth, and turn a live multi-source research run into a report you can defend, with every claim linked to its source.",
    h1: "How to run a cited research report with AI Deep Research",
    intro: [
      "A normal chat answer stops at the model's training date and gives you no way to check where anything came from.",
      "Deep Research searches the live web, opens the pages that matter, compares what they say, and returns a structured report with links behind the claims.",
    ],
    whenToUse: [
      "You need current facts — pricing, regulation, competitor moves, market size.",
      "The output will be read by someone who will ask where a number came from.",
      "One source is not enough and you do not want to open twenty tabs yourself.",
    ],
    sections: [
      {
        heading: "Frame the question properly",
        steps: [
          {
            title: "Write the question, not the topic",
            body: "\"Which project tools under 20 dollars per seat include time tracking, as of this month\" returns a usable report. \"Project tools\" returns a shapeless overview.",
          },
          {
            title: "State the scope",
            body: "Name the market, the time window and the audience. Scope is what stops the agent wandering into adjacent topics.",
          },
          {
            title: "Name the sources you already trust",
            body: "If you want vendor pricing pages and regulator publications rather than listicles, say so in the brief.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Add the decision you are making at the end of the brief. Knowing the report feeds a pricing decision changes what the agent chooses to include.",
          },
        ],
      },
      {
        heading: "Set the depth and run it",
        steps: [
          {
            title: "Choose a depth that matches the stakes",
            body: "A quick scan orients you on an unfamiliar topic. A balanced overview suits most briefs. Reserve the exhaustive run for decisions you will have to justify.",
          },
          {
            title: "Let the run finish",
            body: "The agent searches, opens the relevant pages and extracts facts. A deep run takes longer because it is reading more, not because it is stuck.",
          },
          {
            title: "Read the disagreements first",
            body: "Where sources conflict, the report says so. Those passages are where your own judgement is worth the most.",
          },
        ],
      },
      {
        heading: "Use the report",
        steps: [
          {
            title: "Spot-check the citations",
            body: "Open two or three links and confirm the page says what the report says it does. Do this every time before anything is published or presented.",
          },
          {
            title: "Turn it into the thing you needed",
            body: "Take the finished report into a writer or the presentation maker instead of rewriting it by hand.",
          },
          {
            title: "Re-run when it ages",
            body: "Pricing and regulation move. Re-running the same brief a quarter later gives you a comparable report rather than a fresh guess.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Deep Research reports what the sources say. If the live web is wrong about something, the report will be too — which is exactly why the citations are there.",
          },
        ],
      },
    ],
    relatedTools: ["ai-deep-research", "article-wizard", "ai-presentation-maker"],
    relatedTutorials: ["how-to-create-ai-presentations", "how-to-audit-a-page-with-the-ai-seo-analyzer"],
    cta: { toolName: "AI Deep Research", toolSlug: "ai-deep-research" },
  },
  {
    slug: "how-to-put-a-garment-on-a-model-with-ai-fashion-try-on",
    category: "Fashion",
    title: "How to Put a Garment on a Model With AI Fashion Try-On | AmmarAI Tutorials",
    description:
      "Turn the flat garment photo you already have into worn product imagery — correct fit and drape, several body types, one consistent look across a collection.",
    h1: "How to put a garment on a model with AI Fashion Try-On",
    intro: [
      "A folded flat lay tells a shopper nothing about length, fit or how the fabric falls, and a model shoot means casting, studio time and a wait — repeated for every colourway.",
      "Fashion Try-On renders the garment photo you already have as worn imagery, so one sample photo covers the whole product page.",
    ],
    whenToUse: [
      "You have flat-lay or mannequin photos and need worn shots.",
      "You want the same piece shown on several body types and skin tones.",
      "A colourway or a new drop needs imagery before a shoot is possible.",
    ],
    sections: [
      {
        heading: "Prepare and upload the garment",
        steps: [
          {
            title: "Start from the best flat shot you have",
            body: "Even lighting, the whole item in frame, no crop through a sleeve or hem, prints and trims in focus. The render can only be as accurate as the input.",
          },
          {
            title: "Upload it",
            body: "Open Fashion Try-On and add the garment image. A clean mannequin shot works as well as a flat lay.",
          },
          {
            title: "Handle one piece at a time",
            body: "For a full outfit, add each garment as its own layer rather than uploading a styled composite.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Photograph the sample once, properly. Every colourway can then be produced from that single shot.",
          },
        ],
      },
      {
        heading: "Choose the model and the setting",
        steps: [
          {
            title: "Pick the body type and look",
            body: "Set body type, height and skin tone to match the customers you actually sell to, not just one standard model.",
          },
          {
            title: "Choose the setting",
            body: "Studio for product pages, street or interior for lookbooks and ads. Keep it consistent across a collection so the grid looks deliberate.",
          },
          {
            title: "Generate the views you need",
            body: "Front, side and a detail view usually cover a product page. Generate them in the same session so the light matches.",
          },
        ],
      },
      {
        heading: "Check and ship the images",
        steps: [
          {
            title: "Inspect the details before publishing",
            body: "Check seams, prints, logos and hem length against the real garment. Detail accuracy is what makes the imagery trustworthy — and what causes returns when it is wrong.",
          },
          {
            title: "Regenerate rather than retouch",
            body: "If the drape or fit looks off, change the model or setting and run it again. That is faster than fixing it in an editor.",
          },
          {
            title: "Keep one model per collection",
            body: "Reusing the same model and light across every product makes the whole catalogue read as one shoot.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Show the fit honestly. Imagery that flatters a garment beyond what it does in real life just moves the cost to your returns.",
          },
        ],
      },
    ],
    relatedTools: ["ai-virtual-try-on", "ai-photoshoot", "ai-image-generator"],
    relatedTutorials: ["how-to-use-fashion-studio", "how-to-use-ai-image-pro"],
    cta: { toolName: "AI Fashion Try-On", toolSlug: "ai-virtual-try-on" },
  },
  {
    slug: "how-to-transcribe-a-meeting-or-interview",
    category: "Audio",
    title: "How to Transcribe a Meeting or Interview | AmmarAI Tutorials",
    description:
      "Turn a recording into a timestamped, speaker-labelled transcript you can search, quote, summarise and export as subtitles.",
    h1: "How to transcribe a meeting or interview",
    intro: [
      "An audio file is something you have to scrub through. A transcript is something you can search.",
      "AI Transcription separates the speakers, attaches timestamps and gives you a document — which makes pulling a quote, finding the moment a decision was made, or producing subtitles almost free.",
    ],
    whenToUse: [
      "You need a written record of a call, interview, podcast or lecture.",
      "You want to quote someone accurately rather than from memory.",
      "A video needs subtitles and you have the audio already.",
    ],
    sections: [
      {
        heading: "Get the recording right",
        steps: [
          {
            title: "Record per speaker where you can",
            body: "A remote call recorded with separate speaker tracks transcribes close to perfectly. Several people around one laptop with an air conditioner running will produce errors, especially on names and overlapping speech.",
          },
          {
            title: "Upload the audio or video",
            body: "Open AI Transcription and add the file. Common audio and video formats are accepted, so a screen recording works as well as an audio file.",
          },
          {
            title: "Set the language",
            body: "Name the spoken language rather than leaving it to be guessed, particularly for accented speech or anything with technical vocabulary.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Ask everyone to say their name at the start. Speaker labels are far easier to correct when each voice introduces itself.",
          },
        ],
      },
      {
        heading: "Work with the transcript",
        steps: [
          {
            title: "Fix the speaker labels",
            body: "Rename the detected speakers once and the whole transcript updates. Do this before you share it with anyone.",
          },
          {
            title: "Jump to the audio from any line",
            body: "Timestamps link back to the recording, so you can confirm a disputed passage in seconds instead of scrubbing.",
          },
          {
            title: "Review anything you intend to quote",
            body: "Budget a few minutes to check names, numbers and technical terms before a quote goes anywhere public.",
          },
          {
            title: "Search across your recordings",
            body: "Once processed, every transcript is searchable, so \"when did we agree on the launch date\" becomes a text search rather than an archaeology project.",
          },
        ],
      },
      {
        heading: "Turn it into the output you needed",
        steps: [
          {
            title: "Summarise and pull action items",
            body: "Generate a summary, the decisions and the action items from the transcript instead of writing notes during the call.",
          },
          {
            title: "Export subtitles",
            body: "Export a subtitle file for the video the audio came from, or send it on for styled captions.",
          },
          {
            title: "Reuse the content",
            body: "An interview transcript is the raw material for a blog post, a set of quotes and a handful of social clips.",
          },
        ],
        callouts: [
          {
            type: "note",
            body: "Tell people they are being recorded and transcribed. In many places that is a legal requirement, and everywhere it is the decent thing to do.",
          },
        ],
      },
    ],
    relatedTools: ["ai-transcription", "ai-captions", "ai-speech-to-text"],
    relatedTutorials: ["how-to-use-ai-captions"],
    cta: { toolName: "AI Transcription", toolSlug: "ai-transcription" },
  },
];





export const tutorialBySlug = new Map(tutorials.map((tutorial) => [tutorial.slug, tutorial]));

export function getTutorial(slug: string): Tutorial | undefined {
  return tutorialBySlug.get(slug);
}

export const tutorialByTool = new Map<string, Tutorial>();
for (const tutorial of tutorials) {
  if (tutorial.cta.kind === "feature") continue;
  if (tutorialByTool.has(tutorial.cta.toolSlug)) continue;
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
