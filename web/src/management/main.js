import { createApp } from 'vue'
import { createPinia } from 'pinia'
import plainText from './directive/plainText'
import safeHtml from './directive/safeHtml'

import App from './App.vue'
import router from './router'

// Import i18n
import { i18n, switchLanguage, getLocale } from '@/common/locales'

// Initialize language
const currentLocale = getLocale()
switchLanguage(currentLocale)

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

app.use(plainText)
app.use(safeHtml)

app.mount('#app')
