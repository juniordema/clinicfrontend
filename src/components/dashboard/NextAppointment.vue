<template>
  <div v-if="nextAppointment" class="rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 p-6 mb-8 text-white shadow-xl shadow-primary-900/15">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <div class="text-primary-200 text-xs font-semibold uppercase tracking-wider mb-1">{{ $t('dashboard.nextAppointment') }}</div>
        <h3 class="font-display font-bold text-xl mb-1">{{ nextAppointment.serviceName }}</h3>
        <p class="text-primary-100">Dr. {{ nextAppointment.doctorName }} — {{ formatDate(nextAppointment.date) }} {{ $t('common.at') }} {{ nextAppointment.time }}</p>
      </div>
      <button @click="cancelAppointment(nextAppointment.id)" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shrink-0">
        <i class="fas fa-times"></i> {{ $t('buttons.cancel') }}
      </button>
    </div>
  </div>
  <div v-else class="fluid-panel rounded-lg p-8 mb-8 text-center">
    <i class="fas fa-calendar-alt text-4xl text-warm-300 mb-3"></i>
    <p class="text-warm-500 mb-4">{{ $t('dashboard.noAppointment') }}</p>
    <button @click="openAppointment()" class="btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold">{{ $t('nav.appointment') }}</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppointmentStore } from '@/stores/appointmentStore'

const appointmentStore = useAppointmentStore()
const { locale } = useI18n()

const nextAppointment = computed(() => {
  const upcoming = appointmentStore.appointments.filter((apt) => {
    const isActive = apt.status === 'pending' || apt.status === 'confirmed'
    return isActive && new Date(`${apt.date}T${apt.time || '00:00'}:00`) > new Date()
  })
  return upcoming.length > 0 ? upcoming[0] : null
})

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

async function cancelAppointment(appointmentId) {
  try {
    await appointmentStore.cancelAppointment(appointmentId)
    await appointmentStore.fetchMyAppointments()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

function openAppointment() {
  window.appModals?.openAppointment()
}
</script>
