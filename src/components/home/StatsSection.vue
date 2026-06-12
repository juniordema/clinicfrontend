<template>
  <section class="section-y bg-warm-50 border-y border-warm-200/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 anim-scroll">
        <div class="max-w-2xl">
          <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('sections.stats') }}</span>
          <h2 class="section-title font-display font-bold text-warm-900 mt-3">{{ $t('stats.title') }}</h2>
          <p class="text-warm-500 mt-3">Une vue rapide sur l’activité et la capacité clinique.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <div class="anim-scroll card-hover fluid-panel rounded-lg p-5 border-t-2 border-t-blue-500">
          <div class="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
            <i class="fas fa-heart text-blue-500"></i>
          </div>
          <div class="font-display font-bold text-3xl text-warm-900 mb-1">{{ $t('stats.patientsCount') }}</div>
          <div class="text-warm-500 text-sm">{{ $t('stats.patients') }}</div>
        </div>

        <div class="anim-scroll card-hover fluid-panel rounded-lg p-5 border-t-2 border-t-emerald-500 delay-1">
          <div class="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
            <i class="fas fa-stethoscope text-emerald-500"></i>
          </div>
          <div class="font-display font-bold text-3xl text-warm-900 mb-1">{{ $t('stats.doctorsCount') }}</div>
          <div class="text-warm-500 text-sm">{{ $t('stats.doctors') }}</div>
        </div>

        <div class="anim-scroll card-hover fluid-panel rounded-lg p-5 border-t-2 border-t-violet-500 delay-2">
          <div class="w-11 h-11 rounded-lg bg-violet-50 flex items-center justify-center mb-4">
            <i class="fas fa-hospital text-violet-500"></i>
          </div>
          <div class="font-display font-bold text-3xl text-warm-900 mb-1">{{ $t('stats.servicesCount') }}</div>
          <div class="text-warm-500 text-sm">{{ $t('stats.services') }}</div>
        </div>

        <div class="anim-scroll card-hover fluid-panel rounded-lg p-5 border-t-2 border-t-amber-500 delay-3">
          <div class="w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
            <i class="fas fa-calendar text-amber-500"></i>
          </div>
          <div class="font-display font-bold text-3xl text-warm-900 mb-1">{{ $t('stats.experienceCount') }}</div>
          <div class="text-warm-500 text-sm">{{ $t('stats.experience') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
