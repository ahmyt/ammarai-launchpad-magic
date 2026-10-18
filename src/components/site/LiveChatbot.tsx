import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, MessageSquare, Mic, Phone, X } from "lucide-react";
import { ActionButton } from "./Button";
import { Container, Section } from "./primitives";
import { siteContentQuery } from "@/lib/content";
import "./live-chatbot.css";

const DEFAULT_BUBBLE = "📞 Live AI Demo: Try live voice call";
const ChatbotContext = createContext({ openChatbot: () => {}, loading: false, error: false });

type Embed = { src: string; data: Record<string, string> };

/** Reads src + data-* attributes from a pasted <script> tag; only https scripts are accepted. */
function parseEmbed(code: string | undefined): Embed | null {
  if (!code) return null;
  const src = code.match(/src\s*=\s*["']([^"']+)["']/i)?.[1];
  if (!src || !/^https:\/\//i.test(src)) return null;
  const data: Record<string, string> = {};
  for (const m of code.matchAll(/data-([a-z0-9-]+)\s*=\s*["']([^"']*)["']/gi)) {
    const key = m[1]!.toLowerCase().replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
    data[key] = m[2]!;
  }
  if (!data["chatbotUuid"]) return null;
  return { src, data };
}

function injectScript(id: string, embed: Embed, onError?: () => void) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = embed.src;
  script.defer = true;
  for (const [k, v] of Object.entries(embed.data)) script.dataset[k] = v;
  script.onerror = () => { onError?.(); script.remove(); };
  document.body.appendChild(script);
}

