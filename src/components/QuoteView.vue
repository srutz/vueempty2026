<template>
  <MyDialog :show="true" title="Quote Details" @show-changed="close">
    <p v-if="error">Failed to load quote: {{ error.message }}</p>
    <p v-else-if="!quote">Loading…</p>
    <QuoteDisplay v-else :quote="quote" />
  </MyDialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuote } from '@/composables/useQuote'
import QuoteDisplay from './QuoteDisplay.vue'
import MyDialog from './MyDialog.vue'

const { id } = defineProps<{
  id: number
}>()

const router = useRouter()
const { quote, error } = useQuote({ id: () => id })

function close() {
  // go back if we came from within the app, otherwise to the list
  if (window.history.state?.back) router.back()
  else router.push('/quotes')
}
</script>
