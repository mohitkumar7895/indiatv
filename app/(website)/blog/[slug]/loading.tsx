export default function BlogPostLoading() {
  return (
    <div className="container-narrow pt-8 pb-16 sm:pt-12 sm:pb-20 space-y-6">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 animate-pulse rounded bg-line/60" />

      {/* Meta tags skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-6 w-24 animate-pulse rounded-full bg-line/70" />
        <div className="h-4 w-32 animate-pulse rounded bg-line/60" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-full animate-pulse rounded-lg bg-line/80" />
        <div className="h-10 w-4/5 animate-pulse rounded-lg bg-line/80" />
      </div>

      {/* Excerpt skeleton */}
      <div className="h-16 w-full animate-pulse rounded-xl bg-line/40" />

      {/* Featured image skeleton */}
      <div className="aspect-video w-full animate-pulse rounded-2xl bg-line/70" />

      {/* Content blocks skeleton */}
      <div className="space-y-4 pt-6">
        <div className="h-4 w-full animate-pulse rounded bg-line/60" />
        <div className="h-4 w-full animate-pulse rounded bg-line/60" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-line/60" />
        <div className="h-8 w-1/2 animate-pulse rounded-lg bg-line/80 pt-4" />
        <div className="h-4 w-full animate-pulse rounded bg-line/60" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-line/60" />
      </div>
    </div>
  );
}