export function LiveChatbotProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const { data: content } = useQuery({ ...siteContentQuery, enabled: hydrated });
  const settings = content?.pages.find((p) => p.slug === "settings");
  const chatEmbed = settings?.chatbotEnabled === false ? null : parseEmbed(settings?.chatbotEmbed);
  const voiceEmbed = settings?.voiceBotEnabled === false ? null : parseEmbed(settings?.voiceBotEmbed);
  const bubbleText = settings?.voiceBubbleEnabled === false ? "" : settings?.voiceBubbleText?.trim() || DEFAULT_BUBBLE;
  const hidden = /^\/(admin|auth)(\/|$)/.test(pathname);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const pendingOpen = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function loadVoiceChatbot() {
    if (voiceEmbed) injectScript("ammarai-voice-chatbot-script", voiceEmbed);
  }

  function loadChatbot() {
    if (!chatEmbed || document.getElementById("ammarai-chatbot-script")) return;
    setLoading(true);
    setError(false);
    injectScript("ammarai-chatbot-script", chatEmbed, () => { setError(true); setLoading(false); });
    timeout.current = setTimeout(() => {
      if (document.querySelector('#lqd-ext-chatbot-wrap[data-ready="true"]')) return;
      setError(true);
      setLoading(false);
    }, 15000);
  }

  function openChatbot() {
    const wrapper = document.getElementById("lqd-ext-chatbot-wrap");
    if (wrapper?.dataset['ready'] === "true") {
      if (wrapper.dataset['windowState'] !== "open") {
        wrapper.querySelector<HTMLButtonElement>(".lqd-ext-chatbot-trigger:not(.lqd-ext-chatbot-trigger-mobile)")?.click();
      }
      return;
    }
    pendingOpen.current = true;
    loadChatbot();
  }

  useEffect(() => {
    document.body.classList.toggle("chatbot-hidden", hidden);
    if (hidden) {
      pendingOpen.current = false;
      const wrapper = document.getElementById("lqd-ext-chatbot-wrap");
      if (wrapper?.dataset['windowState'] === "open") wrapper.querySelector<HTMLButtonElement>(".lqd-ext-chatbot-trigger")?.click();
      return;
    }
    const timer = setTimeout(() => {
      loadChatbot();
      loadVoiceChatbot();
    }, 4000);
    return () => clearTimeout(timer);
  }, [hidden]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const wrapper = document.getElementById("lqd-ext-chatbot-wrap");
      if (!wrapper) return;
      const ready = wrapper.dataset['ready'] === "true";
      if (ready) {
        setLoading(false);
        setError(false);
        clearTimeout(timeout.current);
        const trigger = wrapper.querySelector<HTMLButtonElement>(".lqd-ext-chatbot-trigger");
        trigger?.setAttribute("aria-label", "Open or close AmmarAI live chatbot");
        if (pendingOpen.current) {
          pendingOpen.current = false;
          if (wrapper.dataset['windowState'] !== "open") trigger?.click();
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-ready", "data-window-state"] });
    const onKey = (event: KeyboardEvent) => {
      const wrapper = document.getElementById("lqd-ext-chatbot-wrap");
      if (event.key === "Escape" && wrapper?.dataset['windowState'] === "open") wrapper.querySelector<HTMLButtonElement>(".lqd-ext-chatbot-trigger")?.click();
    };
    document.addEventListener("keydown", onKey);
    return () => { observer.disconnect(); clearTimeout(timeout.current); document.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <ChatbotContext.Provider value={{ openChatbot, loading, error }}>
      {children}
      {!hidden && <VoiceLauncher />}
    </ChatbotContext.Provider>
  );
}

function VoiceLauncher() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => setReady(!!document.getElementById("lqd-ext-voice-chatbot-wrapper"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.body.classList.toggle("voice-open", open);
    return () => document.body.classList.remove("voice-open");
  }, [open]);
  const [bubble, setBubble] = useState(false);
  useEffect(() => {
    if (!ready) return;
    if (sessionStorage.getItem("ammarai-voice-bubble") === "off") return;
    const t = setTimeout(() => setBubble(true), 1500);
    return () => clearTimeout(t);
  }, [ready]);
  const hideBubble = () => { setBubble(false); sessionStorage.setItem("ammarai-voice-bubble", "off"); };
  if (!ready) return null;
  return (
    <>
      {bubble && !open && (
        <div className="ammarai-voice-bubble" role="status">
          <button type="button" className="ammarai-voice-bubble-text" onClick={() => { hideBubble(); setOpen(true); }}>
            📞 Live AI Demo: Try live voice call
          </button>
          <button type="button" aria-label="Dismiss" className="ammarai-voice-bubble-close" onClick={hideBubble}>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => { hideBubble(); setOpen((v) => !v); }}
        aria-label={open ? "Close AI voice demo" : "Talk to our AI voice agent"}
        aria-pressed={open}
        className="ammarai-voice-launcher"
      >
        {open ? <X className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
        {!open && <span className="ammarai-voice-pulse" aria-hidden="true" />}
      </button>
    </>
  );
}

export function ChatbotTryButton({ className }: { className?: string }) {
  const { openChatbot, loading, error } = useContext(ChatbotContext);
  return (
    <div className={className}>
      <ActionButton onClick={openChatbot} disabled={loading} className="w-full sm:w-auto">
        <MessageSquare className="size-4 shrink-0" aria-hidden="true" />
        {loading ? "Connecting…" : "Try the live chatbot"}
      </ActionButton>
      {error && <p role="status" className="mt-2 text-sm text-muted-foreground">The live bot is unavailable here right now. Please try again shortly.</p>}
    </div>
  );
}

export function ChatbotCallout({ pricing = false }: { pricing?: boolean }) {
  return (
    <Section className="border-y border-border bg-secondary/40 py-10 sm:py-14">
      <Container>
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Live experience</p>
            <h2 className="mt-3 text-2xl sm:text-3xl">{pricing ? "Try the bot before choosing a plan" : "Meet the AI bot, live on this website"}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Ask about AmmarAI, try a voice conversation, or explore appointment scheduling with our live website bot.{pricing ? " Website voice bots are included from Standard." : " See how a conversation can turn into your next customer."}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-foreground">
              <span className="inline-flex items-center gap-1.5"><MessageSquare className="size-4 text-accent" />Live chat</span>
              <span className="inline-flex items-center gap-1.5"><Mic className="size-4 text-accent" />Voice</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4 text-accent" />Appointments</span>
            </div>
          </div>
          <ChatbotTryButton className="shrink-0 md:max-w-xs" />
        </div>
      </Container>
    </Section>
  );
}
