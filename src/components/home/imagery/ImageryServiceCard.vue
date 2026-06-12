<template>
  <button
    type="button"
    class="group card-hover overflow-hidden rounded-lg border bg-white text-left transition-all hover:border-teal-500"
    :class="selected ? 'border-teal-500 bg-teal-50 shadow-md shadow-teal-900/10' : 'border-warm-200'"
    @click="$emit('select', service)"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-warm-100">
      <img
        :src="service.image"
        :alt="service.displayImageAlt"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent"></div>
      <div class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm backdrop-blur">
        {{ service.displayRoomName }}
      </div>
      <div class="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white/90 text-teal-600 shadow-sm backdrop-blur">
        <i :class="service.icon" class="text-xl"></i>
      </div>
    </div>

    <div class="p-5">
      <h3 class="mb-1 font-semibold text-gray-900">{{ service.displayRoomName }}</h3>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-600">{{ service.displayName }}</p>
      <p class="line-clamp-3 text-sm leading-relaxed text-gray-600">{{ service.displayRoomDescription }}</p>
    </div>
  </button>
</template>

<script setup>
defineProps({
  service: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>
