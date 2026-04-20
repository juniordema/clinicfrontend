<template>
  <section class="relative h-[85vh] max-h-[85vh] overflow-hidden"style="background: linear-gradient(135deg, #022F28 0%, #064D42 35%, #0A6B5C 65%, #085C4F 100%); z-index: 0;">
    <div class="hero-shape-1 absolute top-20 left-[10%] w-72 h-72 rounded-full bg-accent-400/10 blur-2xl"></div>
    <div class="hero-shape-2 absolute bottom-20 right-[5%] w-96 h-96 rounded-full bg-primary-300/10 blur-3xl"></div>
    <div class="hero-shape-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-400/10"></div>
    <div class="hero-shape-2 absolute top-32 right-[20%] w-4 h-4 rounded-full bg-accent-400/40"></div>
    <div class="hero-shape-1 absolute bottom-40 left-[15%] w-3 h-3 rounded-full bg-primary-200/30"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6" style="animation: slide-up 0.6s ease both">
            <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
            <span class="text-primary-100 text-sm font-medium">{{ $t('hero.badge') }}</span>
          </div>
          <h1 class="hero-title font-display font-black text-white leading-[1.1] mb-6" style="font-size: 3.5rem; animation: slide-up 0.8s ease 0.1s both">
            {{ $t('hero.title') }}<br>
            <span class="text-accent-400">{{ $t('hero.titleAccent') }}</span>
          </h1>
          <p class="text-primary-200 text-lg leading-relaxed mb-8 max-w-lg" style="animation: slide-up 0.8s ease 0.2s both">
            {{ $t('hero.description') }}
          </p>
          <div class="flex flex-wrap gap-4" style="animation: slide-up 0.8s ease 0.3s both">
            <button @click="handleBook()" class="btn-accent px-8 py-4 rounded-2xl font-semibold text-base flex items-center gap-3">
              <i class="fas fa-calendar-check"></i>
              {{ $t('hero.bookBtn') }}
            </button>
            <a href="#services" class="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white/20 transition-all flex items-center gap-3">
              <i class="fas fa-stethoscope"></i>
              {{ $t('hero.servicesBtn') }}
            </a>
          </div>
        </div>
        <div class="hidden lg:block relative" style="animation: slide-up 1s ease 0.4s both">
          <div class="relative w-full aspect-square max-w-lg mx-auto">
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-400/20 to-primary-400/20 rotate-6"></div>
            <img src="https://picsum.photos/seed/medical-team-douala/600/600.jpg" alt="Équipe médicale" class="relative rounded-3xl w-full h-full object-cover shadow-2xl">
            <div class="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                <i class="fas fa-user-md text-primary-500 text-xl"></i>
              </div>
              <div>
                <div class="font-bold text-warm-900 text-lg">+15</div>
                <div class="text-warm-500 text-xs">{{ $t('hero.doctors') }}</div>
              </div>
            </div>
            <div class="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center">
                <i class="fas fa-smile text-accent-500 text-xl"></i>
              </div>
              <div>
                <div class="font-bold text-warm-900 text-lg">+10k</div>
                <div class="text-warm-500 text-xs">{{ $t('hero.patients') }}</div>
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
function handleBook() { 
  window.appModals?.openAppointment()
}
</script>