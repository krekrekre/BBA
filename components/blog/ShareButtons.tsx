"use client";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex gap-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-lg bg-bg-light hover:bg-accent/30 transition-colors text-sm"
      >
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-lg bg-bg-light hover:bg-accent/30 transition-colors text-sm"
      >
        Facebook
      </a>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        className="px-4 py-2 rounded-lg bg-bg-light hover:bg-accent/30 transition-colors text-sm"
      >
        Kopiraj link
      </button>
    </div>
  );
}
