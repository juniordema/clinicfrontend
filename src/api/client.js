/**
 * API Client - Instance Axios configurée
 */

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour ajouter le token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || ''
    const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register')
    const hasStoredToken = !!localStorage.getItem('auth_token')

    // Si erreur 401 sur une session existante, nettoyer puis rediriger
    if (error.response?.status === 401 && hasStoredToken && !isAuthRequest) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      // Rediriger vers la page d'accueil (la route / existe)
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default apiClient
