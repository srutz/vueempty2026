<script setup lang="ts">
import Header from './components/Header.vue';
import { FHeader } from './components/FHeader';
import "./index.css";


</script>

<template>
  <div class="bg-yellow-700 w-screen h-screen flex flex-col items-center justify-center p-4">
    <div class="self-stretch h-1 grow bg-red-500">
      <Header>My Vue 3 App</Header>
      <FHeader title="My Header">My Vue 3 App FHeader</FHeader>
    </div>
  </div>
</template>

<style scoped></style>
