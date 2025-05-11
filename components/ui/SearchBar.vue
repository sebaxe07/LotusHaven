<template>
  <div class="relative flex items-center mb-6">
    <!-- Accessible label for screen readers -->
    <label for="search-input" class="sr-only">Search</label>
    <!-- Search input field with v-model binding -->
    <input
      id="search-input"
      type="text"
      :value="modelValue"
      placeholder="Search here"
      class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent bg-gray-100"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <!-- Search button with magnifying glass icon -->
    <button
      type="button"
      class="cursor-pointer absolute inset-y-0 right-0 flex items-center justify-center px-3 text-white bg-primary-accent rounded-r-md hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-1"
      aria-label="Search"
      @click="$emit('search', modelValue)"
    >
      <!-- Magnifying glass SVG icon -->
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
/**
 * Component props
 * @property {string} modelValue - Current search text value (for v-model binding)
 */
defineProps<{
  /** Current search text value received from parent via v-model */
  modelValue: string;
}>();

/**
 * Component events
 * @event update:modelValue - Emitted when input value changes (for v-model)
 * @event search - Emitted when search button is clicked or Enter key is pressed
 */
defineEmits(["update:modelValue", "search"]);
</script>

<style scoped>
/* Component-specific styles would go here */
</style>
