import { counties, coverage, faqs, services, site, SERVICE_RADIUS_MILES } from "@/lib/site";

/**
 * LocalBusiness plus FAQPage markup for local search.
 *
 * Deliberately omits aggregateRating and review: inventing either is a Google
 * structured-data violation and a fast way to lose rich results. Add them only
 * once real reviews exist.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${site.url}/#business`,
        name: site.name,
        legalName: site.legalName,
        description: site.description,
        url: site.url,
        telephone: site.phone.display,
        email: site.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.lat,
          longitude: site.geo.lng,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:00",
            closes: "18:00",
          },
        ],
        // A GeoCircle states the radius exactly; the town and county entries
        // give Google the named places people actually type into a search.
        areaServed: [
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: site.geo.lat,
              longitude: site.geo.lng,
            },
            geoRadius: String(Math.round(SERVICE_RADIUS_MILES * 1609.34)),
          },
          ...coverage.map((entry) => ({
            "@type": "City",
            name: `${entry.town}, Tennessee`,
          })),
          ...counties.map((county) => ({
            "@type": "AdministrativeArea",
            name: `${county} County, Tennessee`,
          })),
        ],
        knowsAbout: services.map((service) => service.name),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Asphalt services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.summary,
              serviceType: service.name,
              areaServed: `${site.address.locality}, Tennessee and surrounding area`,
              provider: { "@id": `${site.url}/#business` },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#business` },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
