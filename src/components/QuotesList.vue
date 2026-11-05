<script setup lang="ts">
import QuoteDisplay from './QuoteDisplay.vue';
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import type { QuoteType } from '../composables/useQuote.ts';

const { quotes } = defineProps<{ quotes: (QuoteType[]) | null }>()
</script>

<template>
  <div class="grow flex flex-col gap-4 h-1 overflow-y-auto items-center">
    <template v-for="q in quotes" :key="q.id">
      <RouterLink :to="`/quotes/${q.id}`" class="contents">
        <QuoteDisplay :quote="q" class="cursor-pointer hover:shadow-xl transition-shadow" />
      </RouterLink>
    </template>
  </div>
</template>
