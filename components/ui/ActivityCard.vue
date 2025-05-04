<template>
  <div class="p-6 transition-shadow duration-300 bg-gray-100 rounded-lg shadow-sm hover:shadow-md">
    <div class="flex items-start space-x-4">
      <UiSvgIcon
        :icon="getIconPath(activity.icon_id)"
        class="w-12 h-12 mt-1 text-teal-500"
        />
      <div class="flex-1">
        <h3 class="mb-2 text-xl font-semibold text-gray-800">{{ activity.title }}</h3>
        <p class="mb-4 text-sm text-gray-600">{{ activity.short_desc }}</p>
        <Button>Learn more</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from '../../types/activities.js';
import Button from "./Button.vue"; // Adjust path if necessary

// Define the prop for the activity data
const props = defineProps<{
  activity: Activity;
}>();

// --- Icon Mapping ---
// You MUST replace this with your actual icon paths or logic
// Assuming you have icons named like 'icon-1.svg', 'icon-2.svg' in your /public/icons/ folder
const getIconPath = (iconId: number): string => {
  // Basic example, adjust path and extension as needed
  if (iconId >= 1 && iconId <= 6) {
    return `/icons/activity-icon-${iconId}.svg`; // Example path
  }
  return '/icons/default-icon.svg'; // Fallback icon
};
// --- End Icon Mapping ---

// Method to handle "Learn More" click (e.g., navigate to a details page)
const learnMore = () => {
  console.log('Learn more about:', props.activity.title);
  // Example navigation (if you have activity detail pages):
  // useRouter().push(`/activities/${props.activity.id}`);
};
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>