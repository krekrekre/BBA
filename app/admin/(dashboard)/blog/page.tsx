import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminBlogList } from "@/components/admin/AdminBlogList";

export const metadata: Metadata = {
  title: "Upravljanje blogom",
  robots: "noindex, nofollow",
};

export default async function AdminBlogPage() {
  const supabase = createAdminClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-text-dark">
          Blog postovi
        </h1>
        <Link
          href="/admin/blog/nova"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          + Novi post
        </Link>
      </div>
      <AdminBlogList posts={posts || []} />
    </div>
  );
}
