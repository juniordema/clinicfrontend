import { createI18n } from 'vue-i18n'
import frMessages from './locales/fr.json'
import enMessages from './locales/en.json'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'fr',
  fallbackLocale: 'fr',
  messages: {
    fr: frMessages,
    en: enMessages
  }
})

export default i18n
