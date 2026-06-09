<template>
  <div class="min-h-screen bg-warm-100 pt-20 pb-12" style="isolation: isolate">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardHeader />
      
      
      <template v-if="!isDoctor">
        <DashboardStats />
        <NextAppointment />
        <AppointmentHistory />
      </template>

      
      <template v-else>
        <div class="bg-white rounded-2xl shadow-sm p-8 border border-warm-200">
          <h2 class="text-2xl font-bold text-warm-900 mb-6">📋 {{ $t('dashboard.doctorAppointments') }}</h2>
          <p class="text-warm-600 mb-4">{{ $t('dashboard.doctorAppointmentsDescription') }}</p>
          <AppointmentHistory />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import NextAppointment from '@/components/dashboard/NextAppointment.vue'
import AppointmentHistory from '@/components/dashboard/AppointmentHistory.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useAppointmentStore } from '@/stores/appointmentStore'

const router = useRouter()
const authStore = useAuthStore()
const appointmentStore = useAppointmentStore()

const isDoctor = computed(() => authStore.isDoctor)

onMounted(() => {
  authStore.initializeAuth()
  if (!authStore.isAuthenticated) {
    router.push('/')
    return
  }
  if (!authStore.isDoctor) {
    appointmentStore.fetchMyAppointments()
  }
})

watch(() => authStore.isAuthenticated, (isAuth) => {
  if (!isAuth) router.push('/')
})

watch(() => authStore.isDoctor, (doctorMode) => {
  if (!doctorMode && authStore.isAuthenticated) {
    appointmentStore.fetchMyAppointments()
  }
})
</script>
