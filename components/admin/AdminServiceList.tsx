"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Service } from "@/lib/types/database";

interface AdminServiceListProps {
  services: Service[];
}

const CATEGORY_LABELS: Record<string, string> = {
  "tretmani-lica": "Tretmani lica",
  epilacija: "Epilacija",
  depilacija: "Depilacija",
};

export function AdminServiceList({ services }: AdminServiceListProps) {
  const [items, setItems] = useState(services);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  const filtered = filter
    ? items.filter((s) => s.category === filter)
    : items;

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Da li ste sigurni da želite obrisati "${title}"?`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
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
        Nema usluga.{" "}
        <Link href="/admin/usluge/nova" className="text-primary hover:underline">
          Dodaj prvu uslugu
        </Link>
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm text-text-dark/70">Filtriraj:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-accent/50 text-sm"
        >
          <option value="">Sve kategorije</option>
          <option value="tretmani-lica">Tretmani lica</option>
          <option value="epilacija">Epilacija</option>
          <option value="depilacija">Depilacija</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent/30 bg-bg-light">
              <th className="text-left px-4 py-3 font-medium text-text-dark">
                Usluga
              </th>
              <th className="text-left px-4 py-3 font-medium text-text-dark">
                Kategorija
              </th>
              <th className="text-left px-4 py-3 font-medium text-text-dark">
                Status
              </th>
              <th className="text-right px-4 py-3 font-medium text-text-dark">
                Akcije
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((service) => (
              <tr key={service.id} className="border-b border-accent/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {service.image_url ? (
                      <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden">
                        <Image
                          src={service.image_url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 shrink-0 rounded bg-accent/30 flex items-center justify-center text-primary/50 text-xs">
                        –
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/admin/usluge/${service.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {service.title_rs}
                      </Link>
                      {service.price_range && (
                        <span className="block text-xs text-text-dark/60">
                          {service.price_range}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-dark/70 text-sm">
                  {CATEGORY_LABELS[service.category] ?? service.category}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      service.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {service.is_active ? "Aktivna" : "Neaktivna"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/usluge/${service.id}`}
                    className="text-primary hover:underline text-sm mr-4"
                  >
                    Uredi
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(service.id, service.title_rs)
                    }
                    disabled={deleting === service.id}
                    className="text-red-600 hover:underline text-sm disabled:opacity-50"
                  >
                    {deleting === service.id ? "Brisanje..." : "Obriši"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
