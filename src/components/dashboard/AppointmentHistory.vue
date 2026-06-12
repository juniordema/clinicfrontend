<template>
  <div class="fluid-panel overflow-hidden rounded-lg">
    <div class="p-5 border-b border-warm-200">
      <h3 class="font-display font-bold text-lg text-warm-900">
        {{ isDoctor ? $t('dashboard.doctorAppointments') : $t('dashboard.appointmentHistory') }}
      </h3>
    </div>
    <div v-if="displayAppointments.length === 0" class="p-8 text-center text-warm-400 text-sm">
      {{ $t('dashboard.noRecordedAppointment') }}
    </div>
    <div v-else class="divide-y divide-warm-100">
      <div
        v-for="apt in reversedAppointments"
        :key="apt.id"
        class="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-warm-50 transition-colors"
      >
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" :class="statusUi(apt.status).iconBg">
            <i class="fas" :class="statusUi(apt.status).icon"></i>
          </div>
          <div>
            <div class="font-semibold text-warm-800 text-sm">{{ apt.serviceName }}</div>
            <div class="text-warm-400 text-xs">
              <template v-if="isDoctor">
                {{ patientLabel(apt) }} — {{ formatDate(apt.date) }} {{ $t('common.at') }} {{ apt.time }}
              </template>
              <template v-else>
                Dr. {{ apt.doctorName }} — {{ formatDate(apt.date) }} {{ $t('common.at') }} {{ apt.time }}
              </template>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <span class="text-xs font-semibold px-3 py-1 rounded-full" :class="statusUi(apt.status).pill">
            {{ translateStatus(apt.status) }}
          </span>

          <button
            v-if="!isDoctor && canPatientCancel(apt)"
            @click="cancelAppointment(apt.id)"
            class="text-warm-400 hover:text-red-500 transition-colors text-sm"
            :title="$t('buttons.cancel')"
          >
            <i class="fas fa-trash-alt"></i>
          </button>

          <template v-if="isDoctor">
            <button
              v-if="apt.status === 'pending'"
              @click="confirmDoctorAppointment(apt.id)"
              class="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-semibold hover:bg-emerald-200 transition"
            >
              Accepter
            </button>
            <button
              v-if="apt.status === 'pending'"
              @click="rejectDoctorAppointment(apt.id)"
              class="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 transition"
            >
              Refuser
            </button>
            <button
              v-if="apt.status === 'confirmed'"
              @click="completeDoctorAppointment(apt.id)"
              class="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200 transition"
            >
              Terminer
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppointmentStore } from '@/stores/appointmentStore'
import { useAuthStore } from '@/stores/authStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { useToastStore } from '@/stores/toastStore'

const authStore = useAuthStore()
const appointmentStore = useAppointmentStore()
const doctorStore = useDoctorStore()
const toastStore = useToastStore()
const { locale, t } = useI18n()

const doctorAppointments = ref([])
const isDoctor = computed(() => authStore.isDoctor)
const displayAppointments = computed(() => (isDoctor.value ? doctorAppointments.value : appointmentStore.appointments))
const reversedAppointments = computed(() => [...displayAppointments.value].reverse())
let doctorPolling = null

onMounted(async () => {
  if (isDoctor.value) {
    await loadDoctorAppointments()
    startDoctorPolling()
  }
})

watch(isDoctor, async (doctorMode) => {
  if (doctorMode) {
    await loadDoctorAppointments()
    startDoctorPolling()
  } else {
    stopDoctorPolling()
  }
})

onUnmounted(() => {
  stopDoctorPolling()
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

function translateStatus(status) {
  if (status === 'pending') return 'En attente'
  if (status === 'confirmed') return t('appointment.statusUpcoming')
  if (status === 'completed') return t('appointment.statusCompleted')
  if (status === 'cancelled') return t('appointment.statusCancelled')
  return status
}

function statusUi(status) {
  if (status === 'pending') {
    return {
      iconBg: 'bg-amber-50',
      icon: 'fa-hourglass-half text-amber-500',
      pill: 'bg-amber-50 text-amber-700'
    }
  }
  if (status === 'confirmed') {
    return {
      iconBg: 'bg-primary-50',
      icon: 'fa-clock text-primary-500',
      pill: 'bg-primary-50 text-primary-600'
    }
  }
  if (status === 'completed') {
    return {
      iconBg: 'bg-green-50',
      icon: 'fa-check text-green-500',
      pill: 'bg-green-50 text-green-600'
    }
  }
  return {
    iconBg: 'bg-red-50',
    icon: 'fa-times text-red-500',
    pill: 'bg-red-50 text-red-600'
  }
}

function patientLabel(apt) {
  if (apt.firstName || apt.lastName) {
    return `${apt.firstName || ''} ${apt.lastName || ''}`.trim()
  }
  return apt.guestName || 'Patient'
}

function canPatientCancel(apt) {
  return apt.status === 'pending' || apt.status === 'confirmed'
}

async function loadDoctorAppointments() {
  doctorAppointments.value = await doctorStore.getDoctorAppointments()
}

function startDoctorPolling() {
  stopDoctorPolling()
  doctorPolling = setInterval(() => {
    loadDoctorAppointments().catch(() => {})
  }, 15000)
}

function stopDoctorPolling() {
  if (doctorPolling) {
    clearInterval(doctorPolling)
    doctorPolling = null
  }
}

async function cancelAppointment(appointmentId) {
  try {
    await appointmentStore.cancelAppointment(appointmentId)
    toastStore.success(t('appointment.cancelled'))
    await appointmentStore.fetchMyAppointments()
  } catch (error) {
    toastStore.error(appointmentStore.error || t('appointment.cancelError'))
  }
}

async function confirmDoctorAppointment(appointmentId) {
  try {
    await doctorStore.confirmAppointment(appointmentId)
    toastStore.success('Rendez-vous accepté')
    await loadDoctorAppointments()
  } catch (error) {
    toastStore.error(doctorStore.error || 'Erreur lors de l’acceptation')
  }
}

async function rejectDoctorAppointment(appointmentId) {
  try {
    await doctorStore.rejectAppointment(appointmentId)
    toastStore.success('Rendez-vous refusé')
    await loadDoctorAppointments()
  } catch (error) {
    toastStore.error(doctorStore.error || 'Erreur lors du refus')
  }
}

async function completeDoctorAppointment(appointmentId) {
  try {
    await doctorStore.completeAppointment(appointmentId)
    toastStore.success('Rendez-vous terminé')
    await loadDoctorAppointments()
  } catch (error) {
    toastStore.error(doctorStore.error || 'Erreur lors de la mise à jour')
  }
}
</script>
