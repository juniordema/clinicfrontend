<template>
  <section id="services" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 anim-scroll">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('nav.services') }}</span>
        <h2 class="font-display font-bold text-4xl text-warm-900 mt-3 mb-4">{{ $t('services.title') }}</h2>
        <p class="text-warm-500">{{ $t('services.description') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(svc, i) in localizedServices"
          :key="i"
          class="anim-scroll group card-hover bg-warm-50 rounded-2xl p-6 border border-warm-200/50 cursor-pointer"
          :class="'delay-' + (i % 3 + 1)"
          @click="handleBook(svc)"
        >
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" :class="svc.bgClass">
            <i :class="svc.icon" class="text-xl" :style="{ color: svc.color }"></i>
          </div>
          <h3 class="font-display font-bold text-lg text-warm-900 mb-2">{{ svc.displayName }}</h3>
          <p class="text-warm-500 text-sm leading-relaxed mb-4">{{ svc.displayDesc }}</p>
          <span class="text-primary-500 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            {{ $t('nav.appointment') }} <i class="fas fa-arrow-right text-xs"></i>
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
