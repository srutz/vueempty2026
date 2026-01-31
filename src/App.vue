<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import { fetchProduct, useProduct } from "./composables/useProduct";
import "./index.css";
import { ref } from "vue";
import ProductView from "./components/ProductView.vue";

const client = useQueryClient();
const PREFETCH = !true;
if (PREFETCH) {
  (async () => {
    for (let i = 1; i <= 10; i++) {
      client.ensureQueryData({
        queryKey: ["product", i],
        staleTime: 1000 * 60 * 5,
        queryFn: () => {
          return fetchProduct(i).then((data) => {
            console.log("Prefetched product", data);
            return data;
          });
        }
      })
      await delay(250);
    }
  })()
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const id = ref(1)
const query = useProduct(id);
const { data: product } = query

</script>

<template>
  <div class="bg-white w-screen h-screen flex flex-col items-center justify-center">
    <div class="flex gap-4">
      <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded" @click="id--">
        Prev Product
      </button>
      <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded" @click="id++">
        Next Product
      </button>
    </div>
    <ProductView v-if="product" :product="product" />
  </div>
</template>

<style scoped></style>
