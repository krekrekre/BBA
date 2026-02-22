import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ReviewsFilter } from "./ReviewsFilter";

function StarRating({ rating, variant = "default" }: { rating: number; variant?: "default" | "light" }) {
  const filledClass = variant === "light" ? "text-cream" : "text-brand";
  const emptyClass = variant === "light" ? "text-cream/40" : "text-gray-300";
  return (
    <div className="flex gap-0.5" aria-label={`Ocena: ${rating} od 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? filledClass : emptyClass}>
          ★
        </span>
      ))}
    </div>
  );
}

export async function ReviewsList({ ratingFilter }: { ratingFilter?: number }) {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (ratingFilter) {
    query = query.eq("rating", ratingFilter);
  }

  const { data: reviews } = await query;

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-16 lg:py-24 bg-bg-light rounded-xl border border-accent/30">
        <p className="text-text-dark/70 text-lg mb-2">
          Nema objavljenih utisaka.
        </p>
        <p className="text-text-dark/60">
          Uskoro ćemo imati utiske naših gostiju.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10">
        <p className="text-sm font-medium text-text-dark/70 mb-3">
          Filtriraj po oceni:
        </p>
        <ReviewsFilter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col rounded-xl overflow-hidden shadow-md border border-accent/30 bg-white"
          >
            <div className="bg-secondary px-6 py-4">
              <StarRating rating={review.rating} variant="light" />
            </div>
            <div className="p-6 flex-1 bg-bg-light">
              <p className="text-text-dark/90 italic leading-relaxed">
                &ldquo;{review.content_rs}&rdquo;
              </p>
              <p className="mt-4 font-semibold text-text-dark">
                {review.author_name}
              </p>
              {review.service_mentioned && (
                <p className="text-sm text-secondary">
                  {review.service_mentioned}
                </p>
              )}
              <time className="text-sm text-text-dark/60 mt-2 block">
                {new Date(review.created_at).toLocaleDateString("sr-RS", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
