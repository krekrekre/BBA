/**
 * Run with: npx tsx scripts/seed-services.ts
 *
 * Seeds 42 services with mockup text, images, prices and durations.
 * Uses Unsplash images for beauty/salon themed visuals.
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
  image_url?: string;
  order_index: number;
}

function s(
  category: ServiceCategory,
  title_rs: string,
  order_index: number,
  slug?: string,
  extras?: Partial<ServiceInput>
): ServiceInput {
  return {
    category,
    title_rs,
    slug: slug ?? generateSlug(title_rs),
    order_index,
    ...extras,
  };
}

// Unsplash image IDs for each category (beauty/salon themed) - verified working URLs
const FACE_IMAGES = [
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
];
const EPIL_IMAGES = [
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
];
const DEPIL_IMAGES = [
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
];

function pickImg(arr: string[], i: number) {
  return arr[i % arr.length];
}

function content(t: string, desc: string) {
  return `<p>${desc}</p><p>Profesionalan pristup, higijenski standardi i kvalitetni proizvodi su uvek na prvom mestu. Kontaktirajte nas za rezervaciju termina i savet stručnjaka.</p>`;
}

// Depilacija - 10 services
const DEPILACIJA: ServiceInput[] = [
  s("depilacija", "Noge", 0, undefined, {
    description_rs: "Kompletna depilacija obe noge voskom – glatka i dugotrajna koža.",
    price_range: "1.500 - 2.500 RSD",
    duration: "30-45 min",
    image_url: pickImg(DEPIL_IMAGES, 0),
    content_rs: content("Noge", "Depilacija nogu voskom pruža glatku kožu bez dlaka do nekoliko nedelja. Koristimo prirodni vosak i profesionalne tehnike za minimalnu bolnost."),
  }),
  s("depilacija", "Noge + intimna", 1, undefined, {
    description_rs: "Kombinovani tretman – noge i intimna regija u jednom terminu.",
    price_range: "3.000 - 4.000 RSD",
    duration: "60 min",
    image_url: pickImg(DEPIL_IMAGES, 1),
    content_rs: content("Noge + intimna", "Praktičan paket za one koji žele kompletnu negu u jednom posetu. Profesionalni vosak i pažljiv pristup."),
  }),
  s("depilacija", "Noge do kolena", 2, undefined, {
    description_rs: "Depilacija donjih delova nogu – brza i efikasna usluga.",
    price_range: "1.200 - 1.800 RSD",
    duration: "25-30 min",
    image_url: pickImg(DEPIL_IMAGES, 2),
    content_rs: content("Noge do kolena", "Idealno za letnje mesece ili redovnu negu. Koristimo kvalitetan vosak koji ne oštećuje kožu."),
  }),
  s("depilacija", "Intimna", 3, undefined, {
    description_rs: "Profesionalna depilacija intimne regije u diskretnom ambijentu.",
    price_range: "2.000 - 3.000 RSD",
    duration: "30-40 min",
    image_url: pickImg(DEPIL_IMAGES, 0),
    content_rs: content("Intimna", "Diskretno i profesionalno. Higijena i udobnost su prioritet."),
  }),
  s("depilacija", "Prepone", 4, undefined, {
    description_rs: "Depilacija preponske regije voskom – brzo i efikasno.",
    price_range: "800 - 1.200 RSD",
    duration: "15-20 min",
    image_url: pickImg(DEPIL_IMAGES, 1),
    content_rs: content("Prepone", "Brza usluga sa dugotrajnim rezultatima."),
  }),
  s("depilacija", "Ruke", 5, undefined, {
    description_rs: "Depilacija ruku – potpuno ili do lakta.",
    price_range: "600 - 1.000 RSD",
    duration: "15-20 min",
    image_url: pickImg(DEPIL_IMAGES, 2),
    content_rs: content("Ruke", "Glatke ruke bez neželjenih dlaka."),
  }),
  s("depilacija", "Ledja (muškarci)", 6, undefined, {
    description_rs: "Depilacija ledja za muškarce – profesionalna usluga.",
    price_range: "2.000 - 3.000 RSD",
    duration: "40-50 min",
    image_url: pickImg(DEPIL_IMAGES, 0),
    content_rs: content("Ledja", "Specijalizovana usluga za muškarce."),
  }),
  s("depilacija", "Grudi i stomak", 7, undefined, {
    description_rs: "Depilacija grudi i stomaka voskom.",
    price_range: "1.500 - 2.500 RSD",
    duration: "30-40 min",
    image_url: pickImg(DEPIL_IMAGES, 1),
    content_rs: content("Grudi i stomak", "Efikasno uklanjanje dlaka sa velikih površina."),
  }),
  s("depilacija", "Lice", 8, undefined, {
    description_rs: "Delikatna depilacija lica – uklanjanje neželjenih dlačica.",
    price_range: "800 - 1.500 RSD",
    duration: "15-25 min",
    image_url: pickImg(FACE_IMAGES, 0),
    content_rs: content("Lice", "Specijalni vosak za osetljivu kožu lica."),
  }),
  s("depilacija", "Nausnice", 9, undefined, {
    description_rs: "Depilacija nausnica – precizna i bezbolna usluga.",
    price_range: "500 - 800 RSD",
    duration: "10-15 min",
    image_url: pickImg(FACE_IMAGES, 1),
    content_rs: content("Nausnice", "Brza i precizna usluga za senzitivnu zonu."),
  }),
];

// Epilacija - 13 services
const EPILACIJA: ServiceInput[] = [
  s("epilacija", "Ep. nausnice", 0, "ep-nausnice", {
    description_rs: "Trajna epilacija nausnica – precizna i dugotrajna.",
    price_range: "2.000 - 3.000 RSD",
    duration: "15-20 min",
    image_url: pickImg(EPIL_IMAGES, 0),
    content_rs: content("Ep. nausnice", "Trajno smanjenje dlaka u zoni nausnica."),
  }),
  s("epilacija", "Ep. brada", 1, "ep-brada", {
    description_rs: "Trajna epilacija brade – rešenje za neželjene dlačice.",
    price_range: "2.500 - 4.000 RSD",
    duration: "20-30 min",
    image_url: pickImg(EPIL_IMAGES, 1),
    content_rs: content("Ep. brada", "Efikasno uklanjanje dlaka sa brade."),
  }),
  s("epilacija", "Ep. celog lica", 2, "ep-celog-lica", {
    description_rs: "Kompletna epilacija celog lica – glatka koža na duge staze.",
    price_range: "5.000 - 8.000 RSD",
    duration: "45-60 min",
    image_url: pickImg(FACE_IMAGES, 2),
    content_rs: content("Ep. celog lica", "Profesionalna epilacija svih zona lica."),
  }),
  s("epilacija", "Ep. pazuha", 3, "ep-pazuha", {
    description_rs: "Trajna epilacija pazuha – popularna i efikasna usluga.",
    price_range: "3.000 - 4.500 RSD",
    duration: "20-25 min",
    image_url: pickImg(EPIL_IMAGES, 2),
    content_rs: content("Ep. pazuha", "Trajno smanjenje dlaka u pazušnoj regiji."),
  }),
  s("epilacija", "Ep. plitke prepone", 4, "ep-plitke-prepone", {
    description_rs: "Epilacija plitke preponske regije – diskretno i profesionalno.",
    price_range: "4.000 - 6.000 RSD",
    duration: "30-40 min",
    image_url: pickImg(EPIL_IMAGES, 0),
    content_rs: content("Ep. plitke prepone", "Higijenski standardi i udobnost."),
  }),
  s("epilacija", "Ep. cele intimne regije", 5, "ep-cele-intimne-regije", {
    description_rs: "Kompletna epilacija cele intimne regije.",
    price_range: "8.000 - 12.000 RSD",
    duration: "60-90 min",
    image_url: pickImg(EPIL_IMAGES, 1),
    content_rs: content("Ep. cele intimne regije", "Profesionalna oprema i diskretan pristup."),
  }),
  s("epilacija", "Ep. pola ruku", 6, "ep-pola-ruku", {
    description_rs: "Epilacija donjih delova ruku – od lakta do šake.",
    price_range: "3.500 - 5.000 RSD",
    duration: "25-35 min",
    image_url: pickImg(EPIL_IMAGES, 2),
    content_rs: content("Ep. pola ruku", "Glatke ruke na duge staze."),
  }),
  s("epilacija", "Ep. cele ruke", 7, "ep-cele-ruke", {
    description_rs: "Epilacija cele površine ruku.",
    price_range: "6.000 - 8.000 RSD",
    duration: "40-50 min",
    image_url: pickImg(EPIL_IMAGES, 0),
    content_rs: content("Ep. cele ruke", "Kompletna nega ruku."),
  }),
  s("epilacija", "Ep. pola nogu", 8, "ep-pola-nogu", {
    description_rs: "Epilacija donjih delova nogu.",
    price_range: "5.000 - 7.000 RSD",
    duration: "35-45 min",
    image_url: pickImg(EPIL_IMAGES, 1),
    content_rs: content("Ep. pola nogu", "Glatke noge bez dlaka."),
  }),
  s("epilacija", "Ep. cele noge", 9, "ep-cele-noge", {
    description_rs: "Epilacija celih nogu – najpopularnija usluga.",
    price_range: "9.000 - 12.000 RSD",
    duration: "60-75 min",
    image_url: pickImg(EPIL_IMAGES, 2),
    content_rs: content("Ep. cele noge", "Kompletna epilacija obe noge."),
  }),
  s("epilacija", "Ep. cele noge + intimne", 10, "ep-cele-noge-intimne", {
    description_rs: "Paket – cele noge i intimna regija u jednom terminu.",
    price_range: "14.000 - 18.000 RSD",
    duration: "90-120 min",
    image_url: pickImg(EPIL_IMAGES, 0),
    content_rs: content("Ep. cele noge + intimne", "Najpopularniji paket za dugotrajne rezultate."),
  }),
  s("epilacija", "Ep. linija stomaka", 11, "ep-linija-stomaka", {
    description_rs: "Epilacija linije stomaka – precizna usluga.",
    price_range: "2.500 - 3.500 RSD",
    duration: "15-20 min",
    image_url: pickImg(EPIL_IMAGES, 1),
    content_rs: content("Ep. linija stomaka", "Uklanjanje neželjenih dlaka na stomaku."),
  }),
  s("epilacija", "Ep. muška ledja", 12, "ep-muska-ledja", {
    description_rs: "Epilacija ledja za muškarce – profesionalna oprema.",
    price_range: "8.000 - 12.000 RSD",
    duration: "60-90 min",
    image_url: pickImg(EPIL_IMAGES, 2),
    content_rs: content("Ep. muška ledja", "Specijalizovana usluga za muškarce."),
  }),
];

// Tretmani lica - 19 services
const faceBase = (title: string, desc: string, price: string, dur: string, i: number): ServiceInput =>
  ({ ...s("tretmani-lica", title, i), description_rs: desc, price_range: price, duration: dur, image_url: pickImg(FACE_IMAGES, i), content_rs: content(title, desc) } as ServiceInput);

const TRETMANI_LICA: ServiceInput[] = [
  faceBase("Mini facial", "Brzi tretman lica za osvežavanje i hidrataciju – idealan za zauzet dan.", "3.000 - 4.000 RSD", "30 min", 0),
  faceBase("Ultrazvučno čišćenje", "Dubinsko čišćenje pore ultrazvukom – efikasno i bez bolova.", "4.500 - 6.000 RSD", "45-60 min", 1),
  faceBase("Mikrodermoabrazija", "Eksfolijacija kože – obnavljanje i ujednačavanje tena.", "5.000 - 7.000 RSD", "45 min", 2),
  faceBase("Insense moisture", "Intenzivna hidratacija za suvu i dehidriranu kožu.", "4.000 - 5.500 RSD", "50 min", 3),
  faceBase("Anti age tretman", "Tretman protiv starenja – podmlađivanje i zatezanje kože.", "6.000 - 8.000 RSD", "60 min", 4),
  faceBase("Hyper sensitive", "Posebna formula za osetljivu i iritabilnu kožu.", "4.000 - 5.500 RSD", "45 min", 5),
  faceBase("Vitamin C", "Antioxidant tretman – svetliji ten i zaštita od starenja.", "4.500 - 6.000 RSD", "45 min", 6),
  faceBase("Masaža lica 1", "Klasicna masaža lica – opuštanje i poboljšana cirkulacija.", "2.500 - 3.500 RSD", "30 min", 7),
  faceBase("Masaža lica 2", "Napredna masaža lica sa lifting tehnikama.", "3.500 - 4.500 RSD", "40 min", 8),
  faceBase("Oblikovanje obrva", "Profesionalno oblikovanje obrva prema vašem licu.", "800 - 1.200 RSD", "15-20 min", 9),
  faceBase("Farbanje obrva", "Prirodno farbanje obrva – definicija i izražaj očiju.", "1.000 - 1.500 RSD", "20 min", 10),
  faceBase("Mezoterapija lica", "Beziglična mezoterapija – vitamina i aktivne sastojke u dubinu kože.", "8.000 - 12.000 RSD", "45 min", 11),
  faceBase("Dermapen tretman", "Mikronidling za obnavljanje kože – bore, ožiljci, pore.", "7.000 - 10.000 RSD", "60 min", 12),
  faceBase("Acne stop tretman", "Specjalizovan tretman za problematičnu kožu.", "5.000 - 6.500 RSD", "50 min", 13),
  faceBase("Fitopiling terapija", "Prirodni piling na bazi biljnih ekstrakata.", "4.000 - 5.500 RSD", "45 min", 14),
  faceBase("Deep cleansing", "Dubinsko čišćenje – čiste pore i svež ten.", "4.500 - 6.000 RSD", "55 min", 15),
  faceBase("Sensitive skin", "Blag tretman za osetljivu kožu – bez iritacije.", "4.000 - 5.000 RSD", "40 min", 16),
  faceBase("OxyGeneo tretman", "3-u-1 tretman: eksfolijacija, oksigenacija, nutrisi.", "6.000 - 8.000 RSD", "45 min", 17),
  faceBase("RF lifting lica", "Radio frekvencija za zatezanje i lifting bez operacije.", "8.000 - 12.000 RSD", "60 min", 18),
];

const ALL_SERVICES = [...DEPILACIJA, ...EPILACIJA, ...TRETMANI_LICA];

async function seed() {
  const { error: deleteError } = await supabase.from("services").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) {
    console.error("Could not clear existing services:", deleteError);
  }

  let inserted = 0;
  for (const service of ALL_SERVICES) {
    const metaDesc = service.meta_description ?? `${service.title_rs} – profesionalna usluga u našem kozmetičkom salonu.`;
    const contentFinal = service.content_rs ?? content(service.title_rs, service.description_rs ?? "");
    const { error } = await supabase.from("services").insert({
      category: service.category,
      title_rs: service.title_rs,
      slug: service.slug,
      description_rs: service.description_rs ?? null,
      content_rs: contentFinal,
      meta_title: service.meta_title ?? `${service.title_rs} | Salon Lepote`,
      meta_description: metaDesc,
      price_range: service.price_range ?? null,
      duration: service.duration ?? null,
      image_url: service.image_url ?? null,
      order_index: service.order_index,
      is_active: true,
    });

    if (error) {
      console.error(`Failed "${service.title_rs}" (${service.category}):`, error.message);
    } else {
      inserted++;
      console.log(`✓ ${service.category}: ${service.title_rs}`);
    }
  }

  console.log(`\nDone. ${inserted}/${ALL_SERVICES.length} services seeded.`);
}

seed();
