"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/slug";
import type { Service } from "@/lib/types/database";

interface ServiceFormProps {
  service?: Service;
}

const CATEGORIES = [
  { value: "tretmani-lica", label: "Tretmani lica" },
  { value: "epilacija", label: "Epilacija" },
  { value: "depilacija", label: "Depilacija" },
] as const;

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const isEdit = !!service;

  const [category, setCategory] = useState<string>(
    service?.category ?? "tretmani-lica"
  );
  const [title, setTitle] = useState(service?.title_rs ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [description, setDescription] = useState(
    service?.description_rs ?? ""
  );
  const [content, setContent] = useState(service?.content_rs ?? "");
  const [imageUrl, setImageUrl] = useState(service?.image_url ?? "");
  const [priceRange, setPriceRange] = useState(service?.price_range ?? "");
  const [duration, setDuration] = useState(service?.duration ?? "");
  const [metaTitle, setMetaTitle] = useState(service?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(
    service?.meta_description ?? ""
  );
  const [orderIndex, setOrderIndex] = useState(
    service?.order_index ?? 0
  );
  const [isActive, setIsActive] = useState(service?.is_active ?? true);
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
      setImageUrl(data.url);
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
        category,
        title_rs: title,
        slug: slug || generateSlug(title),
        description_rs: description || null,
        content_rs: content || null,
        image_url: imageUrl || null,
        price_range: priceRange || null,
        duration: duration || null,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        order_index: orderIndex,
        is_active: isActive,
      };

      const url = isEdit ? `/api/services/${service.id}` : "/api/services";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška");

      router.push("/admin/usluge");
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
          Kategorija
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

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
          placeholder="npr. ultrazvucno-ciscenje"
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Kratak opis (za karticu)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Sadržaj (HTML)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Detaljan opis usluge – može biti HTML"
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none font-mono text-sm"
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
        {imageUrl && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Pregled"
              className="max-h-40 rounded-lg border object-cover"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Ukloni sliku
            </button>
          </div>
        )}
        {uploading && <p className="text-sm text-text-dark/60">Otpremanje...</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Cena (opciono)
          </label>
          <input
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="npr. od 1500 RSD"
            className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Trajanje (opciono)
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="npr. 45 min"
            className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Redosled (veći broj = niže na listi)
        </label>
        <input
          type="number"
          min={0}
          value={orderIndex}
          onChange={(e) => setOrderIndex(parseInt(e.target.value, 10) || 0)}
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Meta naslov (SEO)
        </label>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="Ako ostavite prazno, koristiće se naslov"
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Meta opis (SEO)
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
          id="active"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="active" className="text-sm">
          Usluga je aktivna (prikazuje se na sajtu)
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 font-medium"
        >
          {saving
            ? "Čuvam..."
            : isEdit
              ? "Sačuvaj izmene"
              : "Dodaj uslugu"}
        </button>
        <Link
          href="/admin/usluge"
          className="px-6 py-2 rounded-lg border border-accent/50 hover:bg-bg-light"
        >
          Otkaži
        </Link>
      </div>
    </form>
  );
}
