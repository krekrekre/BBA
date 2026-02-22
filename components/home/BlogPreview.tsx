import Link from "next/link";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function BlogPreview() {
  const supabase = await createServerSupabaseClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title_rs, slug, excerpt_rs, featured_image, published_at")
    .eq("is_published", true)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(3);

  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-dark text-center mb-12">
            Najnoviji blog postovi
          </h2>
          <p className="text-center text-text-dark/60">
            Uskoro ćemo objaviti nove savete i vesti.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-bg-light">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-dark text-center mb-4">
          Najnoviji blog postovi
        </h2>
        <p className="text-center text-text-dark/80 mb-12 max-w-2xl mx-auto">
          Saveti, trendovi i vesti iz sveta lepote
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-accent/40">
                {post.featured_image ? (
                  <Image
                    src={post.featured_image}
                    alt={post.title_rs}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-accent/20 flex items-center justify-center">
                    <span className="text-4xl text-primary/50">✦</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-text-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title_rs}
                </h3>
                {post.excerpt_rs && (
                  <p className="text-text-dark/80 text-sm line-clamp-2 mb-2">
                    {post.excerpt_rs}
                  </p>
                )}
                {post.published_at && (
                  <time className="text-sm text-text-dark/60">
                    {new Date(post.published_at).toLocaleDateString("sr-RS", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-block bg-[rgb(99_51_58/0.9)] text-white px-6 py-2 rounded-lg hover:bg-[rgb(99_51_58)] transition-colors"
          >
            Svi postovi
          </Link>
        </div>
      </div>
    </section>
  );
}
