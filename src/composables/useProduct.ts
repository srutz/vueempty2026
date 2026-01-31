import { useQuery } from "@tanstack/vue-query";
import { ref, type MaybeRefOrGetter, toValue, type Ref } from "vue";


export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function fetchProduct(id: number) {
  //await delay(5_000);
  const response = await fetch("https://fakestoreapi.com/products/" + encodeURIComponent(id))
  const data = await response.json()
  return data as Product
}


export function useProduct(id: Ref<number>) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(toValue(id)),
    staleTime: 1000 * 60 * 5,
  });
}


export function useProductManual(id: number) {
  const product = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      product.value = await fetchProduct(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }
  load()
  return {
    product,
    loading,
    error,
    reload: load,
  }
}

