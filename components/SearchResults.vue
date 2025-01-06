<template>
  <div>
    <div class="mt-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Search Results</h2>

      <div
        v-if="results && results.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="(result, index) in results"
          :key="index"
          class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <img
            :src="result.productImage"
            alt="Product Image"
            class="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 class="text-lg font-semibold text-gray-800">
            {{ result.productName }}
          </h3>
          <p class="text-gray-500 mt-2">Color: {{ result.colors }}</p>
          <p class="text-gray-500">Price: ${{ result.prices.formattedPrice }}</p>
          <p class="text-gray-500">Material: {{ result.details.material }}</p>
          <p class="text-gray-500">Fit: {{ result.details.fit }}</p>
          <p class="text-gray-500">
            Similarity: {{ (result.similarity * 100).toFixed(2) }}%
          </p>
        </div>
      </div>

      <div v-else class="text-center mt-8">
        <p class="text-gray-500">No results found. Try another query!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface price {
  priceType: string;
  price: number;
  formattedPrice: string 
}

interface details {
  material: string;
  fit: string;
}

// Define the structure of the result object
interface Result {
  id: string;
  colors: string;
  colorShade: string;
  prices: price;
  images: Array<object>;
  newArrival: boolean;
  productImage: string;
  productName: string;
  swatches: Array<object>;
  url: string;
  details: details;
  similarity: number;
}

// Define props with TypeScript
defineProps<{
  results: Result[];
}>();
</script>
