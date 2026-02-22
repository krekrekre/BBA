import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminReviewsList } from "@/components/admin/AdminReviewsList";

export const metadata: Metadata = {
  title: "Upravljanje utiscima",
  robots: "noindex, nofollow",
};

export default async function AdminUtisciPage() {
  const supabase = createAdminClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-text-dark">
          Utisci gostiju
        </h1>
        <Link
          href="/admin/utisci/nova"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          + Novi utisak
        </Link>
      </div>
      <AdminReviewsList reviews={reviews || []} />
    </div>
  );
}
