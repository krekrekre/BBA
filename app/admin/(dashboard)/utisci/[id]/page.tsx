import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ReviewForm } from "@/components/admin/ReviewForm";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Uredi utisak",
  robots: "noindex, nofollow",
};

export default async function AdminUtisciEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: review, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !review) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/utisci"
        className="text-secondary hover:text-primary mb-6 inline-block text-sm"
      >
        ← Nazad na utiske
      </Link>
      <h1 className="font-serif text-2xl font-bold text-text-dark mb-8">
        Uredi utisak: {review.author_name}
      </h1>
      <ReviewForm review={review} />
    </div>
  );
}
