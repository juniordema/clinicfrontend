

import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '../api/client.js'

export const useDoctorStore = defineStore('doctors', () => {
  const doctors = ref([])
  const currentDoctor = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchDoctors() {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/doctors')
      doctors.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getDoctorById(id) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/doctors/${id}`)
      currentDoctor.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateDoctorProfile(data) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/doctors/profile', data)
      currentDoctor.value = response.data.doctor
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la mise à jour.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getDashboard() {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/doctors/dashboard')
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getDoctorAppointments(filters = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/doctors/appointments', { params: filters })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la récupération.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function confirmAppointment(appointmentId) {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.patch(`/doctors/appointments/${appointmentId}/confirm`)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la confirmation.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function rejectAppointment(appointmentId, doctorNotes = '') {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.patch(`/doctors/appointments/${appointmentId}/reject`, {
        doctorNotes
      })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors du refus.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function completeAppointment(appointmentId, doctorNotes = '') {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.patch(`/doctors/appointments/${appointmentId}/complete`, {
        doctorNotes
      })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de l\'action.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    doctors,
    currentDoctor,
    loading,
    error,
    fetchDoctors,
    getDoctorById,
    updateDoctorProfile,
    getDashboard,
    getDoctorAppointments,
    confirmAppointment,
    rejectAppointment,
    completeAppointment
  }
})
