interface BlogPostSchemaProps {
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  image: string | null;
  slug: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://salonlepote.rs";

export function BlogPostSchema({
  title,
  excerpt,
  publishedAt,
  image,
  slug,
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt || undefined,
    datePublished: publishedAt || undefined,
    image: image ? image : undefined,
    url: `${BASE_URL}/blog/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
