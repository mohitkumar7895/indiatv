type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

const cacheStore = new Map<string, CacheEntry<unknown>>();
const pendingPromises = new Map<string, Promise<unknown>>();

/**
 * In-memory TTL cache with Promise Deduplication (Singleflight).
 * Deduplicates concurrent identical database queries and serves cached data in <1ms.
 */
export async function memoize<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const cached = cacheStore.get(key);
  if (cached && cached.expiresAt > now) {
    return cached.data as T;
  }

  // Deduplicate concurrent in-flight requests for the same key
  const pending = pendingPromises.get(key);
  if (pending) {
    return pending as Promise<T>;
  }

  const promise = fetcher()
    .then((result) => {
      cacheStore.set(key, {
        data: result,
        expiresAt: Date.now() + ttlSeconds * 1000,
      });
      return result;
    })
    .finally(() => {
      pendingPromises.delete(key);
    });

  pendingPromises.set(key, promise);
  return promise;
}

/**
 * Invalidate in-memory cache entries.
 * Call this when an admin modifies data, or to clear everything.
 */
export function invalidateMemo(prefix?: string) {
  if (!prefix) {
    cacheStore.clear();
    pendingPromises.clear();
    return;
  }
  for (const key of cacheStore.keys()) {
    if (key.startsWith(prefix)) {
      cacheStore.delete(key);
    }
  }
}
