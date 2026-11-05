<script setup lang="ts">
import { useQuotes } from '@/composables/useQuotes';
import { useRouter } from 'vue-router';
import QuotesList from './QuotesList.vue';

const { page } = defineProps<{
  page: number
}>()

const router = useRouter()
const { quotes, loading, error, totalPages } = useQuotes({ page: () => page });

/** Navigate relative to the current page,. */
function changePage(delta: number) {
  const max = totalPages.value || page
  const target = Math.min(Math.max(page + delta, 1), max)
  if (target === page) return
  router.push(target === 1 ? '/quotes' : `/quotes/page/${target}`)
}

</script>

<template>
  <div class="h-1 overflow-y-auto flex flex-col grow items-stretch">
    <h1>Quotes</h1>
    <p v-if="error">Failed to load quotes: {{ error.message }}</p>
    <p v-else-if="loading && !quotes.length">Loading…</p>
    <QuotesList v-else :quotes="quotes" />
    <div class="flex justify-center mt-4 gap-4">
      <button :disabled="page <= 1" @click="changePage(-1)">Prev Page</button>
      <button :disabled="totalPages > 0 && page >= totalPages" @click="changePage(1)">Next Page</button>
    </div>
  </div>
</template>
