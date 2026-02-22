import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const metadata: Metadata = {
  title: "Novi blog post",
  robots: "noindex, nofollow",
};

export default function AdminBlogNovaPage() {
  return (
    <div>
      <Link
        href="/admin/blog"
        className="text-secondary hover:text-primary mb-6 inline-block text-sm"
      >
        ← Nazad na blog
      </Link>
      <h1 className="font-serif text-2xl font-bold text-text-dark mb-8">
        Novi blog post
      </h1>
      <BlogPostForm />
    </div>
  );
}
