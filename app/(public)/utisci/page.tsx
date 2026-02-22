import type { Metadata } from "next";
import { ReviewsList } from "@/components/blog/ReviewsList";

export const metadata: Metadata = {
  title: "Utisci gostiju",
  description:
    "Pročitajte utiske naših zadovoljnih gostiju o uslugama salona lepote.",
};

export default async function UtisciPage({
  searchParams,
}: {
  searchParams: Promise<{ rating?: string }>;
}) {
  const { rating } = await searchParams;
  const ratingFilter = rating ? parseInt(rating, 10) : undefined;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl font-bold text-text-dark mb-4">
        Utisci gostiju
      </h1>
      <p className="text-text-dark/80 mb-12 max-w-2xl">
        Šta kažu naši zadovoljni gosti o uslugama u našem salonu
      </p>
      <ReviewsList ratingFilter={ratingFilter} />
    </div>
  );
}
