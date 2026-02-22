import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ServiceForm } from "@/components/admin/ServiceForm";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Uredi uslugu",
  robots: "noindex, nofollow",
};

export default async function AdminUslugeEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/usluge"
        className="text-secondary hover:text-primary mb-6 inline-block text-sm"
      >
        ← Nazad na usluge
      </Link>
      <h1 className="font-serif text-2xl font-bold text-text-dark mb-8">
        Uredi: {service.title_rs}
      </h1>
      <ServiceForm service={service} />
    </div>
  );
}
