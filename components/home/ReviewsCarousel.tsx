import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena: ${rating} od 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-primary" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export async function ReviewsCarousel() {
  const supabase = await createServerSupabaseClient();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content_rs, service_mentioned")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (!reviews || reviews.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-bg-light">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-dark text-center mb-12">
            Utisci gostiju
          </h2>
          <p className="text-center text-text-dark/60">
            Uskoro ćemo imati utiske naših zadovoljnih gostiju.
          </p>
          <div className="text-center mt-6">
            <Link
              href="/utisci"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Pogledaj sve
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-bg-light">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-dark text-center mb-4">
          Utisci gostiju
        </h2>
        <p className="text-center text-text-dark/80 mb-12 max-w-2xl mx-auto">
          Šta kažu naši zadovoljni gosti
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-md border border-accent/20"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 text-text-dark/90 italic line-clamp-4">
                &ldquo;{review.content_rs}&rdquo;
              </p>
              <p className="mt-4 font-semibold text-text-dark">{review.author_name}</p>
              {review.service_mentioned && (
                <p className="text-sm text-secondary">{review.service_mentioned}</p>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/utisci"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Svi utisci
          </Link>
        </div>
      </div>
    </section>
  );
}
