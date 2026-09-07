import { services, type Service } from "@/lib/site";
import { Reveal } from "./reveal";

/* Severity runs from striping yellow (routine maintenance) to ember (the base
   has already gone). The colour is carrying information, so it is not swapped
   for decoration anywhere else on the page.
   Two ramps: the deep end of the fill ramp drops under 4.5:1 on asphalt, so
   anything set as type uses the lifted values instead. */
const SEVERITY_FILL: Record<Service["severity"], string> = {
  1: "#F2C230",
  2: "#E09A2C",
  3: "#D4702C",
  4: "#C0512B",
};

const SEVERITY_TEXT: Record<Service["severity"], string> = {
  1: "#F2C230", // 10.6:1
  2: "#E09A2C", // 7.5:1
  3: "#E08A3C", // 6.7:1
  4: "#E2703F", // 5.6:1
};

/* Band proportions match the cut-away section in the hero, so a reading here
   points back to a drawing the visitor has already seen. */
const BANDS =
  "linear-gradient(to bottom," +
  "#24262A 0 13.9%," +
  "#1E2023 13.9% 33.3%," +
  "#3A3D42 33.3% 68.5%," +
  "#2B2723 68.5% 100%)";

/* Band boundaries, as a share of the section depth — the same stops the
   background gradient uses, drawn as hairlines so the strip reads as a scale
   rather than a colour swatch. */
const BAND_STOPS = [13.9, 33.3, 68.5];

function DepthGauge({ reach, color }: { reach: number; color: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative w-6 shrink-0 self-stretch overflow-hidden sm:w-8"
      style={{ backgroundImage: BANDS }}
    >
      <div
        className="absolute inset-x-0 top-0"
        style={{ height: `${reach * 100}%`, backgroundColor: color, opacity: 0.9 }}
      />
      {BAND_STOPS.map((stop) => (
        <div
          key={stop}
          className="absolute inset-x-0 h-px bg-white/20"
          style={{ top: `${stop}%` }}
        />
      ))}
      {/* Where the fix stops. The notch reads as a measurement mark. */}
      <div
        className="absolute inset-x-0 h-0.5 bg-concrete"
        style={{ top: `calc(${reach * 100}% - 2px)` }}
      />
      <div
        className="absolute right-0 h-1.5 w-1.5 bg-concrete"
        style={{
          top: `calc(${reach * 100}% - 5px)`,
          clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
        }}
      />
    </div>
  );
}

export function DepthLadder() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-white/8 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="u-spec text-stripe">Services / ordered by depth</p>
          <h2
            id="services-heading"
            className="u-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] uppercase text-chalk"
          >
            Match the symptom
            <br />
            to the fix.
          </h2>
          <p className="u-prose mt-6 text-[1.0625rem] text-aggregate-2">
            These are not four products on a shelf. They are four points on one scale, from paint
            on a surface that is still sound to a base that has to be rebuilt. Find what you are
            looking at, and you have found the work it needs.
          </p>
        </div>

        <div className="mt-14">
          {services.map((service, index) => {
            const fill = SEVERITY_FILL[service.severity];
            const ink = SEVERITY_TEXT[service.severity];
            return (
              <Reveal key={service.slug} delay={index * 70}>
                <article
                  id={service.slug}
                  className="flex gap-5 border-t border-white/10 py-10 sm:gap-8 sm:py-12"
                >
                  <DepthGauge reach={service.reach} color={fill} />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="u-display text-[clamp(1.5rem,3.4vw,2.125rem)] uppercase text-chalk">
                        {service.name}
                      </h3>
                      <p className="u-spec shrink-0" style={{ color: ink }}>
                        {service.gauge}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-x-10 gap-y-6 lg:grid-cols-[1.35fr_1fr]">
                      <div>
                        <p className="u-spec text-aggregate-2">You are looking at</p>
                        <p className="u-prose mt-2 text-[1.0625rem] text-chalk">
                          {service.symptom}
                        </p>
                        <p className="u-prose mt-4 text-[0.9375rem] text-aggregate-2">
                          {service.summary}
                        </p>
                      </div>

                      <div>
                        <p className="u-spec text-aggregate-2">What the work includes</p>
                        <ul className="mt-3.5 space-y-2.5">
                          {service.includes.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-[0.9375rem] leading-relaxed text-aggregate-2"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2.5 h-px w-4 shrink-0"
                                style={{ backgroundColor: fill }}
                              />
                              <span className="min-w-0">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-10">
          <p className="u-prose text-[1.0625rem] text-aggregate-2">
            Still not sure which one you are looking at?{" "}
            <a
              href="#quote"
              className="text-stripe underline decoration-stripe/40 underline-offset-4 transition-colors hover:decoration-stripe"
            >
              Send us a photo with your quote request
            </a>{" "}
            and we will tell you straight — including when the answer is that it can wait another
            season.
          </p>
        </div>
      </div>
    </section>
  );
}
