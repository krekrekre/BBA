import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Saveti, trendovi i vesti iz sveta lepote - čitajte naše najnovije blog postove.",
};

const POSTS_PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const from = (currentPage - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const supabase = await createServerSupabaseClient();

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title_rs, slug, excerpt_rs, featured_image, published_at", {
      count: "exact",
    })
    .eq("is_published", true)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .range(from, to);

  const totalCount = error ? 0 : (posts?.length ?? 0);
  const { count } = await supabase
    .from("blog_posts")
    .select("id", { count: "exact", head: true })
    .eq("is_published", true)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString());

  const totalPosts = count ?? 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div>
      {/* Hero section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-bg-light to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-brand font-medium text-sm uppercase tracking-wide mb-2">
            SAVETI I VESTI
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Blog
          </h1>
          <p className="text-text-dark/80 max-w-2xl mx-auto text-lg">
            Saveti, trendovi i vesti iz sveta lepote – čitajte naše najnovije
            postove.
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-16 h-1 rounded-full bg-secondary" />
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block bg-bg-light rounded-xl overflow-hidden shadow-md border border-accent/30 hover:shadow-lg hover:border-secondary/30 transition-all duration-300"
                  >
                    <div className="relative h-48 bg-accent/20 overflow-hidden">
                      {post.featured_image ? (
                        <Image
                          src={post.featured_image}
                          alt={post.title_rs}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl text-primary/30">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="font-serif text-xl font-bold text-text-dark mb-2 line-clamp-2 group-hover:text-brand transition-colors">
                        {post.title_rs}
                      </h2>
                      {post.excerpt_rs && (
                        <p className="text-text-dark/80 text-sm line-clamp-2 mb-3 leading-relaxed">
                          {post.excerpt_rs}
                        </p>
                      )}
                      {post.published_at && (
                        <time className="text-sm text-text-dark/60">
                          {new Date(post.published_at).toLocaleDateString(
                            "sr-RS",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </time>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-12 flex flex-wrap justify-center items-center gap-4"
                  aria-label="Paginacija"
                >
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="px-5 py-2.5 rounded-lg bg-bg-light border border-accent/30 hover:bg-accent/30 hover:border-brand/30 transition-colors font-medium text-text-dark"
                    >
                      ← Prethodna
                    </Link>
                  )}
                  <span className="px-4 py-2 text-text-dark/70 text-sm">
                    Strana {currentPage} od {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="px-5 py-2.5 rounded-lg bg-brand text-cream hover:bg-brand/90 transition-colors font-medium"
                    >
                      Sledeća →
                    </Link>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-16 lg:py-24 bg-bg-light rounded-xl border border-accent/30">
              <p className="text-text-dark/70 text-lg mb-4">
                Nema objavljenih postova.
              </p>
              <p className="text-text-dark/60">
                Vratite se uskoro za nove savete i vesti.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
