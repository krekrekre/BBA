export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="animate-pulse">
        <div className="h-10 bg-bg-light rounded w-1/4 mb-8" />
        <div className="h-4 bg-bg-light rounded w-1/2 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-bg-light rounded-xl overflow-hidden">
              <div className="h-48 bg-accent/20" />
              <div className="p-6 space-y-2">
                <div className="h-5 bg-accent/30 rounded w-3/4" />
                <div className="h-4 bg-accent/20 rounded w-full" />
                <div className="h-4 bg-accent/20 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
