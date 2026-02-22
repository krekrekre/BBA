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
    .maybeSingle();

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

  // Increment views (use admin client to bypass RLS) - non-blocking; page renders even if this fails
  try {
    const adminClient = createAdminClient();
    await adminClient
      .from("blog_posts")
      .update({ views_count: (post.views_count || 0) + 1 })
      .eq("id", post.id);
  } catch {
    // SUPABASE_SERVICE_ROLE_KEY may be missing on Vercel; page still renders
  }

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
      {/* Content section */}
      <section className="py-16 lg:py-24 bg-bg-light">
        <div className="w-full px-0 sm:px-4 sm:container sm:mx-auto">
          <article className="w-full sm:max-w-3xl sm:mx-auto bg-white rounded-none sm:rounded-xl p-6 sm:p-8 md:p-10 shadow-sm border-x-0 sm:border border-accent/30">
            <Link
              href="/blog"
              className="inline-block text-secondary hover:text-brand mb-6 transition-colors"
            >
              ← Nazad na blog
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
              {post.title_rs}
            </h1>
            {post.published_at && (
              <time
                dateTime={post.published_at}
                className="text-text-dark/60 text-sm flex items-center gap-2 mb-10"
              >
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(post.published_at).toLocaleDateString("sr-RS", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            {post.featured_image && (
              <div className="relative h-64 md:h-96 mb-10 rounded-2xl overflow-hidden shadow-lg">
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

            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text-dark prose-p:text-text-dark/90 prose-a:text-brand prose-a:no-underline hover:prose-a:underline mb-12"
              dangerouslySetInnerHTML={{ __html: post.content_rs }}
            />
            <div className="pt-8 border-t border-accent/30">
              <p className="text-sm font-medium text-text-dark/70 mb-4">
                Podeli ovaj članak
              </p>
              <ShareButtons url={postUrl} title={post.title_rs} />
            </div>
          </article>
          {related && related.length > 0 && (
            <div className="w-full sm:max-w-3xl sm:mx-auto rounded-none sm:rounded-xl bg-white p-6 sm:p-8 border-x-0 sm:border border-accent/30 mt-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-text-dark mb-4">
                Povezani članci
              </h2>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="text-brand hover:text-secondary font-medium transition-colors flex items-center gap-2"
                    >
                      <span className="text-secondary">→</span>
                      {r.title_rs}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
