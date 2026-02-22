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
    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
      {options.map((opt) => {
        const isActive =
          (opt.value && currentRating === opt.value) ||
          (!opt.value && !currentRating);
        return (
          <Link
            key={opt.value}
            href={opt.value ? `/utisci?rating=${opt.value}` : "/utisci"}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? "bg-brand text-cream shadow-sm"
                : "bg-bg-light border border-accent/30 text-text-dark hover:bg-accent/30 hover:border-secondary/30"
            }`}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
