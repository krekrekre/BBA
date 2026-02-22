import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    slug: "tretmani-lica",
    title: "Tretmani lica",
    description:
      "Profesionalna nega lica – čišćenje, hidratacija i anti-aging tretmani.",
    image: "/images/feature1.jpg",
    href: "/usluge/tretmani-lica",
  },
  {
    slug: "epilacija",
    title: "Epilacija",
    description:
      "Trajna epilacija – rešite se neželjenih dlaka na dugi rok.",
    image: "/images/feature2.jpg",
    href: "/usluge/epilacija",
  },
  {
    slug: "depilacija",
    title: "Depilacija",
    description: "Depilacija voskom – brza i bezbolna uklanjanje dlaka.",
    image: "/images/feature3.jpg",
    href: "/usluge/depilacija",
  },
];

export function ServiceCategoryCards() {
  return (
    <section className="py-16 lg:py-24 bg-bg-light">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-dark text-center mb-4">
          Naše usluge
        </h2>
        <p className="text-center text-text-dark/80 mb-12 max-w-2xl mx-auto">
          Otkrijte širok spektar kozmetičkih usluga prilagođenih vašim
          potrebama
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-accent/40 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-text-dark/80 text-sm">{cat.description}</p>
                <span className="inline-block mt-3 text-primary font-medium text-sm">
                  Saznaj više →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/usluge"
            className="inline-block bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Sve usluge
          </Link>
        </div>
      </div>
    </section>
  );
}
