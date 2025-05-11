<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Main Content Section - Primary container with responsive padding -->
    <div class="w-full px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col">
      <!-- Back Navigation - Return button with consistent positioning across pages -->
      <button
        class="cursor-pointer flex items-center gap-2 text-primary-accent hover:underline text-sm mb-4 self-start"
        @click="goBack"
      >
        <UiSvgIcon
          icon="/icons/arrow.svg"
          :width="20"
          :height="20"
          :color="'var(--color-primary-accent)'"
        />
        Back
      </button>

      <!-- State Management - Loading spinner, error messages, and empty state handling -->
      <div v-if="isLoading" class="py-4 self-center">
        <div
          class="inline-block w-10 h-10 border-4 border-primary-accent-light border-t-primary-accent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-secondary-text">Loading activity details...</p>
      </div>
      <div v-else-if="error" class="py-4 text-red-500 self-center">
        <p>Error: {{ error.message }}</p>
      </div>
      <div v-else-if="!selectedActivity" class="py-4 self-center">
        Activity not found.
      </div>
      <div v-else class="flex flex-col flex-grow">
        <!-- Content Container - Responsive wrapper with consistent spacing across site -->
        <div
          class="w-full max-w-6xl flex flex-col items-start gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-10"
        >
          <!-- Breadcrumb Navigation - Shows current location in site hierarchy -->
          <div
            class="text-secondary-accent font-figtree text-sm sm:text-base font-normal leading-tight tracking-wide self-start"
          >
            <NuxtLink to="/activities" class="hover:underline"
              >Activities</NuxtLink
            >
            <span class="mx-1">/</span>
            <span>{{ selectedActivity.title }}</span>
          </div>

          <!-- Rest of activity content -->
          <!-- Content Layout Grid - Responsive column structure for content organization -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 w-full">
            <!-- Activity Image - Visual representation of the class or practice -->
            <div class="lg:col-span-5">
              <!-- Display activity image when available -->
              <img
                v-if="
                  selectedActivity.images && selectedActivity.images.length > 0
                "
                :src="selectedActivity.images[0]"
                :alt="`Image for ${selectedActivity.title}`"
                class="object-cover w-full h-auto rounded-lg shadow-md aspect-video"
              />
              <!-- Fallback for missing images -->
              <div
                v-else
                class="flex items-center justify-center w-full text-secondary-text bg-gray-100 rounded-lg aspect-video"
              >
                No Image Available
              </div>
            </div>
            <!-- Activity Details - Information about the class or practice -->
            <div class="lg:col-span-7">
              <!-- Difficulty Indicator - Visual badge showing experience level required -->
              <div class="mb-6">
                <span
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full"
                  :class="getDifficultyClass(selectedActivity.difficulty_level)"
                >
                  {{ getDifficultyLabel(selectedActivity.difficulty_level) }}
                </span>
              </div>

              <!-- Activity Content - Title and detailed description -->
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
          <!-- Schedule Section - Available class times and sessions -->
          <div class="mt-8 w-full">
            <h2
              class="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold text-primary-text"
            >
              Available Sections
            </h2>
            <!-- Schedule Grid - Responsive layout of available sessions -->
            <div
              v-if="
                selectedActivity.schedules &&
                selectedActivity.schedules.length > 0
              "
              class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <!-- Schedule Items - Individual session cards -->
              <SectionCard
                v-for="(schedule, index) in selectedActivity.schedules"
                :key="index"
                :schedule="schedule"
              />
            </div>
            <!-- Empty State - Displayed when no schedules are available -->
            <div
              v-else
              class="p-4 text-center text-secondary-text bg-gray-100 rounded-lg"
            >
              No specific sections or schedules currently listed for this
              activity.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import Vue core functionality
import { onMounted, computed } from "vue";
// Import router utilities for navigation and parameter handling
import { useRoute, useRouter } from "vue-router";
// Import activity data management composable
import { useActivities } from "../../composables/useActivities";
// Import Nuxt head management for SEO
import { useHead } from "nuxt/app";
// Import UI components
import SectionCard from "../../components/ui/SectionCard.vue";

// Initialize activity data and methods from composable
const { selectedActivity, isLoading, error, fetchActivityById } =
  useActivities();
// Set up route and navigation utilities
const route = useRoute();
const router = useRouter();

// Dynamic page title generation for optimal SEO
// Includes activity name and difficulty level for descriptive titles
const pageTitle = computed(() => {
  if (!selectedActivity.value) return "Yoga Activity | Lotus Haven";
  return `${selectedActivity.value.title} | ${getDifficultyLabel(
    selectedActivity.value.difficulty_level
  )} Yoga Class | Lotus Haven`;
});

// Dynamic meta description that includes activity details when available
// Creates SEO-optimized description with activity title and excerpt from description
const pageDescription = computed(() => {
  if (!selectedActivity.value)
    return "Explore our yoga activities and classes at Lotus Haven.";
  return `Join our ${selectedActivity.value.title} yoga class at Lotus Haven. ${
    selectedActivity.value.description
      ? selectedActivity.value.description.substring(0, 120) + "..."
      : `Perfect for ${getDifficultyLabel(
          selectedActivity.value.difficulty_level
        ).toLowerCase()} students.`
  }`;
});

// Configure reactive SEO metadata for activity detail pages
// Uses computed properties to dynamically update based on loaded activity data
useHead(() => ({
  title: pageTitle.value,
  meta: [
    { name: "description", content: pageDescription.value },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Open Graph tags for better social media sharing
    { property: "og:title", content: pageTitle.value },
    { property: "og:description", content: pageDescription.value },
    { property: "og:type", content: "article" },
    // Conditionally include activity image as OG image when available
    ...(selectedActivity.value?.images?.length
      ? [{ property: "og:image", content: selectedActivity.value.images[0] }]
      : []),
  ],
}));

// Navigation handler for the back button
// Returns user to previous page in browser history
const goBack = () => {
  router.back();
};

// Utility for difficulty level styling
// Returns appropriate CSS classes for visual difficulty indicators
const getDifficultyClass = (level: number): string => {
  switch (level) {
    case 1:
      return "bg-green-100 text-green-800"; // Beginner: green
    case 2:
      return "bg-blue-100 text-blue-800"; // Intermediate: blue
    case 3:
      return "bg-orange-100 text-orange-800"; // Advanced: orange
    default:
      return "bg-gray-100 text-gray-800"; // Default: gray
  }
};

// Convert numeric difficulty level to human-readable text
// Used for display labels and accessibility
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

// Fetch activity data when component mounts
// Handles various route parameter formats and validates ID
onMounted(async () => {
  const idParam = route.params.id;
  // Extract and convert activity ID from various possible route parameter formats
  const activityId =
    typeof idParam === "string"
      ? parseInt(idParam, 10)
      : Array.isArray(idParam)
      ? parseInt(idParam[0], 10)
      : null;

  // Validate ID and fetch activity data
  if (activityId !== null && !isNaN(activityId)) {
    console.log("Fetching activity with ID:", activityId);
    await fetchActivityById(activityId);
  } else {
    console.error("Invalid activity ID:", idParam);
  }
});
</script>

<style scoped>
/* Custom loading spinner animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Keyframes for the loading spinner rotation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Preserve text formatting in description */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>
