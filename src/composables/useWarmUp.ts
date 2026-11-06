import { useQueryClient } from '@tanstack/vue-query'
import { quoteQueryOptions } from './useQuote'
import { quotesQueryOptions } from './useQuotes'

export type UseWarmUpOptions = {
  /** number of quote pages to prefetch; defaults to 5 */
  pages?: number
  /** delay in ms between page prefetches; defaults to 200 */
  pageDelay?: number
  /** page size to prefetch; defaults to the useQuotes default */
  pageSize?: number
  /** number of single quotes (ids 1..n) to prefetch; defaults to 30 */
  quotes?: number
  /** delay in ms between quote prefetches; defaults to 100 */
  quoteDelay?: number
}

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

/**
 * Prefetches the data used by useQuotes and useQuote into the query cache,
 * spaced out so the API is not hit all at once. Pages and quotes are warmed
 * as two independent sequences running side by side.
 * Call once (e.g. in App.vue); errors are swallowed by prefetchQuery.
 */
export function useWarmUp(options: UseWarmUpOptions = {}) {
  const client = useQueryClient()
  const {
    pages = 5, pageDelay = 200, pageSize,
    quotes = 30, quoteDelay = 100,
  } = options

  async function warmSequence(count: number, delay: number, prefetch: (n: number) => Promise<void>) {
    for (let n = 1; n <= count; n++) {
      if (n > 1) await sleep(delay)
      await prefetch(n)
    }
  }

  async function warmUp() {
    await Promise.all([
      warmSequence(pages, pageDelay, n =>
        client.prefetchQuery(quotesQueryOptions(n, pageSize))),
      warmSequence(quotes, quoteDelay, n =>
        client.prefetchQuery(quoteQueryOptions(n))),
    ])
  }

  void warmUp()
  return { warmUp }
}
