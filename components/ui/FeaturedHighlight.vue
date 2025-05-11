<template>
  <div class="relative overflow-hidden bg-box rounded-lg shadow-md">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <!-- Visual representation section - displays image or colored background -->
      <div
        v-if="image"
        class="h-64 md:h-full bg-cover bg-center"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div v-else class="h-64 md:h-full" :class="backgroundColorClass"></div>

      <!-- Featured content section with details and schedule -->
      <div class="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div class="flex items-center mb-4">
            <span
              class="px-3 py-1 text-sm text-white rounded-full"
              :class="tagColorClass"
              >Featured</span
            >
            <span
              v-if="difficultyLevel"
              class="ml-2 px-2 py-1 text-xs font-medium rounded-full"
              :class="getDifficultyClass(difficultyLevel)"
            >
              {{ getDifficultyLabel(difficultyLevel) }}
            </span>
          </div>
          <h2 class="text-2xl font-bold mb-3 text-primary-text">{{ title }}</h2>
          <p class="mb-6 text-secondary-text">{{ description }}</p>
        </div>

        <div>
          <div v-if="schedules && schedules.length > 0" class="mb-4">
            <h3
              class="text-sm uppercase tracking-wider text-secondary-text mb-2"
            >
              Upcoming Sessions
            </h3>
            <div class="space-y-2">
              <div
                v-for="(schedule, index) in displayedSchedules"
                :key="index"
                class="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-primary-accent mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm">
                  {{ formatSchedule(schedule) }}
                </span>
              </div>
            </div>
          </div>

          <button
            class="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-accent hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-accent transition-colors"
            @click="$emit('learn-more', id)"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-1.5 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * @interface Schedule
 * @description Represents a session schedule with time, days and optional instructor information
 */
interface Schedule {
  /** The time when the session is held (e.g., "9:00 AM") */
  time: string;
  /** Days of the week when the session is offered */
  days: string[];
  /** Optional information about the instructor leading the session */
  professor?: {
    id: number;
    name: string;
  };
}

/**
 * Component props definition with validation
 */
const props = defineProps({
  /**
   * Unique identifier for the featured item
   * Used for navigation and event handling
   */
  id: {
    type: [Number, String],
    required: true,
  },
  /**
   * Title of the featured class or activity
   */
  title: {
    type: String,
    required: true,
  },
  /**
   * Descriptive text about the featured class or activity
   */
  description: {
    type: String,
    required: true,
  },
  /**
   * URL to the featured item's image
   * If not provided, a colored background will be used
   */
  image: {
    type: String,
    default: "",
  },
  /**
   * Array of available session schedules
   */
  schedules: {
    type: Array as () => Schedule[],
    default: () => [],
  },
  /**
   * Color theme variant for the component
   * Controls background colors and accent elements
   */
  colorVariant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "third"].includes(value),
  },
  /**
   * Difficulty level of the class or activity (1-3)
   * 1: Beginner, 2: Intermediate, 3: Advanced
   */
  difficultyLevel: {
    type: Number,
    default: 1,
  },
});

/**
 * Event emitted when a user clicks the "Learn More" button
 * Passes the ID of the selected item to the parent component
 */
defineEmits(["learn-more"]);

/**
 * Formats schedule information into a human-readable string
 *
 * @param {Schedule} schedule - The schedule object to format
 * @returns {string} Formatted schedule string (e.g., "9:00 AM on Monday, Wednesday with Jane Doe")
 */
const formatSchedule = (schedule: Schedule): string => {
  const daysStr = schedule.days
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(", ");
  const instructorName = schedule.professor
    ? ` with ${schedule.professor.name}`
    : "";
  return `${schedule.time} on ${daysStr}${instructorName}`;
};

/**
 * Limit the number of displayed schedules to prevent overcrowding
 * Shows only the first two available sessions
 */
const displayedSchedules = computed(() => {
  return props.schedules.slice(0, 2);
});

/**
 * Determines the appropriate background color class based on the colorVariant prop
 * Used when no image is provided to maintain visual consistency
 *
 * @returns {string} Tailwind CSS class name for background color
 */
const backgroundColorClass = computed(() => {
  switch (props.colorVariant) {
    case "primary":
      return "bg-primary-accent";
    case "secondary":
      return "bg-secondary-accent";
    case "third":
      return "bg-third-accent";
    default:
      return "bg-primary-accent";
  }
});

/**
 * Determines the color class for the "Featured" tag based on colorVariant
 * Ensures visual consistency with the component's color theme
 *
 * @returns {string} Tailwind CSS class name for the tag background
 */
const tagColorClass = computed(() => {
  switch (props.colorVariant) {
    case "primary":
      return "bg-primary-accent";
    case "secondary":
      return "bg-secondary-accent";
    case "third":
      return "bg-secondary-accent bg-opacity-80";
    default:
      return "bg-primary-accent";
  }
});

/**
 * Maps difficulty level to appropriate visual style classes
 * Color-codes difficulty levels for better user understanding
 *
 * @param {number} level - The difficulty level (1-3)
 * @returns {string} Tailwind CSS classes for styling the difficulty badge
 */
const getDifficultyClass = (level: number): string => {
  switch (level) {
    case 1:
      return "bg-green-100 text-green-800"; // Beginner - green
    case 2:
      return "bg-blue-100 text-blue-800"; // Intermediate - blue
    case 3:
      return "bg-orange-100 text-orange-800"; // Advanced - orange
    default:
      return "bg-gray-100 text-gray-800"; // Fall back to neutral gray
  }
};

/**
 * Converts numeric difficulty level to user-friendly text label
 *
 * @param {number} level - The difficulty level (1-3)
 * @returns {string} Human-readable difficulty label
 */
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
</script>
