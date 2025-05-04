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
import { useActivities } from "../composables/useActivities"; // Adjust path if necessary
import type { Activity } from '../types/activities.js'; // Adjust path if necessary
import SearchBar from '../components/ui/SearchBar.vue'; // Adjust path if necessary
import ActivityCard from '../components/ui/ActivityCard.vue'; // Adjust path if necessary

// --- State ---
const searchQuery = ref('');
const activeFilter = ref<string | null>(null); // To store the active label filter

// --- Composables ---
const { activities, isLoading, error, fetchActivities } = useActivities();

// --- Data ---
// Example filter labels - adjust as needed based on your data/categories
const filterLabels = ref([
  'Gentle', 'Moderate', 'Restorative', 'Dynamic', 'Slow Flow',
  'High Energy', 'Flexibility', 'Hatha'
]);

// --- Computed Properties ---
const filteredActivities = computed(() => {
  let results = activities.value;

  // Apply search query filter
  if (searchQuery.value.trim()) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    results = results.filter((activity: any) =>
            activity.title.toLowerCase().includes(lowerCaseQuery) ||
            activity.description.toLowerCase().includes(lowerCaseQuery) ||
            activity.short_desc.toLowerCase().includes(lowerCaseQuery)
        // Add more fields to search if needed (e.g., professor name)
        // (activity.schedules?.some(s => s.professor?.name.toLowerCase().includes(lowerCaseQuery)))
    );
  }

  // Apply active label filter (Needs logic based on your Activity data)
  // *** IMPORTANT: You need to decide HOW labels map to your Activity data.
  // Example: Assuming Activity has a 'tags' or 'category' array/string property
  /*
  if (activeFilter.value) {
    const lowerCaseFilter = activeFilter.value.toLowerCase();
    results = results.filter(activity =>
      activity.tags?.some(tag => tag.toLowerCase() === lowerCaseFilter) // Example: if activity.tags is an array
      // OR if it's a single category string:
      // activity.category?.toLowerCase() === lowerCaseFilter
    );
  }
  */

  return results;
});

// --- Methods ---
const performSearch = (query: string) => {
  // The search filtering is now handled reactively by the computed property
  // This function could be used for more complex search actions if needed (e.g., API calls)
  console.log('Search triggered for:', query);
};

const toggleFilter = (label: string) => {
  if (activeFilter.value === label) {
    activeFilter.value = null; // Deselect if clicking the active filter
  } else {
    activeFilter.value = label; // Select the clicked filter
  }
  // You might want to reset the search query when a filter is applied/cleared
  // searchQuery.value = '';
};

const clearFilter = () => {
  activeFilter.value = null;
}

// --- Lifecycle Hooks ---
onMounted(async () => {
  // Fetch all activities when component mounts
  // Consider fetching only *after* user interaction if the list is very large
  await fetchActivities();
});

</script>

<style scoped>
</style>