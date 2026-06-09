<template>
  <section id="about" class="py-20 bg-warm-100 dot-pattern">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="anim-scroll">
          <div class="relative">
            <div class="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-primary-200"></div>
            <img src="https://picsum.photos/seed/clinic-interior-modern/600/500.jpp" alt="Intérieur de la clinique" class="relative rounded-3xl w-full object-cover shadow-lg" style="height: 420px">
          </div>
        </div>
        <div>
          <div class="anim-scroll">
            <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('sections.about') }}</span>
            <h2 class="font-display font-bold text-4xl text-warm-900 mt-3 mb-6">{{ $t('about.title') }}</h2>
          </div>
          <div class="anim-scroll delay-1">
            <p class="text-warm-600 leading-relaxed mb-6">
              {{ $t('about.description') }}
            </p>
          </div>
          <div class="anim-scroll delay-2 grid sm:grid-cols-2 gap-4 mb-8">
            <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors">
              <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-bullseye text-primary-500"></i>
              </div>
              <div>
                <div class="font-semibold text-warm-800 text-sm">{{ $t('about.mission') }}</div>
                <div class="text-warm-500 text-xs mt-0.5">Excellence in Medical Care</div>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors">
              <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-eye text-primary-500"></i>
              </div>
              <div>
                <div class="font-semibold text-warm-800 text-sm">{{ $t('about.vision') }}</div>
                <div class="text-warm-500 text-xs mt-0.5">Patient-Centered Care</div>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors">
              <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-heart text-primary-500"></i>
              </div>
              <div>
                <div class="font-semibold text-warm-800 text-sm">{{ $t('about.values') }}</div>
                <div class="text-warm-500 text-xs mt-0.5">Compassion & Integrity</div>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors">
              <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-users text-primary-500"></i>
              </div>
              <div>
                <div class="font-semibold text-warm-800 text-sm">{{ $t('about.team') }}</div>
                <div class="text-warm-500 text-xs mt-0.5">Dedicated Specialists</div>
              </div>
            </div>
          </div>
          <div class="anim-scroll delay-3">
            <a href="#services" class="btn-primary px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2">
              {{ $t('nav.services') }} <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
