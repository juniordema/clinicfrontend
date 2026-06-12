<template>
  <section class="py-20 bg-white border-y border-warm-200/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12 anim-scroll">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('sections.testimonials') }}</span>
        <h2 class="font-display font-bold text-4xl sm:text-5xl text-warm-900 mt-3 mb-4">{{ $t('testimonials.subtitle') }}</h2>
        <p class="text-warm-500">{{ $t('testimonials.description') }}</p>
      </div>
      <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
        <div class="anim-scroll bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-lg p-8 text-white shadow-lg">
          <div class="flex gap-1 mb-6">
            <i v-for="s in 5" :key="s" class="fas fa-star text-accent-300 text-sm"></i>
          </div>
          <p class="font-display text-2xl sm:text-3xl leading-snug mb-8">
            "{{ $t('testimonials.testimonial1') }}"
          </p>
          <div class="flex items-center gap-3">
            <img :src="`https://picsum.photos/seed/testimonial-patient1/120/120.jpg`" :alt="$t('testimonials.patient1')" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/30">
            <div>
              <div class="font-semibold text-white text-sm">{{ $t('testimonials.patient1') }}</div>
              <div class="text-primary-100 text-xs">Patient satisfaite</div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i + 1" class="anim-scroll card-hover bg-warm-50 rounded-lg p-6 border border-warm-200 shadow-sm" :class="'delay-' + (i % 3 + 1)">
            <div class="flex gap-1 mb-4">
              <i v-for="s in 5" :key="s" class="fas fa-star text-accent-400 text-sm"></i>
            </div>
            <p class="text-warm-600 text-sm leading-relaxed mb-5 italic">"{{ $t(`testimonials.testimonial${i + 1}`) }}"</p>
            <div class="flex items-center gap-3">
              <img :src="`https://picsum.photos/seed/testimonial-patient${i + 1}/100/100.jpg`" :alt="$t(`testimonials.patient${i + 1}`)" class="w-10 h-10 rounded-full object-cover">
              <div>
                <div class="font-semibold text-warm-800 text-sm">{{ $t(`testimonials.patient${i + 1}`) }}</div>
                <div class="text-warm-400 text-xs">{{ `${year - (3 - i)}` }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const year = ref(new Date().getFullYear())
</script>
