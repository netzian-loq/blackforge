import Image from "next/image";
import { base } from "@/lib/site";

/**
 * A full-bleed band of the company's own artwork, sitting between the coverage
 * board and the quote form — proof of a real outfit immediately before the ask.
 *
 * Only the truck scene is used. The rest of the flyer repeats the phone number,
 * the service list and the trust claims as pixels, which would be invisible to
 * search, unreadable to a screen reader, and far too small to read on a phone.
 * All of that already exists on the page as real text.
 *
 * The strapline is the company's own, taken verbatim from the flyer.
 */
export function OnTheRoad() {
  return (
    <section aria-labelledby="road-heading" className="border-b border-white/8">
      {/* Crops toward the cab on narrow screens: at 3.8:1 the full band would be
          barely a hundred pixels tall on a phone. */}
      <Image
        src="/truck.jpg"
        alt="A Black Forge Mack tank truck on fresh asphalt at sunset while a crew member seal coats the surface alongside it. The badge on the artwork reads: quality you can see, durability you can trust."
        width={1320}
        height={344}
        sizes="100vw"
        className="aspect-3/2 w-full object-cover object-[24%_center] sm:aspect-[16/6] lg:aspect-[1320/344] lg:object-center"
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="u-spec text-stripe">
          {base.town}, Tennessee
        </p>
        <h2
          id="road-heading"
          className="u-display mt-5 max-w-3xl text-[clamp(1.5rem,3.6vw,2.375rem)] uppercase text-chalk"
        >
          Built on strength. Driven by purpose.
          <br />
          <span className="text-stripe">Faith. Family. Community.</span>
        </h2>
      </div>
    </section>
  );
}
