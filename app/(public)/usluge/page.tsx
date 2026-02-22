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
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl font-bold text-text-dark text-center mb-4">
        Naše usluge
      </h1>
      <p className="text-center text-text-dark/80 max-w-2xl mx-auto mb-16">
        Pružamo širok spektar kozmetičkih usluga. Izaberite kategoriju za više
        detalja.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.href}
            className="block p-8 bg-bg-light rounded-xl hover:bg-accent/20 transition-colors border border-accent/20"
          >
            <h2 className="font-serif text-2xl font-bold text-text-dark mb-3">
              {cat.title}
            </h2>
            <p className="text-text-dark/80">{cat.description}</p>
            <span className="inline-block mt-4 text-primary font-medium">
              Pogledaj usluge →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
