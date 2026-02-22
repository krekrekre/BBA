import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ServiceSchema } from "@/components/usluge/ServiceSchema";
import type { ServiceCategory } from "@/lib/types/database";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const CATEGORY_TITLES: Record<ServiceCategory, string> = {
  "tretmani-lica": "Tretmani lica",
  epilacija: "Epilacija",
  depilacija: "Depilacija",
};

const VALID_CATEGORIES: ServiceCategory[] = [
  "tretmani-lica",
  "epilacija",
  "depilacija",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  if (!VALID_CATEGORIES.includes(category as ServiceCategory)) {
    return { title: "Usluga nije pronađena" };
  }

  const supabase = await createServerSupabaseClient();
  const { data: bySlug } = await supabase
    .from("services")
    .select("title_rs, meta_title, meta_description, description_rs")
    .eq("category", category)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  const { data: byId } = bySlug
    ? { data: null }
    : await supabase
        .from("services")
        .select("title_rs, meta_title, meta_description, description_rs")
        .eq("category", category)
        .eq("id", slug)
        .eq("is_active", true)
        .maybeSingle();
  const service = bySlug ?? byId;

  if (!service) {
    return { title: "Usluga nije pronađena" };
  }

  return {
    title: service.meta_title ?? `${service.title_rs} | Salon Lepote`,
    description:
      service.meta_description ?? service.description_rs ?? undefined,
  };
}

export async function generateStaticParams() {
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    const { data: services } = await supabase
      .from("services")
      .select("category, slug")
      .eq("is_active", true)
      .not("slug", "is", null);
    return (services ?? []).map((s) => ({
      category: s.category,
      slug: s.slug,
    }));
  } catch {
    return [];
  }
}

export default async function ServicePage({ params }: Props) {
  const { category, slug } = await params;
  if (!VALID_CATEGORIES.includes(category as ServiceCategory)) {
    notFound();
  }

  const supabase = await createServerSupabaseClient();
  const { data: bySlug } = await supabase
    .from("services")
    .select("*")
    .eq("category", category)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  const { data: byId } = bySlug
    ? { data: null }
    : await supabase
        .from("services")
        .select("*")
        .eq("category", category)
        .eq("id", slug)
        .eq("is_active", true)
        .maybeSingle();
  const service = bySlug ?? byId;

  if (!service) {
    notFound();
  }

  const categoryTitle = CATEGORY_TITLES[category as ServiceCategory];
  const serviceSlug = service.slug ?? slug;

  return (
    <>
      <ServiceSchema
        name={service.title_rs}
        description={service.meta_description ?? service.description_rs}
        image={service.image_url}
        slug={serviceSlug}
        category={category}
      />
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-text-dark/70" aria-label="Put do stranice">
          <Link href="/usluge" className="hover:text-primary transition-colors">
            Usluge
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/usluge/${category}`}
            className="hover:text-primary transition-colors"
          >
            {categoryTitle}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-dark">{service.title_rs}</span>
        </nav>

        <Link
          href={`/usluge/${category}`}
          className="text-secondary hover:text-primary mb-6 inline-block"
        >
          ← Nazad na {categoryTitle}
        </Link>

        {service.image_url && (
          <div className="relative h-64 md:h-80 mb-8 rounded-xl overflow-hidden">
            <Image
              src={service.image_url}
              alt={service.title_rs}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-4">
            {service.title_rs}
          </h1>
          {(service.price_range || service.duration) && (
            <div className="flex flex-wrap gap-4 text-text-dark/80">
              {service.price_range && (
                <span className="text-primary font-medium">
                  {service.price_range}
                </span>
              )}
              {service.duration && (
                <span>{service.duration}</span>
              )}
            </div>
          )}
        </header>

        {service.description_rs && (
          <p className="text-text-dark/90 text-lg mb-8">
            {service.description_rs}
          </p>
        )}

        {service.content_rs && (
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-text-dark/90 prose-a:text-primary mb-12"
            dangerouslySetInnerHTML={{ __html: service.content_rs }}
          />
        )}

        <footer className="pt-8 border-t border-accent/30">
          <p className="text-text-dark/80 mb-6">
            Zainteresovani ste? Zakažite termin ili nas pozovite za više
            informacija.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/kontakt"
              className="inline-flex justify-center items-center bg-brand text-cream px-6 py-3 rounded-lg hover:bg-brand/90 transition-colors font-medium"
            >
              Zakažite termin
            </Link>
            <a
              href="tel:+381111234567"
              className="inline-flex justify-center items-center border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              +381 11 123 4567
            </a>
          </div>
        </footer>
      </article>

      <ContactCTA />
    </>
  );
}
