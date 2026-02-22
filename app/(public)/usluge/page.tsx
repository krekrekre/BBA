import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Usluge",
  description:
    "Pogledajte sve naše kozmetičke usluge - tretmani lica, epilacija i depilacija.",
};

const categories = [
  {
    slug: "tretmani-lica",
    title: "Tretmani lica",
    description:
      "Profesionalna nega lica – čišćenje, hidratacija, anti-aging i specijalni tretmani.",
    href: "/usluge/tretmani-lica",
  },
  {
    slug: "epilacija",
    title: "Epilacija",
    description: "Trajna epilacija – rešite se neželjenih dlaka na dugi rok.",
    href: "/usluge/epilacija",
  },
  {
    slug: "depilacija",
    title: "Depilacija",
    description: "Depilacija voskom – brza i efikasna uklanjanje dlaka.",
    href: "/usluge/depilacija",
  },
];

export default function UslugePage() {
  return (
    <div>
      {/* Hero section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-bg-light to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-brand font-medium text-sm uppercase tracking-wide mb-2">
            KOZMETIČKE USLUGE
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Naše usluge
          </h1>
          <p className="text-text-dark/80 max-w-2xl mx-auto text-lg">
            Pružamo širok spektar kozmetičkih usluga. Izaberite kategoriju za
            više detalja.
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-16 h-1 rounded-full bg-secondary" />
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="group flex flex-col p-0 bg-bg-light rounded-xl hover:bg-accent/30 transition-colors border border-accent/30 min-h-[260px] overflow-hidden shadow-md hover:shadow-md hover:border-secondary/30"
              >
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-cream px-6 py-5 bg-primary">
                  {cat.title}
                </h2>
                <p className="text-text-dark/80 flex-1 p-6 pt-5">
                  {cat.description}
                </p>
                <span className="inline-flex items-center justify-center w-10 h-10 mt-6 ml-auto mr-6 mb-6 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-cream transition-colors">
                  <svg
                    className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
