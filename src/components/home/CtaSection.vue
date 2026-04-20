<template>
  <section class="py-20 relative overflow-hidden" style="background: linear-gradient(135deg, #064D42, #0A6B5C, #085C4F); z-index: 0;">
    <div class="hero-shape-1 absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-400/10 blur-3xl"></div>
    <div class="hero-shape-2 absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-300/10 blur-3xl"></div>
    <div class="relative max-w-4xl mx-auto px-4 text-center anim-scroll">
      <h2 class="font-display font-bold text-3xl sm:text-4xl text-white mb-4">{{ $t('cta.title') }}</h2>
      <p class="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">{{ $t('cta.description') }}</p>
      <div class="flex flex-wrap justify-center gap-4">
        <button @click="openAppointment()" class="btn-accent px-8 py-4 rounded-2xl font-semibold text-base flex items-center gap-3">
          <i class="fas fa-calendar-plus"></i> {{ $t('cta.button') }}
        </button>
        <a href="tel:+237699887766" class="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white/20 transition-all flex items-center gap-3">
          <i class="fas fa-phone"></i> +237 6 90 83 69 01
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
function openAppointment() {
  window.appModals?.openAppointment()
}
</script>