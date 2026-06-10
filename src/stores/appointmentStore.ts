

import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '../api/client'

export const useAppointmentStore = defineStore('appointments', () => {
  const appointments = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchMyAppointments() {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/appointments')
      appointments.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createAppointment(data) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/appointments', data)
      appointments.value.push(response.data.appointment)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la création.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createGuestAppointment(data) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/appointments/guest', data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la réservation.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getAppointment(id) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/appointments/${id}`)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateAppointment(id, data) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.patch(`/appointments/${id}`, data)
      const index = appointments.value.findIndex(a => a.id === id)
      if (index !== -1) {
        appointments.value[index] = response.data.appointment
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la modification.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function cancelAppointment(id) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.patch(`/appointments/${id}/cancel`)
      const index = appointments.value.findIndex(a => a.id === id)
      if (index !== -1) {
        appointments.value[index] = response.data.appointment
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de l\'annulation.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteAppointment(id) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.delete(`/appointments/${id}`)
      appointments.value = appointments.value.filter(a => a.id !== id)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la suppression.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    appointments,
    loading,
    error,
    fetchMyAppointments,
    createAppointment,
    createGuestAppointment,
    getAppointment,
    updateAppointment,
    cancelAppointment,
    deleteAppointment
  }
})
