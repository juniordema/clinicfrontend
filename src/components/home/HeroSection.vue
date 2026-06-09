<template>
  <section class="relative h-[85vh] max-h-[85vh] overflow-hidden bg-black">
    <div class="absolute inset-0 bg-cover bg-center opacity-50" :style="{ backgroundImage: `url(${exterieurImage})` }"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-[#022F28]/80 via-[#064D42]/80 to-[#085C4F]/80"></div>
    <div class="hero-shape-1 absolute top-20 left-[10%] w-72 h-72 rounded-full bg-accent-400/10 blur-2xl"></div>
    <div class="hero-shape-2 absolute bottom-20 right-[5%] w-96 h-96 rounded-full bg-primary-300/10 blur-3xl"></div>
    <div class="hero-shape-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-400/10"></div>
    <div class="hero-shape-2 absolute top-32 right-[20%] w-4 h-4 rounded-full bg-accent-400/40"></div>
    <div class="hero-shape-1 absolute bottom-40 left-[15%] w-3 h-3 rounded-full bg-primary-200/30"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        <div>
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6" style="animation: slide-up 0.6s ease both">
            <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
            <span class="text-primary-100 text-xs sm:text-sm font-medium">{{ $t('hero.badge') }}</span>
          </div>
          <h1 class="hero-title font-display font-black text-white leading-[1.1] mb-4 sm:mb-6 text-2xl sm:text-[2.5rem] lg:text-[3.5rem]" style="animation: slide-up 0.8s ease 0.1s both">
            {{ $t('hero.title') }}<br>
            <span class="text-accent-400">{{ $t('hero.titleAccent') }}</span>
          </h1>
          <p class="text-primary-200 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg" style="animation: slide-up 0.8s ease 0.2s both">
            {{ $t('hero.description') }}
          </p>
          <div class="flex flex-wrap gap-3 sm:gap-4" style="animation: slide-up 0.8s ease 0.3s both">
            <button @click="handleBook()" class="btn-accent px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base flex items-center gap-2 sm:gap-3">
              <i class="fas fa-calendar-check"></i>
              {{ $t('hero.bookBtn') }}
            </button>
            <a href="#services" class="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:bg-white/20 transition-all flex items-center gap-2 sm:gap-3">
              <i class="fas fa-stethoscope"></i>
              {{ $t('hero.servicesBtn') }}
            </a>
          </div>
        </div>
        <div class="hidden sm:block">
          <div class="w-full aspect-[4/3] sm:aspect-square max-w-full sm:max-w-sm lg:max-w-lg mx-auto lg:mx-0">
            <div class="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-600/60 via-accent-500/50 to-primary-500/60"></div>
              <img :src="soinImage" alt="Présentation des soins de la clinique" class="absolute inset-0 w-full h-full object-cover" />
              <div class="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg sm:shadow-xl flex items-center gap-2">
                <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-primary-50 flex items-center justify-center">
                  <i class="fas fa-user-md text-primary-500 text-sm sm:text-lg lg:text-xl"></i>
                </div>
                <div>
                  <div class="font-bold text-warm-900 text-sm sm:text-base lg:text-lg">+15</div>
                  <div class="text-warm-500 text-xs">{{ $t('hero.doctors') }}</div>
                </div>
              </div>
              <div class="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg sm:shadow-xl flex items-center gap-2">
                <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-accent-50 flex items-center justify-center">
                  <i class="fas fa-smile text-accent-500 text-sm sm:text-lg lg:text-xl"></i>
                </div>
                <div>
                  <div class="font-bold text-warm-900 text-sm sm:text-base lg:text-lg">+10k</div>
                  <div class="text-warm-500 text-xs">{{ $t('hero.patients') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V100H0V40Z" fill="#F7F5F0"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import soinImage from '@/assets/images/soin.png'
import exterieurImage from '@/assets/images/exterieur.png'

function handleBook() {
  window.appModals?.openAppointment()
}
</script>