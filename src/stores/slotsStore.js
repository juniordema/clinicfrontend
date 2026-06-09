

import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '../api/client.js'

export const useSlotsStore = defineStore('slots', () => {
  const availableSlots = ref([])
  const takenSlots = ref([])
  const weekAvailability = ref({})
  const loading = ref(false)
  const error = ref(null)

  async function fetchAvailableSlots(doctorId, date) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/slots', {
        params: { doctorId, date }
      })
      availableSlots.value = response.data.available
      takenSlots.value = response.data.taken
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchWeekAvailability(doctorId, startDate) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/slots/week', {
        params: { doctorId, startDate }
      })
      weekAvailability.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function checkSlotAvailability(doctorId, date, time) {
    try {
      const response = await apiClient.post('/slots/check', {
        doctorId,
        date,
        time
      })
      return response.data.available
    } catch (err) {
      console.error('Erreur:', err.message)
      return false
    }
  }

  return {
    availableSlots,
    takenSlots,
    weekAvailability,
    loading,
    error,
    fetchAvailableSlots,
    fetchWeekAvailability,
    checkSlotAvailability
  }
})
