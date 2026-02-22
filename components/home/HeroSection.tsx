import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden min-h-[400px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-image.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-white" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6">
          Salon Lepote
        </h1>
        <p className="text-xl md:text-2xl text-secondary mb-4 max-w-2xl mx-auto">
          Profesionalni tretmani lica, epilacija i depilacija u prijatnoj
          atmosferi
        </p>
        <p className="text-text-dark/80 mb-10 max-w-xl mx-auto">
          Doživite najbolju negu svoje kože. Naš tim stručnjaka vam nudi širok
          spektar usluga prilagođenih vašim potrebama.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/usluge"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Pogledaj usluge
          </Link>
          <Link
            href="/kontakt"
            className="inline-block border-2 border-secondary text-secondary px-8 py-3 rounded-lg hover:bg-secondary hover:text-white transition-colors font-medium"
          >
            Rezerviši termin
          </Link>
        </div>
      </div>
    </section>
  );
}
