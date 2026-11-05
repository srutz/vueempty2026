import { ref, watchEffect, type Ref } from "vue";
import { type QuoteType } from "./useQuote";

export type QuotesResponseType = {
  total: number, skip: number, limit: number, quotes: QuoteType[]
}

const PAGE_SIZE = 3

export function useQuotes(page: Ref<number>) {
  const loading = ref(false)
  const data = ref<QuotesResponseType | null>(null);
  watchEffect(async () => {
    loading.value = true
    try {
      const skip = PAGE_SIZE * page.value
      const url = `https://dummyjson.com/quotes?`
        + `skip=${skip}&limit=${PAGE_SIZE}`
      const response = await fetch(url);
      data.value = await response.json() as QuotesResponseType
    } finally {
      loading.value = false;
    }
  })
  return { data, loading }
}
