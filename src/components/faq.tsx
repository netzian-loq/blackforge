import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-b border-white/8 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="u-spec text-stripe">Straight answers</p>
            <h2
              id="faq-heading"
              className="u-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] uppercase text-chalk"
            >
              What people
              <br />
              ask first.
            </h2>
          </div>

          <div>
            {faqs.map((item) => (
              <details
                key={item.q}
                name="faq"
                className="group border-t border-white/10 last:border-b"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium text-chalk transition-colors hover:text-stripe [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative mt-2.5 h-3 w-3 shrink-0 text-stripe"
                  >
                    <span className="absolute left-0 top-1/2 h-0.5 w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-3 w-0.5 -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="u-prose pb-6 pr-10 text-[0.9375rem] text-aggregate-2">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
