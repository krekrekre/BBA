import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminServiceList } from "@/components/admin/AdminServiceList";

export const metadata: Metadata = {
  title: "Upravljanje uslugama",
  robots: "noindex, nofollow",
};

export default async function AdminUslugePage() {
  const supabase = createAdminClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("order_index")
    .order("title_rs");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-text-dark">
          Usluge
        </h1>
        <Link
          href="/admin/usluge/nova"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          + Nova usluga
        </Link>
      </div>
      <AdminServiceList services={services || []} />
    </div>
  );
}
