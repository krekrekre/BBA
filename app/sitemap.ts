import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://salonlepote.rs";

async function getBlogPosts(): Promise<{ slug: string; updated_at: string | null }[]> {
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("is_published", true)
      .not("published_at", "is", null)
      .lte("published_at", new Date().toISOString());
    return data ?? [];
  } catch {
    return [];
  }
}

async function getServices(): Promise<{ category: string; slug: string; updated_at: string | null }[]> {
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("services")
      .select("category, slug, updated_at")
      .eq("is_active", true)
      .not("slug", "is", null);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/usluge`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/usluge/tretmani-lica`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/usluge/epilacija`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/usluge/depilacija`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/o-nama`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/utisci`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const [posts, services] = await Promise.all([
    getBlogPosts(),
    getServices(),
  ]);

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/usluge/${s.category}/${s.slug}`,
    lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...serviceUrls, ...blogUrls];
}
