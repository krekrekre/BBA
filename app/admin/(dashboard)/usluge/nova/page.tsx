import type { Metadata } from "next";
import Link from "next/link";
import { ServiceForm } from "@/components/admin/ServiceForm";

export const metadata: Metadata = {
  title: "Nova usluga",
  robots: "noindex, nofollow",
};

export default function AdminUslugeNovaPage() {
  return (
    <div>
      <Link
        href="/admin/usluge"
        className="text-secondary hover:text-primary mb-6 inline-block text-sm"
      >
        ← Nazad na usluge
      </Link>
      <h1 className="font-serif text-2xl font-bold text-text-dark mb-8">
        Nova usluga
      </h1>
      <ServiceForm />
    </div>
  );
}
