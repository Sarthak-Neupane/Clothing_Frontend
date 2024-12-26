<template>
    <div v-if="results?.length" class="mt-8">
      <h2 class="text-xl font-semibold text-center mb-4">Results</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="(result, index) in results"
          :key="index"
          class="p-4 bg-white shadow-md rounded-md text-center"
        >
          {{ result }}
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts" setup>
  defineProps({
    results: {
      type: Array,
      required: true,
    },
  });
  </script>
  