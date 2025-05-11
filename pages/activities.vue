<template>
  <div class="container px-4 py-6 sm:py-8 mx-auto">
    <!-- Page Header - Main title and introductory text -->
    <h1 class="mb-4 text-2xl sm:text-3xl font-bold text-primary-text">
      Activities
    </h1>
    <p class="max-w-2xl mb-6 sm:mb-8 text-sm sm:text-base text-secondary-text">
      Whether you're here to deepen your breath, build strength, or simply slow
      down, our diverse offerings are designed to meet you where you are.
      Explore our classes and find your flow.
    </p>

    <!-- Search Component - Text input for filtering activities by keyword -->
    <div class="mb-6">
      <SearchBar v-model="searchQuery" @search="performSearch" />
    </div>

    <!-- Quick Filter Tags - Horizontally scrollable category filter buttons -->
    <div class="filter-container mb-6 sm:mb-8 stable-layout">
      <div class="flex flex-wrap items-center gap-2">
        <span
          v-for="label in filterLabels"
          :key="label"
          :class="[
            'inline-block rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-200',
            activeFilter === label
              ? 'bg-primary-accent text-white'
              : 'bg-gray-200 text-secondary-text hover:bg-gray-300',
          ]"
          @click="toggleFilter(label)"
        >
          {{ label }}
        </span>

        <button
          v-if="activeFilter"
          class="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-red-700 transition-colors duration-200 bg-red-100 rounded-full hover:bg-red-200 cursor-pointer"
          @click="clearFilter"
        >
          <span class="mr-1">Clear</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-3.5 h-3.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading State - Animated spinner while fetching activity data -->
    <div v-if="isLoading" class="py-8 text-center">
      <div
        class="inline-block w-10 h-10 border-4 border-primary-accent-light border-t-primary-accent rounded-full animate-spin"
      ></div>
      <p class="mt-4 text-secondary-text">Loading activities...</p>
    </div>
    <!-- Error State - User-friendly error display with retry option -->
    <div v-else-if="error" class="py-8 text-center">
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
      <p class="text-red-500">Error loading activities: {{ error.message }}</p>
      <button
        class="px-4 py-2 mt-4 text-sm font-medium text-white bg-primary-accent rounded-md hover:bg-primary-accent-dark"
        @click="retryLoading"
      >
        Retry
      </button>
    </div>
    <!-- Empty Search Results - Displayed when filters return no matches -->
    <div v-else-if="filteredActivities.length === 0" class="py-8 text-center">
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
      <p class="text-secondary-text">
        No activities found matching your criteria.
      </p>
      <!-- Reset Button - Clears all active filters -->
      <button
        v-if="searchQuery || activeFilter"
        class="px-4 py-2 mt-4 text-sm font-medium text-primary-accent-dark border border-primary-accent-light rounded-md bg-primary-accent-lightest hover:bg-primary-accent-light cursor-pointer"
        @click="clearSearch"
      >
        Clear filters
      </button>
    </div>
    <template v-else>
      <!-- Results Heading - Section title for available activities -->
      <h2 class="mt-4 mb-6 text-xl sm:text-2xl font-semibold text-primary-text">
        Available Classes
      </h2>

      <!-- Activity Grid - Responsive layout for displaying activity cards -->
      <div
        class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <!-- Activity Card Components - Individual class listings -->
        <ActivityCard
          v-for="activity in filteredActivities"
          :key="activity.id"
          :activity="activity"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useActivities } from "../composables/useActivities.js";
import { useHead } from "nuxt/app";
import type { Activity } from "../types/activities.js";
import SearchBar from "../components/ui/SearchBar.vue";
import ActivityCard from "../components/ui/ActivityCard.vue";

// Configure SEO metadata for activities page with proper titles and descriptions
useHead({
  title: "Yoga Classes & Activities | Lotus Haven",
  meta: [
    {
      name: "description",
      content:
        "Explore our diverse range of yoga classes and wellness activities at Lotus Haven. From gentle and restorative to dynamic and high-energy sessions for all experience levels.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Open Graph tags for better social media sharing
    {
      property: "og:title",
      content: "Yoga Classes & Activities | Lotus Haven",
    },
    {
      property: "og:description",
      content:
        "Explore our diverse range of yoga classes and wellness activities at Lotus Haven.",
    },
    { property: "og:type", content: "website" },
  ],
});

// Search and filter state management
const searchQuery = ref(""); // Tracks user input in search field
const activeFilter = ref<string | null>(null); // Currently selected filter tag

// Initialize activities data and methods from composable
const { activities, isLoading, error, fetchActivities } = useActivities();

// Available filter categories for quick selection
// Represents common activity types users can filter by
const filterLabels = ref<string[]>([
  "Gentle",
  "Moderate",
  "Restorative",
  "Dynamic",
  "Slow Flow",
  "High Energy",
  "Flexibility",
  "Hatha",
]);

// Computed property that filters activities based on search query or active filter
// Returns activities that match the current filter criteria across various fields
const filteredActivities = computed(() => {
  let results: Activity[] = [...activities.value];

  // Use either the tag filter or the search box input, prioritizing the active filter
  const queryToUse = activeFilter.value || searchQuery.value.trim();

  if (queryToUse) {
    const lowerCaseQuery = queryToUse.toLowerCase();
    results = results.filter(
      (activity) =>
        activity.title?.toLowerCase().includes(lowerCaseQuery) ||
        false ||
        activity.description?.toLowerCase().includes(lowerCaseQuery) ||
        false ||
        activity.short_desc?.toLowerCase().includes(lowerCaseQuery) ||
        false ||
        activity.schedules?.some((s) =>
          s.professor?.name?.toLowerCase().includes(lowerCaseQuery)
        ) ||
        false
    );
  }

  return results;
});

// Handler for search input events
// Updates search state and manages interaction between search and filter tags
const performSearch = (query: string) => {
  searchQuery.value = query;
  if (query.trim() && activeFilter.value) {
    // Clear any active filter tags when manually typing a search query
    activeFilter.value = null;
  } else if (!query.trim() && !activeFilter.value) {
    // If search bar is cleared and no label is active, effectively no search query
    // This case is handled by `queryToUse` being empty in computed prop
  }
};

// Toggle filter tags when clicked
// Handles selection, deselection, and synchronization with search input
const toggleFilter = (label: string) => {
  if (activeFilter.value === label) {
    // If clicking the already active filter, clear it
    activeFilter.value = null;
    searchQuery.value = "";
  } else {
    // Activate the selected filter and update search query to match
    activeFilter.value = label;
    searchQuery.value = label;
  }
};

// Clear only the active filter tag selection
const clearFilter = () => {
  activeFilter.value = null;
  searchQuery.value = "";
};

// Reset all search and filter states
// Used by the "Clear filters" button in empty results view
const clearSearch = () => {
  activeFilter.value = null;
  searchQuery.value = "";
};

// Retry fetching activities after an error
// Called when user clicks the retry button in error state
const retryLoading = async () => {
  await fetchActivities();
};

// Initialize page data on component mount
// Loads all activities from API or data source
onMounted(async () => {
  await fetchActivities();
});
</script>

<style scoped>
/* Horizontal scrolling container for filter tags with hidden scrollbar */
.filter-container {
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar while preserving scrolling functionality */
.filter-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Layout stabilization to prevent content shifts */
.stable-layout {
  /* Force the browser to calculate layout as if scrollbar is always present */
  overflow-y: scroll;
  /* Hide the extra scrollbar */
  overflow-y: hidden;
  /* Add a bit of bottom padding to ensure no content is cut off */
  padding-bottom: 1px;
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
