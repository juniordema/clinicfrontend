

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n from '@/i18n'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref(localStorage.getItem('language') || 'fr')
  
  i18n.global.locale.value = currentLanguage.value

  function setLanguage(lang) {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
    i18n.global.locale.value = lang
  }

  function toggleLanguage() {
    const newLang = currentLanguage.value === 'fr' ? 'en' : 'fr'
    setLanguage(newLang)
  }

  const isEnglish = computed(() => currentLanguage.value === 'en')
  const isFrench = computed(() => currentLanguage.value === 'fr')

  return {
    currentLanguage,
    setLanguage,
    toggleLanguage,
    isEnglish,
    isFrench
  }
})
