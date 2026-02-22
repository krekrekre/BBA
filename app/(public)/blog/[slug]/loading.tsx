export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="animate-pulse">
        <div className="h-4 bg-bg-light rounded w-32 mb-8" />
        <div className="h-12 bg-bg-light rounded w-3/4 mb-6" />
        <div className="h-4 bg-bg-light rounded w-48 mb-12" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-bg-light rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
