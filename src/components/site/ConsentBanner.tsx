import { useEffect, useState } from "react";
import { isConsentRequiredRegion, STORAGE_KEY, updateConsent } from "@/lib/consent";

const OPEN_EVENT = "ammarai:cookie-settings";

// Regional advertising-consent banner. Shows only to visitors in regions that
// require consent (EU/UK and similar) until they make a choice; elsewhere
// advertising tracking runs under its ordinary regional defaults. The banner
// can be reopened from any page via the `ammarai:cookie-settings` event.
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let disposed = false;
    void isConsentRequiredRegion().then((required) => {
      if (!disposed && required && localStorage.getItem(STORAGE_KEY) === null) {
        setVisible(true);
      }
    });
    const open = () => setVisible(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      // Keep this tab's Google signals in step with a choice made in another tab.
      if (e.newValue === "granted" || e.newValue === "denied") {
        updateConsent(e.newValue);
      }
      setVisible(false);
    };
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("storage", onStorage);
    return () => {
      disposed = true;
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (!visible) return null;

  const decide = (decision: "granted" | "denied") => {
    localStorage.setItem(STORAGE_KEY, decision);
    updateConsent(decision);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie settings"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <div className="flex-1 text-sm leading-relaxed text-muted-foreground">
          <p>
            We use cookies for advertising measurement. Google Ads collects data to measure
            enquiries from ads; in some regions your consent is required first. Choose
            &ldquo;Accept&rdquo; or &ldquo;Decline&rdquo; — you can change your choice anytime
            from the link in the footer. See our{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
              privacy policy
            </a>{" "}
            and Google&rsquo;s{" "}
            <a
              href="https://business.safety.google/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              business privacy link
            </a>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
