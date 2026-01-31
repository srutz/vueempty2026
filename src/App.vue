<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import { fetchProduct, useProduct } from "./composables/useProduct";
import "./index.css";
import { ref } from "vue";

const client = useQueryClient();
const PREFETCH = true;
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

</script>

<template>
  <div class="bg-white w-screen h-screen flex flex-col items-center justify-center">
    <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded" @click="id++">
      Next Product
    </button>
    <pre class="bg-gray-100 p-2 border border-gray-300 text-sm">{{ query.data.value?.title }}
    </pre>
  </div>
</template>

<style scoped></style>
