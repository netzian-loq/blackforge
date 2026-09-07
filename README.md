# Black Forge

Marketing site for an asphalt repair, paving and sealcoating contractor serving
Middle Tennessee. Single page, built to convert phone calls and quote requests
from homeowners and commercial property owners.

> **Not ready to publish yet.** The name, phone, email and service area are
> real. The credential claims and the distances on the coverage board are not
> yet verified, and lead emails are not wired up. Work through
> [Before you launch](#before-you-launch) first.

---

## Stack

| Choice                | Why                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Next.js 16** (App Router) | Every route prerenders to static HTML, which is what local SEO rewards. First-class on Vercel with zero config. |
| **React 19**          | Server Components keep the shipped JS to the form and the scroll reveals — nothing else needs a client bundle.        |
| **Tailwind CSS v4**   | Design tokens live in `@theme` in one file, so the palette is a single source of truth rather than scattered hexes.   |
| **TypeScript**        | Business data is typed, so a malformed service or county breaks the build instead of the page.                        |
| **No UI library**     | The design is specific to this trade. A component kit would have cost more in overrides than it saved.                |

Runtime dependencies are `next`, `react` and `react-dom`. Nothing else — email
delivery calls the Resend REST API with `fetch`, so there is no SDK in the bundle.

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build
```

```bash
npm run lint
```

## Where things live

```
src/
  app/
    layout.tsx            Fonts, metadata, viewport
    page.tsx              Section order for the homepage
    actions.ts            Server action: validates and delivers quote requests
    globals.css           Design tokens and the shared utility classes
    sitemap.ts robots.ts  Generated from site.url
    opengraph-image.tsx   Social card, rendered at build time
  components/
    hero.tsx              Headline plus the cut-away section drawing
    pavement-section.tsx  The annotated cross-section
    depth-ladder.tsx      Services, ordered by how deep the failure goes
    coverage-area.tsx     Mileage board, towns by distance from base
    quote-form.tsx        Quote section and the form itself
    faq.tsx  site-footer.tsx  site-header.tsx
    structured-data.tsx   LocalBusiness and FAQPage JSON-LD
  lib/
    site.ts               ← all business content lives here
    quote.ts              Shared form state and options
```

**`src/lib/site.ts` is the file to edit for content.** Phone number, email,
hours, services, counties, FAQs and the response promise all come from it, and
they feed the page copy, the footer, the sitemap and the structured data at the
same time. You should not need to touch a component to change business details.

## Design notes

The page is built on one idea: **asphalt fails from the bottom up**, so the work
is sorted by how deep the damage goes rather than presented as four products.

- The hero cross-section teaches the layers once. Every service then carries a
  depth gauge whose bands match that drawing, so a reading points back to
  something the visitor has already seen.
- Severity colour runs from striping yellow (routine maintenance) to ember (the
  base is gone). That colour carries information, so it is never used for
  decoration.
- Type is **Overpass**, drawn from FHWA Highway Gothic — the lettering on US road
  signs — with IBM Plex Sans for body copy and Overpass Mono for specs.
- Every text and background pair was checked against WCAG AA. The `aggregate`
  grey only reaches 3.6:1 on asphalt, so it is reserved for rules and graphics;
  `aggregate-2` and `ink-soft` are the text greys for dark and light sections.

## Before you launch

Name, phone and email are real. Everything below is still an assumption I made
so the site would be complete — search for `PLACEHOLDER` and `VERIFY` in
`src/lib/site.ts`.

- [ ] **`NEXT_PUBLIC_SITE_URL`.** Set it in Vercel — to the `.vercel.app` URL
      at first, then to the real domain. Canonical tags, the sitemap, robots.txt
      and the social cards all read it, so an unset value points every one of
      them at the placeholder host.
- [ ] **`geo` coordinates and postal code.** Set to the centre of Wartrace and
      37183. Nudge `geo` to the actual yard or shop — it is what Google reads to
      decide which searches you show up in, and it also sets the centre of the
      `GeoCircle` in the structured data.
- [ ] **Wordmark descriptor.** The logo reads **Black Forge** over **Asphalt**.
      Change `site.wordmark.secondary` if you would rather it said something
      else, or matched signage or a truck wrap.
- [ ] **Credential claims.** "Licensed and insured" and "Free on-site estimates"
      are legal representations. Confirm both, and confirm the FAQ answer about
      certificates of insurance and W-9s.
- [ ] **Hours**, and the `openingHoursSpecification` in `structured-data.tsx`
      if they differ from Mon–Fri 7–6.
- [ ] **Coverage distances.** The board lists seven towns inside roughly ten
      miles of Wartrace, with mileages I estimated as straight-line distances,
      not drive times. Check them on a map, and add or drop towns to match the
      radius you actually work. `SERVICE_RADIUS_MILES` scales the bars, so keep
      it at or above the largest distance in the list.

      Christiana is 11 miles out and Beechgrove 10, so both sit at the edge of
      the radius you described — drop them if that is further than you want to
      go.
- [ ] **Lead delivery** — see below. Without it the form works but only writes to
      the logs.
- [ ] **Response promise.** `responsePromise` in `site.ts` promises a same-day
      reply and a 48-hour visit. Make it true or change it.

Deliberately **not** included: no invented review counts, star ratings, years in
business, or job numbers. Fabricated `aggregateRating` markup is a Google
structured-data violation and a fast way to lose rich results — add it only once
there are real reviews to point at.

## Wire up lead delivery

The form validates on the server, blocks bots with a honeypot and a
time-to-fill trap, and always writes the full lead to the function logs first,
so a lead survives an email outage. Email delivery is off until you configure it.

1. Create a [Resend](https://resend.com) account and verify the sending domain.
   (`vercel integration add resend` will provision it through the Marketplace
   and set `RESEND_API_KEY` for you.)
2. Add the three variables from `.env.example` to the Vercel project, for
   Production, Preview and Development.
3. For local work, copy them into `.env.local` (already gitignored).

`QUOTE_FROM_EMAIL` must be on a domain verified in Resend — it cannot be the
gmail address, since Resend will not send as a domain you do not control. With
no domain yet, use Resend's `onboarding@resend.dev`, which delivers only to the
address on the Resend account; that is enough to prove the flow works. Leads
arrive with the customer's own address as `reply_to`, so replying goes straight
back to them.

If you would rather the leads land somewhere other than an inbox — a CRM, a
spreadsheet, Slack — replace the body of `deliverLead()` in
[src/app/actions.ts](src/app/actions.ts). It is the only function that knows
where a lead goes.

## Deploying

### 1. GitHub

```bash
git remote add origin https://github.com/netzian-loq/blackforge.git
```

```bash
git push -u origin main
```

### 2. Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Framework
detection, build command and output directory are all automatic — this project
intentionally has no `vercel.json`, because Next.js needs none.

The first deploy will succeed with no environment variables at all; the form
will validate and log leads but send no email. Add them from `.env.example`
when you are ready, starting with `NEXT_PUBLIC_SITE_URL` once Vercel has given
you a URL.

After that, pushes to `main` deploy to production and every pull request gets
its own preview URL.

### 3. Spaceship DNS

Add the domain in **Vercel → Project → Settings → Domains** first. Vercel then
shows the exact records to use — copy them from there rather than from any
guide, including this one, since the values change.

Then in Spaceship, either:

- **Delegate the whole domain (simplest).** Set the domain's nameservers to the
  Vercel nameservers shown in the dashboard. Vercel handles the records and the
  certificate. Note that this moves *all* DNS for the domain, so recreate any
  existing email (MX, SPF, DKIM, DMARC) records in Vercel first, or email will
  stop being delivered.
- **Keep DNS at Spaceship.** Leave the nameservers alone and add the `A` record
  for the apex and the `CNAME` for `www` that Vercel displays. Email records
  stay untouched. This is the safer option if the domain already handles mail.

Propagation is usually minutes but can take up to 48 hours. Vercel issues the
TLS certificate automatically once the records resolve.

### After the domain is live

- Update `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy, so canonical
  URLs, the sitemap and social cards are right.
- Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
- Create the Google Business Profile — for a local contractor it drives more
  calls than the website does, and the site's `LocalBusiness` markup is built to
  agree with it. Keep the name, phone and address identical in both places.
- Check the structured data with the
  [Rich Results Test](https://search.google.com/test/rich-results).

## Accessibility

Semantic landmarks, a skip link, visible focus on every interactive element,
labelled form fields with server-side errors wired through `aria-describedby`,
an error summary that takes focus on failure, and `prefers-reduced-motion`
honoured for the scroll reveals. The FAQ uses native `<details>`, so it works
before JavaScript loads — as does the quote form, which is a progressively
enhanced server action.
