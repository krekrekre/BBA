/**
 * Run with: npx tsx scripts/seed-reviews.ts
 *
 * Creates mock reviews with Serbian names and content.
 * Loads env vars from .env.local (run from project root)
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const MOCK_REVIEWS = [
  {
    author_name: "Ana Petrović",
    author_image: null,
    rating: 5,
    content_rs:
      "Odličan tretman lica! Kozmetičarka je profesionalna i vrlo pažljiva. Koža mi nikad nije izgledala bolje. Sve preporučujem.",
    service_mentioned: "Tretmani lica",
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Marko Jovanović",
    author_image: null,
    rating: 5,
    content_rs:
      "Epilacija lasnom – konačno rešenje za neželjene dlačice. Posle 6 tretmana skoro da ih više nema. Izuzetno zadovoljan.",
    service_mentioned: "Epilacija",
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Jelena Nikolić",
    author_image: null,
    rating: 5,
    content_rs:
      "Depilacija voskom je uvek bezbolna i brza. Uvek me lepo prime, atmosfera je prijatna. Najbolji salon u gradu.",
    service_mentioned: "Depilacija",
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Milica Stefanović",
    author_image: null,
    rating: 5,
    content_rs:
      "Čišćenje lica je fenomenalno. Pore su sada čiste, a koža glatka. Redovno dolazim i uvek se osećam odlično posle tretmana.",
    service_mentioned: "Tretmani lica",
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Petar Đorđević",
    author_image: null,
    rating: 4,
    content_rs:
      "Prvi put probao tretman lica za muškarce. Iznenadujuće prijatno i efikasno. Sve pohvale za stručnost i ljubaznost.",
    service_mentioned: "Tretmani lica",
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Sandra Mihajlović",
    author_image: null,
    rating: 5,
    content_rs:
      "Oduševljena sam! Profesionalno, čisto, prijatno. Kozmetičarke znaju šta rade. Definitivno ću se vratiti.",
    service_mentioned: null,
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Ivana Marković",
    author_image: null,
    rating: 5,
    content_rs:
      "Hidratantna maska je spas za moju suvu kožu. Posle tretmana koža blistava i oseća se nevjerovatno meko. Preporučujem svima.",
    service_mentioned: "Tretmani lica",
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Nikola Pavlović",
    author_image: null,
    rating: 4,
    content_rs:
      "Epilacija brade – brzo i efikasno. Malo neprijatno ali rezultati vrede. Sve u svemu zadovoljan.",
    service_mentioned: "Epilacija",
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Tamara Ilić",
    author_image: null,
    rating: 5,
    content_rs:
      "Najbolji salon za depilaciju! Koriste kvalitetan vosak, sve je higijenski, a rezultati traju dosta dugo. Topla preporuka.",
    service_mentioned: "Depilacija",
    is_mock: true,
    is_published: true,
  },
  {
    author_name: "Dragana Stojić",
    author_image: null,
    rating: 5,
    content_rs:
      "Anti-age tretman je dao rezultate koje nisam očekivala. Fine linije su manje vidljive, koža je elastičnija. Oduševljena!",
    service_mentioned: "Tretmani lica",
    is_mock: true,
    is_published: true,
  },
];

async function seed() {
  // Remove existing mock reviews (so re-running replaces them)
  const { error: deleteError } = await supabase
    .from("reviews")
    .delete()
    .eq("is_mock", true);

  if (deleteError) {
    console.error("Failed to remove existing mock reviews:", deleteError);
    process.exit(1);
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert(MOCK_REVIEWS)
    .select("id, author_name");

  if (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }

  console.log(`✓ Seeded ${data?.length ?? MOCK_REVIEWS.length} mock reviews`);
  data?.forEach((r) => console.log(`  - ${r.author_name}`));
  console.log("\nDone.");
}

seed();
