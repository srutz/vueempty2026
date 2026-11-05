<script setup lang="ts">
import { ref } from 'vue';
import { useQuote } from './useQuote';
import { useDateFormat } from "@vueuse/core"

const qid = ref(1)
const { quote } = useQuote(qid);

//const date = new Date(1900, 2, 3);
const date = ref(new Date(1900, 2, 3))

const formatted = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')

</script>

<template>
  <div class="bg-indigo-200 grow flex items-center
      flex flex-col gap-2 p-2">
    <p>{{ quote?.quote }}</p>
    <div class="text-xs"> {{ quote?.author }}</div>
    <button @click="qid++">Next</button>
    {{ formatted }}
  </div>
</template>
