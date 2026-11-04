<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"

const size = ref({
  width: window.innerWidth, height: window.innerHeight })

onMounted(() => {
  const l = () => {
    size.value = {
      width: window.innerWidth, height: window.innerHeight
    } }
  window.addEventListener("resize", l)
  onUnmounted(() => window.removeEventListener("resize", l))
})

const message = computed(() => {
  return size.value.height < 200 ? "Wenig Platz" : undefined
})
</script>

<template>
  <div class="bg-indigo-200 grow flex items-center
      justify-center
      flex flex-col gap-2">
    <p> {{ size.width }} x {{ size.height }}</p>
    <p> {{ message }}</p>
  </div>
</template>
