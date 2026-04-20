import { reactive } from 'vue'

const toasts = reactive([])
let toastId = 0

export function useToast() {
  function addToast(message, type = 'info') {
    const id = ++toastId
    toasts.push({ id, message, type, leaving: false })
    setTimeout(() => {
      const t = toasts.find(t => t.id === id)
      if (t) t.leaving = true
      setTimeout(() => {
        const idx = toasts.findIndex(t => t.id === id)
        if (idx !== -1) toasts.splice(idx, 1)
      }, 400)
    }, 3500)
  }

  return { toasts, addToast }
}
