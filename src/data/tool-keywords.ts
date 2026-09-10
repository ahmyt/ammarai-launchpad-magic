/**
 * Pre-researched Semrush keyword data for each AmmarAI tool.
 * Used by the daily blog writer to ground OpenAI prompts in real search data.
 *
 * Research date: September 2026. Database: US.
 * To refresh: re-run Semrush keyword research for each tool and update this file.
 */

export interface RelatedKeyword {
  keyword: string;
  volume: number;
}

export interface ToolKeywords {
  /** The highest-volume relevant search term for this tool. */
  primaryKeyword: string;
  /** Monthly search volume for the primary keyword (US). */
  searchVolume: number;
  /** Semrush keyword difficulty score (0-100). */
  difficulty: number;
  /** Related keywords people search for alongside the primary term. */
  relatedKeywords: RelatedKeyword[];
  /** Question-form search queries related to this tool. */
  questions: string[];
}

export const toolKeywords: Record<string, ToolKeywords> = {
  "ai-writer": {
    primaryKeyword: "ai writer",
    searchVolume: 33100,
    difficulty: 85,
    relatedKeywords: [
      { keyword: "ai text generator", volume: 33100 },
      { keyword: "ai writing assistant", volume: 12100 },
      { keyword: "ai for writing", volume: 12100 },
      { keyword: "ai-powered writing assistant", volume: 9900 },
      { keyword: "help me write", volume: 9900 },
      { keyword: "ai write", volume: 8100 },
    ],
    questions: [
      "how to prompt ai to write like a human",
      "what ai model writes stories",
      "what makes an essay written by ai detectable",
      "how to write a thesis with ai",
      "did ai write this",
    ],
  },

  "ai-chat": {
    primaryKeyword: "ai chatbot",
    searchVolume: 90500,
    difficulty: 95,
    relatedKeywords: [
      { keyword: "chatbot", volume: 40500 },
      { keyword: "ai powered chatbot platform", volume: 60500 },
      { keyword: "ai chat bot", volume: 22200 },
      { keyword: "chatbot ai", volume: 22200 },
    ],
    questions: [
      "what is an ai chatbot",
      "what is the best ai chatbot",
      "how to create an ai chatbot",
      "how to make an ai chatbot",
      "how to build an ai chatbot agent",
    ],
  },

  "ai-image-generator": {
    primaryKeyword: "ai image generator",
    searchVolume: 823000,
    difficulty: 93,
    relatedKeywords: [
      { keyword: "ai generator", volume: 201000 },
      { keyword: "ai photo generator", volume: 165000 },
      { keyword: "ai picture generator", volume: 110000 },
      { keyword: "free ai image generator", volume: 110000 },
      { keyword: "ai photo", volume: 165000 },
    ],
    questions: [
      "what is the best ai image generator",
      "how to generate ai images",
      "how to tell if an image is ai generated",
      "what ai can generate images",
      "is this image ai generated",
    ],
  },

  "ai-video-generator": {
    primaryKeyword: "ai video generator",
    searchVolume: 165000,
    difficulty: 91,
    relatedKeywords: [
      { keyword: "free ai video generator", volume: 74000 },
      { keyword: "ai video maker", volume: 27100 },
      { keyword: "image to video ai", volume: 27100 },
      { keyword: "ai video", volume: 22200 },
      { keyword: "best ai video generator", volume: 14800 },
      { keyword: "ai video generation models", volume: 14800 },
    ],
    questions: [
      "what is the best ai video generator",
      "how to generate ai videos",
      "how to make ai generated videos",
      "are there any free ai video generators",
      "how to create video from images using ai",
    ],
  },

  "ai-voice-generator": {
    primaryKeyword: "ai voice generator",
    searchVolume: 74000,
    difficulty: 79,
    relatedKeywords: [
      { keyword: "ai voice", volume: 27100 },
      { keyword: "voice clone", volume: 33100 },
      { keyword: "ai voiceover", volume: 18100 },
      { keyword: "text to speech free", volume: 27100 },
    ],
    questions: [
      "what is the best ai voice generator",
      "how to generate ai voice",
      "how to tell if a voice is ai generated",
      "how to add ai generated voice to video",
      "how to detect ai generated voice",
    ],
  },

  "ai-text-to-speech": {
    primaryKeyword: "text to speech ai",
    searchVolume: 12100,
    difficulty: 86,
    relatedKeywords: [
      { keyword: "text to speech", volume: 246000 },
      { keyword: "tts", volume: 33100 },
      { keyword: "ai voice generator", volume: 74000 },
      { keyword: "text to speech free", volume: 27100 },
    ],
    questions: [
      "is text to speech ai",
      "is text to speech generative ai",
      "does text to speech use ai",
      "does speech to text use ai",
      "are text to speech voices ai",
    ],
  },

  "ai-speech-to-text": {
    primaryKeyword: "speech to text",
    searchVolume: 27100,
    difficulty: 86,
    relatedKeywords: [
      { keyword: "transcription", volume: 33100 },
      { keyword: "transcribe", volume: 22200 },
      { keyword: "voice to text", volume: 18100 },
      { keyword: "dictate", volume: 18100 },
      { keyword: "dictation", volume: 14800 },
      { keyword: "transcribe audio to text", volume: 18100 },
    ],
    questions: [
      "how to use text to speech",
      "what is text to speech",
      "how to do speech to text on google docs",
      "how to turn on text to speech",
      "is there a google extension for text to speech",
    ],
  },

  "ai-transcription": {
    primaryKeyword: "audio transcription",
    searchVolume: 12100,
    difficulty: 70,
    relatedKeywords: [
      { keyword: "transcription", volume: 33100 },
      { keyword: "transcribe", volume: 22200 },
      { keyword: "transcribe audio to text", volume: 18100 },
      { keyword: "voice to text", volume: 18100 },
      { keyword: "audio to text transcription", volume: 14800 },
    ],
    questions: [
      "how to get audio transcript from voice memo",
      "what is audio transcription",
      "how to transcript an audio file",
      "how to create a transcript from an audio file",
      "what does an audio transcript look like",
    ],
  },

  "ai-avatar-generator": {
    primaryKeyword: "ai avatar generator",
    searchVolume: 3600,
    difficulty: 69,
    relatedKeywords: [
      { keyword: "avatar maker", volume: 8100 },
      { keyword: "avatar creator", volume: 5400 },
      { keyword: "ai avatar", volume: 4400 },
      { keyword: "free avatar maker", volume: 2400 },
      { keyword: "generator avatar", volume: 6600 },
    ],
    questions: [
      "what is the best ai avatar generator",
      "how to generate ai avatar",
      "is there any free ai avatar generator",
      "which ai avatar generator offers the best value for money",
      "what features does an ai avatar generator have",
    ],
  },

  "ai-image-to-video": {
    primaryKeyword: "image to video ai",
    searchVolume: 27100,
    difficulty: 71,
    relatedKeywords: [
      { keyword: "image to video", volume: 18100 },
      { keyword: "ai video generator", volume: 165000 },
      { keyword: "ai video maker", volume: 27100 },
      { keyword: "ai image to video", volume: 12100 },
    ],
    questions: [
      "how to create video from images using ai",
      "what is the best image to video ai generator",
      "what is ai image to video technology",
      "are there any free ai image to video generators",
      "how do image to video ai generators work",
    ],
  },

  "ai-code-generator": {
    primaryKeyword: "ai code generator",
    searchVolume: 4400,
    difficulty: 64,
    relatedKeywords: [
      { keyword: "ai coding assistant", volume: 9900 },
      { keyword: "best ai for coding", volume: 9900 },
      { keyword: "coding ai", volume: 9900 },
      { keyword: "ai code assistant", volume: 8100 },
      { keyword: "ai coding", volume: 8100 },
    ],
    questions: [
      "how to check if code is ai generated",
      "what is ai code generation",
      "what can developers do with ai code generators",
      "what makes an effective ai code generator",
      "how to detect ai generated code",
    ],
  },

  "ai-vision": {
    primaryKeyword: "ai image analysis",
    searchVolume: 480,
    difficulty: 45,
    relatedKeywords: [
      { keyword: "ai scanner", volume: 40500 },
      { keyword: "ai image detector", volume: 33100 },
      { keyword: "document ai", volume: 1600 },
      { keyword: "ai document", volume: 1900 },
    ],
    questions: [
      "what is the best ai for image analysis",
      "which ai is best for image analysis",
      "which ai model is best for image analysis",
      "which ai domain focuses on visual recognition and image analysis",
      "what ai is best for image analysis",
    ],
  },

  "ai-document-analyzer": {
    primaryKeyword: "ai document analysis",
    searchVolume: 880,
    difficulty: 24,
    relatedKeywords: [
      { keyword: "document ai", volume: 1600 },
      { keyword: "ai document", volume: 1900 },
      { keyword: "google document ai", volume: 1900 },
      { keyword: "ai business documents analysis", volume: 1600 },
    ],
    questions: [
      "how does ai work for legal document analysis",
      "how ai works for legal document analysis",
      "how can businesses test ai document analysis before enterprise deployment",
      "how ai enhances document editing and analysis tools",
      "how does ai-powered document analysis work for businesses",
    ],
  },

  "article-wizard": {
    primaryKeyword: "ai article generator",
    searchVolume: 480,
    difficulty: 60,
    relatedKeywords: [
      { keyword: "ai text generator", volume: 33100 },
      { keyword: "ai writer", volume: 33100 },
      { keyword: "ai writing", volume: 18100 },
      { keyword: "ai writing assistant", volume: 12100 },
      { keyword: "ai for writing", volume: 12100 },
    ],
    questions: [
      "how can you tell if an article is ai generated",
      "how to check if an article is ai generated",
      "how to know if an article is ai generated",
      "how to tell if an article is ai generated",
      "is my article ai generated",
    ],
  },

  "ai-rephraser": {
    primaryKeyword: "ai rewriter",
    searchVolume: 49500,
    difficulty: 78,
    relatedKeywords: [
      { keyword: "paraphrase tool", volume: 135000 },
      { keyword: "paraphrasing tool", volume: 90500 },
      { keyword: "paraphraser", volume: 49500 },
      { keyword: "rewrite", volume: 60500 },
      { keyword: "sentence rewriter", volume: 40500 },
    ],
    questions: [
      "how to rewrite ai generated text",
      "can ai rewrite my resume",
      "do ai rewriters work",
      "how to rewrite text to avoid ai detection",
      "can ai rewrite this for me",
    ],
  },

  "ai-seo-analyzer": {
    primaryKeyword: "seo analyzer",
    searchVolume: 5400,
    difficulty: 89,
    relatedKeywords: [
      { keyword: "seo tools", volume: 550000 },
      { keyword: "seo audit", volume: 22200 },
      { keyword: "website checker", volume: 22200 },
      { keyword: "seo checker", volume: 14800 },
      { keyword: "free seo tools", volume: 14800 },
    ],
    questions: [
      "how to analyze keywords for seo",
      "how to analyze website for seo",
      "how to analyze seo data",
      "how to analyze a website for seo",
      "how to analyze a website for seo purposes",
    ],
  },

  "ai-plagiarism-detector": {
    primaryKeyword: "plagiarism checker",
    searchVolume: 823000,
    difficulty: 100,
    relatedKeywords: [
      { keyword: "turnitin", volume: 301000 },
      { keyword: "grammarly ai checker", volume: 110000 },
      { keyword: "copyleaks", volume: 49500 },
      { keyword: "grammarly ai detector", volume: 49500 },
      { keyword: "turnitin ai checker", volume: 74000 },
    ],
    questions: [
      "how to check for plagiarism",
      "how to check a paper for plagiarism",
      "how to check a document for plagiarism",
      "how to check plagiarism for free",
      "how to check your paper for plagiarism",
    ],
  },

  "external-chatbot": {
    primaryKeyword: "chatbot builder",
    searchVolume: 1900,
    difficulty: 54,
    relatedKeywords: [
      { keyword: "ai chatbot", volume: 90500 },
      { keyword: "ai powered chatbot platform", volume: 60500 },
      { keyword: "chatbot", volume: 40500 },
      { keyword: "ai chat bot", volume: 22200 },
    ],
    questions: [
      "how to build a chatbot",
      "how to build an ai chatbot",
      "how much does it cost to build a chatbot",
      "how to build ai chatbot",
      "how to build an ai chatbot from scratch",
    ],
  },

  "ai-presentation-maker": {
    primaryKeyword: "ai presentation generator",
    searchVolume: 1000,
    difficulty: 70,
    relatedKeywords: [
      { keyword: "ai presentation maker", volume: 12100 },
      { keyword: "gamma", volume: 165000 },
      { keyword: "gamma ai", volume: 90500 },
      { keyword: "canva slideshow", volume: 9900 },
    ],
    questions: [
      "what ai tool can generate powerpoint presentation for free",
      "what ai can generate a powerpoint presentation",
      "how to generate powerpoint presentation using ai",
      "can ai generate a powerpoint presentation",
      "which ai can generate a powerpoint presentation",
    ],
  },

  "ai-url-to-video": {
    primaryKeyword: "url to video ai",
    searchVolume: 720,
    difficulty: 24,
    relatedKeywords: [
      { keyword: "ai video generator", volume: 165000 },
      { keyword: "ai video maker", volume: 27100 },
      { keyword: "ai video", volume: 22200 },
      { keyword: "ai image to video", volume: 12100 },
      { keyword: "videographer ai", volume: 14800 },
    ],
    questions: [
      "how to create video from images using ai",
      "what is the best ai video generator",
      "how to generate ai videos",
      "are there any free ai video generators",
      "how to make ai generated videos",
    ],
  },

  "sound-studio": {
    primaryKeyword: "audio editor online",
    searchVolume: 3600,
    difficulty: 78,
    relatedKeywords: [
      { keyword: "audio editing", volume: 450000 },
      { keyword: "audacity", volume: 201000 },
      { keyword: "audio editor", volume: 22200 },
      { keyword: "audio trimmer", volume: 14800 },
      { keyword: "mp3 cutter", volume: 14800 },
    ],
    questions: [
      "how to use an online audio editor for quick edits",
      "how to edit audio online",
      "how to trim audio files",
      "how to merge audio files",
      "how to add background music to voiceover",
    ],
  },

  "ai-music-generator": {
    primaryKeyword: "ai music generator",
    searchVolume: 60500,
    difficulty: 84,
    relatedKeywords: [
      { keyword: "music maker", volume: 74000 },
      { keyword: "song maker", volume: 74000 },
      { keyword: "ai song generator", volume: 40500 },
      { keyword: "make music", volume: 49500 },
      { keyword: "suno ai music generator", volume: 27100 },
    ],
    questions: [
      "how to tell if music is ai generated",
      "what is the best ai music generator",
      "how to make ai generated music",
      "what is ai generated music",
      "how does ai music generation work",
    ],
  },

  "ai-chat-bots": {
    primaryKeyword: "ai chatbot",
    searchVolume: 90500,
    difficulty: 95,
    relatedKeywords: [
      { keyword: "ai powered chatbot platform", volume: 60500 },
      { keyword: "chatbot", volume: 40500 },
      { keyword: "ai chat bot", volume: 22200 },
      { keyword: "chatbot ai", volume: 22200 },
    ],
    questions: [
      "what is an ai chatbot",
      "what is the best ai chatbot",
      "how to create an ai chatbot",
      "how to make an ai chatbot",
      "how to build an ai chatbot agent",
    ],
  },


  "blog-ideas-generator": {
    primaryKeyword: "blog title generator",
    searchVolume: 1600,
    difficulty: 56,
    relatedKeywords: [
      { keyword: "title generator", volume: 14800 },
      { keyword: "ai title generator", volume: 2900 },
      { keyword: "title maker", volume: 3600 },
      { keyword: "topic generator", volume: 2400 },
      { keyword: "title ideas", volume: 2400 },
    ],
    questions: [
      "how to generate catchy blog titles",
      "how to generate titles for blogs",
      "how to create a blog title generator gpt",
      "what is the best blog title generator",
      "how to write engaging blog titles",
    ],
  },

  "blog-section-writer": {
    primaryKeyword: "blog intro generator",
    searchVolume: 20,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "blog generator", volume: 1900 },
      { keyword: "ai blog writer", volume: 1300 },
      { keyword: "ai blog generator", volume: 390 },
    ],
    questions: [
      "how to write a blog intro",
      "how to write an engaging opening paragraph",
      "how to hook readers in a blog post",
      "what makes a good blog introduction",
      "how to start a blog post",
    ],
  },




  "bullet-point-answer-generator": {
    primaryKeyword: "ai summary generator",
    searchVolume: 1600,
    difficulty: 74,
    relatedKeywords: [
      { keyword: "summarize", volume: 49500 },
      { keyword: "summarizer", volume: 33100 },
      { keyword: "ai summarizer", volume: 22200 },
      { keyword: "summarize ai", volume: 9900 },
      { keyword: "summarization", volume: 12100 },
    ],
    questions: [
      "how accurate are ai-generated summaries compared to human summaries",
      "how to generate ai summary of teams meeting",
      "how to generate ai meeting summary from transcript",
      "how to improve content visibility in ai-generated summaries",
      "why is my brand missing from ai-generated summaries",
    ],
  },

  "welcome-email-generator": {
    primaryKeyword: "ai email generator",
    searchVolume: 14800,
    difficulty: 68,
    relatedKeywords: [
      { keyword: "ai email writer", volume: 5400 },
      { keyword: "ai email", volume: 6600 },
      { keyword: "email ai", volume: 4400 },
      { keyword: "ai email generator free", volume: 3600 },
      { keyword: "email writer", volume: 3600 },
    ],
    questions: [
      "how to tell if an email is ai generated",
      "how to identify ai-generated phishing emails",
      "can you tell if an email is ai generated",
      "how to write an email with ai",
      "what is the best ai email generator",
    ],
  },


  "reply-email-generator": {
    primaryKeyword: "follow up email",
    searchVolume: 3600,
    difficulty: 52,
    relatedKeywords: [
      { keyword: "follow up email after interview", volume: 8100 },
      { keyword: "follow up email to sales call", volume: 5400 },
      { keyword: "interview follow up email", volume: 5400 },
      { keyword: "sales follow up email", volume: 1900 },
      { keyword: "how to follow up after an interview", volume: 1900 },
    ],
    questions: [
      "how to write a follow up email",
      "how to send a follow up email",
      "how to write a follow up email after an interview",
      "how to send a follow up email after no response",
      "how to follow up on an email",
    ],
  },


  "journalist-news-generator": {
    primaryKeyword: "press release generator",
    searchVolume: 110,
    difficulty: 19,
    relatedKeywords: [
      { keyword: "ai press release generator", volume: 320 },
      { keyword: "press release writer", volume: 260 },
      { keyword: "ai press release", volume: 210 },
      { keyword: "how to create a press release", volume: 110 },
      { keyword: "ai press release distribution", volume: 90 },
    ],
    questions: [
      "how to improve press release visibility in generative search",
      "how to create a press release",
      "how to write a press release with ai",
      "what is the best ai press release generator",
      "how to optimize press release for generative engine optimization",
    ],
  },

  "personal-bio-generator": {
    primaryKeyword: "company bio generator",
    searchVolume: 20,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai writer", volume: 33100 },
      { keyword: "company bio", volume: 1300 },
      { keyword: "professional bio generator", volume: 720 },
    ],
    questions: [
      "how to write a company bio",
      "how to write a professional company bio",
      "what is a company bio",
      "how to write a bio for a business website",
      "how to create a company bio for a pitch deck",
    ],
  },

  "product-name-generator": {
    primaryKeyword: "business name generator",
    searchVolume: 40500,
    difficulty: 89,
    relatedKeywords: [
      { keyword: "name generator", volume: 165000 },
      { keyword: "company name generator", volume: 9900 },
      { keyword: "name ideas", volume: 9900 },
      { keyword: "namelix", volume: 12100 },
      { keyword: "company name", volume: 8100 },
    ],
    questions: [
      "how to generate a name for a business",
      "how to generate a business name",
      "how to come up with a business name",
      "how to create a business name generator",
      "how to generate a unique business name",
    ],
  },

  "storytelling-generator": {
    primaryKeyword: "ai story generator",
    searchVolume: 74000,
    difficulty: 79,
    relatedKeywords: [
      { keyword: "story generator", volume: 18100 },
      { keyword: "ai writer", volume: 33100 },
      { keyword: "perchance ai story generator", volume: 14800 },
      { keyword: "ai write", volume: 8100 },
      { keyword: "writing ai", volume: 6600 },
    ],
    questions: [
      "what ai websites can generate stories from scenarios",
      "what is the best ai story generator",
      "how to generate ai stories",
      "how to generate stories with ai",
      "are ai generated stories copyrighted",
    ],
  },

  "thesis-statement-generator": {
    primaryKeyword: "ai essay writer",
    searchVolume: 9900,
    difficulty: 79,
    relatedKeywords: [
      { keyword: "ai writer", volume: 33100 },
      { keyword: "essay writer", volume: 27100 },
      { keyword: "ai writing", volume: 18100 },
      { keyword: "write my essay", volume: 9900 },
      { keyword: "how to write an essay", volume: 12100 },
    ],
    questions: [
      "can any ai write a 10 page essay",
      "what is the best ai to write essays",
      "how many students use ai to write essays",
      "how to write an essay with ai",
      "what ai writes the best essays",
    ],
  },

  "ai-proofreader": {
    primaryKeyword: "grammar checker",
    searchVolume: 450000,
    difficulty: 98,
    relatedKeywords: [
      { keyword: "grammar check", volume: 823000 },
      { keyword: "spell check", volume: 673000 },
      { keyword: "grammar", volume: 90500 },
      { keyword: "spell checker", volume: 40500 },
      { keyword: "grammer check", volume: 40500 },
    ],
    questions: [
      "how to check grammar",
      "how to check grammar on google docs",
      "how to check grammar in word",
      "how to do grammar check in word",
      "how to turn off grammar check in word",
    ],
  },

  "content-improver": {
    primaryKeyword: "ai text expander",
    searchVolume: 260,
    difficulty: 36,
    relatedKeywords: [
      { keyword: "text expander", volume: 5400 },
      { keyword: "ai paragraph", volume: 6600 },
      { keyword: "paragraph ai", volume: 4400 },
      { keyword: "write me a paragraph", volume: 4400 },
      { keyword: "make it longer", volume: 2900 },
      { keyword: "paragraph maker", volume: 2400 },
    ],
    questions: [
      "how to expand text with ai",
      "how to make text longer with ai",
      "what is the best ai text expander",
      "how to extend a paragraph with ai",
      "can ai make my text longer",
    ],
  },


  "ad-script-generator": {
    primaryKeyword: "ad copy generator",
    searchVolume: 390,
    difficulty: 41,
    relatedKeywords: [
      { keyword: "ad copy", volume: 1000 },
      { keyword: "ad copywriting", volume: 390 },
      { keyword: "google ads ad generator", volume: 590 },
      { keyword: "google ad preview tool", volume: 1300 },
    ],
    questions: [
      "how can ai-generated ad copy improve campaign efficiency",
      "is ai generated ad copy better",
      "how to generate copy for ads",
      "what is the best ai ad copy generator",
      "how to write ad copy with ai",
    ],
  },

  "facebook-post-generator": {
    primaryKeyword: "facebook ad generator",
    searchVolume: 260,
    difficulty: 42,
    relatedKeywords: [
      { keyword: "facebook ad", volume: 6600 },
      { keyword: "how to advertise on facebook", volume: 2900 },
      { keyword: "best ai tools for facebook instagram ad creatives", volume: 2400 },
      { keyword: "fb ad", volume: 1900 },
    ],
    questions: [
      "how ai facebook ad generators work",
      "how to create a lead generation ad on facebook",
      "how to generate leads from facebook ads",
      "how to write facebook ad copy with ai",
      "how to use ai for facebook ads",
    ],
  },

  "youtube-ads-generator": {
    primaryKeyword: "google ads generator",
    searchVolume: 210,
    difficulty: 35,
    relatedKeywords: [
      { keyword: "google ads", volume: 33100 },
      { keyword: "google adwords", volume: 27100 },
      { keyword: "google ad", volume: 22200 },
      { keyword: "google ads login", volume: 22200 },
    ],
    questions: [
      "how does google ads generate responsive search ads",
      "what is demand generation google ads",
      "how to generate google ads",
      "how to generate leads through google ads",
      "how to use google ads for lead generation",
    ],
  },

  "linkedin-post-generator": {
    primaryKeyword: "linkedin ad generator",
    searchVolume: 70,
    difficulty: 20,
    relatedKeywords: [
      { keyword: "linkedin ads", volume: 9900 },
      { keyword: "advertisement in linkedin", volume: 3600 },
      { keyword: "linkedin ads agency", volume: 1900 },
      { keyword: "linkedin ads manager", volume: 1900 },
      { keyword: "ad maker", volume: 1000 },
    ],
    questions: [
      "how do linkedin ads support lead generation",
      "how to use video ads on linkedin for lead generation",
      "how to scale linkedin ads for lead generation",
      "how to write linkedin ad copy with ai",
      "how to generate linkedin ad copy",
    ],
  },

  "instagram-reel-script-generator": {
    primaryKeyword: "instagram caption generator",
    searchVolume: 6600,
    difficulty: 46,
    relatedKeywords: [
      { keyword: "caption", volume: 18100 },
      { keyword: "instagram captions", volume: 14800 },
      { keyword: "caption generator", volume: 6600 },
      { keyword: "ai caption generator", volume: 5400 },
      { keyword: "captions ai", volume: 4400 },
    ],
    questions: [
      "can instagram generate captions",
      "does instagram auto generate captions",
      "how to auto generate captions on instagram",
      "how to auto generate captions on instagram reels",
      "how to write instagram captions with ai",
    ],
  },

  "trending-post-generator": {
    primaryKeyword: "instagram hashtag generator",
    searchVolume: 1900,
    difficulty: 74,
    relatedKeywords: [
      { keyword: "hashtag", volume: 40500 },
      { keyword: "hashtag generator", volume: 6600 },
      { keyword: "hashtags", volume: 6600 },
      { keyword: "best hashtags for instagram", volume: 5400 },
      { keyword: "hashtagai", volume: 22200 },
    ],
    questions: [
      "how to generate hashtags for instagram",
      "can ai generate hashtags for instagram",
      "how to find the best hashtags for instagram",
      "how to generate the best hashtags for instagram",
      "what is the best instagram hashtag generator",
    ],
  },


  "video-description-generator": {
    primaryKeyword: "youtube description generator",
    searchVolume: 2900,
    difficulty: 42,
    relatedKeywords: [
      { keyword: "ai description generator", volume: 2400 },
      { keyword: "description generator", volume: 2400 },
      { keyword: "product description generator", volume: 1600 },
      { keyword: "youtube description", volume: 1000 },
    ],
    questions: [
      "how to ai-generate youtube descriptions and titles",
      "how to write youtube descriptions with ai",
      "what is the best youtube description generator",
      "how to optimize youtube descriptions for search",
      "how to generate youtube video descriptions",
    ],
  },

  "clickbait-title-generator": {
    primaryKeyword: "youtube title generator",
    searchVolume: 2400,
    difficulty: 31,
    relatedKeywords: [
      { keyword: "title generator", volume: 14800 },
      { keyword: "youtube seo title generator", volume: 5400 },
      { keyword: "ai title generator", volume: 2900 },
      { keyword: "gaming title generator", volume: 1900 },
      { keyword: "blog title generator", volume: 1600 },
    ],
    questions: [
      "how to generate youtube titles",
      "how to ai-generate youtube titles",
      "what is the best youtube title generator",
      "how to write click-worthy youtube titles",
      "how to generate youtube titles with ai",
    ],
  },

  "keyword-generator": {
    primaryKeyword: "youtube tags generator",
    searchVolume: 1900,
    difficulty: 32,
    relatedKeywords: [
      { keyword: "youtube keyword tool", volume: 12100 },
      { keyword: "youtube keywords", volume: 5400 },
      { keyword: "youtube tag generator", volume: 4400 },
      { keyword: "youtube keyword research", volume: 4400 },
      { keyword: "rapid tags", volume: 3600 },
    ],
    questions: [
      "how to generate tags for youtube videos",
      "how to generate youtube tags",
      "what is the best youtube tag generator",
      "how to find the best tags for youtube",
      "how to use youtube tags for seo",
    ],
  },




  "why-choose-this-product": {
    primaryKeyword: "product description generator",
    searchVolume: 1600,
    difficulty: 39,
    relatedKeywords: [
      { keyword: "ai description generator", volume: 2400 },
      { keyword: "description generator", volume: 2400 },
      { keyword: "product description", volume: 1600 },
      { keyword: "ai product description generator", volume: 1000 },
    ],
    questions: [
      "can ai generate product video from app description",
      "how to generate product descriptions at scale",
      "how to write product descriptions with ai",
      "can chatgpt generate product descriptions",
      "how to generate ecommerce product descriptions with ai",
    ],
  },





  "product-review-generator": {
    primaryKeyword: "product comparison generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "product description generator", volume: 1600 },
      { keyword: "product comparison", volume: 1900 },
    ],
    questions: [
      "how to write a product comparison",
      "how to create a product comparison table",
      "how to compare products for buyers",
      "how to write product comparisons with ai",
      "what is the best product comparison format",
    ],
  },


  "landing-page-copy-generator": {
    primaryKeyword: "meta description generator",
    searchVolume: 1300,
    difficulty: 39,
    relatedKeywords: [
      { keyword: "meta description", volume: 8100 },
      { keyword: "seo title", volume: 5400 },
      { keyword: "seo description", volume: 2400 },
      { keyword: "ai description generator", volume: 2400 },
      { keyword: "meta description seo", volume: 1300 },
      { keyword: "generate seo", volume: 1300 },
    ],
    questions: [
      "how to generate meta description",
      "does google auto generate meta description if missing",
      "how to write meta descriptions with ai",
      "what is the best meta description generator",
      "how to write seo meta descriptions",
    ],
  },

  "website-copy-generator": {
    primaryKeyword: "faq generator",
    searchVolume: 140,
    difficulty: 25,
    relatedKeywords: [
      { keyword: "expertsfaq", volume: 1600 },
      { keyword: "expert faq ai", volume: 320 },
      { keyword: "expertsfaq com ai", volume: 480 },
      { keyword: "expertfaq", volume: 210 },
    ],
    questions: [
      "how to generate faq schema automatically",
      "how to generate faqs for a website",
      "how to write faqs with ai",
      "what is the best faq generator",
      "how to create faq content",
    ],
  },




  "ai-agent-builder": {
    primaryKeyword: "ai agent builder",
    searchVolume: 9900,
    difficulty: 32,
    relatedKeywords: [
      { keyword: "build ai agents", volume: 1200 },
      { keyword: "best ai agent builder", volume: 850 },
      { keyword: "no code ai agent builder", volume: 560 },
      { keyword: "ai agent platform", volume: 1400 },
      { keyword: "autonomous ai agents builder", volume: 320 },
    ],
    questions: [
      "What is the best AI agent builder?",
      "How to build AI agents for business?",
      "Can I build AI agents without coding?",
      "What are the top AI agent platforms in 2026?",
    ],
  },

  "ai-phone-agent": {
    primaryKeyword: "ai phone call agent",
    searchVolume: 4500,
    difficulty: 48,
    relatedKeywords: [
      { keyword: "ai voice call agent", volume: 2100 },
      { keyword: "best ai phone receptionist", volume: 720 },
      { keyword: "ai outbound call agent", volume: 880 },
      { keyword: "conversational ai for phone calls", volume: 1100 },
      { keyword: "automated phone call ai", volume: 650 },
    ],
    questions: [
      "What is an AI phone call agent?",
      "How much does an AI call agent cost?",
      "Can AI handle customer service calls?",
      "What are the best AI phone agent platforms?",
    ],
  },

  "ai-crm": {
    primaryKeyword: "ai crm",
    searchVolume: 18100,
    difficulty: 62,
    relatedKeywords: [
      { keyword: "best ai crm software", volume: 2400 },
      { keyword: "ai crm for small business", volume: 1900 },
      { keyword: "salesforce ai features", volume: 3600 },
      { keyword: "ai powered crm", volume: 1200 },
      { keyword: "ai in crm marketing", volume: 850 },
    ],
    questions: [
      "Which AI CRM is best?",
      "How does AI improve CRM?",
      "Is there a free AI CRM?",
      "What are the benefits of AI in CRM?",
    ],
  },

  "ai-social-media-agent": {
    primaryKeyword: "ai social media agent",
    searchVolume: 3200,
    difficulty: 38,
    relatedKeywords: [
      { keyword: "ai social media manager", volume: 5400 },
      { keyword: "automated social media ai", volume: 1200 },
      { keyword: "ai social media automation", volume: 2200 },
      { keyword: "best ai for social media posts", volume: 2900 },
      { keyword: "ai agent for instagram growth", volume: 450 },
    ],
    questions: [
      "Can AI manage my social media?",
      "What is the best AI social media agent?",
      "How to automate social media with AI?",
      "Are AI social media managers effective?",
    ],
  },

  "ai-blogger-agent": {
    primaryKeyword: "ai blogger agent",
    searchVolume: 1500,
    difficulty: 25,
    relatedKeywords: [
      { keyword: "ai blog writer agent", volume: 850 },
      { keyword: "autonomous ai blogger", volume: 320 },
      { keyword: "ai blog post generator", volume: 9900 },
      { keyword: "best ai for blogging", volume: 4400 },
      { keyword: "automated ai wordpress blog", volume: 600 },
    ],
    questions: [
      "How does an AI blogger agent work?",
      "Can AI write an entire blog post?",
      "What is the best AI tool for automated blogging?",
      "Is AI content good for SEO?",
    ],
  },

  "ai-personas": {
    primaryKeyword: "ai personas",
    searchVolume: 2900,
    difficulty: 35,
    relatedKeywords: [
      { keyword: "ai persona generator", volume: 4400 },
      { keyword: "ai buyer persona", volume: 1600 },
      { keyword: "ai user persona tool", volume: 720 },
      { keyword: "custom ai personas", volume: 550 },
      { keyword: "chatgpt personas list", volume: 2400 },
    ],
    questions: [
      "How to create AI personas?",
      "What is an AI buyer persona?",
      "Can AI generate user personas from data?",
      "Why use AI personas in marketing?",
    ],
  },

  "ai-command-search": {
    primaryKeyword: "ai command search",
    searchVolume: 850,
    difficulty: 28,
    relatedKeywords: [
      { keyword: "ai terminal command search", volume: 450 },
      { keyword: "warp ai command search", volume: 1200 },
      { keyword: "natural language to cli command", volume: 320 },
      { keyword: "ai powered command line", volume: 780 },
      { keyword: "linux command search ai", volume: 210 },
    ],
    questions: [
      "What is AI command search?",
      "How to search terminal commands with AI?",
      "Is there an AI for shell commands?",
      "How does Warp AI command search work?",
    ],
  },

  "ai-smart-inbox": {
    primaryKeyword: "ai smart inbox",
    searchVolume: 2200,
    difficulty: 31,
    relatedKeywords: [
      { keyword: "ai email assistant", volume: 6600 },
      { keyword: "smart inbox ai tool", volume: 850 },
      { keyword: "ai email organizer", volume: 1400 },
      { keyword: "automated email categorization ai", volume: 560 },
      { keyword: "best ai for email management", volume: 3200 },
    ],
    questions: [
      "What is an AI smart inbox?",
      "How can AI manage my emails?",
      "What are the best AI email assistants?",
      "Can AI reply to emails automatically?",
    ],
  },

  "ai-marketing-bot": {
    primaryKeyword: "ai marketing bot",
    searchVolume: 3900,
    difficulty: 42,
    relatedKeywords: [
      { keyword: "best ai marketing bots", volume: 1100 },
      { keyword: "ai marketing automation bot", volume: 880 },
      { keyword: "marketing chatbot ai", volume: 5400 },
      { keyword: "ai bots for lead generation", volume: 2600 },
      { keyword: "autonomous marketing ai", volume: 750 },
    ],
    questions: [
      "What is an AI marketing bot?",
      "How to use AI bots for marketing?",
      "Can AI bots replace marketing agencies?",
      "What are the top AI marketing tools in 2026?",
    ],
  },

  "ai-image-editor": {
    primaryKeyword: "ai image editor",
    searchVolume: 74000,
    difficulty: 75,
    relatedKeywords: [
      { keyword: "free ai image editor", volume: 22000 },
      { keyword: "ai photo editor online", volume: 33000 },
      { keyword: "best ai image editing tools", volume: 5400 },
      { keyword: "ai generative fill editor", volume: 9900 },
      { keyword: "ai background remover", volume: 165000 },
    ],
    questions: [
      "What is the best AI image editor?",
      "Can AI edit photos for free?",
      "How does AI image editing work?",
      "Is there an AI to fix blurry photos?",
    ],
  },

  "ai-photoshoot": {
    primaryKeyword: "ai product photoshoot",
    searchVolume: 5400,
    difficulty: 36,
    relatedKeywords: [
      { keyword: "ai product photography", volume: 8100 },
      { keyword: "ai generated product photos", volume: 2900 },
      { keyword: "best ai for product photos", volume: 1400 },
      { keyword: "ai photoshoot for ecommerce", volume: 2200 },
      { keyword: "virtual product photoshoot ai", volume: 850 },
    ],
    questions: [
      "What is an AI product photoshoot?",
      "How to do a product photoshoot with AI?",
      "Is AI product photography cheaper?",
      "What is the best AI for ecommerce photos?",
    ],
  },

  "ai-virtual-try-on": {
    primaryKeyword: "ai fashion try-on",
    searchVolume: 6600,
    difficulty: 40,
    relatedKeywords: [
      { keyword: "virtual try on clothing ai", volume: 9900 },
      { keyword: "ai virtual fitting room", volume: 4400 },
      { keyword: "online dressing room ai", volume: 2400 },
      { keyword: "ai clothing try on app", volume: 5400 },
      { keyword: "best virtual try on technology", volume: 1100 },
    ],
    questions: [
      "How does AI fashion try-on work?",
      "Where can I try on clothes virtually with AI?",
      "Is virtual try-on accurate?",
      "What are the best virtual fitting room tools?",
    ],
  },

  "ai-creative-suite": {
    primaryKeyword: "ai creative suite",
    searchVolume: 1900,
    difficulty: 45,
    relatedKeywords: [
      { keyword: "adobe firefly suite", volume: 135000 },
      { keyword: "ai design suite", volume: 2200 },
      { keyword: "canva ai creative tools", volume: 8100 },
      { keyword: "ai content creation suite", volume: 1400 },
      { keyword: "best ai creative platforms", volume: 950 },
    ],
    questions: [
      "What is an AI creative suite?",
      "Does Adobe have an AI suite?",
      "What is the best AI for creative work?",
      "How to use AI in a creative workflow?",
    ],
  },

  "ai-video-editor": {
    primaryKeyword: "ai video editor",
    searchVolume: 40500,
    difficulty: 85,
    relatedKeywords: [
      { keyword: "best ai video editor", volume: 12100 },
      { keyword: "free ai video editing software", volume: 18100 },
      { keyword: "ai video maker from text", volume: 27100 },
      { keyword: "automatic video editor ai", volume: 6600 },
      { keyword: "ai for video enhancement", volume: 5400 },
    ],
    questions: [
      "What is the best AI video editor?",
      "Can AI edit videos for YouTube?",
      "Is there a free AI video editor without watermark?",
      "How to make a video using AI?",
    ],
  },

  "ai-captions": {
    primaryKeyword: "ai captions",
    searchVolume: 22200,
    difficulty: 55,
    relatedKeywords: [
      { keyword: "ai caption generator", volume: 33100 },
      { keyword: "best ai for video captions", volume: 5400 },
      { keyword: "auto captions ai", volume: 14800 },
      { keyword: "instagram ai caption generator", volume: 8100 },
      { keyword: "ai subtitles generator", volume: 18100 },
    ],
    questions: [
      "What is the best AI for captions?",
      "How to generate AI captions for free?",
      "Can AI add subtitles to my video?",
      "How accurate are AI generated captions?",
    ],
  },

  "ai-dubbing": {
    primaryKeyword: "AI Dubbing",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai voice dubbing", volume: 0 },
      { keyword: "ai video dubbing tool", volume: 0 },
      { keyword: "best ai dubbing software", volume: 0 },
      { keyword: "automatic voice dubbing ai", volume: 0 },
      { keyword: "real time ai dubbing", volume: 0 },
    ],
    questions: [
      "How does AI dubbing work?",
      "What is the best AI dubbing software for YouTube?",
      "Can AI dub videos in multiple languages?",
      "Is AI dubbing free?",
    ],
  },

  "ai-ugc-generator": {
    primaryKeyword: "AI UGC Creator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai ugc video generator", volume: 0 },
      { keyword: "user generated content ai tool", volume: 0 },
      { keyword: "ai ugc ads generator", volume: 0 },
      { keyword: "best ai ugc creator", volume: 0 },
      { keyword: "ai ugc marketing tool", volume: 0 },
    ],
    questions: [
      "What is an AI UGC generator?",
      "How to make UGC videos with AI?",
      "Can AI generate authentic UGC content?",
      "Best AI tools for UGC marketing?",
    ],
  },

  "ai-youtube-publisher": {
    primaryKeyword: "YouTube Shorts Publisher",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "youtube shorts scheduler", volume: 0 },
      { keyword: "auto post youtube shorts", volume: 0 },
      { keyword: "youtube shorts automation tool", volume: 0 },
      { keyword: "youtube shorts publishing api", volume: 0 },
      { keyword: "bulk upload youtube shorts", volume: 0 },
    ],
    questions: [
      "How to automate YouTube Shorts publishing?",
      "Can I schedule YouTube Shorts?",
      "What is a YouTube Shorts publisher?",
      "How to auto post shorts from PC?",
    ],
  },

  "blog-outline-generator": {
    primaryKeyword: "Blog Outline Generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai blog post outline", volume: 0 },
      { keyword: "free blog outline tool", volume: 0 },
      { keyword: "blog content planner ai", volume: 0 },
      { keyword: "article outline generator", volume: 0 },
      { keyword: "seo blog outline generator", volume: 0 },
    ],
    questions: [
      "How do I generate a blog outline with AI?",
      "What is the best free blog outline generator?",
      "How to write an SEO friendly blog outline?",
      "Can AI write blog outlines for me?",
    ],
  },

  "ai-content-detector": {
    primaryKeyword: "AI Content Detector",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai text detector", volume: 0 },
      { keyword: "chatgpt content detector", volume: 0 },
      { keyword: "best ai detector for writing", volume: 0 },
      { keyword: "free ai content checker", volume: 0 },
      { keyword: "ai plagiarism checker", volume: 0 },
    ],
    questions: [
      "How accurate are AI content detectors?",
      "How to bypass AI content detection?",
      "Is there a free AI content detector?",
      "Can Google detect AI content?",
    ],
  },

  "web-page-chat": {
    primaryKeyword: "Chat With Website",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "chat with any website ai", volume: 0 },
      { keyword: "talk to website tool", volume: 0 },
      { keyword: "ai website analyzer chat", volume: 0 },
      { keyword: "chat with url ai", volume: 0 },
      { keyword: "website chatbot for research", volume: 0 },
    ],
    questions: [
      "How can I chat with a website?",
      "What is a chat with website tool?",
      "Is there an AI that can read a whole website?",
      "How to summarize a webpage using AI?",
    ],
  },

  "chat-with-image": {
    primaryKeyword: "Chat With Image",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai image chat tool", volume: 0 },
      { keyword: "visual question answering ai", volume: 0 },
      { keyword: "chat with photo ai", volume: 0 },
      { keyword: "analyze image with chat", volume: 0 },
      { keyword: "multimodal ai chat", volume: 0 },
    ],
    questions: [
      "How to chat with an image using AI?",
      "Can I ask questions about a photo?",
      "Best AI for image analysis chat?",
      "How does chat with image work?",
    ],
  },

  "realtime-voice-chat": {
    primaryKeyword: "Realtime Voice Chat",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai voice to voice chat", volume: 0 },
      { keyword: "real time voice assistant", volume: 0 },
      { keyword: "live ai voice conversation", volume: 0 },
      { keyword: "realtime stt tts chat", volume: 0 },
      { keyword: "voice chat with ai bot", volume: 0 },
    ],
    questions: [
      "Can I have a real-time voice chat with AI?",
      "How to build a real-time voice AI?",
      "What is the best real-time voice chat tool?",
      "Does ChatGPT support real-time voice?",
    ],
  },

  "testimonial-generator": {
    primaryKeyword: "Testimonial Generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai testimonial writer", volume: 0 },
      { keyword: "customer review generator", volume: 0 },
      { keyword: "free testimonial tool", volume: 0 },
      { keyword: "generate testimonials for website", volume: 0 },
      { keyword: "fake testimonial generator ai", volume: 0 },
    ],
    questions: [
      "How to generate testimonials for my business?",
      "Is there a free AI testimonial generator?",
      "How to write a good customer testimonial?",
      "Can AI write testimonials from product descriptions?",
    ],
  },

  "review-responder": {
    primaryKeyword: "Review Response Generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "google review responder ai", volume: 0 },
      { keyword: "ai review reply tool", volume: 0 },
      { keyword: "automated review response", volume: 0 },
      { keyword: "customer review reply generator", volume: 0 },
      { keyword: "negative review response ai", volume: 0 },
    ],
    questions: [
      "How to respond to Google reviews with AI?",
      "What is a review response generator?",
      "How to reply to a negative review using AI?",
      "Is there a free review responder tool?",
    ],
  },

  "tiktok-caption-generator": {
    primaryKeyword: "TikTok Caption Generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai tiktok captions", volume: 0 },
      { keyword: "tiktok hashtag generator", volume: 0 },
      { keyword: "best tiktok caption tool", volume: 0 },
      { keyword: "viral tiktok captions ai", volume: 0 },
      { keyword: "tiktok seo caption tool", volume: 0 },
    ],
    questions: [
      "How to generate TikTok captions with AI?",
      "What are the best captions for TikTok?",
      "How to use AI for TikTok SEO?",
      "Is there a free TikTok caption generator?",
    ],
  },

  "facebook-video-script-generator": {
    primaryKeyword: "Facebook Video Script Generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "fb video script ai", volume: 0 },
      { keyword: "facebook ad script generator", volume: 0 },
      { keyword: "ai video scriptwriter for facebook", volume: 0 },
      { keyword: "facebook reels script generator", volume: 0 },
      { keyword: "social media video script tool", volume: 0 },
    ],
    questions: [
      "How to write a Facebook video script with AI?",
      "What is a good script for a Facebook ad?",
      "Can AI generate video scripts for Facebook?",
      "Best tools for Facebook video marketing?",
    ],
  },

  "x-thread-generator": {
    primaryKeyword: "Twitter Thread Generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "x thread maker ai", volume: 0 },
      { keyword: "twitter thread writer tool", volume: 0 },
      { keyword: "auto generate twitter threads", volume: 0 },
      { keyword: "best twitter thread generator", volume: 0 },
      { keyword: "twitter thread scheduler", volume: 0 },
    ],
    questions: [
      "How to make a Twitter thread with AI?",
      "What is an X thread generator?",
      "How to write viral Twitter threads?",
      "Are there free Twitter thread tools?",
    ],
  },

  "youtube-video-to-blog-post": {
    primaryKeyword: "YouTube Video to Blog Post",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "video to blog converter ai", volume: 0 },
      { keyword: "youtube transcript to blog", volume: 0 },
      { keyword: "repurpose youtube to blog", volume: 0 },
      { keyword: "youtube video to article ai", volume: 0 },
      { keyword: "best video to blog tool", volume: 0 },
    ],
    questions: [
      "How to turn a YouTube video into a blog post?",
      "Can AI convert videos to articles?",
      "What is the best YouTube to blog converter?",
      "How to repurpose video content for SEO?",
    ],
  },

  "video-idea-generator": {
    primaryKeyword: "Video Idea Generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "youtube video idea generator ai", volume: 0 },
      { keyword: "content ideas for youtube", volume: 0 },
      { keyword: "viral video ideas tool", volume: 0 },
      { keyword: "creative video topics ai", volume: 0 },
      { keyword: "youtube niche idea generator", volume: 0 },
    ],
    questions: [
      "How to get video ideas with AI?",
      "What is a video idea generator?",
      "How to find trending YouTube topics?",
      "Is there a free YouTube idea tool?",
    ],
  },

  "viral-tweet-generator": {
    primaryKeyword: "viral tweet generator",
    searchVolume: 480,
    difficulty: 32,
    relatedKeywords: [
      { keyword: "ai tweet generator", volume: 1200 },
      { keyword: "twitter thread generator", volume: 800 },
      { keyword: "viral post generator", volume: 500 },
      { keyword: "tweet hook generator", volume: 300 },
      { keyword: "twitter content ideas", volume: 450 },
    ],
    questions: [
      "how to write viral tweets",
      "what makes a tweet go viral",
      "how to use an ai tweet generator",
      "how to generate twitter threads",
    ],
  },

  "ama-post-generator": {
    primaryKeyword: "ama post generator",
    searchVolume: 140,
    difficulty: 18,
    relatedKeywords: [
      { keyword: "reddit ama generator", volume: 400 },
      { keyword: "ask me anything generator", volume: 300 },
      { keyword: "ama post ideas", volume: 200 },
      { keyword: "community post generator", volume: 100 },
      { keyword: "instagram ama questions", volume: 600 },
    ],
    questions: [
      "how to start an ama",
      "what to ask in an ama",
      "how to generate ama posts",
      "best platforms for ama",
    ],
  },

  "viral-ideas-generator": {
    primaryKeyword: "viral content ideas generator",
    searchVolume: 260,
    difficulty: 28,
    relatedKeywords: [
      { keyword: "content idea generator", volume: 5400 },
      { keyword: "viral topic ideas", volume: 600 },
      { keyword: "social media content generator", volume: 1900 },
      { keyword: "trending topic generator", volume: 400 },
      { keyword: "blog post ideas", volume: 49500 },
    ],
    questions: [
      "how to find viral content ideas",
      "what content goes viral",
      "how to brainstorm viral topics",
      "how to use a content generator",
    ],
  },

  "sitemap-generator": {
    primaryKeyword: "sitemap generator",
    searchVolume: 90500,
    difficulty: 72,
    relatedKeywords: [
      { keyword: "xml sitemap generator", volume: 60500 },
      { keyword: "free sitemap generator", volume: 22200 },
      { keyword: "google sitemap generator", volume: 18100 },
      { keyword: "sitemap creator", volume: 5400 },
      { keyword: "online sitemap generator", volume: 4400 },
    ],
    questions: [
      "how to create a sitemap",
      "what is a sitemap generator",
      "how to submit a sitemap to google",
      "why is a sitemap important",
    ],
  },

  "tagline-generator": {
    primaryKeyword: "tagline generator",
    searchVolume: 40500,
    difficulty: 54,
    relatedKeywords: [
      { keyword: "slogan generator", volume: 90500 },
      { keyword: "brand tagline generator", volume: 8100 },
      { keyword: "business slogan maker", volume: 6600 },
      { keyword: "catchy tagline generator", volume: 2400 },
      { keyword: "free tagline generator", volume: 1900 },
    ],
    questions: [
      "how to come up with a tagline",
      "what is a good tagline",
      "how to use a tagline generator",
      "difference between slogan and tagline",
    ],
  },

  "ux-ideas-generator": {
    primaryKeyword: "ux ideas generator",
    searchVolume: 110,
    difficulty: 16,
    relatedKeywords: [
      { keyword: "ux design ideas", volume: 800 },
      { keyword: "ui ux generator", volume: 300 },
      { keyword: "design challenge generator", volume: 1200 },
      { keyword: "ux portfolio ideas", volume: 500 },
      { keyword: "user experience generator", volume: 150 },
    ],
    questions: [
      "how to get ux design ideas",
      "what are good ux challenges",
      "how to improve ux design",
      "how to use a ux generator",
    ],
  },

  "design-ideas-generator": {
    primaryKeyword: "design ideas generator",
    searchVolume: 1600,
    difficulty: 38,
    relatedKeywords: [
      { keyword: "graphic design ideas", volume: 27100 },
      { keyword: "logo design generator", volume: 14800 },
      { keyword: "website design ideas", volume: 12100 },
      { keyword: "creative design generator", volume: 400 },
      { keyword: "design inspiration tool", volume: 600 },
    ],
    questions: [
      "where to find design inspiration",
      "how to generate design ideas",
      "best tools for design ideas",
      "how to use an ai design generator",
    ],
  },

  "services-page-generator": {
    primaryKeyword: "services page copy generator",
    searchVolume: 210,
    difficulty: 24,
    relatedKeywords: [
      { keyword: "service page template", volume: 1300 },
      { keyword: "copywriting generator", volume: 2900 },
      { keyword: "business service page", volume: 200 },
      { keyword: "service description generator", volume: 150 },
      { keyword: "landing page copy tool", volume: 90 },
    ],
    questions: [
      "how to write a services page",
      "what to include in services page",
      "how to generate service page copy",
      "best services page templates",
    ],
  },

  "features-page-generator": {
    primaryKeyword: "features page copy generator",
    searchVolume: 140,
    difficulty: 22,
    relatedKeywords: [
      { keyword: "product features generator", volume: 200 },
      { keyword: "saas features page", volume: 100 },
      { keyword: "feature list generator", volume: 150 },
      { keyword: "software features page", volume: 100 },
      { keyword: "benefits vs features generator", volume: 80 },
    ],
    questions: [
      "how to write a features page",
      "what are product features",
      "how to use a feature generator",
      "how to describe product benefits",
    ],
  },

  "keyword-extractor": {
    primaryKeyword: "keyword extractor",
    searchVolume: 9900,
    difficulty: 48,
    relatedKeywords: [
      { keyword: "free keyword extractor", volume: 1900 },
      { keyword: "text keyword extractor", volume: 1600 },
      { keyword: "online keyword extractor", volume: 1300 },
      { keyword: "keyword research tool", volume: 135000 },
      { keyword: "website keyword extractor", volume: 700 },
    ],
    questions: [
      "what is a keyword extractor",
      "how to extract keywords from text",
      "best keyword extraction tools",
      "how to use a keyword extractor for seo",
    ],
  },

  "website-testimonials-generator": {
    primaryKeyword: "website testimonials generator",
    searchVolume: 320,
    difficulty: 26,
    relatedKeywords: [
      { keyword: "testimonial maker", volume: 2400 },
      { keyword: "customer review generator", volume: 1900 },
      { keyword: "free testimonial tool", volume: 400 },
      { keyword: "testimonial template", volume: 1600 },
      { keyword: "website review widget", volume: 500 },
    ],
    questions: [
      "how to get website testimonials",
      "what is a testimonial generator",
      "how to display testimonials on website",
      "why are testimonials important",
    ],
  },

  "call-to-action-generator": {
    primaryKeyword: "call to action generator",
    searchVolume: 1300,
    difficulty: 34,
    relatedKeywords: [
      { keyword: "cta generator", volume: 2900 },
      { keyword: "button text generator", volume: 800 },
      { keyword: "catchy cta ideas", volume: 600 },
      { keyword: "call to action phrases", volume: 8100 },
      { keyword: "free cta tool", volume: 200 },
    ],
    questions: [
      "what is a good call to action",
      "how to write a cta",
      "how to use a cta generator",
      "best call to action examples",
    ],
  },

  "privacy-policy-generator": {
    primaryKeyword: "privacy policy generator",
    searchVolume: 33100,
    difficulty: 68,
    relatedKeywords: [
      { keyword: "free privacy policy generator", volume: 27100 },
      { keyword: "website privacy policy", volume: 14800 },
      { keyword: "gdpr privacy policy generator", volume: 9900 },
      { keyword: "privacy policy template", volume: 22200 },
      { keyword: "app privacy policy generator", volume: 8100 },
    ],
    questions: [
      "how to create a privacy policy",
      "do i need a privacy policy",
      "is a free privacy policy generator safe",
      "what should be in a privacy policy",
    ],
  },

  "terms-and-conditions-generator": {
    primaryKeyword: "terms and conditions generator",
    searchVolume: 9900,
    difficulty: 62,
    relatedKeywords: [
      { keyword: "free terms and conditions generator", volume: 8100 },
      { keyword: "terms of service generator", volume: 12100 },
      { keyword: "terms of use generator", volume: 5400 },
      { keyword: "website terms and conditions", volume: 4400 },
      { keyword: "terms and conditions template", volume: 6600 },
    ],
    questions: [
      "how to write terms and conditions",
      "why do i need terms and conditions",
      "are online terms and conditions generators legal",
      "how to generate terms and conditions for saas",
    ],
  },

  "tv-ad-script-generator": {
    primaryKeyword: "tv ad script generator",
    searchVolume: 240,
    difficulty: 24,
    relatedKeywords: [
      { keyword: "ad script generator", volume: 1600 },
      { keyword: "commercial script writer", volume: 400 },
      { keyword: "ai video script generator", volume: 2900 },
      { keyword: "tv commercial script ideas", volume: 150 },
      { keyword: "advertising script maker", volume: 200 },
    ],
    questions: [
      "how to write a tv ad script",
      "what is a tv ad script generator",
      "how to use ai for ad scripts",
      "best tools for commercial writing",
    ],
  },

  "advertising-ideas-generator": {
    primaryKeyword: "advertising ideas generator",
    searchVolume: 210,
    difficulty: 32,
    relatedKeywords: [
      { keyword: "ad idea generator", volume: 140 },
      { keyword: "marketing idea generator", volume: 320 },
      { keyword: "creative ad ideas", volume: 480 },
      { keyword: "advertising slogan generator", volume: 1600 },
      { keyword: "facebook ad ideas", volume: 880 },
    ],
    questions: [
      "how to get advertising ideas",
      "what is an ad generator",
      "how to use ai for ads",
      "how to generate ad copy",
    ],
  },

  "app-notification-generator": {
    primaryKeyword: "push notification generator",
    searchVolume: 880,
    difficulty: 35,
    relatedKeywords: [
      { keyword: "push notification tester", volume: 590 },
      { keyword: "notification message generator", volume: 260 },
      { keyword: "app notification copy", volume: 170 },
      { keyword: "ios push notification generator", volume: 320 },
      { keyword: "android notification generator", volume: 210 },
    ],
    questions: [
      "how to write push notifications",
      "what is a notification generator",
      "how to test push notifications",
      "how many characters for push notification",
    ],
  },

  "aida-framework-generator": {
    primaryKeyword: "aida framework generator",
    searchVolume: 1300,
    difficulty: 42,
    relatedKeywords: [
      { keyword: "aida copywriting tool", volume: 480 },
      { keyword: "aida model generator", volume: 320 },
      { keyword: "aida marketing tool", volume: 260 },
      { keyword: "ai copywriting aida", volume: 590 },
      { keyword: "aida formula examples", volume: 1300 },
    ],
    questions: [
      "what is the aida framework",
      "how to use aida in marketing",
      "how to write aida copy",
      "what does aida stand for",
    ],
  },

  "pas-framework-generator": {
    primaryKeyword: "pas copywriting framework",
    searchVolume: 1600,
    difficulty: 45,
    relatedKeywords: [
      { keyword: "pas framework generator", volume: 260 },
      { keyword: "problem agitate solution generator", volume: 210 },
      { keyword: "pas copywriting tool", volume: 170 },
      { keyword: "copywriting frameworks", volume: 1900 },
      { keyword: "pas marketing formula", volume: 260 },
    ],
    questions: [
      "what is pas framework",
      "how to use pas copywriting",
      "how to write pas copy",
      "pas vs aida copywriting",
    ],
  },

  "marketing-plan-generator": {
    primaryKeyword: "marketing plan generator",
    searchVolume: 4400,
    difficulty: 58,
    relatedKeywords: [
      { keyword: "marketing strategy generator", volume: 880 },
      { keyword: "business marketing plan tool", volume: 320 },
      { keyword: "digital marketing plan generator", volume: 480 },
      { keyword: "free marketing plan template", volume: 5400 },
      { keyword: "marketing plan examples", volume: 12100 },
    ],
    questions: [
      "how to create a marketing plan",
      "what is a marketing plan generator",
      "how to use ai for marketing plans",
      "steps to create a marketing plan",
    ],
  },

  "sales-pitch-generator": {
    primaryKeyword: "sales pitch generator",
    searchVolume: 2900,
    difficulty: 52,
    relatedKeywords: [
      { keyword: "elevator pitch generator", volume: 1900 },
      { keyword: "sales script generator", volume: 1300 },
      { keyword: "pitch deck generator", volume: 2900 },
      { keyword: "business pitch tool", volume: 480 },
      { keyword: "sales pitch examples", volume: 8100 },
    ],
    questions: [
      "how to write a sales pitch",
      "what is a good sales pitch",
      "how to use a sales pitch generator",
      "elevator pitch vs sales pitch",
    ],
  },

  "job-description-generator": {
    primaryKeyword: "job description generator",
    searchVolume: 14800,
    difficulty: 66,
    relatedKeywords: [
      { keyword: "jd generator", volume: 880 },
      { keyword: "hiring description tool", volume: 170 },
      { keyword: "job posting generator", volume: 720 },
      { keyword: "ai job description builder", volume: 1300 },
      { keyword: "free job description templates", volume: 9900 },
    ],
    questions: [
      "how to write a job description",
      "what should be in a job description",
      "how to use a jd generator",
      "how to make job description attractive",
    ],
  },

  "ai-resume-builder": {
    primaryKeyword: "ai resume builder",
    searchVolume: 84000,
    difficulty: 78,
    relatedKeywords: [
      { keyword: "best ai resume builder", volume: 12100 },
      { keyword: "resume generator", volume: 49500 },
      { keyword: "cv builder ai", volume: 8100 },
      { keyword: "free ai resume builder", volume: 5400 },
      { keyword: "ai resume checker", volume: 6600 },
    ],
    questions: [
      "is ai resume builder good",
      "how to use ai to build a resume",
      "what is the best ai resume builder",
      "can applicant tracking systems read ai resumes",
    ],
  },

  "linkedin-profile-generator": {
    primaryKeyword: "linkedin profile generator",
    searchVolume: 3600,
    difficulty: 54,
    relatedKeywords: [
      { keyword: "linkedin summary generator", volume: 2900 },
      { keyword: "linkedin headline generator", volume: 1900 },
      { keyword: "linkedin optimization tool", volume: 720 },
      { keyword: "ai linkedin profile builder", volume: 1600 },
      { keyword: "linkedin profile audit", volume: 480 },
    ],
    questions: [
      "how to optimize linkedin profile",
      "what is a linkedin profile generator",
      "how to write a linkedin summary",
      "how to improve linkedin search ranking",
    ],
  },

  "startup-ideas-generator": {
    primaryKeyword: "startup ideas generator",
    searchVolume: 2400,
    difficulty: 48,
    relatedKeywords: [
      { keyword: "business idea generator", volume: 9900 },
      { keyword: "micro saas ideas", volume: 1300 },
      { keyword: "startup name generator", volume: 40500 },
      { keyword: "ai startup generator", volume: 880 },
      { keyword: "new business ideas", volume: 18100 },
    ],
    questions: [
      "how to get startup ideas",
      "how to validate a startup idea",
      "what is a startup generator",
      "where to find startup inspiration",
    ],
  },

  "business-strategy-generator": {
    primaryKeyword: "business strategy generator",
    searchVolume: 1600,
    difficulty: 55,
    relatedKeywords: [
      { keyword: "strategic planning tool", volume: 720 },
      { keyword: "business plan generator", volume: 2900 },
      { keyword: "swot analysis generator", volume: 1600 },
      { keyword: "corporate strategy generator", volume: 140 },
      { keyword: "business model canvas tool", volume: 3600 },
    ],
    questions: [
      "how to create a business strategy",
      "what is a business strategy tool",
      "how to use ai for strategy",
      "difference between strategy and plan",
    ],
  },

  "cost-benefit-analysis-generator": {
    primaryKeyword: "cost benefit analysis generator",
    searchVolume: 880,
    difficulty: 42,
    relatedKeywords: [
      { keyword: "cba tool", volume: 320 },
      { keyword: "cost benefit analysis calculator", volume: 1900 },
      { keyword: "roi calculator", volume: 49500 },
      { keyword: "financial analysis generator", volume: 260 },
      { keyword: "cost benefit analysis template", volume: 8100 },
    ],
    questions: [
      "how to do a cost benefit analysis",
      "what is cost benefit analysis",
      "how to use a cba generator",
      "when to use cost benefit analysis",
    ],
  },

  "brainstorming-generator": {
    primaryKeyword: "brainstorming tool",
    searchVolume: 6600,
    difficulty: 52,
    relatedKeywords: [
      { keyword: "idea brainstorming tool", volume: 880 },
      { keyword: "online brainstorming", volume: 1600 },
      { keyword: "brainstorming app", volume: 1300 },
      { keyword: "creative thinking tool", volume: 480 },
      { keyword: "group brainstorming online", volume: 720 },
    ],
    questions: [
      "what is a brainstorming tool",
      "how to brainstorm ideas",
      "how to use ai for brainstorming",
      "types of brainstorming techniques",
    ],
  },

  "cover-letter-generator": {
    primaryKeyword: "cover letter generator",
    searchVolume: 90500,
    difficulty: 72,
    relatedKeywords: [
      { keyword: "ai cover letter builder", volume: 5400 },
      { keyword: "cover letter maker", volume: 22200 },
      { keyword: "application letter generator", volume: 1900 },
      { keyword: "free cover letter tool", volume: 3600 },
      { keyword: "cover letter examples", volume: 823000 },
    ],
    questions: [
      "how to write a cover letter",
      "is a cover letter generator worth it",
      "how to use ai for cover letters",
      "how long should a cover letter be",
    ],
  },

  "application-letter-generator": {
    primaryKeyword: "application letter generator",
    searchVolume: 1900,
    difficulty: 48,
    relatedKeywords: [
      { keyword: "job application letter generator", volume: 880 },
      { keyword: "letter of application tool", volume: 170 },
      { keyword: "professional letter builder", volume: 260 },
      { keyword: "cover letter generator", volume: 22200 },
      { keyword: "application letter for employment", volume: 6600 },
    ],
    questions: [
      "what is an application letter",
      "how to write an application letter",
      "how to use an application letter tool",
      "application letter vs cover letter",
    ],
  },

  "math-question-solver": {
    primaryKeyword: "math solver",
    searchVolume: 49500,
    difficulty: 65,
    relatedKeywords: [
      { keyword: "math problem solver", volume: 49500 },
      { keyword: "online math solver", volume: 27100 },
      { keyword: "algebra solver", volume: 18100 },
      { keyword: "calculus solver", volume: 12100 },
      { keyword: "step by step math solver", volume: 9900 },
    ],
    questions: [
      "how to solve math problems",
      "can ai solve math equations",
      "best math solver app",
      "math solver with steps free",
    ],
  },

  "career-advice-generator": {
    primaryKeyword: "career advice",
    searchVolume: 22200,
    difficulty: 55,
    relatedKeywords: [
      { keyword: "career guidance", volume: 14800 },
      { keyword: "career coaching", volume: 8100 },
      { keyword: "job search advice", volume: 5400 },
      { keyword: "career path finder", volume: 4400 },
      { keyword: "professional development tips", volume: 2900 },
    ],
    questions: [
      "where to get career advice",
      "how to choose a career",
      "career advice for students",
      "best career advice for mid-level professionals",
    ],
  },

  "invitation-email-generator": {
    primaryKeyword: "invitation email generator",
    searchVolume: 2900,
    difficulty: 40,
    relatedKeywords: [
      { keyword: "email invitation maker", volume: 1900 },
      { keyword: "meeting invitation generator", volume: 1600 },
      { keyword: "event invitation email", volume: 1300 },
      { keyword: "professional email generator", volume: 1000 },
      { keyword: "invitation email template", volume: 880 },
    ],
    questions: [
      "how to write an invitation email",
      "email invitation templates",
      "ai email writer",
      "meeting invite generator tool",
    ],
  },

  "apology-email-generator": {
    primaryKeyword: "apology email generator",
    searchVolume: 1600,
    difficulty: 35,
    relatedKeywords: [
      { keyword: "apology email template", volume: 1300 },
      { keyword: "how to say sorry in email", volume: 1000 },
      { keyword: "business apology email", volume: 880 },
      { keyword: "professional apology generator", volume: 720 },
      { keyword: "sorry email to client", volume: 590 },
    ],
    questions: [
      "how to apologize professionally",
      "apology email to manager",
      "sincere apology email samples",
      "how to write a formal apology",
    ],
  },

  "bug-fix-assistant": {
    primaryKeyword: "ai bug fixer",
    searchVolume: 1200,
    difficulty: 45,
    relatedKeywords: [
      { keyword: "code bug fixer ai", volume: 880 },
      { keyword: "automatic bug fixing", volume: 720 },
      { keyword: "ai debugger", volume: 590 },
      { keyword: "code error solver", volume: 480 },
      { keyword: "python bug fixer ai", volume: 320 },
    ],
    questions: [
      "can ai fix code bugs",
      "best ai for debugging",
      "how to fix code errors with ai",
      "automatic code correction tool",
    ],
  },

  "explain-code": {
    primaryKeyword: "explain code ai",
    searchVolume: 4400,
    difficulty: 50,
    relatedKeywords: [
      { keyword: "code explainer ai", volume: 2900 },
      { keyword: "understand code with ai", volume: 1900 },
      { keyword: "ai code interpreter", volume: 1600 },
      { keyword: "explain programming logic", volume: 880 },
      { keyword: "source code explanation tool", volume: 720 },
    ],
    questions: [
      "how to understand complex code",
      "ai that explains code",
      "best code explainer tools",
      "explain javascript code with ai",
    ],
  },

  "teach-code": {
    primaryKeyword: "learn to code with ai",
    searchVolume: 3600,
    difficulty: 55,
    relatedKeywords: [
      { keyword: "ai coding tutor", volume: 2400 },
      { keyword: "learn programming with ai", volume: 1900 },
      { keyword: "ai for learning code", volume: 1600 },
      { keyword: "coding assistant for students", volume: 1300 },
      { keyword: "ai programming mentor", volume: 880 },
    ],
    questions: [
      "how to learn coding with ai",
      "can ai teach me programming",
      "best ai coding mentors",
      "learning python with ai",
    ],
  },

  "changelog-generator": {
    primaryKeyword: "changelog generator",
    searchVolume: 5400,
    difficulty: 40,
    relatedKeywords: [
      { keyword: "automatic changelog generator", volume: 3600 },
      { keyword: "git changelog generator", volume: 2900 },
      { keyword: "release notes generator", volume: 2400 },
      { keyword: "software changelog tool", volume: 1600 },
      { keyword: "changelog maker", volume: 1300 },
    ],
    questions: [
      "how to generate changelog from git",
      "best changelog tools",
      "what is a changelog generator",
      "automate release notes",
    ],
  },

  "ai-translator": {
    primaryKeyword: "ai translator",
    searchVolume: 90500,
    difficulty: 75,
    relatedKeywords: [
      { keyword: "best ai translation tool", volume: 60500 },
      { keyword: "online ai translator", volume: 49500 },
      { keyword: "neural machine translation", volume: 22200 },
      { keyword: "document ai translator", volume: 18100 },
      { keyword: "ai voice translator", volume: 14800 },
    ],
    questions: [
      "which ai translator is best",
      "is ai translator better than google translate",
      "free ai translation services",
      "how accurate is ai translation",
    ],
  },

  "synonyms-generator": {
    primaryKeyword: "synonyms generator",
    searchVolume: 18100,
    difficulty: 50,
    relatedKeywords: [
      { keyword: "online thesaurus", volume: 165000 },
      { keyword: "synonym finder", volume: 90500 },
      { keyword: "word synonym generator", volume: 12100 },
      { keyword: "ai thesaurus tool", volume: 5400 },
      { keyword: "alternative word generator", volume: 4400 },
    ],
    questions: [
      "how to find better synonyms",
      "best online thesaurus",
      "alternative word generator",
      "synonym generator for essays",
    ],
  },

  "learn-new-words": {
    primaryKeyword: "learn new words",
    searchVolume: 8100,
    difficulty: 45,
    relatedKeywords: [
      { keyword: "vocabulary builder", volume: 40500 },
      { keyword: "learn english vocabulary", volume: 27100 },
      { keyword: "new words daily", volume: 6600 },
      { keyword: "word of the day", volume: 1100000 },
      { keyword: "vocabulary learning app", volume: 8100 },
    ],
    questions: [
      "how to learn new words fast",
      "best vocabulary apps",
      "how to expand my vocabulary",
      "daily new word learning tips",
    ],
  },

  "social-media-reply-generator": {
    primaryKeyword: "social media reply generator",
    searchVolume: 2400,
    difficulty: 35,
    relatedKeywords: [
      { keyword: "ai comment generator", volume: 1900 },
      { keyword: "twitter reply generator", volume: 1600 },
      { keyword: "instagram comment generator", volume: 1300 },
      { keyword: "social media engagement tool", volume: 880 },
      { keyword: "automated social media replies", volume: 720 },
    ],
    questions: [
      "how to automate social media replies",
      "best ai for twitter comments",
      "ai reply assistant",
      "generating social media responses with ai",
    ],
  },

  "support-ticket-reply-generator": {
    primaryKeyword: "customer support reply generator",
    searchVolume: 880,
    difficulty: 40,
    relatedKeywords: [
      { keyword: "support ticket templates", volume: 590 },
      { keyword: "ai support response generator", volume: 480 },
      { keyword: "customer service reply tool", volume: 390 },
      { keyword: "automated support replies", volume: 320 },
      { keyword: "help desk reply templates", volume: 260 },
    ],
    questions: [
      "how to respond to support tickets faster",
      "ai for customer support",
      "best support response templates",
      "automated help desk replies",
    ],
  },

  "song-lyrics-generator": {
    primaryKeyword: "song lyrics generator",
    searchVolume: 60500,
    difficulty: 55,
    relatedKeywords: [
      { keyword: "ai lyric writer", volume: 40500 },
      { keyword: "rap lyrics generator", volume: 33100 },
      { keyword: "write songs with ai", volume: 18100 },
      { keyword: "music lyrics maker", volume: 14800 },
      { keyword: "ai music writer", volume: 9900 },
    ],
    questions: [
      "how to generate song lyrics with ai",
      "best free song lyrics generator",
      "can ai write a hit song",
      "lyric generator based on genre",
    ],
  },

  "joke-generator": {
    primaryKeyword: "joke generator",
    searchVolume: 74000,
    difficulty: 45,
    relatedKeywords: [
      { keyword: "ai joke writer", volume: 27100 },
      { keyword: "funny joke generator", volume: 22200 },
      { keyword: "random joke maker", volume: 18100 },
      { keyword: "dad joke generator", volume: 14800 },
      { keyword: "knock knock joke generator", volume: 8100 },
    ],
    questions: [
      "how to get ai to tell jokes",
      "best joke generator apps",
      "funny random jokes online",
      "can ai write comedy",
    ],
  },

  "event-planner": {
    primaryKeyword: "AI Event Planner",
    searchVolume: 1200,
    difficulty: 35,
    relatedKeywords: [
      { keyword: "ai party planner", volume: 880 },
      { keyword: "event planning software", volume: 12100 },
      { keyword: "ai wedding planner", volume: 590 },
      { keyword: "event management tools", volume: 4400 },
      { keyword: "ai trip planner", volume: 8100 },
    ],
    questions: [
      "how to use ai for event planning",
      "best ai event planner",
      "is there an ai for event planning",
      "can ai plan a wedding",
    ],
  },

  "travel-planner": {
    primaryKeyword: "AI Travel Planner",
    searchVolume: 8100,
    difficulty: 42,
    relatedKeywords: [
      { keyword: "ai trip planner", volume: 14800 },
      { keyword: "best ai travel planner", volume: 2900 },
      { keyword: "roam around ai", volume: 4400 },
      { keyword: "ai itinerary generator", volume: 3600 },
      { keyword: "google travel planner", volume: 22200 },
    ],
    questions: [
      "what is the best ai travel planner",
      "how to plan a trip with ai",
      "is ai travel planner free",
      "does google have an ai travel planner",
    ],
  },

  "gift-ideas-generator": {
    primaryKeyword: "Gift Ideas Generator",
    searchVolume: 5400,
    difficulty: 48,
    relatedKeywords: [
      { keyword: "ai gift generator", volume: 1600 },
      { keyword: "personalized gift ideas", volume: 27100 },
      { keyword: "gift recommender", volume: 880 },
      { keyword: "secret santa generator", volume: 165000 },
      { keyword: "christmas gift ideas", volume: 301000 },
    ],
    questions: [
      "how to find good gift ideas",
      "best gift ideas generator",
      "what should i get for my boyfriend",
      "ai gift suggestions for her",
    ],
  },

  "workout-plan-generator": {
    primaryKeyword: "Workout Plan Generator",
    searchVolume: 6600,
    difficulty: 38,
    relatedKeywords: [
      { keyword: "ai workout generator", volume: 2400 },
      { keyword: "custom workout plan", volume: 18100 },
      { keyword: "gym routine generator", volume: 4400 },
      { keyword: "workout builder", volume: 8100 },
      { keyword: "free workout plan", volume: 33100 },
    ],
    questions: [
      "how to create a workout plan",
      "best ai workout planner",
      "free workout plan generator",
      "how to make a gym routine",
    ],
  },

  "meal-plan-generator": {
    primaryKeyword: "Meal Plan Generator",
    searchVolume: 12100,
    difficulty: 45,
    relatedKeywords: [
      { keyword: "ai meal planner", volume: 5400 },
      { keyword: "weekly meal plan generator", volume: 2900 },
      { keyword: "healthy meal plan generator", volume: 1900 },
      { keyword: "diet plan generator", volume: 3600 },
      { keyword: "meal prep ideas", volume: 60500 },
    ],
    questions: [
      "how to meal plan for a week",
      "best free meal plan generator",
      "can ai make a meal plan",
      "meal planning for weight loss",
    ],
  },

  "ebook-generator": {
    primaryKeyword: "eBook Generator",
    searchVolume: 4400,
    difficulty: 36,
    relatedKeywords: [
      { keyword: "ai ebook creator", volume: 1900 },
      { keyword: "ebook maker", volume: 8100 },
      { keyword: "generate ebook from text", volume: 480 },
      { keyword: "ai book writer", volume: 9900 },
      { keyword: "kindle ebook creator", volume: 5400 },
    ],
    questions: [
      "how to make an ebook for free",
      "best ai ebook generator",
      "how to write a book with ai",
      "is ebook generator legit",
    ],
  },

  "book-ideas-generator": {
    primaryKeyword: "Book Ideas Generator",
    searchVolume: 2900,
    difficulty: 28,
    relatedKeywords: [
      { keyword: "story idea generator", volume: 14800 },
      { keyword: "plot generator", volume: 22200 },
      { keyword: "book title generator", volume: 18100 },
      { keyword: "writing prompts generator", volume: 5400 },
      { keyword: "fantasy book name generator", volume: 6600 },
    ],
    questions: [
      "how to get book ideas",
      "best book ideas generator",
      "what should i write my book about",
      "ai plot generator for novels",
    ],
  },

  "explain-to-a-child": {
    primaryKeyword: "Explain Like I'm Five",
    searchVolume: 60500,
    difficulty: 55,
    relatedKeywords: [
      { keyword: "eli5 generator", volume: 1300 },
      { keyword: "explain to a child ai", volume: 590 },
      { keyword: "simple explanation tool", volume: 210 },
      { keyword: "complex topics simplified", volume: 1600 },
      { keyword: "ai summarizer", volume: 49500 },
    ],
    questions: [
      "what does eli5 mean",
      "best eli5 generator",
      "how to explain complex topics to kids",
      "eli5 meaning reddit",
    ],
  },

  "rss-feed-generator": {
    primaryKeyword: "RSS Feed Generator",
    searchVolume: 8100,
    difficulty: 32,
    relatedKeywords: [
      { keyword: "rss to content generator", volume: 880 },
      { keyword: "ai rss reader", volume: 480 },
      { keyword: "create rss feed from website", volume: 2900 },
      { keyword: "rss aggregator", volume: 9900 },
      { keyword: "free rss feed generator", volume: 1900 },
    ],
    questions: [
      "how to create an rss feed",
      "best rss feed generator",
      "how to turn a website into an rss feed",
      "what is an rss generator",
    ],
  },

  "undetectable-ai-humanizer": {
    primaryKeyword: "AI Humanizer",
    searchVolume: 33100,
    difficulty: 52,
    relatedKeywords: [
      { keyword: "undetectable ai humanizer", volume: 18100 },
      { keyword: "ai text humanizer", volume: 12100 },
      { keyword: "humanize ai text", volume: 9900 },
      { keyword: "bypass ai detection", volume: 22200 },
      { keyword: "stealthwriter", volume: 27100 },
    ],
    questions: [
      "how to humanize ai text",
      "best ai humanizer",
      "is ai humanizer safe",
      "can turnitin detect ai humanizer",
    ],
  },

  "pros-and-cons-generator": {
    primaryKeyword: "Pros and Cons Generator",
    searchVolume: 1600,
    difficulty: 22,
    relatedKeywords: [
      { keyword: "pros and cons list maker", volume: 880 },
      { keyword: "ai decision maker", volume: 1900 },
      { keyword: "comparison generator", volume: 590 },
      { keyword: "advantages and disadvantages generator", volume: 320 },
      { keyword: "t-chart generator", volume: 480 },
    ],
    questions: [
      "how to make a pros and cons list",
      "best pros and cons generator",
      "should i use a pros and cons list",
      "ai comparison tool pros and cons",
    ],
  },

  "real-estate-listing-generator": {
    primaryKeyword: "Real Estate Listing Generator",
    searchVolume: 2400,
    difficulty: 34,
    relatedKeywords: [
      { keyword: "ai real estate description generator", volume: 1600 },
      { keyword: "mls description generator", volume: 880 },
      { keyword: "real estate bio generator", volume: 1300 },
      { keyword: "listing description ai", volume: 590 },
      { keyword: "real estate marketing tools", volume: 9900 },
    ],
    questions: [
      "how to write a real estate listing",
      "best ai real estate listing generator",
      "free listing description generator",
      "ai for real estate agents",
    ],
  },

  "prompt-generator": {
    primaryKeyword: "AI Prompt Generator",
    searchVolume: 18100,
    difficulty: 46,
    relatedKeywords: [
      { keyword: "chatgpt prompt generator", volume: 22200 },
      { keyword: "midjourney prompt generator", volume: 14800 },
      { keyword: "prompt engineering tool", volume: 5400 },
      { keyword: "ai image prompt generator", volume: 6600 },
      { keyword: "stable diffusion prompt generator", volume: 2900 },
    ],
    questions: [
      "how to write good ai prompts",
      "best ai prompt generator",
      "what is a prompt generator",
      "free chatgpt prompt generator",
    ],
  },

  "ai-voice-isolator": {
    primaryKeyword: "Voice Isolator",
    searchVolume: 1900,
    difficulty: 31,
    relatedKeywords: [
      { keyword: "ai voice remover", volume: 14800 },
      { keyword: "vocal isolator", volume: 5400 },
      { keyword: "isolate vocals from music", volume: 9900 },
      { keyword: "background noise remover", volume: 27100 },
      { keyword: "ai audio cleaner", volume: 6600 },
    ],
    questions: [
      "how to isolate voice from audio",
      "best voice isolator ai",
      "is there a free voice isolator",
      "remove music but keep voice ai",
    ],
  },

  "ai-video-to-video": {
    primaryKeyword: "Video to Video AI",
    searchVolume: 4400,
    difficulty: 41,
    relatedKeywords: [
      { keyword: "ai video style transfer", volume: 1300 },
      { keyword: "video to animation ai", volume: 1900 },
      { keyword: "ai video generator", volume: 165000 },
      { keyword: "video to video conversion ai", volume: 590 },
      { keyword: "runway gen-1", volume: 8100 },
    ],
    questions: [
      "how to use video to video ai",
      "best video to video ai tool",
      "can ai change video style",
      "how does video to video ai work",
    ],
  },
};

/** Look up keyword data for a tool slug. Returns undefined if not found. */
export function getToolKeywords(slug: string): ToolKeywords | undefined {
  return toolKeywords[slug];
}
