import App from '@/App.vue'
import Main from '@/Main.vue'
import About from '@/About.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/", component: Main
    },
    {
      path: "/product/:id", component: App 
    },
    {
      path: "/about", component: () => import("@/About.vue")
    },
  ],
})

export default router
