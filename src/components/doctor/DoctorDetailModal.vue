<template>
  <div v-if="showDoctorDetail && selectedDoctorDetail" class="fixed inset-0 z-[200] flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm modal-overlay" @click="$emit('close')"></div>
    <div class="relative bg-white rounded-lg shadow-2xl w-full max-w-lg modal-content overflow-hidden">
      <div class="relative h-56 overflow-hidden">
        <img :src="selectedDoctorDetail.photo" :alt="selectedDoctorDetail.name" class="w-full h-full object-cover object-top">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <button @click="$emit('close')" class="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center text-white transition-colors">
          <i class="fas fa-times"></i>
        </button>
        <div class="absolute bottom-4 left-5">
          <span class="inline-block bg-accent-400 text-white text-xs font-semibold px-3 py-1 rounded-lg mb-2">{{ displaySpecialty }}</span>
          <h2 class="font-display font-bold text-2xl text-white">Dr. {{ selectedDoctorDetail.name }}</h2>
        </div>
      </div>
      <div class="p-6">
        <p class="text-warm-600 text-sm leading-relaxed mb-5">{{ displayBio }}</p>
        <div class="grid grid-cols-3 gap-3 mb-6">
          <div class="text-center p-3 bg-warm-50 rounded-lg">
            <div class="font-bold text-warm-900 text-lg">{{ selectedDoctorDetail.experience }}</div>
            <div class="text-warm-400 text-xs">{{ $t('doctors.experienceShort') }}</div>
          </div>
          <div class="text-center p-3 bg-warm-50 rounded-lg">
            <div class="font-bold text-warm-900 text-lg">{{ selectedDoctorDetail.patients }}</div>
            <div class="text-warm-400 text-xs">{{ $t('doctors.patients') }}</div>
          </div>
          <div class="text-center p-3 bg-warm-50 rounded-lg">
            <div class="font-bold text-warm-900 text-lg">{{ selectedDoctorDetail.rating }}</div>
            <div class="text-warm-400 text-xs">{{ $t('doctors.rating') }}</div>
          </div>
        </div>
        <div class="mb-5">
          <div class="text-warm-700 text-sm font-semibold mb-2">{{ $t('doctors.availability') }}</div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="d in displayAvailability" :key="d" class="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-lg font-medium">{{ d }}</span>
          </div>
        </div>
        <button @click="handleBook" class="btn-primary w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2">
          <i class="fas fa-calendar-check"></i> {{ $t('nav.appointment') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const props = defineProps({
  showDoctorDetail: Boolean,
  selectedDoctorDetail: Object
})
const emit = defineEmits(['close', 'book'])

const displaySpecialty = computed(() =>
  locale.value === 'en'
    ? props.selectedDoctorDetail?.specialtyEn || props.selectedDoctorDetail?.specialty || ''
    : props.selectedDoctorDetail?.specialty || ''
)
const displayBio = computed(() =>
  locale.value === 'en'
    ? props.selectedDoctorDetail?.bioEn || props.selectedDoctorDetail?.bio || ''
    : props.selectedDoctorDetail?.bio || ''
)
const displayAvailability = computed(() => {
  const values = props.selectedDoctorDetail?.availability || []
  if (locale.value !== 'en') return values

  const map = { Lun: 'Mon', Mar: 'Tue', Mer: 'Wed', Jeu: 'Thu', Ven: 'Fri', Sam: 'Sat', Dim: 'Sun' }
  return values.map((value) => map[value] || value)
})

function handleBook() {
  emit('book')
}
</script>
