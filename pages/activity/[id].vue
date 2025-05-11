<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Main content section with matching padding from teacher page -->
    <div class="w-full px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col">
      <!-- Back link - exact same positioning as teacher page -->
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

      <!-- Loading / Error / Not Found -->
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
        <!-- Responsive Container - Consistent with teacher page -->
        <div
          class="w-full max-w-6xl flex flex-col items-start gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-10"
        >
          <!-- Breadcrumb - Keep this aligned left exactly like teacher page -->
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
          <!-- Main content grid - fixed responsive columns -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 w-full">
            <!-- Image section -->
            <div class="lg:col-span-5">
              <img
                v-if="
                  selectedActivity.images && selectedActivity.images.length > 0
                "
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

            <!-- Details section -->
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

          <!-- Available Sections -->
          <div class="mt-8 w-full">
            <h2
              class="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold text-primary-text"
            >
              Available Sections
            </h2>
            <div
              v-if="
                selectedActivity.schedules &&
                selectedActivity.schedules.length > 0
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
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useActivities } from "../../composables/useActivities";
import SectionCard from "../../components/ui/SectionCard.vue";

const { selectedActivity, isLoading, error, fetchActivityById } =
  useActivities();
const route = useRoute();
const router = useRouter();

// Add goBack function to match teacher page navigation
const goBack = () => {
  router.back();
};

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
