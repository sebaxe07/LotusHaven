<template>
  <div class="container px-4 py-8 mx-auto">
    <h1 class="mb-6 text-3xl font-bold">Activities</h1>
    <p class="max-w-2xl mb-8 text-gray-600"> Whether you're here to deepen your breath, build strength, or simply slow down, our diverse offerings are designed to meet you where you are. Explore our classes and find your flow.
    </p>

    <SearchBar v-model="searchQuery" @search="performSearch" />

    <div class="mb-8"> <span v-for="label in filterLabels" :key="label"
                             :class="['inline-block rounded-full px-4 py-1.5 text-sm font-semibold mr-2 mb-2 cursor-pointer transition-colors duration-200',
                     activeFilter === label ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
                             @click="toggleFilter(label)">
        {{ label }}
      </span>
      <button v-if="activeFilter"
              @click="clearFilter"
              class="px-4 py-1.5 ml-2 text-sm font-semibold text-red-700 transition-colors duration-200 bg-red-100 rounded-full mb-2 hover:bg-red-200">
        Clear Filter
      </button>
    </div>

    <div v-if="isLoading" class="py-4 text-center text-gray-500">Loading activities...</div>
    <div v-else-if="error" class="py-4 text-center text-red-500">
      Error loading activities: {{ error.message }}
    </div>
    <div v-else-if="filteredActivities.length === 0" class="py-4 text-center text-gray-500">
      No activities found matching your criteria.
    </div>
    <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
import type { Activity } from '../types/activities.js';
import SearchBar from '../components/ui/SearchBar.vue';
import ActivityCard from '../components/ui/ActivityCard.vue';

// --- State ---
const searchQuery = ref('');
const activeFilter = ref<string | null>(null); // Still used to highlight the active label

// --- Composables ---
const { activities, isLoading, error, fetchActivities } = useActivities();

// --- Data ---
// These labels will become search terms
const filterLabels = ref<string[]>([
  'Gentle', 'Moderate', 'Restorative', 'Dynamic', 'Slow Flow',
  'High Energy', 'Flexibility', 'Hatha'
]);

// --- Computed Properties ---
const filteredActivities = computed(() => {
  let results: Activity[] = [...activities.value];

  // Unified search/filter logic:
  // If there's an activeFilter (meaning a label was clicked), its text is used for searching.
  // Otherwise, if searchQuery has a value (from the SearchBar), that's used.
  const queryToUse = activeFilter.value || searchQuery.value.trim();

  if (queryToUse) {
    const lowerCaseQuery = queryToUse.toLowerCase();
    results = results.filter(activity =>
        (activity.title?.toLowerCase().includes(lowerCaseQuery) || false) ||
        (activity.description?.toLowerCase().includes(lowerCaseQuery) || false) ||
        (activity.short_desc?.toLowerCase().includes(lowerCaseQuery) || false) ||
        // Optional: Search by professor name if available
        (activity.schedules?.some(s => s.professor?.name?.toLowerCase().includes(lowerCaseQuery)) || false)
    );
  }
  // If neither activeFilter nor searchQuery is set, all activities are returned.

  return results;
});

// --- Methods ---
const performSearch = (query: string) => {
  // This function is called by the SearchBar component when its content changes or search is submitted.
  // We need to ensure that if the user types in the search bar, any active label filter is cleared.
  searchQuery.value = query;
  if (query.trim() && activeFilter.value) {
    activeFilter.value = null; // Clear active label if user types in search bar
  } else if (!query.trim() && !activeFilter.value) {
    // If search bar is cleared and no label is active, effectively no search query
    // This case is handled by `queryToUse` being empty in computed prop.
  }
};

const toggleFilter = (label: string) => {
  if (activeFilter.value === label) {
    // Clicking the same active label again
    activeFilter.value = null;
    searchQuery.value = ''; // Clear search query
  } else {
    // Clicking a new label or a label when none is active
    activeFilter.value = label;
    searchQuery.value = label; // Set search query to the label's text
  }
};

const clearFilter = () => {
  activeFilter.value = null;
  searchQuery.value = ''; // Also clear the search query input
};

// --- Lifecycle Hooks ---
onMounted(async () => {
  await fetchActivities();
});

</script>

<style scoped>
</style>