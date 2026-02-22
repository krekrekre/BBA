/**
 * Run with: npx tsx scripts/seed-blog.ts
 *
 * Creates mock blog posts with random images (picsum.photos) and Serbian text.
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

const MOCK_POSTS = [
  {
    title_rs: "10 saveta za zdravo kožu tokom leta",
    slug: "10-saveta-za-zdravu-kozu-tokom-leta",
    excerpt_rs:
      "Provereni trikovi i proizvodi koji će vašu kožu zaštititi od sunca, dehidracije i preteranog masnog sebuma tokom vrućih dana.",
    featured_image: "https://picsum.photos/seed/beauty1/800/500",
    content_rs: `
      <p>Letnji dani donose neke posebne izazove za vašu kožu. Sunce, znojenje i klima uređaji mogu da remete ravnotežu prirodne zaštite kože. Evo naših najboljih saveta.</p>
      <h2>Hidratacija je ključna</h2>
      <p>Povećajte unos vode i koristite lagane, nekomedogene hidratantne krema. Izbegavajte teške teksture koje mogu da začepaju pore.</p>
      <h2>SPF svakog dana</h2>
      <p>Zaštita od sunca nije opciona – koristite minimum SPF 30 čak i kada je oblačno. Nanošenje treba ponoviti svakih nekoliko sati.</p>
      <h2>Noćna regeneracija</h2>
      <p>Iskoristite noć za dublju negu: serum sa vitaminom C, retinol ili hidratantne maske pomažu koži da se oporavi.</p>
      <p>Posetite nas za personalizovane savete i tretmane prilagođene vašem tipu kože.</p>
    `,
    meta_title: "10 saveta za zdravo kožu tokom leta | Kozmetički salon",
    meta_description:
      "Saznajte kako da negujete kožu tokom letnjih meseci. Hidratacija, SPF i noćna regeneracija.",
  },
  {
    title_rs: "Epilacija lasnom: šta treba da znate",
    slug: "epilacija-lasnom-sta-treba-da-znate",
    excerpt_rs:
      "Saveti pre i posle tretmana, koliko traju rezultati i ko je idealan kandidat za trajnu smanjenje dlaka.",
    featured_image: "https://picsum.photos/seed/beauty2/800/500",
    content_rs: `
      <p>Epilacija lasnom je jedna od najefikasnijih metoda za trajno uklanjanje neželjenih dlaka. Evo šta vas čeka.</p>
      <h2>Kako funkcioniše</h2>
      <p>Laserska svetlost cilja melanin u dlačicama. Toplota uništava folikul, što sprečava dalji rast.</p>
      <h2>Priprema pre tretmana</h2>
      <p>Izbegavajte sunčanje nedelju dana pre. Oblikujte područje koje tretirate. Ne depilirajte voskom mesec dana pre.</p>
      <h2>Broj tretmana</h2>
      <p>Potrebno je obično 6–8 tretmana u razmaku od 4–6 nedelja za optimalne rezultate. Rast dlaka je individualan.</p>
      <p>Zakažite besplatnu konsultaciju da proverite da li ste kandidat za ovaj tretman.</p>
    `,
    meta_title: "Epilacija lasnom: sve što treba da znate | Kozmetički salon",
    meta_description:
      "Vodič kroz epilaciju lasnom – priprema, broj tretmana i očekivani rezultati.",
  },
  {
    title_rs: "Tretmani lica za muškarce – rastuća potražnja",
    slug: "tretmani-lica-za-muskarce",
    excerpt_rs:
      "Zašto sve više muškaraca posjećuje kozmetičke salone i koje tretmane preporučujemo za mušku kožu.",
    featured_image: "https://picsum.photos/seed/beauty3/800/500",
    content_rs: `
      <p>Muška koža ima drugačiju strukturu od ženske – deblji sloj epidermisa i više aktivnih lojnih žlezda. Specjalizovani tretmani postaju standard.</p>
      <h2>Čišćenje i peeling</h2>
      <p>Profesionalno čišćenje pore i blagi hemijski peeling pomagaju kod crnih tačaka, masnog sjaja i ožiljaka od bubuljica.</p>
      <h2>Antiage tretmani</h2>
      <p>Botox, filler i RF lifting sve češće biraju muškarci koji žele prirodno, svežiji izgled bez drastičnih promena.</p>
      <h2>Brza nega</h2>
      <p>Express tretmani od 30 minuta idealni su za zauzete profesionalce. Hidracija, masaža i maska – sve u jednom terminu.</p>
      <p>Pridružite se brojnim muškim klijentima koji redovno posjećuju naš salon.</p>
    `,
    meta_title: "Tretmani lica za muškarce | Kozmetički salon",
    meta_description:
      "Specijalizovani tretmani lica za mušku kožu – čišćenje, anti-age i express nega.",
  },
  {
    title_rs: "Depilacija voskom vs. epilacija – šta je bolje?",
    slug: "depilacija-voskom-vs-epilacija",
    excerpt_rs:
      "Uporedba dve popularne metode uklanjanja dlaka: prednosti, mane i za koga je koja metoda idealna.",
    featured_image: "https://picsum.photos/seed/beauty4/800/500",
    content_rs: `
      <p>Depilacija voskom i epilacija lasnom rešavaju isti problem na različite načine. Evo praktičnog poređenja.</p>
      <h2>Depilacija voskom</h2>
      <p>Brza, povoljna, rezultati 3–4 nedelje. Idealna za sva područja tela. Može da iritira osetljivu kožu. Dlake moraju biti određene dužine.</p>
      <h2>Epilacija lasnom</h2>
      <p>Trajnija redukcija posle serije tretmana. Bolja za tamnije, grublje dlake. Nije za sve tonove kože i boje dlaka. Potrebna je strpljivost.</p>
      <h2>Šta izabrati?</h2>
      <p>Za brze rezultate i fleksibilnost – vosak. Za dugoročnu redukciju dlaka – laser. Mnogi klijenti kombinuju obe metode.</p>
      <p>Dobijte personalizovan savet na konsultaciji u našem salonu.</p>
    `,
    meta_title: "Depilacija voskom vs. epilacija – poređenje | Kozmetički salon",
    meta_description:
      "Uporedite depilaciju voskom i epilaciju lasnom. Prednosti, mane i naše preporuke.",
  },
  {
    title_rs: "Sezonska promena rutine nege – jesen/zima",
    slug: "sezonska-promena-rutine-nege-jesen-zima",
    excerpt_rs:
      "Kako prilagoditi kozmetičku rutinu hladnijim mesecima kada koža postaje suva i osetljivija.",
    featured_image: "https://picsum.photos/seed/beauty5/800/500",
    content_rs: `
      <p>Pad temperature i grejanje zatvorenih prostora često uzrokuju dehidraciju, pucanje i nelagodnost. Evo kako da održite kožu zdrava.</p>
      <h2>Jača hidratacija</h2>
      <p>Prebacite se na bogatije krema i serum sa hijaluronskom kiselinom. Noćne maske pomažu koži da zadrži vlagu.</p>
      <h2>Blagiji peeling</h2>
      <p>Smanjite učestalost mehaničkog pilinga. Hemijski AHA/BHA ostaju sigurni, ali sa manjom koncentracijom.</p>
      <h2>Zaštita barijere</h2>
      <p>Koristite proizvode sa ceramidima i niacinamidom koji obnavljaju zaštitnu barijeru kože.</p>
      <p>Zakažite sezonsku dijagnostiku kože i personalizovan plan nege u našem salonu.</p>
    `,
    meta_title: "Sezonska rutina nege za jesen i zimu | Kozmetički salon",
    meta_description:
      "Saveti za negu kože tokom jeseni i zime – hidratacija, peeling i zaštita barijere.",
  },
  {
    title_rs: "Zašto profesionalno čišćenje lica vredi",
    slug: "zasto-profesionalno-ciscenje-lica-vredi",
    excerpt_rs:
      "Razlike između kućnog i profesionalnog čišćenja pore, i kako često ga treba raditi.",
    featured_image: "https://picsum.photos/seed/beauty6/800/500",
    content_rs: `
      <p>Kućna nega je važna, ali profesionalno čišćenje lica daje rezultate koje ne možete postići sami.</p>
      <h2>Dublje čišćenje</h2>
      <p>Specijalne aparature i tehnike omogućavaju čišćenje dubokih pore i uklanjanje comedona kojih se kućna rutina ne može rešiti.</p>
      <h2>Individualni pristup</h2>
      <p>Kozmetičar procenjuje tip kože, probleme i predlaže kombinaciju tretmana – steam, ekstrakcija, maska, masaža.</p>
      <h2>Koliko često?</h2>
      <p>Za masnu/problematičnu kožu – svakih 4–6 nedelja. Za suvu ili normalnu – 2–3 puta godišnje može biti dovoljno.</p>
      <p>Investirajte u profesionalno čišćenje i primetite razliku već posle prvog tretmana.</p>
    `,
    meta_title: "Zašto profesionalno čišćenje lica vredi | Kozmetički salon",
    meta_description:
      "Profesionalno čišćenje lica – razlike u odnosu na kućnu negu i preporuke za učestalost.",
  },
];

async function seed() {
  const now = new Date().toISOString();

  for (let i = 0; i < MOCK_POSTS.length; i++) {
    const post = MOCK_POSTS[i];
    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - i * 5); // Spread posts over recent days

    const { error } = await supabase.from("blog_posts").upsert(
      {
        ...post,
        content_rs: post.content_rs.replace(/\n\s+/g, "\n").trim(),
        is_published: true,
        published_at: publishedAt.toISOString(),
        views_count: Math.floor(Math.random() * 150),
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`Failed to upsert "${post.title_rs}":`, error);
    } else {
      console.log(`✓ ${post.title_rs}`);
    }
  }

  console.log("\nDone. Mock blog posts seeded.");
}

seed();
