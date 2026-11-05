import { ref, type Ref } from "vue";
import { type QuoteType } from "./useQuote";

export type QuotesResponseType = {
  total: number, skip: number, limit: number, quote: QuoteType[]
}

const PAGE_SIZE = 3

export async function useQuotes(page: Ref<number>) {
  const skip = PAGE_SIZE * page.value
  const url = `https://dummyjson.com/quotes?`
    + `skip${skip}&limit=${PAGE_SIZE}`
  const loading = ref(false)
  loading.value = true
  let data: QuotesResponseType;
  try {
    const response = await fetch(url);
    data = await response.json() as QuotesResponseType
  } finally {
    loading.value = false;
  }
  return { data, loading }
}
