<template>
    <div class="w-screen h-screen bg-zinc-800 flex flex-col">
        <Menu></Menu>
        <div class="h-1 grow bg-white flex flex-col py-2 overflow-x-hidden overflow-y-auto">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import Footer from './Footer.vue';
import Menu from './Menu.vue';
import { RouterView } from "vue-router"

</script>
