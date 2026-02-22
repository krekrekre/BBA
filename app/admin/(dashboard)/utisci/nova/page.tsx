import type { Metadata } from "next";
import Link from "next/link";
import { ReviewForm } from "@/components/admin/ReviewForm";

export const metadata: Metadata = {
  title: "Novi utisak",
  robots: "noindex, nofollow",
};

export default function AdminUtisciNovaPage() {
  return (
    <div>
      <Link
        href="/admin/utisci"
        className="text-secondary hover:text-primary mb-6 inline-block text-sm"
      >
        ← Nazad na utiske
      </Link>
      <h1 className="font-serif text-2xl font-bold text-text-dark mb-8">
        Novi utisak
      </h1>
      <ReviewForm />
    </div>
  );
}
