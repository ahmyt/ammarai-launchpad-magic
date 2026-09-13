const companies = [
  { name: "ATNapps", src: "/media/trusted-companies/atnapps.webp" },
  { name: "TaxiVA Call 8802", src: "/media/trusted-companies/taxiva.webp" },
  { name: "eSIMnow", src: "/media/trusted-companies/esimnow.webp" },
  { name: "ATN Technology", src: "/media/trusted-companies/atn-technology.webp" },
  { name: "MyMobile Unlocking", src: "/media/trusted-companies/mymobile-unlocking.webp" },
  { name: "Ethio Game", src: "/media/trusted-companies/ethio-game.webp" },
  { name: "AymarPOS", src: "/media/trusted-companies/aymarpos.webp" },
];

function LogoTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="trust-logo-track" aria-hidden={duplicate || undefined}>
      {companies.map((company) => (
        <div key={company.name} className="trust-logo-item">
          <img
            src={company.src}
            alt={duplicate ? "" : `${company.name} logo`}
            width={360}
            height={112}
            loading="lazy"
            className="h-14 w-44 object-contain sm:h-16 sm:w-52"
          />
        </div>
      ))}
    </div>
  );
}

export function TrustLogoStrip() {
  return (
    <section aria-labelledby="trusted-companies-heading" className="trust-strip border-y border-border bg-paper py-12 sm:py-14">
      <h2
        id="trusted-companies-heading"
        className="mb-8 text-center font-sans text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
      >
        Trusted by growing companies
      </h2>
      <div className="trust-logo-marquee" role="group" aria-label="Companies using AmmarAI">
        <LogoTrack />
        <LogoTrack duplicate />
      </div>
    </section>
  );
}
