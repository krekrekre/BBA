/**
 * Run with: npx tsx scripts/seed-services.ts
 *
 * Seeds 42 services into the 3 main categories (Tretmani lica, Epilacija, Depilacija).
 * Uses semantic grouping; split is 19 + 13 + 10 (Tretmani lica, Epilacija, Depilacija).
 * Each service gets a slug for SEO-friendly URLs (e.g. /usluge/tretmani-lica/ultrazvucno-ciscenje).
 * Loads env vars from .env.local (run from project root)
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { generateSlug } from "../lib/utils/slug";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

type ServiceCategory = "tretmani-lica" | "epilacija" | "depilacija";

interface ServiceInput {
  category: ServiceCategory;
  title_rs: string;
  slug: string;
  description_rs?: string;
  content_rs?: string;
  meta_title?: string;
  meta_description?: string;
  price_range?: string;
  duration?: string;
  order_index: number;
}

function s(
  category: ServiceCategory,
  title_rs: string,
  order_index: number,
  slug?: string
): ServiceInput {
  return {
    category,
    title_rs,
    slug: slug ?? generateSlug(title_rs),
    order_index,
  };
}

// Depilacija (waxing) - 10 services
const DEPILACIJA: ServiceInput[] = [
  s("depilacija", "Noge", 0),
  s("depilacija", "Noge + intimna", 1),
  s("depilacija", "Noge do kolena", 2),
  s("depilacija", "Intimna", 3),
  s("depilacija", "Prepone", 4),
  s("depilacija", "Ruke", 5),
  s("depilacija", "Ledja (muškarci)", 6),
  s("depilacija", "Grudi i stomak", 7),
  s("depilacija", "Lice", 8),
  s("depilacija", "Nausnice", 9),
];

// Epilacija (permanent hair removal) - 13 services
const EPILACIJA: ServiceInput[] = [
  s("epilacija", "Ep. nausnice", 0, "ep-nausnice"),
  s("epilacija", "Ep. brada", 1, "ep-brada"),
  s("epilacija", "Ep. celog lica", 2, "ep-celog-lica"),
  s("epilacija", "Ep. pazuha", 3, "ep-pazuha"),
  s("epilacija", "Ep. plitke prepone", 4, "ep-plitke-prepone"),
  s("epilacija", "Ep. cele intimne regije", 5, "ep-cele-intimne-regije"),
  s("epilacija", "Ep. pola ruku", 6, "ep-pola-ruku"),
  s("epilacija", "Ep. cele ruke", 7, "ep-cele-ruke"),
  s("epilacija", "Ep. pola nogu", 8, "ep-pola-nogu"),
  s("epilacija", "Ep. cele noge", 9, "ep-cele-noge"),
  s("epilacija", "Ep. cele noge + intimne", 10, "ep-cele-noge-intimne"),
  s("epilacija", "Ep. linija stomaka", 11, "ep-linija-stomaka"),
  s("epilacija", "Ep. muška ledja", 12, "ep-muska-ledja"),
];

// Tretmani lica (facial treatments) - 19 services
const TRETMANI_LICA: ServiceInput[] = [
  s("tretmani-lica", "Mini facial", 0),
  s("tretmani-lica", "Ultrazvučno čišćenje", 1),
  s("tretmani-lica", "Mikrodermoabrazija", 2),
  s("tretmani-lica", "Insense moisture", 3),
  s("tretmani-lica", "Anti age tretman", 4),
  s("tretmani-lica", "Hyper sensitive", 5),
  s("tretmani-lica", "Vitamin C", 6),
  s("tretmani-lica", "Masaža lica 1", 7),
  s("tretmani-lica", "Masaža lica 2", 8),
  s("tretmani-lica", "Oblikovanje obrva", 9),
  s("tretmani-lica", "Farbanje obrva", 10),
  s("tretmani-lica", "Mezoterapija lica", 11),
  s("tretmani-lica", "Dermapen tretman", 12),
  s("tretmani-lica", "Acne stop tretman", 13),
  s("tretmani-lica", "Fitopiling terapija", 14),
  s("tretmani-lica", "Deep cleansing", 15),
  s("tretmani-lica", "Sensitive skin", 16),
  s("tretmani-lica", "OxyGeneo tretman", 17),
  s("tretmani-lica", "RF lifting lica", 18),
];

const ALL_SERVICES = [...DEPILACIJA, ...EPILACIJA, ...TRETMANI_LICA];

async function seed() {
  // Upsert by category + title (no unique constraint on that, so we delete existing and insert)
  // Safer: upsert - services table has id. We'll insert and let duplicates be avoided.
  // Actually Supabase insert will add new rows. To avoid duplicates on re-run, we could
  // delete all first or use a unique key. Schema doesn't have unique on (category, title_rs).
  // For seed script, we'll delete existing services and re-insert. Or just insert - user can
  // run multiple times and get duplicates. Better: delete all services first, then insert.
  const { error: deleteError } = await supabase.from("services").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) {
    console.error("Could not clear existing services:", deleteError);
    // Continue anyway - maybe table is empty or RLS blocks delete
  }

  let inserted = 0;
  for (const service of ALL_SERVICES) {
    const metaDesc = service.meta_description ?? `${service.title_rs} – profesionalna usluga u našem kozmetičkom salonu.`;
    const contentPlaceholder = service.content_rs ?? `<p>${service.title_rs} je jedna od naših profesionalnih usluga. Nudimo individualan pristup i kvalitetne proizvode. Kontaktirajte nas za više informacija i zakazivanje termina.</p>`;
    const { error } = await supabase.from("services").insert({
      category: service.category,
      title_rs: service.title_rs,
      slug: service.slug,
      description_rs: service.description_rs ?? null,
      content_rs: contentPlaceholder,
      meta_title: service.meta_title ?? `${service.title_rs} | Salon Lepote`,
      meta_description: metaDesc,
      price_range: service.price_range ?? null,
      duration: service.duration ?? null,
      order_index: service.order_index,
      is_active: true,
    });

    if (error) {
      console.error(`Failed "${service.title_rs}" (${service.category}):`, error.message);
    } else {
      console.log(`✓ ${service.category}: ${service.title_rs}`);
      inserted++;
    }
  }

  console.log(`\nDone. ${inserted}/${ALL_SERVICES.length} services seeded.`);
}

seed();
