<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
          
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('auth.login') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('auth.login') }}</p>
          </div>

          
          <form @submit.prevent="handleLogin" class="space-y-4">
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('auth.email') }}</label>
              <input
                v-model="form.email"
                type="email"
                :placeholder="$t('auth.email')"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('auth.password') }}</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('auth.password')"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {{ error }}
            </div>

            
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {{ loading ? $t('messages.loading') : $t('auth.login') }}
            </button>

            <button
              type="button"
              @click="close"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition"
            >
              {{ $t('buttons.cancel') }}
            </button>
          </form>

          
          <p class="text-center text-gray-600 text-sm mt-4">
            {{ $t('auth.noAccount') }}
            <button
              type="button"
              @click="switchToRegister"
              class="text-teal-600 hover:text-teal-700 font-semibold"
            >
              {{ $t('auth.register') }}
            </button>
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'

defineProps({
  isOpen: Boolean,
  onClose: Function,
  onSwitchToRegister: Function
})

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const form = ref({ email: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const emit = defineEmits(['close', 'switch-to-register'])

async function handleLogin() {
  if (!form.value.email || !form.value.password) {
    error.value = 'Veuillez remplir tous les champs.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await authStore.login(form.value.email, form.value.password)
    toastStore.success('Connexion réussie !')
    emit('close')
    form.value = { email: '', password: '' }
    await router.push('/dashboard')
  } catch (err) {
    const apiError = err.response?.data?.error || err.response?.data?.message || authStore.error
    if (typeof apiError === 'string') {
      error.value = apiError
    } else {
      error.value = 'Email ou mot de passe inexistant, ou compte non trouve.'
    }
  } finally {
    loading.value = false
  }
}

function close() {
  emit('close')
  form.value = { email: '', password: '' }
  error.value = ''
}

function switchToRegister() {
  emit('switch-to-register')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div {
  transform: scale(0.95);
}
</style>
