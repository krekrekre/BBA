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
      {/* Content section */}
      <section className="py-16 lg:py-24 bg-bg-light">
        <div className="w-full px-0 sm:px-4 sm:container sm:mx-auto">
          <article className="w-full sm:max-w-3xl sm:mx-auto bg-white rounded-none sm:rounded-xl p-6 sm:p-8 md:p-10 shadow-sm border-x-0 sm:border border-accent/30">
            <nav className="mb-6 text-sm text-text-dark/70" aria-label="Put do stranice">
              <Link href="/usluge" className="hover:text-brand transition-colors">Usluge</Link>
              <span className="mx-2">/</span>
              <Link href={`/usluge/${category}`} className="hover:text-brand transition-colors">{categoryTitle}</Link>
              <span className="mx-2">/</span>
              <span className="text-text-dark">{service.title_rs}</span>
            </nav>
            <Link href={`/usluge/${category}`} className="inline-block text-secondary hover:text-brand mb-6 transition-colors">
              ← Nazad na {categoryTitle}
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
              {service.title_rs}
            </h1>
            {(service.price_range || service.duration) && (
              <div className="flex flex-wrap gap-6 text-text-dark/80 mb-10">
                {service.price_range && (
                  <span className="text-brand font-semibold">{service.price_range}</span>
                )}
                {service.duration && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration}
                  </span>
                )}
              </div>
            )}
            {service.image_url && (
              <div className="relative h-64 md:h-96 mb-10 rounded-2xl overflow-hidden shadow-lg">
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

            {service.description_rs && (
              <p className="text-text-dark/90 text-lg leading-relaxed mb-8">
                {service.description_rs}
              </p>
            )}

            {service.content_rs && (
              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text-dark prose-p:text-text-dark/90 prose-a:text-brand prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: service.content_rs }}
              />
            )}
          </article>
          <div className="w-full sm:max-w-3xl sm:mx-auto rounded-none sm:rounded-xl bg-white p-6 sm:p-8 border-x-0 sm:border border-accent/30 mt-8 shadow-sm">
            <p className="text-text-dark font-medium mb-4">Zainteresovani ste? Zakažite termin ili nas pozovite za više informacija.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontakt"
                className="inline-flex justify-center items-center bg-brand text-cream px-6 py-3 rounded-lg hover:bg-brand/90 transition-colors font-medium uppercase text-sm tracking-wide"
              >
                Zakažite termin
              </Link>
              <span
                className="inline-flex justify-center items-center border-2 border-brand text-brand px-6 py-3 rounded-lg font-medium cursor-default"
              >
                064/1789158
              </span>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
