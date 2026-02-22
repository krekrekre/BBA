import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Upoznajte naš salon lepote - tim stručnjaka sa dugogodišnjom tradicijom u kozmetici.",
};

export default function ONamaPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl font-bold text-text-dark mb-8">
        O nama
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/aida.jpg"
            alt="Salon Lepote"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/aida1.jpg"
            alt="Salon Lepote"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="max-w-3xl space-y-8 text-text-dark/90">
        <section>
          <h2 className="font-serif text-2xl font-bold text-text-dark mb-4">
            Naša priča
          </h2>
          <p>
            Salon Lepote je osnovan sa ciljem da našim gostima pružimo najbolju
            negu i opuštanje. Sa dugogodišnjom tradicijom u svetu kozmetike,
            trudimo se da svaki dolazak u naš salon bude poseban doživljaj.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-text-dark mb-4">
            Naš tim
          </h2>
          <p>
            Naš tim čine stručnjaci sa sertifikatima i iskustvom u različitim
            oblastima kozmetike. Kontinuirano se usavršavamo kako bismo vam
            pružili najsavremenije i najefikasnije tretmane.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-text-dark mb-4">
            Naše vrednosti
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Kvalitet i profesionalizam u svemu što radimo</li>
            <li>Individualan pristup svakom gostu</li>
            <li>Korišćenje proverenih i bezbednih proizvoda</li>
            <li>Stvaranje prijatne i opuštajuće atmosfere</li>
          </ul>
        </section>

        <section className="bg-bg-light p-8 rounded-xl">
          <h2 className="font-serif text-2xl font-bold text-text-dark mb-4">
            Zašto smo mi pravi izbor
          </h2>
          <p>
            Posvećeni smo zadovoljstvu naših gostiju i verujemo da svaki tretman
            treba da bude prilagođen individualnim potrebama. Koristimo samo
            kvalitetne proizvode poznatih brendova i pratimo najnovije trendove u
            industriji lepote.
          </p>
        </section>
      </div>
    </div>
  );
}
