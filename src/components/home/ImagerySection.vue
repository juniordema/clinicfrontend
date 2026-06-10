<template>
  <section id="imagerie" class="py-20 bg-gradient-to-b from-white to-warm-50 border-y border-warm-200/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('nav.imaging') }}</span>
        <h2 class="font-display font-bold text-4xl sm:text-5xl text-warm-900 mt-3 mb-4">
          {{ $t('imaging.title') }}
        </h2>
        <p class="text-lg text-warm-600 max-w-3xl mx-auto">
          {{ $t('imaging.description') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <ImageryServiceCard
          v-for="service in localizedImageryServices"
          :key="service.id"
          :service="service"
          :selected="selectedService?.id === service.id"
          @select="selectService"
        />
      </div>

      <ImageryServiceDetails
        v-if="selectedService"
        :service="selectedService"
        :equipment-label="$t('imaging.equipment')"
        :benefits-label="$t('imaging.benefits')"
        :request-label="$t('imaging.request')"
        @book="openAppointment"
      />

      <ImageryStatsGrid class="mt-16" :stats="imageryStats" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { imageryServices } from '@/data/imageryServices'
import ImageryServiceCard from './imagery/ImageryServiceCard.vue'
import ImageryServiceDetails from './imagery/ImageryServiceDetails.vue'
import ImageryStatsGrid from './imagery/ImageryStatsGrid.vue'

const { locale, t } = useI18n()
const localizedImageryServices = computed(() =>
  imageryServices.map((service) => ({
    ...service,
    displayName: locale.value === 'en' ? service.nameEn || service.name : service.name,
    displayDescription: locale.value === 'en' ? service.descriptionEn || service.description : service.description,
    displayEquipment: locale.value === 'en' ? service.equipmentEn || service.equipment : service.equipment,
    displayBenefits: locale.value === 'en' ? service.benefitsEn || service.benefits : service.benefits,
    displayRoomName: locale.value === 'en' ? service.roomNameEn || service.roomName : service.roomName,
    displayRoomDescription: locale.value === 'en' ? service.roomDescriptionEn || service.roomDescription : service.roomDescription,
    displayImageAlt: locale.value === 'en' ? service.imageAltEn || service.imageAlt : service.imageAlt
  }))
)
const selectedService = ref(localizedImageryServices.value[0])
const imageryStats = computed(() => [
  { value: `${localizedImageryServices.value.length}+`, label: t('imaging.stats.services') },
  { value: '50+', label: t('imaging.stats.exams') },
  { value: locale.value === 'en' ? '15 years' : '15 ans', label: t('imaging.stats.experience') },
  { value: '100%', label: t('imaging.stats.digital') }
])

watch(localizedImageryServices, (services) => {
  if (!selectedService.value) {
    selectedService.value = services[0]
    return
  }

  selectedService.value = services.find((service) => service.id === selectedService.value.id) || services[0]
}, { immediate: true })

function selectService(service) {
  selectedService.value = service
}

function openAppointment() {
  window.appModals?.openAppointment()
}
</script>

<style scoped>
section {
  scroll-behavior: smooth;
}
</style>
