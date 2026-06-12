<template>
  <div class="fluid-panel overflow-hidden rounded-lg border-teal-200 shadow-lg">
    <div class="grid lg:grid-cols-[1.05fr_0.95fr]">
      <div class="relative min-h-[320px] overflow-hidden bg-warm-100">
        <img
          :src="service.image"
          :alt="service.displayImageAlt"
          class="absolute inset-0 h-full w-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        <div class="absolute bottom-6 left-6 right-6 text-white">
          <p class="mb-3 inline-flex rounded-lg bg-white/90 px-4 py-1 text-sm font-semibold text-teal-700 shadow-sm backdrop-blur">
            {{ service.displayName }}
          </p>
          <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white/90 text-teal-600 shadow-lg backdrop-blur">
            <i :class="service.icon" class="text-3xl"></i>
          </div>
          <h3 class="text-3xl font-bold">{{ service.displayRoomName }}</h3>
          <p class="mt-2 max-w-xl text-base leading-relaxed text-white/85">{{ service.displayRoomDescription }}</p>
        </div>
      </div>

      <div class="p-6 sm:p-8">
        <div class="mb-7 rounded-lg border border-blue-100 border-l-4 border-l-blue-300 bg-blue-50 py-4 pl-4 pr-5">
          <p class="mb-1 text-sm font-semibold text-blue-900">{{ equipmentLabel }}:</p>
          <p class="text-blue-700">{{ service.displayEquipment }}</p>
        </div>

        <h4 class="mb-5 text-2xl font-bold text-gray-900">{{ benefitsLabel }}</h4>
        <div class="space-y-4">
          <div
            v-for="benefit in service.displayBenefits"
            :key="benefit"
            class="flex items-start gap-4"
          >
            <div class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <i class="fas fa-check text-sm text-emerald-600"></i>
            </div>
            <p class="font-semibold text-gray-900">{{ benefit }}</p>
          </div>
        </div>

        <button
          type="button"
          class="btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold"
          @click="$emit('book')"
        >
          <i class="fas fa-calendar-check"></i>
          {{ requestLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  service: {
    type: Object,
    required: true
  },
  equipmentLabel: {
    type: String,
    required: true
  },
  benefitsLabel: {
    type: String,
    required: true
  },
  requestLabel: {
    type: String,
    required: true
  }
})

defineEmits(['book'])
</script>
