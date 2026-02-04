import App from '@/App.vue'
import Frame from '@/Frame.vue'
import NotFound from '@/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/", component: Frame,
      children: [
        {
          path: "/product/:id", component: App,
        },
        {
          path: "/about", component: () => import("@/About.vue")
        },
        {
          path: '/:pathMatch(.*)*', component: NotFound
        }
      ]
    },
  ],
})

export default router
