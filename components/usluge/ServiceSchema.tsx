interface ServiceSchemaProps {
  name: string;
  description: string | null;
  image: string | null;
  slug: string;
  category: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://salonlepote.rs";

export function ServiceSchema({
  name,
  description,
  image,
  slug,
  category,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: description || undefined,
    image: image ? image : undefined,
    url: `${BASE_URL}/usluge/${category}/${slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Salon Lepote",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
