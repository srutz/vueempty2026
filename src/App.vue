<script setup lang="ts">
import { ref } from 'vue';
import QuotesList from './QuotesList.vue';
import { useQuotes } from './useQuotes';

const page = ref(1)
const { data } = useQuotes(page);

</script>

<template>
  <div class="bg-indigo-200 grow flex items-center
      flex flex-col gap-2 p-2">
      <button @click="page++">Next</button>
      <QuotesList :quotes="data?.quotes || []" />
  </div>
</template>
