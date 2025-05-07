<template>
  <div class="container px-4 py-8 mx-auto lg:px-8">
    <div v-if="isLoading" class="text-center py-10">
      <div
        class="inline-block w-10 h-10 border-4 border-primary-accent-light border-t-primary-accent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-secondary-text">Loading activity details...</p>
    </div>
    <div v-else-if="error" class="text-center py-10">
      <div
        class="inline-flex items-center justify-center w-12 h-12 mb-4 text-red-500 bg-red-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <p class="text-red-500 mb-4">Error loading activity details.</p>
      <p class="text-sm text-secondary-text mb-6">{{ error.message }}</p>
      <NuxtLink
        to="/activities"
        class="inline-block px-4 py-2 text-sm font-medium bg-primary-accent text-white rounded-md hover:bg-primary-accent-dark transition-colors"
      >
        Go back to activities
      </NuxtLink>
    </div>
    <div v-else-if="!selectedActivity" class="text-center py-10">
      <div
        class="inline-flex items-center justify-center w-12 h-12 mb-4 text-secondary-text bg-gray-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <p class="text-secondary-text mb-6">Activity not found.</p>
      <NuxtLink
        to="/activities"
        class="inline-block px-4 py-2 text-sm font-medium bg-primary-accent text-white rounded-md hover:bg-primary-accent-dark transition-colors"
      >
        Go back to activities
      </NuxtLink>
    </div>
    <div v-else>
      <!-- Breadcrumb - responsive text size -->
      <div
        class="flex items-center mb-6 text-xs sm:text-sm text-secondary-text"
      >
        <NuxtLink
          to="/activities"
          class="mr-2 hover:text-primary-text"
          aria-label="Back to Activities"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </NuxtLink>
        <NuxtLink to="/activities" class="hover:text-primary-text"
          >Activities</NuxtLink
        >
        <span class="mx-2">/</span>
        <span
          class="font-medium text-primary-text truncate max-w-[150px] sm:max-w-none"
          >{{ selectedActivity.title }}</span
        >
      </div>

      <!-- Main content grid - fixed responsive columns -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <!-- Image section - full width on mobile, 5/12 on desktop -->
        <div class="lg:col-span-5">
          <img
            v-if="selectedActivity.images && selectedActivity.images.length > 0"
            :src="selectedActivity.images[0]"
            :alt="`Image for ${selectedActivity.title}`"
            class="object-cover w-full h-auto rounded-lg shadow-md aspect-video"
          />
          <div
            v-else
            class="flex items-center justify-center w-full text-secondary-text bg-gray-100 rounded-lg aspect-video"
          >
            No Image Available
          </div>
        </div>

        <!-- Details section - full width on mobile, 7/12 on desktop -->
        <div class="lg:col-span-7">
          <!-- Difficulty badge with styling matching ActivityCard -->
          <div class="mb-6">
            <span
              class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full"
              :class="getDifficultyClass(selectedActivity.difficulty_level)"
            >
              {{ getDifficultyLabel(selectedActivity.difficulty_level) }}
            </span>
          </div>

          <div class="p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow-sm">
            <h1
              class="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-text break-words"
            >
              {{ selectedActivity.title }}
            </h1>
            <p
              class="text-sm sm:text-base text-secondary-text whitespace-pre-line"
            >
              {{ selectedActivity.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Available Sections - responsive grid with improved spacing -->
      <div class="mt-8 sm:mt-10 lg:mt-16">
        <h2
          class="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold text-primary-text"
        >
          Available Sections
        </h2>
        <div
          v-if="
            selectedActivity.schedules && selectedActivity.schedules.length > 0
          "
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <SectionCard
            v-for="(schedule, index) in selectedActivity.schedules"
            :key="index"
            :schedule="schedule"
          />
        </div>
        <div
          v-else
          class="p-4 text-center text-secondary-text bg-gray-100 rounded-lg"
        >
          No specific sections or schedules currently listed for this activity.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useActivities } from "../../composables/useActivities";
import SectionCard from "../../components/ui/SectionCard.vue";

const { selectedActivity, isLoading, error, fetchActivityById } =
  useActivities();
const route = useRoute();

// Get an appropriate icon based on difficulty level

const getDifficultyClass = (level: number): string => {
  switch (level) {
    case 1:
      return "bg-green-100 text-green-800";
    case 2:
      return "bg-blue-100 text-blue-800";
    case 3:
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getDifficultyLabel = (level: number): string => {
  switch (level) {
    case 1:
      return "Beginner";
    case 2:
      return "Intermediate";
    case 3:
      return "Advanced";
    default:
      return "All Levels";
  }
};

onMounted(async () => {
  const idParam = route.params.id;
  const activityId =
    typeof idParam === "string"
      ? parseInt(idParam, 10)
      : Array.isArray(idParam)
      ? parseInt(idParam[0], 10)
      : null;

  if (activityId !== null && !isNaN(activityId)) {
    console.log("Fetching activity with ID:", activityId);
    await fetchActivityById(activityId);
  } else {
    console.error("Invalid activity ID:", idParam);
  }
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.whitespace-pre-line {
  white-space: pre-line;
}
</style>
