<template>
  <div  isolation="isolate">  
  <HeroSection />
  <StatsSection />
  <AboutSection />
  <ServicesSection />
  <DoctorsSection />
  <ImagerySection />
  <TestimonialsSection />
  <CtaSection />
  <ContactSection />
  <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import DoctorsSection from '@/components/home/DoctorsSection.vue'
import ImagerySection from '@/components/home/ImagerySection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import CtaSection from '@/components/home/CtaSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useAuthStore } from '@/stores/authStore'
import { useAppointmentStore } from '@/stores/appointmentStore'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const authStore = useAuthStore()
const appointmentStore = useAppointmentStore()

useScrollAnimation()

onMounted(() => {
  authStore.initializeAuth()
  if (authStore.isAuthenticated) {
    appointmentStore.fetchMyAppointments()
  }
})
</script>
