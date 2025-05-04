<template>
  <div class="relative flex items-center mb-6">
    <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        placeholder="Search here"
        class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-100"
    />
    <button
        type="button"
        @click="$emit('search', modelValue)"
        class="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-white bg-teal-500 rounded-r-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
        aria-label="Search"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
// Define props and emits for v-model compatibility and search action
defineProps<{
  modelValue: string; // For v-model binding
}>();

defineEmits(['update:modelValue', 'search']);
</script>

<style scoped>

</style>
