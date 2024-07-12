import './assets/base.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from 'vue-query'

import App from './App.vue'

const app = createApp(App)
app.use(VueQueryPlugin);
// app.use(createPinia())
// app.use(router)

app.mount('#app')
