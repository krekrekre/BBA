import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin kontrolna tabla",
  robots: "noindex, nofollow",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-text-dark mb-8">
        Kontrolna tabla
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/usluge"
          className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-accent/20"
        >
          <h3 className="font-serif text-xl font-bold text-text-dark mb-2">
            Upravljanje uslugama
          </h3>
          <p className="text-text-dark/70 text-sm">
            Dodaj, uredi ili obriši usluge – tretmani lica, epilacija, depilacija
          </p>
        </Link>
        <Link
          href="/admin/blog"
          className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-accent/20"
        >
          <h3 className="font-serif text-xl font-bold text-text-dark mb-2">
            Upravljanje blogom
          </h3>
          <p className="text-text-dark/70 text-sm">
            Kreiraj, uredi ili obriši blog postove
          </p>
        </Link>
        <Link
          href="/admin/utisci"
          className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-accent/20"
        >
          <h3 className="font-serif text-xl font-bold text-text-dark mb-2">
            Upravljanje utiscima
          </h3>
          <p className="text-text-dark/70 text-sm">
            Dodaj, uredi ili obriši utiske gostiju
          </p>
        </Link>
      </div>
    </div>
  );
}
