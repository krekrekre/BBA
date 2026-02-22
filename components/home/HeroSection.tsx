import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[75vh] flex flex-col overflow-hidden">
      {/* Background: dark wooden texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content - lower on mobile, centered on desktop */}
      <div className="flex-1 flex flex-col items-center justify-end sm:justify-center pb-24 sm:pb-0 sm:py-20 lg:py-32 pt-8 sm:pt-0 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl">
          {/* Badge - hidden on mobile */}
          <span className="hidden sm:inline-block bg-secondary/90 text-cream px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide mb-4 sm:mb-6">
            DOBRODOŠLI U OAZU MIRA
          </span>

          {/* Main heading */}
          <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4 sm:mb-6 max-w-3xl mx-auto leading-snug sm:leading-tight">
            Vaša oaza <span className="text-accent">lepote</span> i mira
          </h1>

          {/* Description */}
          <p className="text-cream/95 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-1 sm:px-0 ">
            Vrhunski tretmani lica, epilacija i depilacija u srcu Beograda.
            Otkrijte lepotu koju zaslužujete uz stručni tim profesionalaca.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            <Link
              href="/kontakt"
              className="w-full sm:w-auto inline-flex justify-center items-center bg-brand text-cream px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg hover:bg-brand/90 transition-colors font-medium uppercase text-sm tracking-wide"
            >
              Zakažite termin
            </Link>
            <Link
              href="/usluge"
              className="w-full sm:w-auto inline-flex justify-center items-center bg-primary text-cream px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg hover:bg-primary/90 transition-colors font-medium uppercase text-sm tracking-wide"
            >
              Naše usluge
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator - double chevron */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-accent/90 flex flex-col items-center gap-0.5 animate-bounce">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
        <svg
          className="w-5 h-5 -mt-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
