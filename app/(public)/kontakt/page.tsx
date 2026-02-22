import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte nas - rezervišite termin ili postavite pitanje. Radujemo se vašoj poruci.",
};

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl font-bold text-text-dark mb-8">
        Kontakt
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-serif text-2xl font-bold text-text-dark mb-6">
            Kontaktirajte nas
          </h2>
          <div className="space-y-4 text-text-dark/90 mb-8">
            <p>
              <strong>Adresa:</strong>
              <br />
              Ulica primerićeva 1
              <br />
              11000 Beograd, Srbija
            </p>
            <p>
              <strong>Telefon:</strong>{" "}
              <a href="tel:+381111234567" className="text-primary hover:underline">
                +381 11 123 4567
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:kontakt@salonlepote.rs"
                className="text-primary hover:underline"
              >
                kontakt@salonlepote.rs
              </a>
            </p>
          </div>
          <h3 className="font-serif text-xl font-bold text-text-dark mb-4">
            Radno vreme
          </h3>
          <ul className="space-y-2 text-text-dark/80">
            <li>Ponedeljak - Petak: 09:00 - 20:00</li>
            <li>Subota: 09:00 - 16:00</li>
            <li>Nedelja: Zatvoreno</li>
          </ul>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>

      <div className="mt-16 rounded-xl overflow-hidden h-80 bg-bg-light">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.9258032088376!2d20.4616!3d44.8125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQ4JzQ1LjAiTiAyMMKwMjcnMzkuOCJF!5e0!3m2!1sen!2srs!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokacija salona"
        />
      </div>
    </div>
  );
}
