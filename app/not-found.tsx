import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="font-serif text-4xl font-bold text-text-dark mb-4">
        404
      </h1>
      <p className="text-text-dark/80 mb-8 text-center">
        Stranica koju tražite nije pronađena.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        Nazad na početnu
      </Link>
    </div>
  );
}
