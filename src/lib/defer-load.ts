// Shared scheduler for third-party scripts (chat/voice widgets, Google Ads tag).
// Work runs on the visitor's first interaction, or after a quiet fallback delay
// once the page has fully loaded, so vendor code never competes with hydration.

export const ENGAGEMENT_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll", "wheel"] as const;

type Target = Pick<Window, "addEventListener" | "removeEventListener" | "setTimeout" | "clearTimeout"> & {
  document: Pick<Document, "readyState">;
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
};

/**
 * Runs `task` once: on first engagement, or `fallbackMs` after window load
 * (then at browser idle). Returns a cancel function.
 */
export function runAfterEngagement(task: () => void, fallbackMs: number, target: Target = window as unknown as Target) {
  let done = false;
  let timer: number | undefined;
  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    task();
  };
  const onLoad = () => {
    timer = target.setTimeout(() => {
      if (target.requestIdleCallback) target.requestIdleCallback(run, { timeout: 2000 });
      else run();
    }, fallbackMs);
  };
  function cleanup() {
    for (const e of ENGAGEMENT_EVENTS) target.removeEventListener(e, run);
    target.removeEventListener("load", onLoad);
    if (timer !== undefined) target.clearTimeout(timer);
  }
  for (const e of ENGAGEMENT_EVENTS) target.addEventListener(e, run, { once: true, passive: true });
  if (target.document.readyState === "complete") onLoad();
  else target.addEventListener("load", onLoad, { once: true });
  return () => { done = true; cleanup(); };
}
