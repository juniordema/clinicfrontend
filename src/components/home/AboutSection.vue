<template>
  <section id="about" class="py-20 bg-warm-100 dot-pattern border-y border-warm-200/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-center">
        <div class="anim-scroll">
          <div class="relative">
            <div class="absolute -inset-4 rounded-2xl border border-primary-200/80"></div>
            <div class="absolute -bottom-5 left-5 right-5 bg-white rounded-lg shadow-lg border border-warm-200 p-4 flex items-center justify-between gap-4">
              <div>
                <div class="text-xs uppercase tracking-widest text-primary-500 font-semibold">{{ $t('about.location') }}</div>
                <div class="text-sm font-semibold text-warm-900 mt-1">Logpom, Douala</div>
              </div>
              <div class="text-right">
                <div class="text-xs uppercase tracking-widest text-warm-400 font-semibold">{{ $t('about.yearCreated') }}</div>
                <div class="text-sm font-semibold text-warm-900 mt-1">2021</div>
              </div>
            </div>
            <img
                :src="exterieurImage"
                alt="Extérieur de la Clinique Angelo"
                class="relative rounded-2xl object-cover w-full h-[400px] sm:h-[450px] lg:h-[500px]"
            />
          </div>
        </div>
        <div class="space-y-6">
          <div class="anim-scroll">
            <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('sections.about') }}</span>
            <h2 class="font-display font-bold text-4xl sm:text-5xl text-warm-900 mt-3 mb-4">{{ $t('about.title') }}</h2>
            <p class="text-warm-500 max-w-xl">{{ $t('about.subtitle') }}</p>
          </div>
          <div class="anim-scroll delay-1">
            <p class="text-warm-600 leading-relaxed">
              {{ $t('about.description') }}
            </p>
          </div>
          <div class="anim-scroll delay-2 grid sm:grid-cols-2 gap-4">
            <div class="flex items-start gap-3 p-4 rounded-lg bg-white/70 border border-warm-200/70 hover:bg-white transition-colors">
              <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-bullseye text-primary-500"></i>
              </div>
              <div>
                <div class="font-semibold text-warm-800 text-sm">{{ $t('about.mission') }}</div>
                <div class="text-warm-500 text-xs mt-0.5">Excellence in Medical Care</div>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-lg bg-white/70 border border-warm-200/70 hover:bg-white transition-colors">
              <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-eye text-primary-500"></i>
              </div>
              <div>
                <div class="font-semibold text-warm-800 text-sm">{{ $t('about.vision') }}</div>
                <div class="text-warm-500 text-xs mt-0.5">Patient-Centered Care</div>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-lg bg-white/70 border border-warm-200/70 hover:bg-white transition-colors">
              <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                <i class="fas fa-heart text-primary-500"></i>
              </div>
              <div>
                <div class="font-semibold text-warm-800 text-sm">{{ $t('about.values') }}</div>
                <div class="text-warm-500 text-xs mt-0.5">Compassion & Integrity</div>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-lg bg-white/70 border border-warm-200/70 hover:bg-white transition-colors">
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
            <a href="#services" class="btn-primary px-6 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
              {{ $t('nav.services') }} <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import exterieurImage from "@/assets/images/exterieur.png";
</script>
