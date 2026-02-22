"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slug";
import type { BlogPost } from "@/lib/types/database";

interface BlogPostFormProps {
  post?: BlogPost;
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title_rs ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(post?.content_rs ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt_rs ?? "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(
    post?.meta_description ?? ""
  );
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setTitle(val);
      if (!isEdit) setSlug(generateSlug(val));
    },
    [isEdit]
  );

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška");
      setFeaturedImage(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri otpremanju");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body = {
        title_rs: title,
        slug,
        content_rs: content,
        excerpt_rs: excerpt || null,
        featured_image: featuredImage || null,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        is_published: isPublished,
      };

      const url = isEdit ? `/api/blog/${post.id}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška");

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri čuvanju");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Naslov
        </label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Slug (URL)
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          pattern="[a-z0-9-]+"
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Sadržaj (HTML)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={12}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Izvadak
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Slika
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="block mb-2"
        />
        {featuredImage && (
          <div className="mt-2 relative h-32 w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredImage}
              alt="Pregled"
              className="max-h-40 rounded-lg border object-cover"
            />
            <button
              type="button"
              onClick={() => setFeaturedImage("")}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Ukloni sliku
            </button>
          </div>
        )}
        {uploading && <p className="text-sm text-text-dark/60">Otpremanje...</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Meta naslov
        </label>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Meta opis
        </label>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="published" className="text-sm">
          Objavi odmah
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 font-medium"
        >
          {saving ? "Čuvam..." : isEdit ? "Sačuvaj izmene" : "Kreiraj post"}
        </button>
        <Link
          href="/admin/blog"
          className="px-6 py-2 rounded-lg border border-accent/50 hover:bg-bg-light"
        >
          Otkaži
        </Link>
      </div>
    </form>
  );
}
