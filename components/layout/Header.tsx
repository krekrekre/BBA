"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/usluge", label: "Usluge" },
  { href: "/o-nama", label: "O nama" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-accent/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12 lg:h-14">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity"
              aria-label="Početna"
            >
              <Image
                src="/images/logo.png"
                alt="Kozmetički salon"
                width={64}
                height={64}
                className="object-contain rounded-sm w-14 h-14 lg:w-16 lg:h-16"
              />
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-dark hover:text-brand transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-4 ml-auto">
            <a
              href="tel:+38111000000"
              className="flex items-center gap-2 text-text-dark hover:text-brand transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 text-brand"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +381 11 000 000
            </a>
            <Link
              href="tel:+38111000000"
              className="inline-block bg-brand text-white px-5 py-2.5 rounded-lg hover:bg-brand/90 transition-colors font-medium uppercase text-sm tracking-wide"
            >
              Pozovite nas
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent/20 transition-colors"
            aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 border-t border-accent/30">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-text-dark hover:text-brand transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="tel:+38111000000"
                  className="flex items-center gap-2 py-2 text-text-dark hover:text-brand"
                >
                  <svg
                    className="w-5 h-5 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +381 11 000 000
                </a>
              </li>
              <li>
                <Link
                  href="tel:+38111000000"
                  onClick={() => setMobileOpen(false)}
                  className="inline-block bg-brand text-white px-5 py-2.5 rounded-lg hover:bg-brand/90 transition-colors font-medium uppercase text-sm mt-2"
                >
                  Pozovite nas
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
