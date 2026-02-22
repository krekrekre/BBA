import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ReviewsFilter } from "./ReviewsFilter";

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

export async function ReviewsList({
  ratingFilter,
}: {
  ratingFilter?: number;
}) {
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
      <p className="text-text-dark/60">
        Nema objavljenih utisaka. Uskoro ćemo imati utiske naših gostiju.
      </p>
    );
  }

  return (
    <>
      <ReviewsFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-bg-light rounded-xl p-6 shadow-md border border-accent/20"
          >
            <StarRating rating={review.rating} />
            <p className="mt-4 text-text-dark/90 italic">&ldquo;{review.content_rs}&rdquo;</p>
            <p className="mt-4 font-semibold text-text-dark">{review.author_name}</p>
            {review.service_mentioned && (
              <p className="text-sm text-secondary">{review.service_mentioned}</p>
            )}
            <time className="text-sm text-text-dark/60 mt-2 block">
              {new Date(review.created_at).toLocaleDateString("sr-RS", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        ))}
      </div>
    </>
  );
}
