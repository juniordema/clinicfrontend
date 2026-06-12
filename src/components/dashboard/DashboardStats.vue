<template>
  <div class="grid sm:grid-cols-3 gap-4 mb-8">
    <div class="card-hover fluid-panel rounded-lg p-5">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
          <i class="fas fa-calendar-check text-primary-500 text-lg"></i>
        </div>
        <div>
          <div class="font-bold text-2xl text-warm-900">{{ upcomingCount }}</div>
          <div class="text-warm-500 text-xs">{{ $t('dashboard.upcomingAppointments') }}</div>
        </div>
      </div>
    </div>
    <div class="card-hover fluid-panel rounded-lg p-5">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center">
          <i class="fas fa-history text-accent-500 text-lg"></i>
        </div>
        <div>
          <div class="font-bold text-2xl text-warm-900">{{ pastCount }}</div>
          <div class="text-warm-500 text-xs">{{ $t('dashboard.pastAppointments') }}</div>
        </div>
      </div>
    </div>
    <div class="card-hover fluid-panel rounded-lg p-5">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
          <i class="fas fa-user text-green-500 text-lg"></i>
        </div>
        <div>
          <div class="font-bold text-sm text-warm-900">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</div>
          <div class="text-warm-500 text-xs">{{ currentUser?.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useAppointmentStore } from '@/stores/appointmentStore'

const authStore = useAuthStore()
const appointmentStore = useAppointmentStore()

const currentUser = computed(() => authStore.user)
const upcomingCount = computed(() => {
  return appointmentStore.appointments.filter((apt) => {
    const isActive = apt.status === 'pending' || apt.status === 'confirmed'
    return isActive && new Date(`${apt.date}T${apt.time || '00:00'}:00`) > new Date()
  }).length
})
const pastCount = computed(() => {
  return appointmentStore.appointments.filter((apt) => {
    return apt.status === 'completed' || apt.status === 'cancelled'
  }).length
})
</script>
