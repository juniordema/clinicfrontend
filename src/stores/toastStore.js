

import { defineStore } from 'pinia'
import { ref } from 'vue'

let toastIdCounter = 0

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  function addToast(message, type = 'info', duration = 3000) {
    const id = ++toastIdCounter
    const toast = { id, message, type }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }

    return id
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function removeAllToasts() {
    toasts.value = []
  }

  function success(message, duration = 3000) {
    return addToast(message, 'success', duration)
  }

  function error(message, duration = 5000) {
    return addToast(message, 'error', duration)
  }

  function warning(message, duration = 4000) {
    return addToast(message, 'warning', duration)
  }

  function info(message, duration = 3000) {
    return addToast(message, 'info', duration)
  }

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info
  }
})
