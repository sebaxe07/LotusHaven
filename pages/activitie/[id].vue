<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Showing the dynamic ID directly to ensure we're in the dynamic route -->
    <h1 class="text-2xl font-bold mb-4">Activity Details Page</h1>
    <p class="mb-4 font-bold">Activity ID: {{ activityId }}</p>

    <div v-if="isLoading" class="py-4">Loading activity data...</div>
    <div v-else-if="error" class="py-4 text-red-500">
      Error: {{ error.message }}
    </div>
    <div v-else-if="!selectedActivity" class="py-4">Activity not found.</div>

    <NuxtLink
      to="/activities"
      class="text-blue-500 hover:underline mt-4 inline-block"
    >
      Back to Activities
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useActivities } from "../../composables/useActivities";

// Use the activities composable
const { selectedActivity, isLoading, error, fetchActivityById } =
  useActivities();

// Get the route to access parameters
const route = useRoute();
const activityId = computed(() => route.params.id);

// Fetch activity data when the component mounts
onMounted(async () => {
  await fetchActivityById(Number(activityId.value));
});
</script>
