<script setup lang="ts">
import { useProduct } from "./composables/useProduct";
import "./index.css"; 
import { ref, watch, watchEffect } from "vue";
import ProductView from "./components/ProductView.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const idNum = ref(Number.parseInt(route.params.id?.toString() || "-1", 10))

// Watch for route ID changes
watch(
  () => route.params.id,
  (newId) => {
    idNum.value = Number.parseInt(newId?.toString() || "-1", 10)
    console.log('Route ID changed to:', newId)
  },
)

const { data: product } = useProduct(idNum);

const router = useRouter();
function handleNav(step: number) {
  router.push({
    path: "/product/" + (idNum.value + step)
  })
}






</script>

<template>
  <div class="bg-white w-screen h-screen flex flex-col items-center justify-center">
    <div class="flex gap-4">
      <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
        @click="handleNav(-1)">
        Prev Product
      </button>
      <button class="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
        @click="handleNav(1)">
        Next Product
      </button>
    </div>
    <ProductView v-if="product" :product="product" />
  </div>
</template>

<style scoped></style>
