<template>
  <div class="flex flex-col p-2 gap-2 shadow-xl rounded-lg bg-gray-200">
    <div>{{ quote.quote }}</div>
    <div class="text-xs self-end">{{ quote.author }}</div>
  </div>
</template>
<script setup lang="ts">
import type { QuoteType } from './useQuote';

const { quote } = defineProps<{
  quote: QuoteType
}>();

</script>
