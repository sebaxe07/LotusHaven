<template>
  <div class="container px-4 py-8 mx-auto lg:px-8"> <div v-if="isLoading" class="text-center text-gray-500">Loading activity details...</div> <div v-else-if="error" class="text-center text-red-500"> Failed to load activity details. Please try again later.<br/> Error: {{ error.message }}
    <NuxtLink to="/activities" class="block mt-4 text-blue-600 hover:underline">Go back to activities</NuxtLink>
  </div>

    <div v-else-if="!selectedActivity" class="text-center text-gray-500"> Activity not found.
      <NuxtLink to="/activities" class="block mt-4 text-blue-600 hover:underline">Go back to activities</NuxtLink>
    </div>

    <div v-else>
      <div class="flex items-center mb-6 text-sm text-gray-500">
        <NuxtLink to="/activities" class="mr-2 hover:text-gray-800" aria-label="Back to Activities">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </NuxtLink>
        <NuxtLink to="/activities" class="hover:text-gray-800">Activities</NuxtLink>
        <span class="mx-2">/</span>
        <span class="font-medium text-gray-700">{{ selectedActivity.title }}</span>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <img
              v-if="selectedActivity.images && selectedActivity.images.length > 0"
              :src="selectedActivity.images[0]"
              :alt="`Image for ${selectedActivity.title}`"
              class="object-cover w-full h-auto rounded-lg shadow-md aspect-video"
          />
          <div v-else class="flex items-center justify-center w-full text-gray-400 bg-gray-100 rounded-lg aspect-video">
            No Image Available
          </div>
        </div>

        <div class="lg:col-span-2">
          <!-- Difficulty info -->
          <NuxtImg
              :src="'/images/' + difficultyInfo.text + '.png'"
              alt="Difficulty level"
              class="mb-4 max-w-30"
              format="webp"
              quality="90"
              loading="eager"
          />


          <h1 class="mb-4 text-3xl font-bold text-gray-800 lg:text-4xl">{{ selectedActivity.title }}</h1>

          <p class="text-gray-600 whitespace-pre-line">{{ selectedActivity.description }}</p>
        </div>
      </div>

      <div class="mt-12 lg:mt-16">
        <h2 class="mb-6 text-2xl font-semibold text-gray-800">Available Sections</h2>
        <div v-if="selectedActivity.schedules && selectedActivity.schedules.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div v-for="(schedule, index) in selectedActivity.schedules" :key="index" class="p-5 bg-gray-100 rounded-lg shadow-sm">
            <h3 class="mb-3 text-lg font-semibold text-gray-800">
              {{ schedule.professor?.name || 'Instructor Led' }}
            </h3>
            <div class="space-y-2 text-sm text-gray-700">
              <div class="flex items-center">
                <span class="mr-2 text-teal-600">🗓️</span> <div>
                <p v-for="day in schedule.days" :key="day">{{ day }}</p>
                <p>{{ schedule.time }}</p>
              </div>
              </div>
              <div class="flex items-center" v-if="schedule.professor?.phone">
                <span class="mr-2 text-teal-600">📞</span> <a :href="`tel:${schedule.professor.phone}`" class="hover:text-teal-700 hover:underline">{{ schedule.professor.phone }}</a>
              </div>
              <div class="flex items-center" v-if="schedule.professor?.email">
                <span class="mr-2 text-teal-600">✉️</span> <a :href="`mailto:${schedule.professor.email}`" class="hover:text-teal-700 hover:underline">{{ schedule.professor.email }}</a>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
          No specific sections or schedules currently listed for this activity.
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
// Use #app for Nuxt 3 auto-imports context if needed, otherwise rely on auto-import
import { useRoute } from "vue-router";
import { useActivities } from "../../composables/useActivities.js"; // Adjust path if necessary
import type { Activity } from '../../types/activities.js'; // Import Activity type if needed by computed prop

// Use the activities composable
const { selectedActivity, isLoading, error, fetchActivityById } = useActivities();

// Get the route to access parameters
const route = useRoute();
// Ensure ID is treated as a string initially, then parsed to number for fetch
const activityId = computed(() => route.params.id as string);

// Remove the formatted JSON computed property as it's no longer displayed
/*
const formattedActivityData = computed(() => {
  if (!selectedActivity.value) return "";
  return JSON.stringify(selectedActivity.value, null, 2);
});
*/

// --- Difficulty Mapping ---
const difficultyInfo = computed(() => {
  // Add optional chaining and a default level in case selectedActivity is null initially
  const level = selectedActivity.value?.difficulty_level ?? 0;
  switch (level) {
    case 1: return { text: 'easy', bgClass: 'bg-green-100', textClass: 'text-green-700' };
    case 2: return { text: 'medium', bgClass: 'bg-yellow-100', textClass: 'text-yellow-700' };
    case 3: return { text: 'difficult', bgClass: 'bg-red-100', textClass: 'text-red-700' };
    default: return { text: 'error', bgClass: 'bg-gray-100', textClass: 'text-gray-700' };
  }
});

// Fetch activity data when the component mounts (Client-side Fetch)
// Note: For SSR/SSG benefits, consider fetching data within useAsyncData
// or ensuring your useActivities composable handles server-side fetching.
onMounted(async () => {
  // Convert ID to number for the fetch function
  const idAsNumber = Number(activityId.value);
  if (!isNaN(idAsNumber)) {
    await fetchActivityById(idAsNumber);
  } else {
    console.error("Invalid Activity ID:", activityId.value);
    // Optionally set an error state here
  }
});

// --- Professor Data Assumption (Reminder) ---
// Template assumes schedule.professor object contains name, phone, email.
// Ensure your API provides this data within the selectedActivity.schedules array.
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>