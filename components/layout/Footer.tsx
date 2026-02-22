import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand text-cream mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="Salon Lepote" width={36} height={36} className="object-contain opacity-90" />
              <h3 className="font-serif text-xl font-bold text-accent">
                Salon Lepote
              </h3>
            </Link>
            <p className="text-cream/80 text-sm">
              Profesionalni kozmetički salon sa dugogodišnjom tradicijom. Nega
              lica, epilacija i depilacija.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigacija</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/usluge" className="text-cream/80 hover:text-accent transition-colors">
                  Usluge
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-cream/80 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/o-nama" className="text-cream/80 hover:text-accent transition-colors">
                  O nama
                </Link>
              </li>
              <li>
                <Link href="/utisci" className="text-cream/80 hover:text-accent transition-colors">
                  Utisci
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-cream/80 hover:text-accent transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Radno vreme</h4>
            <ul className="text-cream/80 text-sm space-y-1">
              <li>Ponedeljak - Petak: 09:00 - 20:00</li>
              <li>Subota: 09:00 - 16:00</li>
              <li>Nedelja: Zatvoreno</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="text-cream/80 text-sm space-y-1">
              <li>Email: aidastanimirov@gmail.com</li>
              <li>Telefon: 064/1789158</li>
              <li>
                <a
                  href="https://www.instagram.com/_beauty_by_aysha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-accent transition-colors inline-flex items-center gap-1.5 mt-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm0 2.225h-.63c-2.098.007-2.437.025-3.465.075-.1.007-.185.033-.27.07-.086.04-.17.087-.248.143a2.857 2.857 0 00-.971.971 2.715 2.715 0 00-.143.27c-.037.085-.063.17-.07.27-.05 1.028-.068 1.366-.075 3.465v.63c.007 2.098.025 2.437.075 3.465.007.1.033.185.07.27.04.086.087.17.143.248.151.22.356.425.971.971.083.06.162.122.248.143.085.037.17.063.27.07 1.028.05 1.366.068 3.465.075h.63c2.098-.007 2.437-.025 3.465-.075.1-.007.185-.033.27-.07.086-.04.17-.087.248-.143.22-.151.425-.356.971-.971.06-.083.122-.162.143-.248.037-.085.063-.17.07-.27.05-1.028.068-1.366.075-3.465v-.63c-.007-2.098-.025-2.437-.075-3.465-.007-.1-.033-.185-.07-.27-.04-.086-.087-.17-.143-.248a2.857 2.857 0 00-.971-.971 2.715 2.715 0 00-.27-.143c-.085-.037-.17-.063-.27-.07-1.028-.05-1.366-.068-3.465-.075z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12 7.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM8.25 12a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" clipRule="evenodd" />
                    <path d="M16.002 7.75a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  @_beauty_by_aysha
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60 text-sm">
          &copy; {currentYear} Salon Lepote. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
}
