<template>
    <div class="flex items-center h-12 gap-2 border-t zinc-600 px-4 py-1 text-white">
        Footer: {{  route.path }}
    </div>
</template>
<script setup lang="ts">
import { isReactive, isRef, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter();

watchEffect(() => {
    console.log("Footer route changed:", route.path);
    if (route.path?.endsWith("/product/4")) {
        router.push("/about")
    }
})

</script>