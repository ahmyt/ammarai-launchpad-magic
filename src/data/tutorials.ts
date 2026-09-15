/**
 * AmmarAI tutorials verified against both the public AmmarAI tool catalogue and
 * a corresponding end-user reference guide. Administrative and setup material
 * is intentionally excluded.
 */

export type TutorialCategory = "Chat & Documents";

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

export const tutorialCategories: TutorialCategory[] = ["Chat & Documents"];

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
