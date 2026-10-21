export default function BlogIndexLoading() {
  return (
    <div className="container-wide py-12">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-32 animate-pulse rounded bg-line/60" />
        <div className="h-10 w-96 max-w-full animate-pulse rounded-lg bg-line/80" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-line/50" />
      </div>

      {/* Grid skeleton */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card-surface overflow-hidden rounded-2xl bg-white border border-line p-0">
            <div className="aspect-video w-full animate-pulse bg-line/60" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-28 animate-pulse rounded bg-line/60" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-line/80" />
              <div className="h-4 w-full animate-pulse rounded bg-line/50" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-line/50" />
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-line/40">
                <div className="h-3 w-16 animate-pulse rounded bg-line/50" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-line/70" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
