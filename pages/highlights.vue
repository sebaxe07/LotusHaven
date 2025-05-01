<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Highlights</h1>
    <p class="mb-6">Explore the highlights of our school.</p>

    <div v-if="isLoading" class="py-4">Loading highlighted activities...</div>
    <div v-else-if="error" class="py-4 text-red-500">
      Error: {{ error.message }}
    </div>
    <div v-else-if="highlightedActivities.length === 0" class="py-4">
      No highlighted activities found.
    </div>
    <div v-else>
      <!-- Display the formatted JSON -->
      <div class="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[600px]">
        <pre class="text-sm whitespace-pre-wrap">{{
          formattedHighlightsData
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useActivities } from "../composables/useActivities";

// Use the activities composable
const { highlightedActivities, isLoading, error, fetchHighlightedActivities } =
  useActivities();

// Format the highlighted activities data as a nicely indented JSON string
const formattedHighlightsData = computed(() => {
  if (!highlightedActivities.value || highlightedActivities.value.length === 0)
    return "";
  return JSON.stringify(highlightedActivities.value, null, 2);
});

// Fetch highlighted activities when component mounts
onMounted(async () => {
  await fetchHighlightedActivities();
});
</script>
