<template>
  <section id="doctors" class="py-20 bg-warm-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 anim-scroll">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('nav.doctors') }}</span>
        <h2 class="font-display font-bold text-4xl sm:text-5xl text-warm-900 mt-3 mb-4">{{ $t('doctors.title') }}</h2>
        <p class="text-warm-500">{{ $t('doctors.description') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(doc, i) in localizedDoctors"
          :key="i"
          class="anim-scroll group card-hover bg-white rounded-lg overflow-hidden border border-warm-200 shadow-sm"
          :class="'delay-' + (i % 3 + 1)"
        >
          <div class="relative overflow-hidden" style="height: 260px">
            <img :src="doc.photo" :alt="doc.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <span class="inline-block bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-semibold px-3 py-1 rounded-lg">{{ doc.displaySpecialty }}</span>
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-display font-bold text-lg text-warm-900">Dr. {{ doc.name }}</h3>
            <p class="text-warm-500 text-sm mt-1"><i class="fas fa-award mr-1 text-accent-400"></i>{{ doc.experience }} {{ $t('stats.experience').toLowerCase() }}</p>
            <div class="flex gap-2 mt-4">
              <button @click="handleBook(doc)" class="btn-primary flex-1 py-2.5 rounded-lg text-sm font-semibold">
                {{ $t('nav.appointment') }}
              </button>
              <button @click="showDoctor(doc)" class="w-10 h-10 rounded-lg border border-warm-200 text-warm-500 hover:border-primary-300 hover:text-primary-600 transition-colors flex items-center justify-center">
                <i class="fas fa-info"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { doctors } from '@/data/doctors'

const { locale } = useI18n()
const localizedDoctors = computed(() =>
  doctors.map((doctor) => ({
    ...doctor,
    displaySpecialty: locale.value === 'en' ? doctor.specialtyEn || doctor.specialty : doctor.specialty,
    displayBio: locale.value === 'en' ? doctor.bioEn || doctor.bio : doctor.bio
  }))
)

function handleBook(doc) {
  window.appModals?.openAppointment()
}

function showDoctor(doc) {
  window.appModals?.openDoctorDetail?.(doc)
}
</script>
