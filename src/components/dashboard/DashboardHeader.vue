<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div>
      <h1 class="font-display font-bold text-3xl text-warm-900">{{ $t('dashboard.greeting', { name: currentUser?.firstName || '' }) }}</h1>
      <p class="text-warm-500 mt-1">{{ isDoctor ? $t('dashboard.doctorSpace') : $t('dashboard.patientSpace') }}</p>
    </div>
    <div class="flex gap-3">
      <!-- Bouton "Nouveau RDV" - visible SEULEMENT pour les patients -->
      <button v-if="!isDoctor" @click="openAppointment()" class="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
        <i class="fas fa-plus"></i> {{ $t('dashboard.newAppointment') }}
      </button>
      <router-link to="/" class="btn-outline px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
        <i class="fas fa-home"></i> {{ $t('nav.home') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)
const isDoctor = computed(() => authStore.isDoctor)

function openAppointment() {
  window.appModals?.openAppointment()
}
</script>
