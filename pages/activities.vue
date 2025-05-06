<template>
  <div class="container px-4 py-6 sm:py-8 mx-auto">
    <h1 class="mb-4 text-2xl sm:text-3xl font-bold">Activities</h1>
    <p class="max-w-2xl mb-6 sm:mb-8 text-sm sm:text-base text-gray-600">
      Whether you're here to deepen your breath, build strength, or simply slow
      down, our diverse offerings are designed to meet you where you are.
      Explore our classes and find your flow.
    </p>

    <!-- Search bar with responsive padding -->
    <div class="mb-6">
      <SearchBar v-model="searchQuery" @search="performSearch" />
    </div>

    <!-- Filter labels with better mobile handling -->
    <div class="filter-container mb-6 sm:mb-8">
      <div class="flex flex-wrap gap-2 mb-2">
        <span
          v-for="label in filterLabels"
          :key="label"
          :class="[
            'inline-block rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-200',
            activeFilter === label
              ? 'bg-teal-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="toggleFilter(label)"
        >
          {{ label }}
        </span>
      </div>
      <button
        v-if="activeFilter"
        class="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-red-700 transition-colors duration-200 bg-red-100 rounded-full hover:bg-red-200"
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

    <!-- State handling (loading, error, empty) -->
    <div v-if="isLoading" class="py-8 text-center">
      <div
        class="inline-block w-10 h-10 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"
      ></div>
      <p class="mt-4 text-gray-500">Loading activities...</p>
    </div>
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
        class="px-4 py-2 mt-4 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600"
        @click="retryLoading"
      >
        Retry
      </button>
    </div>
    <div v-else-if="filteredActivities.length === 0" class="py-8 text-center">
      <div
        class="inline-flex items-center justify-center w-12 h-12 mb-4 text-gray-500 bg-gray-100 rounded-full"
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
      <p class="text-gray-500">No activities found matching your criteria.</p>
      <button
        v-if="searchQuery || activeFilter"
        class="px-4 py-2 mt-4 text-sm font-medium text-teal-700 border border-teal-300 rounded-md bg-teal-50 hover:bg-teal-100"
        @click="clearSearch"
      >
        Clear filters
      </button>
    </div>

    <!-- Responsive grid that works well at all screen sizes -->
    <div
      v-else
      class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ActivityCard
        v-for="activity in filteredActivities"
        :key="activity.id"
        :activity="activity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useActivities } from "../composables/useActivities.js";
import type { Activity } from "../types/activities.js";
import SearchBar from "../components/ui/SearchBar.vue";
import ActivityCard from "../components/ui/ActivityCard.vue";

const searchQuery = ref("");
const activeFilter = ref<string | null>(null);

const { activities, isLoading, error, fetchActivities } = useActivities();

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

const filteredActivities = computed(() => {
  let results: Activity[] = [...activities.value];

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

const performSearch = (query: string) => {
  searchQuery.value = query;
  if (query.trim() && activeFilter.value) {
    activeFilter.value = null;
  } else if (!query.trim() && !activeFilter.value) {
    // If search bar is cleared and no label is active, effectively no search query
    // This case is handled by `queryToUse` being empty in computed prop.
  }
};

const toggleFilter = (label: string) => {
  if (activeFilter.value === label) {
    activeFilter.value = null;
    searchQuery.value = "";
  } else {
    activeFilter.value = label;
    searchQuery.value = label;
  }
};

const clearFilter = () => {
  activeFilter.value = null;
  searchQuery.value = "";
};

const clearSearch = () => {
  activeFilter.value = null;
  searchQuery.value = "";
};

const retryLoading = async () => {
  await fetchActivities();
};

onMounted(async () => {
  await fetchActivities();
});
</script>

<style scoped>
.filter-container {
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.filter-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
