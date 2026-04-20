/**
 * Store de gestion de la langue - Pinia
 * Gère la langue actuelle et la persiste en localStorage
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n from '@/i18n'

export const useLanguageStore = defineStore('language', () => {
  // Récupérer la langue sauvegardée ou utiliser le français par défaut
  const currentLanguage = ref(localStorage.getItem('language') || 'fr')
  
  // Initialiser i18n avec la langue actuelle
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
