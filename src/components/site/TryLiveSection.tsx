import { ArrowRight, CalendarDays, ImageIcon, MessageSquare, Phone } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { ChatbotTryButton } from "./LiveChatbot";
import { PhoneDemoButton } from "./PhoneDemoDialog";
import { ExternalButton } from "./Button";

export const TRY_CHAT_URL = "https://app.ammarai.com/chat";
export const TRY_IMAGE_URL = "https://app.ammarai.com/ai-chat-image/chat";

const cards = [
  {
    title: "AI Chat Pro",
    text: "Test reasoning, writing and code help in real time. Ask anything and see the answer stream in.",
    sample: "“Write a launch email for my new skincare line.”",
    href: TRY_CHAT_URL,
    cta: "Try AI Chat free",
    icon: MessageSquare,
  },
  {
    title: "AI Image Pro",
    text: "Describe a picture and generate realistic visuals in seconds, straight from a text prompt.",
    sample: "“A minimalist coffee shop at sunrise, soft light.”",
    href: TRY_IMAGE_URL,
    cta: "Try Image Generator free",
    icon: ImageIcon,
  },
];

export function TryLiveSection() {
  return (
    <Section className="studio-section" id="try-live">
      <Container size="wide">
        <SectionHeading
          eyebrow="Try it live"
          title="Test the speed before you sign up"
          intro="Try 2 free prompts in AI Chat or generate 2 free images right now. No account, no credit card."
          align="center"
        />
        <ul className="mx-auto mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold text-muted-foreground">
          {["2 guest prompts", "No credit card", "Instant results"].map((b) => (
            <li key={b} className="rounded-full border border-border bg-secondary px-3 py-1">{b}</li>
          ))}
        </ul>
        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ title, text, sample, href, cta, icon: Icon }) => (
            <div key={title} className="flex flex-col border border-border bg-card p-6 sm:p-8">
              <span className="grid size-11 place-items-center bg-accent text-accent-foreground"><Icon className="size-5" /></span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <p className="mt-4 border-l-2 border-accent bg-secondary/60 px-3 py-2 text-sm italic text-foreground">{sample}</p>
              <div className="mt-auto pt-6">
                <ExternalButton href={href} target="_blank" rel="noopener" className="w-full sm:w-auto">
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {cta} <ArrowRight className="size-4" />
                </ExternalButton>
              </div>
            </div>
          ))}
          <div className="flex flex-col border border-border bg-card p-6 sm:p-8">
            <span className="grid size-11 place-items-center bg-accent text-accent-foreground"><CalendarDays className="size-5" /></span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">AI Website & Booking Bot</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Chat with our 24/7 website assistant. Ask about AmmarAI, leave your details and book an appointment automatically.</p>
            <p className="mt-4 border-l-2 border-accent bg-secondary/60 px-3 py-2 text-sm italic text-foreground">“Can I book an appointment for tomorrow at 2 PM?”</p>
            <ChatbotTryButton className="mt-auto pt-6" />
          </div>
          <div className="flex flex-col border border-border bg-card p-6 sm:p-8">
            <span className="grid size-11 place-items-center bg-accent text-accent-foreground"><Phone className="size-5" /></span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">AI Phone Call Agent</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Call our live demo number and have a real conversation with an AI phone agent — it answers, asks questions and books appointments.</p>
            <p className="mt-4 border-l-2 border-accent bg-secondary/60 px-3 py-2 text-sm italic text-foreground">“Hi, I'd like to book a check-up for next week.”</p>
            <PhoneDemoButton className="mt-auto pt-6" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
