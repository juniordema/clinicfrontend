<template>
  <section class="py-16 bg-warm-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="anim-scroll text-center p-6 rounded-2xl bg-white shadow-sm border border-warm-200/50">
          <div class="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-blue-100">
            <i class="fas fa-heart text-xl text-blue-500"></i>
          </div>
          <div class="font-display font-bold text-3xl text-warm-900 mb-1">{{ $t('stats.patientsCount') }}</div>
          <div class="text-warm-500 text-sm">{{ $t('stats.patients') }}</div>
        </div>

        <div class="anim-scroll text-center p-6 rounded-2xl bg-white shadow-sm border border-warm-200/50 delay-1">
          <div class="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-green-100">
            <i class="fas fa-stethoscope text-xl text-green-500"></i>
          </div>
          <div class="font-display font-bold text-3xl text-warm-900 mb-1">{{ $t('stats.doctorsCount') }}</div>
          <div class="text-warm-500 text-sm">{{ $t('stats.doctors') }}</div>
        </div>

        <div class="anim-scroll text-center p-6 rounded-2xl bg-white shadow-sm border border-warm-200/50 delay-2">
          <div class="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-purple-100">
            <i class="fas fa-hospital text-xl text-purple-500"></i>
          </div>
          <div class="font-display font-bold text-3xl text-warm-900 mb-1">{{ $t('stats.servicesCount') }}</div>
          <div class="text-warm-500 text-sm">{{ $t('stats.services') }}</div>
        </div>

        <div class="anim-scroll text-center p-6 rounded-2xl bg-white shadow-sm border border-warm-200/50 delay-3">
          <div class="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-orange-100">
            <i class="fas fa-calendar text-xl text-orange-500"></i>
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
