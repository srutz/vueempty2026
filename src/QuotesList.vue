<script setup lang="ts">
import QuoteDisplay from './QuoteDisplay.vue';
import { defineProps } from 'vue';
import type { QuoteType } from './useQuote';

const { quotes } = defineProps<{ quotes: QuoteType [] }>()

</script>

<template>
  <div class="flex flex-col gap-4">
    <QuoteDisplay v-for="q in quotes" :quote="q" :key="q.id"/>
  </div>
</template>
