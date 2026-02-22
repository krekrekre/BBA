import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="py-16 lg:py-24 bg-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
          Rezervišite svoj termin
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
          Kontaktirajte nas i zakazite posetu našem salonu. Radujemo se
          saradnji sa vama.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/kontakt"
            className="inline-block bg-white text-secondary px-8 py-3 rounded-lg hover:bg-accent transition-colors font-medium"
          >
            Kontakt forma
          </Link>
          <a
            href="tel:+381111234567"
            className="inline-block border-2 border-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
          >
            +381 11 123 4567
          </a>
        </div>
      </div>
    </section>
  );
}
