<template>
  <div class="container px-4 py-8 mx-auto lg:px-8">
    <div v-if="isLoading" class="text-center text-gray-500">Loading activity details...</div>
    <div v-else-if="error" class="text-center text-red-500">
      Failed to load activity details. Please try again later.<br/>
      Error: {{ error.message }}
      <NuxtLink to="/activities" class="block mt-4 text-blue-600 hover:underline">Go back to activities</NuxtLink>
    </div>
    <div v-else-if="!selectedActivity" class="text-center text-gray-500">
      Activity not found.
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

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-13">
        <div class="lg:col-span-6">
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

        <div class="lg:col-span-7">
          <NuxtImg
              :src="'/images/' + difficultyInfo.text + '.png'"
              alt="Difficulty level"
              class="mb-4 max-w-30"
              format="webp"
              quality="90"
              loading="eager"
          />
          <div class="p-8 bg-gray-100 rounded-lg shadow-sm">
            <h1 class="mb-4 text-3xl font-bold text-gray-800 lg:text-4xl">{{ selectedActivity.title }}</h1>
            <p class="text-gray-600 whitespace-pre-line">{{ selectedActivity.description }}</p>
          </div>
        </div>
      </div>

      <div class="mt-12 lg:mt-16">
        <h2 class="mb-6 text-2xl font-semibold text-gray-800">Available Sections</h2>
        <div v-if="selectedActivity.schedules && selectedActivity.schedules.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <SectionCard
              v-for="(schedule, index) in selectedActivity.schedules"
              :key="index"
              :schedule="schedule"
          />
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
import { useRoute } from "vue-router";
import { useActivities } from "../../composables/useActivities.js"; // Adjust path if necessary
import type { Activity } from '../../types/activities.js'; // Import Activity type if needed

// Import the new SectionCard component
import SectionCard from '../../components/ui/SectionCard.vue'; // Adjust path to SectionCard.vue as needed

const { selectedActivity, isLoading, error, fetchActivityById } = useActivities();
const route = useRoute();
const activityId = computed(() => route.params.id as string);

const difficultyInfo = computed(() => {
  const level = selectedActivity.value?.difficulty_level ?? 0;
  switch (level) {
    case 1: return { text: 'easy', bgClass: 'bg-green-100', textClass: 'text-green-700' };
    case 2: return { text: 'medium', bgClass: 'bg-yellow-100', textClass: 'text-yellow-700' };
    case 3: return { text: 'difficult', bgClass: 'bg-red-100', textClass: 'text-red-700' };
    default: return { text: 'error', bgClass: 'bg-gray-100', textClass: 'text-gray-700' };
  }
});

onMounted(async () => {
  const idAsNumber = Number(activityId.value);
  if (!isNaN(idAsNumber)) {
    await fetchActivityById(idAsNumber);
  } else {
    console.error("Invalid Activity ID:", activityId.value);
  }
});
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>