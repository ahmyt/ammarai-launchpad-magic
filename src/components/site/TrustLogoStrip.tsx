const companies = [
  { name: "ATNapps", src: "/media/trusted-companies/atnapps.png", alt: "ATNapps mobile app builder logo" },
  { name: "NureMath", src: "/media/trusted-companies/nuremath.png", alt: "NureMath mathematics learning logo" },
  { name: "MyMobile Unlocking", src: "/media/trusted-companies/mymobile-unlocking.png", alt: "MyMobile Unlocking logo" },
  { name: "Ice Land", src: "/media/trusted-companies/ice-land.png", alt: "Ice Land ice cream logo" },
  { name: "ATN Technology", src: "/media/trusted-companies/atn-technology.png", alt: "ATN Technology logo" },
  { name: "Ethio Game", src: "/media/trusted-companies/ethio-game.png", alt: "Ethio Game logo" },
  { name: "AymarPOS", src: "/media/trusted-companies/aymarpos.png", alt: "AymarPOS point-of-sale logo" },
];

function LogoTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="trust-logo-track" aria-hidden={duplicate || undefined}>
      {companies.map((company) => (
        <div key={company.name} className="trust-logo-item">
          <img
            src={company.src}
            alt={company.alt}
            title={company.name}
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
    <section aria-labelledby="trusted-companies-heading" className="trust-strip border-y border-border bg-paper py-10">
      <h2
        id="trusted-companies-heading"
        className="mb-7 text-center font-sans text-xs font-semibold uppercase text-muted-foreground"
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
