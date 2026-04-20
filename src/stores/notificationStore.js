/**
 * Store des notifications Pinia
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../api/client.js'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref([])
  const unreadCount = ref(0)
  const loading = ref(false)
  const error = ref(null)
  const showNotifications = ref(false)

  // Computed
  const unreadNotifications = computed(() => notifications.value.filter(n => !n.isRead))

  // Récupérer les notifications
  async function fetchNotifications(unreadOnly = false, limit = 20) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/notifications', {
        params: { unreadOnly, limit }
      })
      notifications.value = response.data
      updateUnreadCount()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Récupérer le nombre de notifications non lues
  async function fetchUnreadCount() {
    try {
      const response = await apiClient.get('/notifications/unread-count')
      unreadCount.value = response.data.unreadCount
      return response.data.unreadCount
    } catch (err) {
      console.error('Erreur:', err.message)
    }
  }

  // Mettre à jour le count local
  function updateUnreadCount() {
    unreadCount.value = unreadNotifications.value.length
  }

  // Marquer une notification comme lue
  async function markAsRead(notificationId) {
    try {
      await apiClient.patch(`/notifications/${notificationId}/read`)
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification) {
        notification.isRead = true
        notification.readAt = new Date().toISOString()
      }
      updateUnreadCount()
    } catch (err) {
      console.error('Erreur:', err.message)
    }
  }

  // Marquer toutes les notifications comme lues
  async function markAllAsRead() {
    try {
      await apiClient.patch('/notifications/read-all')
      notifications.value.forEach(n => {
        n.isRead = true
        n.readAt = new Date().toISOString()
      })
      updateUnreadCount()
    } catch (err) {
      console.error('Erreur:', err.message)
    }
  }

  // Supprimer une notification
  async function deleteNotification(notificationId) {
    try {
      await apiClient.delete(`/notifications/${notificationId}`)
      notifications.value = notifications.value.filter(n => n.id !== notificationId)
      updateUnreadCount()
    } catch (err) {
      console.error('Erreur:', err.message)
    }
  }

  // Basculer l'affichage du panneau de notifications
  function toggleNotifications() {
    showNotifications.value = !showNotifications.value
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    showNotifications,
    unreadNotifications,
    fetchNotifications,
    fetchUnreadCount,
    updateUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    toggleNotifications
  }
})
