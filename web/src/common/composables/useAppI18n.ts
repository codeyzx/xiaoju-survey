import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

/**
 * Custom composable to use i18n with better typing and easier access
 */
export function useAppI18n() {
  const { t, locale, availableLocales } = useI18n()

  // Current locale info
  const currentLocale = computed(() => locale.value)

  // Translation function with better error handling
  const translate = (key: string, values?: Record<string, any>, fallback?: string) => {
    try {
      const translated = values ? t(key, values) : t(key)
      return translated !== key ? translated : fallback || key
    } catch (error) {
      console.warn(`Translation key "${key}" not found`)
      return fallback || key
    }
  }

  // Common translations shortcuts
  const common = {
    save: () => translate('common.save'),
    cancel: () => translate('common.cancel'),
    confirm: () => translate('common.confirm'),
    delete: () => translate('common.delete'),
    edit: () => translate('common.edit'),
    add: () => translate('common.add'),
    create: () => translate('common.create'),
    submit: () => translate('common.submit'),
    loading: () => translate('common.loading'),
    success: () => translate('common.success'),
    error: () => translate('common.error'),
    preview: () => translate('common.preview'),
    publish: () => translate('common.publish'),
    back: () => translate('common.back'),
    next: () => translate('common.next'),
    close: () => translate('common.close')
  }

  // Survey specific translations
  const survey = {
    title: () => translate('editor.surveyTitle'),
    description: () => translate('editor.surveyDesc'),
    addQuestion: () => translate('editor.addQuestion'),
    deleteQuestion: () => translate('editor.deleteQuestion'),
    settings: () => translate('editor.settings')
  }

  // Error messages
  const error = {
    networkError: () => translate('error.networkError'),
    serverError: () => translate('error.serverError'),
    permissionDenied: () => translate('error.permissionDenied'),
    unknown: () => translate('error.unknown'),
    saveFailed: () => translate('error.saveFailed')
  }

  // Success messages
  const success = {
    saved: () => translate('success.saved'),
    deleted: () => translate('success.deleted'),
    created: () => translate('success.created'),
    updated: () => translate('success.updated'),
    published: () => translate('success.published')
  }

  return {
    t: translate,
    locale: currentLocale,
    availableLocales,
    common,
    survey,
    error,
    success
  }
}
