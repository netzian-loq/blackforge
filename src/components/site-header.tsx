import { BrandMark } from "./brand-mark";
import { site } from "@/lib/site";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#coverage", label: "Where we work" },
  { href: "#faq", label: "Questions" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-asphalt/92 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 text-chalk"
          aria-label={`${site.name} — back to top`}
        >
          <BrandMark className="h-7 w-7" />
          <span className="leading-none">
            <span className="u-display block text-[0.95rem] uppercase tracking-[0.02em] text-chalk">
              {site.wordmark.primary}
            </span>
            <span className="u-spec block text-[0.5625rem] tracking-[0.28em] text-stripe">
              {site.wordmark.secondary}
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="u-spec text-aggregate-2 transition-colors hover:text-chalk"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0 sm:gap-3">
          <a
            href={site.phone.href}
            className="u-spec hidden items-center gap-2 border border-white/15 px-3.5 py-2.5 text-chalk transition-colors hover:border-stripe hover:text-stripe sm:inline-flex"
          >
            <PhoneGlyph className="h-3.5 w-3.5" />
            {site.phone.display}
          </a>
          <a
            href={site.phone.href}
            aria-label={`Call ${site.name} at ${site.phone.display}`}
            className="inline-flex items-center justify-center border border-white/15 p-2.5 text-chalk transition-colors hover:border-stripe hover:text-stripe sm:hidden"
          >
            <PhoneGlyph className="h-4 w-4" />
          </a>
          <a
            href="#quote"
            className="u-spec bg-stripe px-4 py-2.5 text-asphalt transition-colors hover:bg-stripe-2"
          >
            Get a quote
          </a>
        </div>
      </div>
    </header>
  );
}

export function PhoneGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className={className} fill="none">
      <path
        d="M5.2 2.2 3.1 2.6a1.4 1.4 0 0 0-1.1 1.5c.3 3 1.6 5.5 3.4 7.3 1.8 1.8 4.3 3.1 7.3 3.4a1.4 1.4 0 0 0 1.5-1.1l.4-2.1-3-1.2-1.3 1.6a9.6 9.6 0 0 1-3.3-3.3l1.6-1.3-1.4-3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
