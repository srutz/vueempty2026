<script setup lang="ts">
import { ref } from 'vue';
import { useQuote } from './useQuote';

const qid = ref(1)
const { quote } = useQuote(qid);

</script>

<template>
  <div class="bg-indigo-200 grow flex items-center
      flex flex-col gap-2 p-2">
    <p>{{ quote?.quote }}</p>
    <div class="text-xs"> {{ quote?.author }}</div>
    <button @click="qid++">Next</button>

  </div>
</template>
