<script setup lang="ts">
import MenuBar from './MenuBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-screen h-screen bg-mist-100 grow flex items-stretch flex-col gap-2">
    <MenuBar></MenuBar>
    <div class="flex flex-col grow items-stretch p-2 h-1">
      <RouterView></RouterView>
    </div>
  </div>
</template>
