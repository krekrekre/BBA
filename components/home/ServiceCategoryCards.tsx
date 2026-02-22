import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    slug: "tretmani-lica",
    title: "Tretmani lica",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    href: "/usluge/tretmani-lica",
  },
  {
    slug: "epilacija",
    title: "Epilacija",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    href: "/usluge/epilacija",
  },
  {
    slug: "depilacija",
    title: "Depilacija",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
    href: "/usluge/depilacija",
  },
];

export function ServiceCategoryCards() {
  return (
    <section className="py-16 lg:py-24 bg-bg-light">
      <div className="container mx-auto px-4">
        <p className="text-brand font-medium text-sm uppercase tracking-wide text-center mb-2">
          EKSKLUZIVNA NEGA
        </p>
        <h2 className="font-sans text-3xl lg:text-4xl font-bold text-text-dark text-center mb-3">
          Naše Usluge
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-16 h-1 rounded-full bg-secondary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group block rounded-xl overflow-hidden aspect-[4/5] relative"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Dark gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-sans text-xl font-bold mb-2">{cat.title}</h3>
                <span className="text-sm font-medium flex items-center gap-1">
                  SAZNAJTE VIŠE{" "}
                  <span className="text-brand">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
