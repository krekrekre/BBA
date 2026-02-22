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
    <div>
      {/* Hero section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-bg-light to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-brand font-medium text-sm uppercase tracking-wide mb-2">
            ZADOVOLJNI GOSTI
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Utisci gostiju
          </h1>
          <p className="text-text-dark/80 max-w-2xl mx-auto text-lg">
            Šta kažu naši zadovoljni gosti o uslugama u našem salonu
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-16 h-1 rounded-full bg-secondary" />
          </div>
        </div>
      </section>

      {/* Reviews section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <ReviewsList ratingFilter={ratingFilter} />
        </div>
      </section>
    </div>
  );
}
