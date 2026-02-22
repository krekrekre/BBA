"use client";

import Link from "next/link";
import { useState } from "react";
import type { Review } from "@/lib/types/database";

interface AdminReviewsListProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-primary">
      {"★".repeat(rating)}
      <span className="text-gray-300">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export function AdminReviewsList({ reviews }: AdminReviewsListProps) {
  const [items, setItems] = useState(reviews);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, author: string) {
    if (!confirm(`Da li ste sigurni da želite obrisati utisak od "${author}"?`))
      return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("Greška pri brisanju");
      }
    } catch {
      alert("Greška pri brisanju");
    } finally {
      setDeleting(null);
    }
  }

  if (items.length === 0) {
    return (
      <p className="text-text-dark/60">
        Nema utisaka.{" "}
        <Link href="/admin/utisci/nova" className="text-primary hover:underline">
          Dodaj prvi utisak
        </Link>
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-accent/30 bg-bg-light">
            <th className="text-left px-4 py-3 font-medium text-text-dark">
              Autor
            </th>
            <th className="text-left px-4 py-3 font-medium text-text-dark">
              Ocena
            </th>
            <th className="text-left px-4 py-3 font-medium text-text-dark">
              Status
            </th>
            <th className="text-left px-4 py-3 font-medium text-text-dark">
              Datum
            </th>
            <th className="text-right px-4 py-3 font-medium text-text-dark">
              Akcije
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((review) => (
            <tr key={review.id} className="border-b border-accent/20">
              <td className="px-4 py-3 font-medium">{review.author_name}</td>
              <td className="px-4 py-3">
                <StarRating rating={review.rating} />
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    review.is_published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {review.is_published ? "Objavljeno" : "Nacrt"}
                </span>
              </td>
              <td className="px-4 py-3 text-text-dark/70 text-sm">
                {new Date(review.created_at).toLocaleDateString("sr-RS")}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/utisci/${review.id}`}
                  className="text-primary hover:underline text-sm mr-4"
                >
                  Uredi
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(review.id, review.author_name)}
                  disabled={deleting === review.id}
                  className="text-red-600 hover:underline text-sm disabled:opacity-50"
                >
                  {deleting === review.id ? "Brisanje..." : "Obriši"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
