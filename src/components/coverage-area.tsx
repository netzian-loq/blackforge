import { base, counties, coverage, SERVICE_RADIUS_MILES, site } from "@/lib/site";
import { Reveal } from "./reveal";

/**
 * A mileage board, the way a highway sign lists destinations and distances.
 *
 * The services section measures depth downward; this one measures distance
 * outward. Same instrument, turned on its side — which is why the bars are
 * proportional rather than decorative.
 */
export function CoverageArea() {
  const furthest = coverage[coverage.length - 1];

  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
      className="border-b border-white/8 bg-cured py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="u-spec text-stripe">
              Based in {base.town}, {base.region}
            </p>
            <h2
              id="coverage-heading"
              className="u-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] uppercase text-chalk"
            >
              Where we work.
            </h2>
          </div>
          <div>
            <p className="u-prose text-[1.0625rem] text-aggregate-2">
              We work a tight circle around {base.town}, and that is deliberate. A crew fifteen
              minutes away turns up when it says it will, and you are not paying to drag equipment
              across the state to reach you.
            </p>
            <p className="u-prose mt-4 text-[1.0625rem] text-aggregate-2">
              If your town is on this board, we can usually get eyes on the job the same week.
            </p>
          </div>
        </div>

        {/* One reveal for the whole board — rows fading in one by one would read
            as an effect rather than a sign. */}
        <Reveal className="mt-14">
          <ul className="border-t border-white/10">
            {coverage.map((entry) => {
              const isBase = entry.miles === 0;
              return (
                <li
                  key={entry.town}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 border-b border-white/10 py-4 sm:grid-cols-[minmax(0,15rem)_1fr_auto] sm:gap-x-8"
                >
                  <div className="min-w-0 sm:order-1">
                    <span className="u-display block text-[1.0625rem] uppercase text-chalk">
                      {entry.town}
                    </span>
                    <span className="u-spec mt-0.5 block text-[0.5625rem] text-aggregate-2">
                      {entry.county} County
                    </span>
                  </div>

                  {/* The distance sits beside the town on narrow screens and at
                      the end of the bar on wide ones, so the row stays two lines
                      tall on a phone instead of three. */}
                  <p
                    className={`u-spec shrink-0 text-right sm:order-3 ${
                      isBase ? "text-chalk" : "text-stripe"
                    }`}
                  >
                    {isBase ? "Base" : `About ${entry.miles} mi`}
                  </p>

                  {/* Drawn to scale. The figure is stated as text above, so the
                      bar is for the eye only. */}
                  <div
                    aria-hidden="true"
                    className="col-span-2 h-1.5 w-full bg-white/6 sm:order-2 sm:col-span-1"
                  >
                    <div
                      className={isBase ? "h-full bg-chalk" : "h-full bg-stripe"}
                      style={{
                        width: isBase
                          ? "6px"
                          : `${(entry.miles / SERVICE_RADIUS_MILES) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-10">
          <p className="u-prose max-w-2xl text-[1.0625rem] text-aggregate-2">
            Sitting a little outside the board? Call anyway. For larger commercial work — lots,
            private roads, anything that justifies moving the equipment — we travel further into{" "}
            {counties.slice(0, -1).join(", ")} and {counties[counties.length - 1]} counties. Past
            about {furthest.miles} miles it comes down to the size of the job, and we will tell you
            straight if it is not worth your money.
          </p>
          <div className="mt-8 u-skipline-dim" aria-hidden="true" />
          <p className="u-spec mt-5 text-aggregate-2">
            Not sure if you are in range? Call {site.phone.display}
          </p>
        </div>
      </div>
    </section>
  );
}
