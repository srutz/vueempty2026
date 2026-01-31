<template>
  <div class="w-[400px] h-[600px] p-4 rounded-lg shadow-lg bg-white border border-gray-200 flex flex-col gap-2">
    <h2 class="text-lg font-bold">{{ product.title }}</h2>
    <img class="h-1 grow w-full object-cover rounded-md" :src="product.image" :alt="product.title" />
    <div class="self-stretch text-sm text-muted-300 flex justify-between">
      <div>
        Category: {{ product.category }} {{ product.id }}
      </div>
      <div>
        Price: {{ formatPrice(product.price) }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '@/composables/useProduct';

const nf = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2, currency: "EUR", style: "currency" });

function formatPrice(value: number) {
  return nf.format(value);
}

const { product } = defineProps<{
  product: Product
}>()

</script>