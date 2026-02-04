import About from '@/About.vue'
import App from '@/App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/product/:id", component: App 
    },
    {
      path: "/about", component: About
    },
  ],
})

export default router
