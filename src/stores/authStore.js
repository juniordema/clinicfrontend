/**
 * Store d'authentification Pinia
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../api/client.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isDoctor = computed(() => user.value?.role === 'doctor')
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isPatient = computed(() => user.value?.role === 'patient')

  // Charger l'état depuis localStorage au démarrage
  function initializeAuth() {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  // Inscription
  async function register(data) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/auth/register', data)
      token.value = response.data.token
      user.value = response.data.user
      
      // Sauvegarder dans localStorage
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return response.data
    } catch (err) {
      // Gérer les erreurs du backend
      const errorMessage = err.response?.data?.error?.message || 
                          err.response?.data?.message ||
                          err.response?.data?.error ||
                          err.message ||
                          'Erreur lors de l\'inscription.'
      error.value = typeof errorMessage === 'string' ? errorMessage : 'Erreur lors de l\'inscription.'
      console.error('Register error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Connexion
  async function login(email, password) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      token.value = response.data.token
      user.value = response.data.user
      
      // Sauvegarder dans localStorage
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return response.data
    } catch (err) {
      // Gérer les erreurs du backend
      const errorMessage = err.response?.data?.error?.message || 
                          err.response?.data?.message ||
                          err.response?.data?.error ||
                          err.message ||
                          'Erreur lors de la connexion.'
      error.value = typeof errorMessage === 'string' ? errorMessage : 'Erreur lors de la connexion.'
      console.error('Login error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Déconnexion
  function logout() {
    token.value = null
    user.value = null
    error.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  // Obtenir le profil
  async function getProfile() {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/auth/me')
      user.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération du profil.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mettre à jour le profil
  async function updateProfile(data) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.patch('/auth/me', data)
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(user.value))
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la mise à jour.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Changer le mot de passe
  async function changePassword(currentPassword, newPassword, confirmPassword) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors du changement de mot de passe.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isDoctor,
    isAdmin,
    isPatient,
    initializeAuth,
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword
  }
})
