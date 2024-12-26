<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <h1 class="text-2xl font-bold text-center mb-6">Clothing Search</h1>
    <SearchForm @onSearch="handleSearch" />
    <SearchResults v-if="results" :results="results" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SearchForm from "../components/SearchForm.vue";
import SearchResults from "../components/SearchResults.vue";

const results = ref<string[]>([]);

const handleSearch = async (searchData: { query: string; type: string; gender: string }) => {
  try {
    const response = await fetch(`/api/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchData),
    });
    const data = await response.json();
    results.value = data.results;
    console.log(data)
  } catch (error) {
    console.error(error);
  }
};
</script>
