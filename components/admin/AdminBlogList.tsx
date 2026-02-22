"use client";

import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/types/database";

interface AdminBlogListProps {
  posts: BlogPost[];
}

export function AdminBlogList({ posts }: AdminBlogListProps) {
  const [items, setItems] = useState(posts);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Da li ste sigurni da želite obrisati "${title}"?`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((p) => p.id !== id));
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
        Nema blog postova.{" "}
        <Link href="/admin/blog/nova" className="text-primary hover:underline">
          Kreiraj prvi post
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
              Naslov
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
          {items.map((post) => (
            <tr key={post.id} className="border-b border-accent/20">
              <td className="px-4 py-3">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-primary hover:underline font-medium"
                >
                  {post.title_rs}
                </Link>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    post.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {post.is_published ? "Objavljeno" : "Nacrt"}
                </span>
              </td>
              <td className="px-4 py-3 text-text-dark/70 text-sm">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("sr-RS")
                  : new Date(post.created_at).toLocaleDateString("sr-RS")}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-primary hover:underline text-sm mr-4"
                >
                  Uredi
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id, post.title_rs)}
                  disabled={deleting === post.id}
                  className="text-red-600 hover:underline text-sm disabled:opacity-50"
                >
                  {deleting === post.id ? "Brisanje..." : "Obriši"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
