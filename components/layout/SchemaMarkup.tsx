import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://salonlepote.rs";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Salon Lepote",
    description:
      "Profesionalni kozmetički salon - tretmani lica, epilacija i depilacija.",
    url: BASE_URL,
    telephone: "+381-11-123-4567",
    email: "kontakt@salonlepote.rs",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ulica primerićeva 1",
      addressLocality: "Beograd",
      postalCode: "11000",
      addressCountry: "RS",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
