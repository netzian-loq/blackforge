import { coverage, site } from "@/lib/site";
import { Reveal } from "./reveal";

export function CoverageArea() {
  const towns = coverage.reduce((total, entry) => total + entry.towns.length, 0);

  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
      className="border-b border-white/8 bg-cured py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="u-spec text-stripe">Coverage / Middle Tennessee</p>
            <h2
              id="coverage-heading"
              className="u-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] uppercase text-chalk"
            >
              Where we work.
            </h2>
          </div>
          <p className="u-prose text-[1.0625rem] text-aggregate-2">
            {coverage.length} counties and {towns} towns across Middle Tennessee. If yours is not on
            the board, call anyway — when a crew is already running nearby we will come look, and if
            we cannot get to you we will say so rather than waste your week.
          </p>
        </div>

        {/* One reveal for the whole board. Ten cells fading in separately reads
            as an effect; the board arriving at once reads as a sign. */}
        <Reveal className="mt-14 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
          {coverage.map((entry) => (
            <div key={entry.county}>
              <div className="h-0.5 w-full bg-stripe" aria-hidden="true" />
              <h3 className="u-display mt-3.5 text-[1.0625rem] uppercase text-chalk">
                {entry.county}
              </h3>
              <p className="u-spec mt-1 text-[0.5625rem] text-aggregate-2">County</p>
              <ul className="mt-3 space-y-1">
                {entry.towns.map((town) => (
                  <li key={town} className="text-[0.875rem] leading-snug text-aggregate-2">
                    {town}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <div className="mt-14">
          <div className="u-skipline-dim" aria-hidden="true" />
          <p className="u-spec mt-5 text-aggregate-2">
            Not sure if you are in range? Call {site.phone.display}
          </p>
        </div>
      </div>
    </section>
  );
}
