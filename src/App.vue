<script setup lang="ts">
import { ref } from 'vue'
import MyDialog from '@/components/MyDialog.vue'

const show = ref(false)
</script>

<template>
  <div class="bg-indigo-200 grow flex items-center justify-center flex flex-col gap-2">
    <p>Hello World</p>
    <button @click="show = true">Click Me</button>

    <MyDialog
      :show="show"
      title="Are you sure?"
      description="This action cannot be undone."
      @show-changed="show = $event"
    >
      <template #footer="{ close }">
        <button class="!bg-white !text-gray-950 border border-gray-200 hover:!bg-gray-100" @click="close">
          Cancel
        </button>
        <button class="!bg-gray-900 hover:!bg-gray-800" @click="show = false">Continue</button>
      </template>
    </MyDialog>
  </div>
</template>
