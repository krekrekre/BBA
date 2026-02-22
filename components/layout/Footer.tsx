import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-dark text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="Salon Lepote" width={36} height={36} className="object-contain opacity-90" />
              <h3 className="font-serif text-xl font-bold text-primary">
                Salon Lepote
              </h3>
            </Link>
            <p className="text-white/80 text-sm">
              Profesionalni kozmetički salon sa dugogodišnjom tradicijom. Nega
              lica, epilacija i depilacija.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigacija</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/usluge" className="text-white/80 hover:text-primary transition-colors">
                  Usluge
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/o-nama" className="text-white/80 hover:text-primary transition-colors">
                  O nama
                </Link>
              </li>
              <li>
                <Link href="/utisci" className="text-white/80 hover:text-primary transition-colors">
                  Utisci
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-white/80 hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Radno vreme</h4>
            <ul className="text-white/80 text-sm space-y-1">
              <li>Ponedeljak - Petak: 09:00 - 20:00</li>
              <li>Subota: 09:00 - 16:00</li>
              <li>Nedelja: Zatvoreno</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="text-white/80 text-sm space-y-1">
              <li>Email: kontakt@salonlepote.rs</li>
              <li>Telefon: +381 11 123 4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
          &copy; {currentYear} Salon Lepote. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
}
