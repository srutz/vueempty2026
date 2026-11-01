<script lang="ts">
import { ref } from 'vue';
import CustomHeader from './CustomHeader.vue';

export default {
  components: {
    CustomHeader
  },
  setup() {
    const count = ref(1);
    return { count };
  }
}

</script>

<template>
  <div class="bg-indigo-200 grow flex items-center justify-center flex flex-col gap-2">
    <p>Hello World {{ count }}</p>
    <CustomHeader :bold="true">wefwefwef</CustomHeader>
    <button>Click Me</button>
  </div>
</template>
