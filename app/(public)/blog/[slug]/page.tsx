import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BlogPostSchema } from "./BlogPostSchema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("meta_title, meta_description, title_rs, excerpt_rs")
    .eq("slug", slug)
    .eq("is_published", true)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .single();

  if (!post) {
    return { title: "Post nije pronađen" };
  }

  return {
    title: post.meta_title || post.title_rs,
    description: post.meta_description || post.excerpt_rs || undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .single();

  if (error || !post) {
    notFound();
  }

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const postUrl = `${protocol}://${host}/blog/${post.slug}`;

  // Increment views (use admin client to bypass RLS)
  const adminClient = createAdminClient();
  await adminClient
    .from("blog_posts")
    .update({ views_count: (post.views_count || 0) + 1 })
    .eq("id", post.id);

  // Related posts
  const { data: related } = await supabase
    .from("blog_posts")
    .select("id, title_rs, slug")
    .eq("is_published", true)
    .not("published_at", "is", null)
    .neq("id", post.id)
    .limit(3);

  return (
    <>
      <BlogPostSchema
        title={post.title_rs}
        excerpt={post.excerpt_rs}
        publishedAt={post.published_at}
        image={post.featured_image}
        slug={post.slug}
      />
      <article className="container mx-auto px-4 py-16 max-w-3xl">
      <Link
        href="/blog"
        className="text-secondary hover:text-primary mb-6 inline-block"
      >
        ← Nazad na blog
      </Link>

      {post.featured_image && (
        <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title_rs}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-4">
          {post.title_rs}
        </h1>
        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="text-text-dark/60 text-sm"
          >
            {new Date(post.published_at).toLocaleDateString("sr-RS", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}
      </header>

      <div
        className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-text-dark/90 prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: post.content_rs }}
      />

      <footer className="mt-12 pt-8 border-t border-accent/30">
        <p className="text-sm text-text-dark/60 mb-4">Podeli ovaj članak:</p>
        <ShareButtons url={postUrl} title={post.title_rs} />

        {related && related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-xl font-bold text-text-dark mb-4">
              Povezani članci
            </h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="text-primary hover:underline"
                  >
                    {r.title_rs}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </footer>
    </article>
    </>
  );
}
