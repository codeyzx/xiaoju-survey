import { createApp } from 'vue'
import App from './App.vue'
import EventBus from './utils/eventbus'
import router from './router'
import { createPinia } from 'pinia'
import 'default-passive-events'

// Import i18n
import { i18n, switchLanguage, getLocale } from '@/common/locales'

const app = createApp(App)
const pinia = createPinia()

// Initialize language
const currentLocale = getLocale()
switchLanguage(currentLocale)

const $bus = new EventBus()
app.provide('$bus', $bus)
// 挂载到this上
app.config.globalProperties.$bus = $bus
app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
