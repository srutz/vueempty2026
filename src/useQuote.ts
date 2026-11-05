import { onMounted, ref, watch, type Ref } from 'vue'

export type QuoteType = { quote: string, author: string, id: number }

export function useQuote(id: Ref<number>) {
  const quote = ref<QuoteType | null>(null)

  const doLoad = async () => {
    const response = await fetch("https://dummyjson.com/quotes/"
        + id.value
    )
    quote.value = await response.json() as QuoteType
  }
  onMounted(() => doLoad())
  watch([id], () => {
    doLoad()
  })

  return { quote }
}
