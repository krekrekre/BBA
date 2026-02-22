export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/30" />
        <div className="h-4 w-32 bg-bg-light rounded" />
      </div>
    </div>
  );
}
