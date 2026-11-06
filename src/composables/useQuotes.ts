import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/vue-query";
import { type QuoteType } from "./useQuote";

export type QuotesResponseType = {
  total: number, skip: number, limit: number, quotes: QuoteType[]
}

export type UseQuotesOptions = {
  /** 1-based page number; defaults to 1 */
  page?: MaybeRefOrGetter<number>
  /** items per page; defaults to 10 */
  pageSize?: MaybeRefOrGetter<number>
}

export const DEFAULT_PAGE_SIZE = 10

/** Plain loader for one page of quotes, independent of vue. */
export async function fetchQuotes(page: number, pageSize: number, signal?: AbortSignal): Promise<QuotesResponseType> {
  const url = `https://dummyjson.com/quotes?skip=${pageSize * (page - 1)}&limit=${pageSize}`
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)
  return await response.json() as QuotesResponseType
}

/** Shared query definition so useQuotes and the warm-up hit the same cache entry. */
export function quotesQueryOptions(page = 1, pageSize = DEFAULT_PAGE_SIZE) {
  return queryOptions({
    queryKey: ['quotes', page, pageSize],
    queryFn: ({ signal }) => fetchQuotes(page, pageSize, signal),
  })
}

/**
 * Loads a page of quotes. `page` and `pageSize` may each be a plain number, a ref
 * or a getter. Re-fetches when they change; vue-query aborts/ignores superseded requests.
 */
export function useQuotes(options: UseQuotesOptions = {}) {
  const pageSize = computed(() =>
    Math.max(1, Math.floor(toValue(options.pageSize) ?? DEFAULT_PAGE_SIZE)))
  const page = computed(() =>
    Math.max(1, Math.floor(toValue(options.page) ?? 1) || 1))

  const query = useQuery(computed(() => ({
    ...quotesQueryOptions(page.value, pageSize.value),
    // keep showing the previous page while the next one loads
    placeholderData: keepPreviousData,
  })))

  const data = computed(() => query.data.value ?? null)
  const loading = query.isFetching
  const error = query.error
  const quotes = computed(() => data.value?.quotes ?? [])
  const totalPages = computed(() =>
    data.value ? Math.ceil(data.value.total / pageSize.value) : 0)

  return { data, quotes, totalPages, loading, error }
}
