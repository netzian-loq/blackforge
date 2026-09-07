/**
 * Single source of truth for every piece of business data on the site.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  BEFORE LAUNCH — replace every value marked PLACEHOLDER or VERIFY.
 *  Nothing here comes from real records; it is scaffolding written to the right
 *  shape so the owner can swap in facts without touching a single component.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Black Forge",
  legalName: "Black Forge", // VERIFY: exact registered entity name

  /* The badge, cropped out of the supplied artwork. The source is 274px square,
     so keep rendered sizes at or under 137px — at 2x that is exactly the native
     resolution, and anything larger is an upscale. Each usage passes its own
     width/height so the optimiser is asked for the size actually displayed.
     See the README if a higher-resolution original turns up. */
  logo: {
    src: "/logo.png",
    nativeSize: 274,
    alt: "Black Forge Asphalt Repair and Seal Coating",
  },
  tagline: "Asphalt repair, paving and sealcoating in Wartrace and Bedford County",
  description:
    "Asphalt repair, paving, pothole repair and sealcoating for homeowners and commercial property owners in Wartrace, Bell Buckle, Shelbyville and the surrounding Bedford County area. Free on-site estimates, written quotes.",

  phone: {
    display: "(931) 224-2605",
    href: "tel:+19312242605",
  },
  email: "blackforgerepair@gmail.com",

  /* Set NEXT_PUBLIC_SITE_URL in Vercel to the live domain (or, before the
     domain is attached, the .vercel.app URL). Canonical tags, the sitemap,
     robots.txt and the social cards all read from it, so leaving the fallback
     in place on a live site points every one of them at the wrong host. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackforgerepair.com",

  // VERIFY: hours and the credential claims below are legal representations.
  hours: "Mon-Fri 7:00a - 6:00p, Sat by appointment",
  address: {
    // Service-area businesses may omit a street address; Google prefers city/region.
    locality: "Wartrace",
    region: "TN",
    postalCode: "37183", // VERIFY
    country: "US",
  },
  // Approximate centre of Wartrace. Google reads this to decide which searches
  // the business is local to, so nudge it to the actual yard or shop.
  geo: { lat: 35.5273, lng: -86.3336 }, // VERIFY

  credentials: [
    // Wording taken from the company's own flyer, which claims "fully insured"
    // rather than licensed. Do not upgrade this to "licensed" without a licence.
    "Fully insured",
    "Residential and commercial",
    "Free on-site estimates", // VERIFY
  ],
} as const;

/**
 * Services ordered by how deep into the pavement the failure goes.
 * `reach` is the share of the cross-section the fix touches (0-1); it drives
 * both the gauge graphic and the severity colour.
 */
export type Service = {
  slug: string;
  name: string;
  gauge: string;
  reach: number;
  severity: 1 | 2 | 3 | 4;
  symptom: string;
  summary: string;
  includes: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "sealcoating",
    name: "Sealcoating",
    gauge: 'Surface · 0"',
    reach: 0.14,
    severity: 1,
    symptom:
      "It has gone from black to bone grey, the surface feels chalky, and loose stone comes up on your shoe.",
    summary:
      "A protective coat over pavement that is still structurally sound. It blocks UV, oxidation, fuel and water — the four things that turn a good driveway into a cracked one. The cheapest work you will ever do on asphalt, and the only kind that prevents the rest.",
    includes: [
      "Power clean, degrease and edge trim",
      "Two-coat commercial-grade sealer",
      "Crack routing and hot-pour sealant on hairlines",
      "Re-stripe parking stalls, ADA spaces and fire lanes",
    ],
  },
  {
    slug: "pothole-repair",
    name: "Pothole Repair",
    gauge: '2" to 4" deep',
    reach: 0.42,
    severity: 2,
    symptom:
      "There is an open hole. The edges are crumbling, the aggregate is loose, and it grows every time it rains.",
    summary:
      "A hole is not a surface problem. It is water that already got in and took the material with it. We square it out to solid pavement instead of throwing cold patch at it, because a patch that is not cut square lifts by spring.",
    includes: [
      "Saw-cut to square, sound edges",
      "Excavate failed material down to a firm base",
      "Tack coat, hot mix, compacted in lifts",
      "Infrared patching where a seamless joint matters",
    ],
  },
  {
    slug: "asphalt-repair",
    name: "Asphalt Repair",
    gauge: "Full depth",
    reach: 0.74,
    severity: 3,
    symptom:
      "Alligator cracking, soft spots, water standing after a storm, or an area that visibly sinks when a wheel rolls over it.",
    summary:
      "When the cracks form a scale pattern, the base underneath has failed and the surface is only reporting it. Resurfacing over a failed base buys you one season. We dig to the cause, rebuild the base, and tie new asphalt into the old.",
    includes: [
      "Full-depth cut-out and base rebuild",
      "Crack sealing and joint repair",
      "Edge repair and shoulder rebuild",
      "Regrading to move water off the surface",
    ],
  },
  {
    slug: "paving",
    name: "Paving",
    gauge: "New surface",
    reach: 1,
    severity: 4,
    symptom:
      "Too much of it is gone to fix piece by piece, or there is nothing there yet and you are starting from dirt.",
    summary:
      "New driveways, lots and private roads, plus overlays where the base is still sound. We will tell you honestly which one you need: an overlay on a bad base is the most expensive mistake in this trade.",
    includes: [
      "New construction: grade, stone base, hot mix",
      "Overlay on structurally sound pavement",
      "Mill and replace where finished height is fixed",
      "Grading and drainage so water leaves the surface",
    ],
  },
] as const;

