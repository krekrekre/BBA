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
      <h1 className="font-serif text-4xl font-bold text-text-dark mb-12 text-center">
        Kontakt
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
        {/* Left: Info cards list */}
        <div className="space-y-4">
        {/* Adresa card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/30 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-text-dark mb-2">Adresa</h2>
            <p className="text-text-dark/90 text-sm leading-relaxed">
              Strahinjića Bana 34/3
              <br />
              Belgrade, Serbia
            </p>
          </div>
        </div>

        {/* Telefon card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/30 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-text-dark mb-2">Telefon</h2>
            <a href="tel:0641789158" className="text-text-dark/90 text-sm hover:text-brand transition-colors">
              064/1789158
            </a>
          </div>
        </div>

        {/* Email card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/30 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-text-dark mb-2">Email</h2>
            <a href="mailto:aidastanimirov@gmail.com" className="text-text-dark/90 text-sm hover:text-brand transition-colors break-all">
              aidastanimirov@gmail.com
            </a>
          </div>
        </div>

        {/* Radno vreme card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/30 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-text-dark mb-2">Radno vreme</h2>
            <ul className="space-y-1.5 text-text-dark/90 text-sm">
              <li>Ponedeljak: 10h - 17h</li>
              <li>Utorak - Petak: 12h - 20h</li>
              <li>Subota: 10h - 17h</li>
              <li>Nedelja: Ne radi</li>
            </ul>
          </div>
        </div>
        </div>

        {/* Right: Form card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-accent/30 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl font-bold text-text-dark mb-6">
            Pošaljite nam poruku
          </h2>
          <ContactForm />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden h-80 bg-bg-light">
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
