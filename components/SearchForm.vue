<template>
    <form @submit.prevent="submitForm" class="flex flex-col items-center gap-4">
      <input
        type="text"
        v-model="query"
        placeholder="Search query (e.g., tan sweater under $50)"
        class="w-80 p-2 border border-gray-300 rounded-md"
      />
      <select v-model="type" class="w-80 p-2 border border-gray-300 rounded-md">
        <option disabled value="">Select a type</option>
        <option>Pants</option>
        <option>Shirts</option>
        <option>Hoodies / Sweatshirt</option>
      </select>
      <div class="flex gap-4 items-center">
        <label class="flex items-center gap-2">
          <input type="radio" v-model="gender" value="Men" class="accent-blue-500" />
          <span>Men</span>
        </label>
        <label class="flex items-center gap-2">
          <input type="radio" v-model="gender" value="Women" class="accent-pink-500" />
          <span>Women</span>
        </label>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Search
      </button>
    </form>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineEmits } from "vue";
  
  const emits = defineEmits(["onSearch"]);
  
  const query = ref<string>("");
  const type = ref<string>("");
  const gender = ref<string>("");
  
  const submitForm = () => {
    emits("onSearch", { query: query.value, type: type.value, gender: gender.value });
  };
  </script>
  