<template>
  <div class="grid gap-6 md:grid-cols-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="rounded-2xl border-2 border-warm-200 bg-white p-6 text-center"
    >
      <p class="mb-2 text-4xl font-bold text-teal-600">{{ stat.value }}</p>
      <p class="font-semibold text-gray-700">{{ stat.label }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>
