import { BrandMark } from "./brand-mark";
import { PhoneGlyph } from "./site-header";
import { coverage, services, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cured">
      <div className="u-skipline" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-chalk">
              <BrandMark className="h-8 w-8" />
              <span className="leading-none">
                <span className="u-display block text-[1.0625rem] uppercase">Back Forge</span>
                <span className="u-spec block text-[0.5625rem] tracking-[0.28em] text-stripe">
                  Repair
                </span>
              </span>
            </div>
            <p className="u-prose mt-5 max-w-sm text-[0.9375rem] text-aggregate-2">{site.tagline}.</p>

            <a
              href={site.phone.href}
              className="u-display mt-7 inline-flex items-center gap-3 text-[1.5rem] text-chalk underline decoration-stripe decoration-2 underline-offset-[7px] transition-colors hover:text-stripe"
            >
              <PhoneGlyph className="h-5 w-5" />
              {site.phone.display}
            </a>
            <p className="u-spec mt-4 text-aggregate-2">{site.hours}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block text-[0.9375rem] text-aggregate-2 underline decoration-aggregate/40 underline-offset-4 transition-colors hover:text-chalk"
            >
              {site.email}
            </a>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="u-spec text-stripe">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="text-[0.9375rem] text-aggregate-2 transition-colors hover:text-chalk"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="u-spec text-stripe">Serving</h2>
            <ul className="mt-4 space-y-2.5">
              {coverage.map((entry) => (
                <li key={entry.county} className="text-[0.9375rem] text-aggregate-2">
                  {entry.county} County
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-spec text-aggregate-2">
            © {year} {site.legalName}
          </p>
          <p className="u-spec text-aggregate-2">
            {site.address.locality}, {site.address.region} · Middle Tennessee
          </p>
        </div>
      </div>
    </footer>
  );
}
