import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { queryOptions, useQuery } from '@tanstack/vue-query'

export type QuoteType = { quote: string, author: string, id: number }

export type UseQuoteOptions = {
  /** id of the quote to load; nothing is fetched while it is undefined */
  id?: MaybeRefOrGetter<number | undefined>
}

/** Plain loader for a single quote, independent of vue. */
export async function fetchQuote(id: number, signal?: AbortSignal): Promise<QuoteType> {
  const response = await fetch(`https://dummyjson.com/quotes/${id}`, { signal })
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)
  return await response.json() as QuoteType
}

/** Shared query definition so useQuote and the warm-up hit the same cache entry. */
export function quoteQueryOptions(id: number | undefined) {
  return queryOptions({
    queryKey: ['quote', id],
    enabled: id !== undefined && Number.isFinite(id),
    queryFn: ({ signal }) => fetchQuote(id!, signal),
  })
}

/**
 * Loads a single quote. `id` may be a plain number, a ref or a getter.
 * Re-fetches when it changes; vue-query aborts/ignores superseded requests and caches results.
 */
export function useQuote(options: UseQuoteOptions = {}) {
  const query = useQuery(computed(() => quoteQueryOptions(toValue(options.id))))

  const quote = computed(() => query.data.value ?? null)
  const loading = query.isFetching
  const error = query.error

  return { quote, loading, error }
}
