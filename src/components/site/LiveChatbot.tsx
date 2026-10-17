import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { CalendarDays, MessageSquare, Mic, Phone, X } from "lucide-react";
import { ActionButton } from "./Button";
import { Container, Section } from "./primitives";
import "./live-chatbot.css";

const SCRIPT_URL = "https://app.ammarai.com/vendor/chatbot/js/external-chatbot.js";
const UUID = "452e5efe-b3b9-480c-bd8f-96425acf5caf";
const VOICE_SCRIPT_URL = "https://app.ammarai.com/vendor/chatbot-voice/js/external-chatbot-voice.js";
const VOICE_UUID = "81795591-8d41-4e29-b815-27ff987e117a";
const ChatbotContext = createContext({ openChatbot: () => {}, loading: false, error: false });

export function LiveChatbotProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hidden = /^\/(admin|auth)(\/|$)/.test(pathname);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const pendingOpen = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function loadVoiceChatbot() {
    if (document.getElementById("ammarai-voice-chatbot-script")) return;
    const script = document.createElement("script");
    script.id = "ammarai-voice-chatbot-script";
    script.src = VOICE_SCRIPT_URL;
    script.defer = true;
    script.dataset['chatbotUuid'] = VOICE_UUID;
    script.dataset['language'] = "en";
    script.onerror = () => script.remove();
    document.body.appendChild(script);
  }

  function loadChatbot() {
    if (document.getElementById("ammarai-chatbot-script")) return;
    setLoading(true);
    setError(false);
    const script = document.createElement("script");
    script.id = "ammarai-chatbot-script";
    script.src = SCRIPT_URL;
    script.defer = true;
    script.dataset['chatbotUuid'] = UUID;
    script.dataset['iframeWidth'] = "420";
    script.dataset['iframeHeight'] = "745";
    script.dataset['language'] = "en";
    script.onerror = () => { setError(true); setLoading(false); script.remove(); };
    document.body.appendChild(script);
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
  if (!ready) return null;
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-label={open ? "Close AI voice demo" : "Talk to our AI voice agent"}
      aria-pressed={open}
      className="ammarai-voice-launcher bg-primary text-primary-foreground"
    >
      {open ? <X className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
      {!open && <span className="ammarai-voice-pulse" aria-hidden="true" />}
    </button>
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
