<template>
  <section id="services" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14 anim-scroll">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('nav.services') }}</span>
        <h2 class="font-display font-bold text-4xl sm:text-5xl text-warm-900 mt-3 mb-4">{{ $t('services.title') }}</h2>
        <p class="text-warm-500 text-lg">{{ $t('services.description') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(svc, i) in localizedServices"
          :key="i"
          class="anim-scroll group card-hover bg-white rounded-lg p-6 border border-warm-200 cursor-pointer shadow-sm hover:border-primary-200"
          :class="'delay-' + (i % 3 + 1)"
          @click="handleBook(svc)"
        >
          <div class="flex items-start justify-between gap-4 mb-5">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105" :class="svc.bgClass">
              <i :class="svc.icon" class="text-lg" :style="{ color: svc.color }"></i>
            </div>
            <div class="w-9 h-9 rounded-lg border border-warm-200 text-warm-400 group-hover:border-primary-200 group-hover:text-primary-600 flex items-center justify-center transition-colors">
              <i class="fas fa-arrow-right text-xs"></i>
            </div>
          </div>
          <h3 class="font-display font-bold text-lg text-warm-900 mb-2">{{ svc.displayName }}</h3>
          <p class="text-warm-500 text-sm leading-relaxed min-h-[4.5rem]">{{ svc.displayDesc }}</p>
          <span class="mt-5 inline-flex items-center text-primary-600 text-sm font-semibold">
            {{ $t('nav.appointment') }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { services } from '@/data/services'

const { locale } = useI18n()
const localizedServices = computed(() =>
  services.map((service) => ({
    ...service,
    displayName: locale.value === 'en' ? service.nameEn || service.name : service.name,
    displayDesc: locale.value === 'en' ? service.descEn || service.desc : service.desc
  }))
)

function handleBook(svc) { 
  window.appModals?.openAppointment()
}
</script>
