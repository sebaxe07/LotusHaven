<template>
  <div
    class="flex items-center justify-between bg-white rounded-lg shadow w-full overflow-hidden p-4 sm:p-6 mb-4 gap-3 transition-all hover:shadow-md cursor-pointer"
    @click="$emit('click')"
  >
    <!-- Teacher activity icon - Displays dynamic yoga icon based on icon_id prop -->
    <div
      class="min-w-[50px] w-[50px] sm:min-w-[65px] sm:w-[65px] md:min-w-[72px] md:w-[72px] aspect-square flex items-center justify-center bg-white rounded"
    >
      <UiSvgIcon
        :icon="`/icons/yoga${props.icon_id}.svg`"
        :width="60"
        :height="60"
        class="w-full h-full object-contain"
        :color="'var(--color-primary-accent)'"
      />
    </div>

    <!-- Schedule information - Displays title and formatted schedule time -->
    <div class="flex flex-col justify-center flex-grow overflow-hidden">
      <h3 class="text-sm sm:text-base font-semibold text-primary-text truncate">
        {{ title }}
      </h3>
      <p class="text-xs sm:text-sm text-secondary-text mt-1 truncate">
        {{ time }} on {{ formattedDays }}
      </p>
    </div>

    <!-- Navigation button - Forwards to detailed schedule view -->
    <button
      class="min-w-[32px] w-8 h-8 bg-primary-accent rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
      aria-label="View details of this class"
      @click.stop="$emit('click')"
    >
      <UiSvgIcon
        icon="/icons/arrow.svg"
        :width="16"
        :height="16"
        :color="'white'"
        class="rotate-180"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  id: number | string; // Unique identifier for the schedule
  title: string; // Title of the scheduled activity
  // Using snake_case to match API data structure
  // eslint-disable-next-line vue/prop-name-casing
  icon_id: number; // ID for the yoga icon to display
  time: string; // Time of the scheduled activity (formatted string)
  days: string[]; // Array of days when the activity occurs
}>();

// Format days array into a comma-separated string with capitalized day names
const formattedDays = computed(() => {
  return props.days
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(", ");
});

// Define component events - click event for navigation
defineEmits(["click"]);
</script>

<style scoped>
/* Enhanced visual feedback when hovering over interactive elements */
button:hover {
  box-shadow: 0 0 8px var(--color-primary-accent-light);
}
</style>
