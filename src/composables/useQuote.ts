import { ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

export type QuoteType = { quote: string, author: string, id: number }

export type UseQuoteOptions = {
  /** id of the quote to load; nothing is fetched while it is undefined */
  id?: MaybeRefOrGetter<number | undefined>
}

/**
 * Loads a single quote. `id` may be a plain number, a ref or a getter.
 * Re-fetches when it changes and aborts any in-flight request.
 */
export function useQuote(options: UseQuoteOptions = {}) {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const quote = ref<QuoteType | null>(null)

  watchEffect(async (onCleanup) => {
    const id = toValue(options.id)
    if (id === undefined || !Number.isFinite(id)) {
      quote.value = null
      return
    }
    const controller = new AbortController()
    onCleanup(() => controller.abort())

    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://dummyjson.com/quotes/${id}`, { signal: controller.signal })
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)
      quote.value = await response.json() as QuoteType
    } catch (e) {
      if (controller.signal.aborted) return // superseded by a newer request
      quote.value = null
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      if (!controller.signal.aborted) loading.value = false
    }
  })

  return { quote, loading, error }
}
