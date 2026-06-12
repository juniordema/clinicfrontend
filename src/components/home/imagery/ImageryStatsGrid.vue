<template>
  <div class="grid gap-6 md:grid-cols-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="card-hover fluid-panel rounded-lg p-6 text-center"
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
