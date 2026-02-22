import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Uredi blog post",
  robots: "noindex, nofollow",
};

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/blog"
        className="text-secondary hover:text-primary mb-6 inline-block text-sm"
      >
        ← Nazad na blog
      </Link>
      <h1 className="font-serif text-2xl font-bold text-text-dark mb-8">
        Uredi: {post.title_rs}
      </h1>
      <BlogPostForm post={post} />
    </div>
  );
}
