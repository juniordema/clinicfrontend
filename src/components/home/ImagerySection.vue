<template>
  <section id="imagerie" class="py-20 bg-gradient-to-b from-white to-warm-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="font-display font-bold text-4xl sm:text-5xl text-warm-900 mb-4">
          🏥 {{ $t('imaging.title') }}
        </h2>
        <p class="text-xl text-warm-600 max-w-3xl mx-auto">
          {{ $t('imaging.description') }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <button
          v-for="service in localizedImageryServices"
          :key="service.id"
          @click="selectedService = service"
          class="group p-6 rounded-2xl border-2 border-warm-200 hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer bg-white"
          :class="{ 'border-teal-500 bg-teal-50': selectedService?.id === service.id }"
        >
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-100 mb-4 group-hover:bg-teal-200 transition">
            <i :class="service.icon" class="text-2xl text-teal-600"></i>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ service.displayName }}</h3>
          <p class="text-sm text-gray-600">{{ service.displayDescription }}</p>
        </button>
      </div>

      <!-- Service Detail -->
      <div v-if="selectedService" class="bg-white rounded-2xl shadow-lg p-8 border-2 border-teal-200">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Left: Icon & Title -->
          <div class="flex flex-col items-center md:items-start justify-center">
            <div class="flex items-center justify-center w-24 h-24 rounded-3xl bg-teal-100 mb-6">
              <i :class="selectedService.icon" class="text-5xl text-teal-600"></i>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedService.displayName }}</h3>
            <p class="text-gray-600 text-lg mb-6">{{ selectedService.displayDescription }}</p>
            <div class="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 w-full">
              <p class="text-sm font-semibold text-blue-900 mb-1">{{ $t('imaging.equipment') }}:</p>
              <p class="text-blue-700">{{ selectedService.displayEquipment }}</p>
            </div>
          </div>

          <!-- Right: Benefits -->
          <div>
            <h4 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('imaging.benefits') }}</h4>
            <div class="space-y-4">
              <div v-for="(benefit, index) in selectedService.displayBenefits" :key="index" class="flex items-start gap-4">
                <div class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 shrink-0 mt-1">
                  <i class="fas fa-check text-emerald-600 text-sm"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ benefit }}</p>
                </div>
              </div>
            </div>

            <!-- Call to action -->
            <button
              @click="openAppointment"
              class="w-full mt-8 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition"
            >
              <i class="fas fa-calendar-check mr-2"></i>
              {{ $t('imaging.request') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid md:grid-cols-4 gap-6 mt-16">
        <div class="bg-white rounded-2xl p-6 border-2 border-warm-200 text-center">
          <p class="text-4xl font-bold text-teal-600 mb-2">8+</p>
          <p class="text-gray-700 font-semibold">{{ $t('imaging.stats.services') }}</p>
        </div>
        <div class="bg-white rounded-2xl p-6 border-2 border-warm-200 text-center">
          <p class="text-4xl font-bold text-teal-600 mb-2">50+</p>
          <p class="text-gray-700 font-semibold">{{ $t('imaging.stats.exams') }}</p>
        </div>
        <div class="bg-white rounded-2xl p-6 border-2 border-warm-200 text-center">
          <p class="text-4xl font-bold text-teal-600 mb-2">15 ans</p>
          <p class="text-gray-700 font-semibold">{{ $t('imaging.stats.experience') }}</p>
        </div>
        <div class="bg-white rounded-2xl p-6 border-2 border-warm-200 text-center">
          <p class="text-4xl font-bold text-teal-600 mb-2">100%</p>
          <p class="text-gray-700 font-semibold">{{ $t('imaging.stats.digital') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { imageryServices } from '@/data/imageryServices'

const { locale } = useI18n()
const localizedImageryServices = computed(() =>
  imageryServices.map((service) => ({
    ...service,
    displayName: locale.value === 'en' ? service.nameEn || service.name : service.name,
    displayDescription: locale.value === 'en' ? service.descriptionEn || service.description : service.description,
    displayEquipment: locale.value === 'en' ? service.equipmentEn || service.equipment : service.equipment,
    displayBenefits: locale.value === 'en' ? service.benefitsEn || service.benefits : service.benefits
  }))
)
const selectedService = ref(localizedImageryServices.value[0])

watch(localizedImageryServices, (services) => {
  if (!selectedService.value) {
    selectedService.value = services[0]
    return
  }

  selectedService.value = services.find((service) => service.id === selectedService.value.id) || services[0]
}, { immediate: true })

function openAppointment() {
  window.appModals?.openAppointment()
}
</script>

<style scoped>
section {
  scroll-behavior: smooth;
}
</style>
