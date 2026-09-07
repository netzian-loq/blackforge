import { site } from "@/lib/site";
import { PavementSection } from "./pavement-section";
import { PhoneGlyph } from "./site-header";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <p className="u-spec flex flex-wrap items-center gap-x-3 gap-y-1 text-stripe">
              <span>Wartrace, Tennessee</span>
              <span aria-hidden="true" className="hidden text-aggregate-2 sm:inline">
                /
              </span>
              <span className="text-aggregate-2">Residential &amp; commercial</span>
            </p>

            <h1 className="u-display mt-6 text-[clamp(2.6rem,8vw,4.75rem)] uppercase text-chalk">
              Asphalt fails
              <br />
              from the
              <br />
              <span className="text-stripe">bottom up.</span>
            </h1>

            <p className="u-prose mt-7 max-w-xl text-[1.0625rem] text-aggregate-2 sm:text-lg">
              A crack is just the opening. Water gets under the surface, freezes, lifts, and carries
              the base away with it. By the time a pothole shows up you are no longer paying to fix
              a hole — you are paying to rebuild what used to be under it.
            </p>

            <p className="u-prose mt-4 max-w-xl text-[1.0625rem] text-aggregate-2 sm:text-lg">
              We repair, seal and stripe driveways, lots and private roads around Wartrace, Bell
              Buckle and Shelbyville. Tell us what you are looking at and we will tell you how deep
              it goes.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#quote"
                className="u-spec inline-flex items-center justify-center bg-stripe px-7 py-4 text-[0.75rem] text-asphalt transition-colors hover:bg-stripe-2"
              >
                Get a free quote
              </a>
              <a
                href={site.phone.href}
                className="u-spec inline-flex items-center justify-center gap-2.5 border border-white/20 px-7 py-4 text-[0.75rem] text-chalk transition-colors hover:border-stripe hover:text-stripe"
              >
                <PhoneGlyph className="h-4 w-4" />
                {site.phone.display}
              </a>
            </div>

            <div className="mt-10">
              <div className="u-skipline" aria-hidden="true" />
              <ul className="u-spec mt-4 flex flex-wrap gap-x-6 gap-y-2 text-aggregate-2">
                {site.credentials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <PavementSection className="mx-auto w-full max-w-lg lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
