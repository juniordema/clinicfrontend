<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('auth.register') }}</h2>
            <p class="text-gray-600 text-sm">{{ $t('auth.title') }}</p>
          </div>

          <!-- Formulaire -->
          <form @submit.prevent="handleRegister" class="space-y-4">
            <!-- Prénom -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('auth.firstName') }}</label>
              <input
                v-model="form.firstName"
                type="text"
                :placeholder="$t('auth.firstName')"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <!-- Nom -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('auth.lastName') }}</label>
              <input
                v-model="form.lastName"
                type="text"
                :placeholder="$t('auth.lastName')"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <!-- Email -->
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

            <!-- Téléphone -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('auth.phone') }} ({{ $t('validation.fieldRequired').toLowerCase() }})</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+237 6 99 88 77 66"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <!-- Mot de passe -->
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

            <!-- Confirmation mot de passe -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('auth.confirmPassword') }}</label>
              <input
                v-model="form.confirmPassword"
                type="password"
                :placeholder="$t('auth.password')"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <!-- Message d'erreur -->
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {{ error }}
            </div>

            <!-- Boutons -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {{ loading ? $t('messages.loading') : $t('auth.register') }}
            </button>

            <button
              type="button"
              @click="close"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition"
            >
              {{ $t('buttons.cancel') }}
            </button>
          </form>

          <!-- Lien connexion -->
          <p class="text-center text-gray-600 text-sm mt-4">
            {{ $t('auth.haveAccount') }}
            <button
              type="button"
              @click="switchToLogin"
              class="text-teal-600 hover:text-teal-700 font-semibold"
            >
              {{ $t('auth.login') }}
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
import { isValidEmail, isValidPhone, getEmailError, getPhoneError } from '@/utils/validation'

defineProps({
  isOpen: Boolean,
  onClose: Function,
  onSwitchToLogin: Function
})

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const emit = defineEmits(['close', 'switch-to-login'])

async function handleRegister() {
  // Réinitialiser l'erreur
  error.value = ''

  // Validation: Prénom
  if (!form.value.firstName?.trim()) {
    error.value = 'Prénom requis'
    return
  }
  if (form.value.firstName.length < 2 || form.value.firstName.length > 50) {
    error.value = 'Le prénom doit faire entre 2 et 50 caractères'
    return
  }

  // Validation: Nom
  if (!form.value.lastName?.trim()) {
    error.value = 'Nom requis'
    return
  }
  if (form.value.lastName.length < 2 || form.value.lastName.length > 50) {
    error.value = 'Le nom doit faire entre 2 et 50 caractères'
    return
  }

  // Validation: Email strict
  const emailError = getEmailError(form.value.email)
  if (emailError) {
    error.value = emailError
    return
  }

  if (!isValidEmail(form.value.email)) {
    error.value = 'Format d\'email invalide (ex: user@example.com)'
    return
  }

  // Validation: Téléphone (optionnel, mais si fourni, validation stricte)
  if (form.value.phone?.trim()) {
    const phoneError = getPhoneError(form.value.phone)
    if (phoneError) {
      error.value = phoneError
      return
    }

    if (!isValidPhone(form.value.phone)) {
      error.value = 'Format de téléphone invalide'
      return
    }
  }

  // Validation: Mot de passe
  if (!form.value.password) {
    error.value = 'Mot de passe requis'
    return
  }

  if (form.value.password.length < 6) {
    error.value = 'Le mot de passe doit contenir au moins 6 caractères'
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  loading.value = true

  try {
    await authStore.register({
      firstName: form.value.firstName.trim(),
      lastName: form.value.lastName.trim(),
      email: form.value.email.trim(),
      phone: form.value.phone?.trim() || '',
      password: form.value.password,
      confirmPassword: form.value.confirmPassword
    })
    toastStore.success('Inscription réussie ! Vous êtes connecté.')
    emit('close')
    // Réinitialiser le formulaire
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
    // Rediriger vers le dashboard
    await router.push('/dashboard')
  } catch (err) {
    console.error('Erreur inscription:', err)
    error.value = authStore.error || 'Erreur lors de l\'inscription.'
  } finally {
    loading.value = false
  }
}

function close() {
  emit('close')
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }
  error.value = ''
}

function switchToLogin() {
  emit('switch-to-login')
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
