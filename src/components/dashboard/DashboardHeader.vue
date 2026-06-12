<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 anim-scroll visible">
    <div>
      <h1 class="font-display font-bold text-3xl sm:text-4xl text-warm-900">{{ $t('dashboard.greeting', { name: currentUser?.firstName || '' }) }}</h1>
      <p class="text-warm-500 mt-1">{{ isDoctor ? $t('dashboard.doctorSpace') : $t('dashboard.patientSpace') }}</p>
    </div>
    <div class="flex flex-wrap gap-3">
      
      <button v-if="!isDoctor" @click="openAppointment()" class="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2">
        <i class="fas fa-plus"></i> {{ $t('dashboard.newAppointment') }}
      </button>
      <router-link
        to="/"
        class="dashboard-link px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
        :class="{ 'dashboard-link-active': isHomeActive }"
        @click="activateHome"
      >
        <i class="fas fa-home"></i> {{ $t('nav.home') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)
const isDoctor = computed(() => authStore.isDoctor)
const route = useRoute()
const selectedAction = ref('home')
const isHomeActive = computed(() => selectedAction.value === 'home')

onMounted(() => {
  syncActionFromRoute()
})

watch(
  () => route.path,
  () => {
    syncActionFromRoute()
  }
)

function syncActionFromRoute() {
  selectedAction.value = route.path === '/' ? 'home' : ''
}

function activateHome() {
  selectedAction.value = 'home'
}

function openAppointment() {
  window.appModals?.openAppointment()
}
</script>

<style scoped>
.dashboard-link {
  border: 1px solid #D8D3CA;
  color: #4A473F;
  transition: background-color 0.24s var(--ease-fluid), color 0.24s var(--ease-fluid), transform 0.24s var(--ease-fluid), box-shadow 0.24s var(--ease-fluid);
}

.dashboard-link:hover {
  background: #F7F5F0;
  color: #0A6B5C;
  transform: translateY(-1px);
}

.dashboard-link-active {
  background: #E8F5F1;
  border-color: rgba(10, 107, 92, 0.12);
  color: #0A6B5C;
  box-shadow: inset 0 0 0 1px rgba(10, 107, 92, 0.08);
}
</style>
