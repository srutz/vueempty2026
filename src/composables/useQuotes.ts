import { computed, ref, toValue, watchEffect, type MaybeRefOrGetter } from "vue";
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

const DEFAULT_PAGE_SIZE = 10

/**
 * Loads a page of quotes. `page` and `pageSize` may each be a plain number, a ref
 * or a getter. Re-fetches when they change and aborts any in-flight request.
 */
export function useQuotes(options: UseQuotesOptions = {}) {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const data = ref<QuotesResponseType | null>(null)

  const pageSize = computed(() =>
    Math.max(1, Math.floor(toValue(options.pageSize) ?? DEFAULT_PAGE_SIZE)))

  watchEffect(async (onCleanup) => {
    const p = Math.max(1, Math.floor(toValue(options.page) ?? 1) || 1)
    const size = pageSize.value
    const controller = new AbortController()
    onCleanup(() => controller.abort())

    loading.value = true
    error.value = null
    try {
      const url = `https://dummyjson.com/quotes?skip=${size * (p - 1)}&limit=${size}`
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)
      data.value = await response.json() as QuotesResponseType
    } catch (e) {
      if (controller.signal.aborted) return // superseded by a newer request
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      if (!controller.signal.aborted) loading.value = false
    }
  })

  const quotes = computed(() => data.value?.quotes ?? [])
  const totalPages = computed(() =>
    data.value ? Math.ceil(data.value.total / pageSize.value) : 0)

  return { data, quotes, totalPages, loading, error }
}
