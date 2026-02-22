import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Depilacija",
  description:
    "Depilacija voskom - brza i efikasna uklanjanje dlaka. Profesionalna usluga u našem salonu.",
};

export default async function DepilacijaPage() {
  const supabase = await createServerSupabaseClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("category", "depilacija")
    .eq("is_active", true)
    .order("order_index")
    .order("title_rs");

  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href="/usluge"
        className="text-secondary hover:text-primary mb-6 inline-block"
      >
        ← Nazad na usluge
      </Link>
      <h1 className="font-serif text-4xl font-bold text-text-dark mb-4">
        Depilacija
      </h1>
      <p className="text-text-dark/80 mb-12 max-w-2xl">
        Depilacija voskom – brza i efikasna uklanjanje dlaka. Prirodan način
        depilacije uz kvalitetne proizvode.
      </p>
      {services && services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-bg-light rounded-xl overflow-hidden shadow-md"
            >
              {service.image_url ? (
                <div className="relative h-48">
                  <Image
                    src={service.image_url}
                    alt={service.title_rs}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 bg-accent/30 flex items-center justify-center">
                  <span className="text-4xl text-primary/50">✦</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-text-dark mb-2">
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
                    <span className="text-text-dark/60">{service.duration}</span>
                  )}
                </div>
              </div>
            </div>
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
