import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import router from './router'
import Root from './Root.vue'

const app = createApp(Root)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
