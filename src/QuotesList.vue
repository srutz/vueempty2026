<script setup lang="ts">
import QuoteDisplay from './QuoteDisplay.vue';
import { defineProps } from 'vue';
import type { QuoteType } from './useQuote';

const { quotes } = defineProps<{ quotes: (QuoteType[]) | null }>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <template v-for="q in quotes" :key="q.id">
      <QuoteDisplay :quote="q" />
    </template>
  </div>
</template>
