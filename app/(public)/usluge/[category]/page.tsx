import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ServiceCategory } from "@/lib/types/database";

interface Props {
  params: Promise<{ category: string }>;
}

const CATEGORY_CONFIG: Record<
  ServiceCategory,
  { title: string; description: string }
> = {
  "tretmani-lica": {
    title: "Tretmani lica",
    description:
      "Profesionalna nega lica – čišćenje, hidratacija, anti-aging i specijalni tretmani prilagođeni vašoj koži.",
  },
  epilacija: {
    title: "Epilacija",
    description:
      "Trajna epilacija – rešite se neželjenih dlaka na dugi rok. Profesionalna usluga uz savremenu opremu.",
  },
  depilacija: {
    title: "Depilacija",
    description:
      "Depilacija voskom – brza i efikasna uklanjanje dlaka. Prirodan način depilacije uz kvalitetne proizvode.",
  },
};

const VALID_CATEGORIES: ServiceCategory[] = [
  "tretmani-lica",
  "epilacija",
  "depilacija",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ServiceCategory)) {
    return { title: "Kategorija nije pronađena" };
  }
  const config = CATEGORY_CONFIG[category as ServiceCategory];
  return {
    title: `${config.title} | Usluge`,
    description: config.description,
  };
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ServiceCategory)) {
    notFound();
  }

  const supabase = await createServerSupabaseClient();
  const { data: services } = await supabase
    .from("services")
    .select(
      "id, title_rs, description_rs, slug, image_url, price_range, duration"
    )
    .eq("category", category)
    .eq("is_active", true)
    .order("order_index")
    .order("title_rs");

  const config = CATEGORY_CONFIG[category as ServiceCategory];

  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href="/usluge"
        className="text-secondary hover:text-primary mb-6 inline-block"
      >
        ← Nazad na usluge
      </Link>
      <h1 className="font-serif text-4xl font-bold text-text-dark mb-4">
        {config.title}
      </h1>
      <p className="text-text-dark/80 mb-12 max-w-2xl">{config.description}</p>
      {services && services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/usluge/${category}/${service.slug ?? service.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {service.image_url ? (
                <div className="relative h-48">
                  <Image
                    src={service.image_url}
                    alt={service.title_rs}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 bg-accent/30 flex items-center justify-center">
                  <span className="text-4xl text-primary/50">✦</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                  {service.title_rs}
                </h2>
                {service.description_rs && (
                  <p className="text-text-dark/80 text-sm mb-4 line-clamp-3">
                    {service.description_rs}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 text-sm">
                  {service.price_range && (
                    <span className="text-primary font-medium">
                      {service.price_range}
                    </span>
                  )}
                  {service.duration && (
                    <span className="text-text-dark/60">
                      {service.duration}
                    </span>
                  )}
                </div>
                <span className="inline-block mt-4 text-primary font-medium text-sm">
                  Saznaj više →
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-text-dark/60">
          Usluge će uskoro biti dostupne. Kontaktirajte nas za više informacija.
        </p>
      )}
    </div>
  );
}
