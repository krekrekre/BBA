"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Review } from "@/lib/types/database";

interface ReviewFormProps {
  review?: Review;
}

export function ReviewForm({ review }: ReviewFormProps) {
  const router = useRouter();
  const isEdit = !!review;

  const [authorName, setAuthorName] = useState(review?.author_name ?? "");
  const [authorImage, setAuthorImage] = useState(review?.author_image ?? "");
  const [rating, setRating] = useState(review?.rating ?? 5);
  const [content, setContent] = useState(review?.content_rs ?? "");
  const [serviceMentioned, setServiceMentioned] = useState(
    review?.service_mentioned ?? ""
  );
  const [isMock, setIsMock] = useState(review?.is_mock ?? true);
  const [isPublished, setIsPublished] = useState(review?.is_published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body = {
        author_name: authorName,
        author_image: authorImage || null,
        rating,
        content_rs: content,
        service_mentioned: serviceMentioned || null,
        is_mock: isMock,
        is_published: isPublished,
      };

      const url = isEdit ? `/api/reviews/${review.id}` : "/api/reviews";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška");

      router.push("/admin/utisci");
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
          Ime autora
        </label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          URL slike (opciono)
        </label>
        <input
          type="url"
          value={authorImage}
          onChange={(e) => setAuthorImage(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Ocena (1-5)
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} zvezdica
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Sadržaj utiska
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Pomenuta usluga (opciono)
        </label>
        <input
          type="text"
          value={serviceMentioned}
          onChange={(e) => setServiceMentioned(e.target.value)}
          placeholder="npr. Tretman lica"
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isMock}
            onChange={(e) => setIsMock(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Mock utisak</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Objavljeno</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 font-medium"
        >
          {saving ? "Čuvam..." : isEdit ? "Sačuvaj izmene" : "Dodaj utisak"}
        </button>
        <Link
          href="/admin/utisci"
          className="px-6 py-2 rounded-lg border border-accent/50 hover:bg-bg-light"
        >
          Otkaži
        </Link>
      </div>
    </form>
  );
}
