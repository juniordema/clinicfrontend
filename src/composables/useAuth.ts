import { ref, reactive } from 'vue'
import { useToast } from './useToast'
import { useApi } from './useApi'

const isLoggedIn = ref(false)
const currentUser = ref(null)
const showLogin = ref(false)
const showRegister = ref(false)
const loginForm = reactive({ email: '', password: '' })
const registerForm = reactive({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
const loginError = ref('')
const registerError = ref('')
const isLoading = ref(false)

export function useAuth() {
  const { addToast } = useToast()
  const api = useApi()

  function openLogin() {
    loginError.value = ''
    loginForm.email = ''
    loginForm.password = ''
    showLogin.value = true
  }

  function openRegister() {
    registerError.value = ''
    Object.assign(registerForm, { firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
    showRegister.value = true
  }

  async function login() {
    loginError.value = ''
    if (!loginForm.email || !loginForm.password) {
      loginError.value = 'Veuillez remplir tous les champs.'
      return
    }
    isLoading.value = true
    try {
      const data = await api.post('/auth/login', { email: loginForm.email, password: loginForm.password })
      localStorage.setItem('angelo_token', data.token)
      localStorage.setItem('angelo_user', JSON.stringify(data.user))
      currentUser.value = data.user
      isLoggedIn.value = true
      showLogin.value = false
      addToast('Connexion réussie', 'success')
    } catch (err) {
      loginError.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  async function register() {
    registerError.value = ''
    const f = registerForm
    if (!f.firstName || !f.lastName || !f.email || !f.password) {
      registerError.value = 'Veuillez remplir tous les champs obligatoires.'
      return
    }
    if (f.password !== f.confirmPassword) {
      registerError.value = 'Les mots de passe ne correspondent pas.'
      return
    }
    isLoading.value = true
    try {
      const data = await api.post('/auth/register', {
        firstName: f.firstName, lastName: f.lastName,
        email: f.email, phone: f.phone,
        password: f.password, confirmPassword: f.confirmPassword
      })
      localStorage.setItem('angelo_token', data.token)
      localStorage.setItem('angelo_user', JSON.stringify(data.user))
      currentUser.value = data.user
      isLoggedIn.value = true
      showRegister.value = false
      addToast('Compte créé avec succès', 'success')
    } catch (err) {
      registerError.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    isLoggedIn.value = false
    currentUser.value = null
    localStorage.removeItem('angelo_token')
    localStorage.removeItem('angelo_user')
    addToast('Déconnexion réussie', 'info')
  }

  function restoreSession() {
    const token = localStorage.getItem('angelo_token')
    const user = localStorage.getItem('angelo_user')
    if (token && user) {
      try {
        currentUser.value = JSON.parse(user)
        isLoggedIn.value = true
      } catch {
        localStorage.removeItem('angelo_token')
        localStorage.removeItem('angelo_user')
      }
    }
  }

  return {
    isLoggedIn, currentUser, showLogin, showRegister, isLoading,
    loginForm, registerForm, loginError, registerError,
    openLogin, openRegister, login, register, logout, restoreSession
  }
}
