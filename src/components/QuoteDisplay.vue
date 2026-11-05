<template>
  <div
    class="w-[300px] sm:w-96 md:w-[32rem] max-w-full flex flex-col px-4 pt-4 pb-2 gap-2 shadow-lg rounded-lg bg-white border border-gray-400">
    <div>{{ quote.quote }}</div>
    <div class="text-xs self-end text-gray-500">{{ quote.author }}</div>
  </div>
</template>
<script setup lang="ts">
import type { QuoteType } from '../composables/useQuote';

const { quote } = defineProps<{
  quote: QuoteType
}>();

</script>
