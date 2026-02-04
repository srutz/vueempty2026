<template>
    <div>
        <div class="text-4xl">Main</div>
        <div>main main main ...</div>
        <div class="flex flex-col gap-2 p-2">
            <RouterLink to="/product/1">Go to Product 1</RouterLink>
            <RouterLink to="/product/2">Go to Product 2</RouterLink>
            <a href="/product/3">Go to Product 3</a>
            <RouterLink to="/about">Go to About</RouterLink>
        </div>
    </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';



</script>