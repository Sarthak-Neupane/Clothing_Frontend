<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <h1 class="text-2xl font-bold text-center mb-6">Clothing Search</h1>
    <form
      @submit.prevent="handleSearch"
      class="flex flex-col items-center gap-4"
    >
      <input
        type="text"
        v-model="query"
        placeholder="Search query (e.g., tan sweater under $50)"
        class="w-80 p-2 border border-gray-300 rounded-md"
      />
      <select v-model="type" class="w-80 p-2 border border-gray-300 rounded-md">
        <option disabled value="">Select a type</option>
        <option>Sweater</option>
        <option>Jacket</option>
        <option>Pants</option>
      </select>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>

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
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";

const query = ref<string>("");
const type = ref<string>("");

const results = ref<string[]>([]);

const handleSearch = async () => {
  try {
    const response = await fetch(`/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query.value, type: type.value }),
    });
    const data = await response.json();
    results.value = data.results;
  } catch (error) {
    console.error(error);
  }
};
</script>
