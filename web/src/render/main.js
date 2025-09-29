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

// Performance optimizations
const optimizeApp = () => {
  // Register Service Worker for caching
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }

  // Remove loading screen after DOM is ready
  const removeLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      loadingScreen.style.opacity = '0'
      loadingScreen.style.transition = 'opacity 0.3s ease'
      setTimeout(() => loadingScreen.remove(), 300)
    }
  }

  // Remove loading screen after app is mounted
  setTimeout(removeLoadingScreen, 100)
}

app.mount('#app')
optimizeApp()
