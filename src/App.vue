<template>
  <div class="min-h-screen flex flex-col bg-[linear-gradient(180deg,#fbfaf7_0%,#f7f5f0_24%,#f9f8f4_100%)] text-warm-900">
    
    <AppNavbar />

    
    <main class="flex-1 relative">
      <router-view />
    </main>

    
    <ChatAssistant />

    
    <LoginModal
      :isOpen="showLoginModal"
      @close="showLoginModal = false"
      @switch-to-register="switchModals('register')"
    />
    <RegisterModal
      :isOpen="showRegisterModal"
      @close="showRegisterModal = false"
      @switch-to-login="switchModals('login')"
    />
    <AppointmentModal :isOpen="showAppointmentModal" @close="showAppointmentModal = false" />

    
    <ToastContainer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import LoginModal from '@/components/auth/LoginModal.vue'
import RegisterModal from '@/components/auth/RegisterModal.vue'
import AppointmentModal from '@/components/appointment/AppointmentModal.vue'
import ChatAssistant from '@/components/chat/ChatAssistant.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'

const authStore = useAuthStore()

const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showAppointmentModal = ref(false)

onMounted(() => {
  authStore.initializeAuth()
})

function switchModals(to) {
  if (to === 'login') {
    showRegisterModal.value = false
    showLoginModal.value = true
  } else if (to === 'register') {
    showLoginModal.value = false
    showRegisterModal.value = true
  }
}

window.appModals = {
  openLogin: () => (showLoginModal.value = true),
  closeLogin: () => (showLoginModal.value = false),
  openRegister: () => (showRegisterModal.value = true),
  closeRegister: () => (showRegisterModal.value = false),
  openAppointment: () => (showAppointmentModal.value = true),
  closeAppointment: () => (showAppointmentModal.value = false),
}
</script>

<style scoped>
main {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
