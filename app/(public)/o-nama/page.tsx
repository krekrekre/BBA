import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Upoznajte Beauty by Aysha - tim stručnjaka sa dugogodišnjom tradicijom u kozmetici.",
};

export default function ONamaPage() {
  return (
    <div>
      {/* Hero section – two-column layout */}
      <section className="py-12 lg:py-20 bg-gradient-to-t from-white via-accent/20 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left column – portrait image */}
            <div className="relative aspect-[3/4] max-h-[500px] lg:max-h-[600px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="/images/aida.jpg"
                alt="Beauty by Aysha – profesionalna nega"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Right column – text and CTAs */}
            <div className="order-1 lg:order-2 space-y-6">
              <span className="inline-block text-brand text-sm font-medium uppercase tracking-widest">
                DOBRODOŠLI U NAŠ SVET
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
                O nama – Gde se{" "}
                <span className="bg-gradient-to-r from-secondary to-[#b87373] bg-clip-text text-transparent">
                  Lepota
                </span>{" "}
                spaja sa Tradicijom
              </h1>
              <p className="text-text-dark/90 text-base sm:text-lg leading-relaxed max-w-xl">
                U srcu našeg salona leži verovanje da svaka žena zaslužuje
                trenutak potpunog mira i vrhunske nege. Mi ne samo da menjamo
                vaš izgled, već gradimo vaše samopouzdanje kroz personalizovan
                pristup i stručnost našeg tima.
              </p>
              <div className="pt-2">
                <Link
                  href="/usluge"
                  className="inline-flex justify-center items-center bg-brand text-cream px-6 py-3 rounded-lg hover:bg-brand/90 transition-colors font-medium uppercase text-sm tracking-wide"
                >
                  Istražite usluge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Naša priča section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-dark mb-12 text-center">
            Naša priča
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-text-dark/90 leading-relaxed text-center">
            <p>
              Beauty by Aysha je osnovan sa ciljem da našim gostima pružimo
              najbolju negu i opuštanje. Sa dugogodišnjom tradicijom u svetu
              kozmetike, trudimo se da svaki dolazak u naš salon bude poseban
              doživljaj.
            </p>
            <p>
              Osnovani smo pre deceniju sa vizijom da stvorimo oazu u kojoj su
              kvalitet i higijena na prvom mestu. Naša misija je da kroz
              kontinuiranu edukaciju i primenu najnovijih svetskih trendova,
              svakoj klijentkinji pružimo rezultate koji inspirišu.
            </p>
            <p>
              Počeli smo kao mali porodični studio, a danas smo prepoznatljivi
              kao lideri u industriji lepote u regionu. Svaki tretman koji
              radimo plod je dugogodišnjeg istraživanja i ljubavi prema
              kozmetologiji.
            </p>
            <p>
              Verujemo da svaka žena zaslužuje trenutak koji pripada samo njoj –
              mesto gde može da se opusti, pusti brige i prepusti rukama
              stručnjaka. Zato smo stvorili ambijent koji kombinuje modernu
              tehnologiju sa toplinom domaće atmosfere.
            </p>
            <p>
              Naš tim čine certificirani stručnjaci koji redovno pohađaju
              seminare i usavršavaju se kako bismo vam uvek nudili
              najsavremenije i najefikasnije tretmane. Koristimo isključivo
              proverene proizvode renomiranih brendova, jer vaše zdravlje i
              zadovoljstvo su naš najveći prioritet.
            </p>
          </div>
        </div>
      </section>

      {/* Naš Pristup section */}
      <section className="py-16 lg:py-24 bg-bg-light">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-[36px] font-bold text-text-dark mb-4 text-center">
            Naš pristup
          </h2>
          <p className="text-text-dark/90 mb-12 max-w-2xl mx-auto text-center">
            Tri osnovna stuba na kojima gradimo vaše poverenje i osiguravamo
            besprekorne rezultate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Bezbednost */}
            <div className="bg-white rounded-xl p-6 shadow-md text-start">
              <div className="w-14 h-14 rounded-full bg-accent/60 flex items-center justify-center mb-4 shadow-md">
                <svg
                  className="w-7 h-7 text-brand"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-dark mb-2">
                Bezbednost
              </h3>
              <p className="text-text-dark/90 text-sm leading-relaxed">
                Svi naši tretmani se izvode po strogo definisanim protokolima
                pod nadzorom sertifikovanih stručnjaka, koristeći samo proverene
                metode.
              </p>
            </div>

            {/* Maksimalna Higijena */}
            <div className="bg-white rounded-xl p-6 shadow-md text-start">
              <div className="w-14 h-14 rounded-full bg-accent/60 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-brand"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-dark mb-2">
                Maksimalna Higijena
              </h3>
              <p className="text-text-dark/90 text-sm leading-relaxed">
                Sterilizacija opreme medicinskog nivoa i korišćenje jednokratnih
                materijala su standard od kojeg nikada ne odstupamo radi vašeg
                zdravlja.
              </p>
            </div>

            {/* Premium Proizvodi */}
            <div className="bg-white rounded-xl p-6 shadow-md text-start">
              <div className="w-14 h-14 rounded-full bg-accent/60 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-brand"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-text-dark mb-2">
                Premium Proizvodi
              </h3>
              <p className="text-text-dark/90 text-sm leading-relaxed">
                Partneri smo sa vodećim svetskim kozmetičkim kućama,
                osiguravajući da na vašu kožu nanosimo samo najbolje aktivne
                sastojke.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sertifikati i iskustvo section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-dark mb-4">
            Sertifikati i iskustvo
          </h2>
          <p className="text-text-dark/90 mb-12 max-w-2xl mx-auto">
            Ponosno ističemo naše licence i godine usavršavanja
          </p>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 items-start bg-[#fff8f9] py-8 px-6 rounded-xl">
            {/* DOPISCO LICENCIRD */}
            <div className="flex flex-col items-center gap-3 min-w-[120px]">
              <div className="w-14 h-14 flex items-center justify-center text-text-dark">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <span className="text-text-dark text-sm font-medium uppercase tracking-wide">
                DOPISCO LICENCIRAN
              </span>
            </div>

            {/* BEST SALON 2023 */}
            <div className="flex flex-col items-center gap-3 min-w-[120px]">
              <div className="w-14 h-14 flex items-center justify-center text-text-dark">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <span className="text-text-dark text-sm font-medium uppercase tracking-wide">
                BEST SALON 2023
              </span>
            </div>

            {/* 15+ GODINA RADA */}
            <div className="flex flex-col items-center gap-3 min-w-[120px]">
              <div className="w-14 h-14 flex items-center justify-center text-text-dark">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-text-dark text-sm font-medium uppercase tracking-wide">
                15+ GODINA RADA
              </span>
            </div>

            {/* DERMALOGICA EXPERT */}
            <div className="flex flex-col items-center gap-3 min-w-[120px]">
              <div className="w-14 h-14 flex items-center justify-center text-text-dark">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <span className="text-text-dark text-sm font-medium uppercase tracking-wide">
                DERMALOGICA EXPERT
              </span>
            </div>

            {/* MED KOZMETIČAR */}
            <div className="flex flex-col items-center gap-3 min-w-[120px]">
              <div className="w-14 h-14 flex items-center justify-center text-text-dark">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-text-dark text-sm font-medium uppercase tracking-wide">
                MED KOZMETIČAR
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
