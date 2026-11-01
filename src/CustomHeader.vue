<template>
  <header class="bg-indigo-500 text-white p-4">
    <h1 class="text-xl" :class="{ 'font-bold': bold }">
      <slot></slot>
    </h1>
  </header>
</template>

<script lang="ts" setup>

defineProps<{
  bold: boolean
}>();

</script>
