<template>
  <div class="isolate">
    <HeroSection />
    <StatsSection />
    <AboutSection />
    <ServicesSection />
    <NewFeaturesSection />
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
import {
  AboutSection,
  ContactSection,
  CtaSection,
  DoctorsSection,
  HeroSection,
  ImagerySection,
  NewFeaturesSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection
} from '@/components/home'
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
