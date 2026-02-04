<script setup lang="ts">
import { useProduct } from "./composables/useProduct";
import "./index.css"; 
import { ref } from "vue";
import ProductView from "./components/ProductView.vue";

const id = ref(1)
const { data: product } = useProduct(id);

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
