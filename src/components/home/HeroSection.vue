<template>
  <section class="relative min-h-[76svh] overflow-hidden bg-warm-900">
    <img
      :src="exterieurImage"
      alt="Extérieur de la Clinique Angelo"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-warm-900/95 via-primary-900/80 to-primary-700/35"></div>
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-warm-100/50 to-transparent"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3 sm:px-4 py-2 mb-5" style="animation: slide-up 0.6s ease both">
          <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
          <span class="text-primary-50 text-xs sm:text-sm font-semibold">{{ $t('hero.badge') }}</span>
        </div>
        <h1 class="hero-title font-display font-black text-white leading-[1.05] mb-5 text-4xl sm:text-5xl lg:text-6xl" style="animation: slide-up 0.8s ease 0.1s both">
          {{ $t('hero.title') }}<br>
          <span class="text-accent-300">{{ $t('hero.titleAccent') }}</span>
        </h1>
        <p class="text-primary-50/90 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl" style="animation: slide-up 0.8s ease 0.2s both">
          {{ $t('hero.description') }}
        </p>
        <div class="flex flex-wrap gap-3" style="animation: slide-up 0.8s ease 0.3s both">
          <button @click="handleBook()" class="btn-accent px-6 sm:px-7 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2">
            <i class="fas fa-calendar-check"></i>
            {{ $t('hero.bookBtn') }}
          </button>
          <a href="#services" class="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-7 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/20 transition-all flex items-center gap-2">
            <i class="fas fa-stethoscope"></i>
            {{ $t('hero.servicesBtn') }}
          </a>
        </div>

        <div class="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:gap-4" style="animation: slide-up 0.8s ease 0.4s both">
          <div class="border-l-2 border-accent-300 pl-4">
            <div class="font-display text-3xl font-bold text-white">+15</div>
            <div class="text-sm text-primary-50/80">{{ $t('hero.doctors') }}</div>
          </div>
          <div class="border-l-2 border-primary-200 pl-4">
            <div class="font-display text-3xl font-bold text-white">+10k</div>
            <div class="text-sm text-primary-50/80">{{ $t('hero.patients') }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import exterieurImage from '@/assets/images/exterieur.png'

function handleBook() {
  window.appModals?.openAppointment()
}
</script>
