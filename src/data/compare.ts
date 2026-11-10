export type Mark = "yes" | "partial" | "no";

export const competitors = ["AmmarAI", "ElevenLabs", "Jasper", "Simplified", "Writesonic"] as const;

export const compareRows: { feature: string; values: [string | Mark, string | Mark, string | Mark, string | Mark, string | Mark] }[] = [
  { feature: "Starting paid price", values: ["$9.99/mo", "~$5/mo", "~$39/mo", "~$24/mo", "~$16/mo"] },
  { feature: "Free option", values: ["Free plan, 500 credits/mo + 3-day Basic trial", "Small free monthly tier", "Trial", "Free plan / trial", "Limited free credits"] },
  { feature: "Long-form writing & SEO", values: ["yes", "no", "yes", "yes", "yes"] },
  { feature: "Image & product photos", values: ["yes", "no", "partial", "yes", "partial"] },
  { feature: "Text-to-video & AI avatars", values: ["yes", "no", "no", "partial", "no"] },
  { feature: "Voiceovers & text-to-speech", values: ["yes", "yes", "partial", "partial", "partial"] },
  { feature: "Transcription", values: ["yes", "yes", "no", "partial", "no"] },
  { feature: "Website chatbot & inbox", values: ["yes", "partial", "no", "no", "partial"] },
  { feature: "Ready-made business phone agents", values: ["yes", "partial", "no", "no", "no"] },
  { feature: "One shared credit balance", values: ["yes", "partial", "partial", "partial", "partial"] },
];

export const stackCosts = [
  { need: "AI writing (e.g. Jasper)", cost: "$39–$59" },
  { need: "Voice & text-to-speech (e.g. ElevenLabs)", cost: "$22–$99" },
  { need: "AI video (e.g. Runway, Pika)", cost: "$15–$35" },
  { need: "AI images (e.g. Midjourney, Photoroom)", cost: "$10–$30" },
  { need: "Website chatbot & inbox", cost: "$29–$50" },
];
export const stackTotal = "$115–$273+/mo";
