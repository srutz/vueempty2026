import { createRouter, createWebHistory } from 'vue-router'

import MainView from '../components/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: MainView,
      children: [
        {
          path: '/',
          component: () => import('../components/HomeView.vue')
        },
        {
          path: '/quotes/page/:page(\\d+)?',
          alias: '/quotes',
          props: route => ({ page: Number(route.params.page) || 1 }),
          component: () => import('../components/QuotesView.vue')
        },
        {
          path: '/quotes/:id(\\d+)',
          component: () => import('../components/QuoteView.vue'),
          props: route => ({ id: Number(route.params.id) })
        }
      ],
    }
  ]
})

export default router
