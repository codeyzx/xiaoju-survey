import { createApp } from 'vue'
import { createPinia } from 'pinia'
import plainText from './directive/plainText'
import safeHtml from './directive/safeHtml'

import App from './App.vue'
import router from './router'

// Import i18n
import { i18n, switchLanguage, getLocale } from '@/common/locales'

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

  // Preload critical images
  const criticalImages = ['/imgs/Logo.webp', '/imgs/avatar.webp']
  criticalImages.forEach((src) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })

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

// Mount app and optimize
app.mount('#app')
optimizeApp()
