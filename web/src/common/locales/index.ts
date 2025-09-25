import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'
import idID from './id-ID'

// 支持的语言列表
export const supportedLocales = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'id-ID', name: 'Bahasa Indonesia', flag: '🇮🇩' }
]

// 获取浏览器语言
function getBrowserLocale(): string {
  const navigatorLocale =
    navigator.languages !== undefined ? navigator.languages[0] : navigator.language

  if (!navigatorLocale) {
    return 'zh-CN'
  }

  // 规范化语言代码
  const trimmedLocale = navigatorLocale.trim().split(/-|_/)[0]

  // 检查是否支持该语言
  const supportedLocaleCodes = supportedLocales.map((locale) => locale.code)

  // 精确匹配
  if (supportedLocaleCodes.includes(navigatorLocale)) {
    return navigatorLocale
  }

  // 语言代码匹配（例如 zh 匹配 zh-CN）
  const matchedLocale = supportedLocales.find((locale) => locale.code.startsWith(trimmedLocale))

  if (matchedLocale) {
    return matchedLocale.code
  }

  return 'zh-CN' // 默认语言
}

// 从本地存储或浏览器获取语言
export function getLocale(): string {
  const storedLocale = localStorage.getItem('locale')

  if (storedLocale && supportedLocales.some((locale) => locale.code === storedLocale)) {
    return storedLocale
  }

  return getBrowserLocale()
}

// 设置语言到本地存储
export function setLocale(locale: string): void {
  localStorage.setItem('locale', locale)
}

// 创建 i18n 实例
export const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'id-ID': idID
  }
})

// 切换语言的辅助函数
export function switchLanguage(locale: string): void {
  if (supportedLocales.some((l) => l.code === locale)) {
    i18n.global.locale.value = locale as any
    setLocale(locale)

    // 更新 HTML lang 属性
    document.documentElement.setAttribute('lang', locale)

    // 更新 moment.js 语言设置
    import('moment').then(async (moment) => {
      switch (locale) {
        case 'zh-CN':
          moment.default.locale('zh-cn')
          break
        case 'en-US':
          moment.default.locale('en')
          break
        case 'id-ID':
          // Use English as fallback for Indonesian since moment doesn't have id locale by default
          moment.default.locale('en')
          break
        default:
          moment.default.locale('en')
      }
    })

    // 更新 Element Plus 语言
    updateElementPlusLocale(locale)
  }
}

// 更新 Element Plus 语言设置
function updateElementPlusLocale(locale: string): void {
  // 这个函数会在组件中被调用来更新 Element Plus 的语言设置
  const event = new CustomEvent('locale-change', {
    detail: { locale }
  })
  window.dispatchEvent(event)
}

export default i18n