/** Where the trucks start from. */
export const base = { town: "Wartrace", county: "Bedford", region: "TN" } as const;

/**
 * Towns inside the working radius, nearest first.
 *
 * VERIFY: `miles` are approximate straight-line distances from Wartrace, not
 * drive times. They are shown to the visitor as "about", so being a mile out is
 * harmless — but check them against a map before launch, and add or drop towns
 * to match the radius actually worked. `SERVICE_RADIUS_MILES` scales the bars
 * on the coverage board, so keep it at or above the largest distance listed.
 */
export const SERVICE_RADIUS_MILES = 12;

export const coverage = [
  { town: "Wartrace", county: "Bedford", miles: 0 },
  { town: "Bell Buckle", county: "Bedford", miles: 5 },
  { town: "Normandy", county: "Bedford", miles: 7 },
  { town: "Shelbyville", county: "Bedford", miles: 9 },
  { town: "Fosterville", county: "Rutherford", miles: 9 },
  { town: "Beechgrove", county: "Coffee", miles: 10 },
  { town: "Christiana", county: "Rutherford", miles: 11 },
] as const;

/** Counties the radius touches, in the order they first appear above. */
export const counties: readonly string[] = [...new Set(coverage.map((entry) => entry.county))];

export const propertyTypes = ["Residential", "Commercial"] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const faqs = [
  {
    q: "What does asphalt work cost around Wartrace?",
    a: "Square footage, how deep the damage goes, and equipment access set the price, which is why nobody honest quotes a driveway over the phone. Sealcoating a two-car driveway sits at the low end; a full-depth commercial repair at the high end. We measure on site, put the number in writing, and it does not move unless you change the scope.",
  },
  {
    q: "How do I know whether to seal it or repave it?",
    a: "Look at the crack pattern. Straight, isolated cracks and grey colour mean the base is fine, so sealing and crack filling will hold. Interconnected cracks in a scale pattern, soft spots, or water standing after a storm mean the base has failed, and no amount of surface work will fix that. If you are unsure, this is exactly what the free assessment is for.",
  },
  {
    q: "What time of year can you pave in Tennessee?",
    a: "Hot mix needs ground temperature above roughly 50°F and rising, which in Middle Tennessee usually means late March through early November. Sealcoating needs a dry stretch and overnight lows above 50°F, so it runs May through September. Winter is for emergency pothole work and getting on next season's schedule early.",
  },
  {
    q: "How soon can I drive on it?",
    a: "Sealcoating: stay off for 24 hours, 48 in high heat. New asphalt: 24 to 48 hours before driving on it. For the first 30 days avoid parking in the same spot every night, and do not turn your wheels while stopped. Fresh asphalt marks easily until it fully cures.",
  },
  {
    q: "Do you work with property managers and HOAs?",
    a: "Yes, and it is a large share of what we do. We phase lots so tenants keep access, work nights and weekends where a business cannot lose parking, and handle ADA stall and fire lane striping to code. Certificates of insurance and a W-9 go out with the proposal.",
  },
  {
    q: "How long does a quote take?",
    a: "We answer quote requests the same business day. Most on-site assessments happen within 48 hours, and the written number follows within a day of the visit.",
  },
] as const;

/** What we promise happens after someone submits the form. Keep this true. */
export const responsePromise = [
  {
    when: "Same business day",
    what: "A real person calls or emails to confirm what you are dealing with.",
  },
  {
    when: "Within 48 hours",
    what: "We come out, measure, and check the base, not just the surface.",
  },
  {
    when: "Next day",
    what: "A written, itemised quote. No pressure and no expiring discounts.",
  },
] as const;
