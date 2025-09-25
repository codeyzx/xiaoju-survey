import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Element Plus locale imports
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const elementLocales = {
  'zh-CN': zhCn,
  'en-US': en,
  'id-ID': en // Use English as fallback for Indonesian
}

export function useElementPlusLocale() {
  const { locale } = useI18n()

  const elementLocale = computed(() => {
    return elementLocales[locale.value as keyof typeof elementLocales] || en
  })

  return {
    elementLocale
  }
}
