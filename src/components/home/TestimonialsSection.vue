<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 anim-scroll">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('sections.testimonials') }}</span>
        <h2 class="font-display font-bold text-4xl text-warm-900 mt-3 mb-4">{{ $t('testimonials.subtitle') }}</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="i in 4" :key="i" class="anim-scroll card-hover bg-warm-50 rounded-2xl p-6 border border-warm-200/50" :class="'delay-' + (i % 3 + 1)">
          <div class="flex gap-1 mb-4">
            <i v-for="s in 5" :key="s" class="fas fa-star text-accent-400 text-sm"></i>
          </div>
          <p class="text-warm-600 text-sm leading-relaxed mb-5 italic">"{{ $t(`testimonials.testimonial${i}`) }}"</p>
          <div class="flex items-center gap-3">
            <img :src="`https://picsum.photos/seed/testimonial-patient${i}/100/100.jpg`" :alt="$t(`testimonials.patient${i}`)" class="w-10 h-10 rounded-full object-cover">
            <div>
              <div class="font-semibold text-warm-800 text-sm">{{ $t(`testimonials.patient${i}`) }}</div>
              <div class="text-warm-400 text-xs">{{ `${year - (4 - i)} ans` }}</div>
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
