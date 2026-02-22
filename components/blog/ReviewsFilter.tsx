"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function ReviewsFilter() {
  const searchParams = useSearchParams();
  const currentRating = searchParams.get("rating");

  const options = [
    { value: "", label: "Sve ocene" },
    { value: "5", label: "5 zvezdica" },
    { value: "4", label: "4 zvezdice" },
    { value: "3", label: "3 zvezdice" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Link
          key={opt.value}
          href={opt.value ? `/utisci?rating=${opt.value}` : "/utisci"}
          className={`px-4 py-2 rounded-lg transition-colors ${
            (opt.value && currentRating === opt.value) || (!opt.value && !currentRating)
              ? "bg-primary text-white"
              : "bg-bg-light hover:bg-accent/30"
          }`}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}
