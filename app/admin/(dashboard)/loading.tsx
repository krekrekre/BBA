export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/30" />
        <div className="h-3 w-24 bg-bg-light rounded" />
      </div>
    </div>
  );
}
