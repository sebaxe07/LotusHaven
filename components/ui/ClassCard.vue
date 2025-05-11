<template>
  <div class="bg-box rounded-lg overflow-hidden shadow-md h-full flex flex-col">
    <!-- Visual representation of the class -->
    <div
      v-if="image"
      class="h-48 bg-cover bg-center"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div v-else class="h-48" :class="backgroundColorClass"></div>

    <div class="p-6 flex flex-col flex-grow">
      <!-- Class information section -->
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-secondary-text mb-4 flex-grow">{{ description }}</p>

      <!-- Class availability and action button -->
      <div class="flex justify-between items-center">
        <span class="font-semibold text-primary-accent">
          <span v-if="sessionCount > 0"
            >{{ sessionCount }} sessions available</span
          >
          <span v-else>Check schedule</span>
        </span>
        <UiButton text="Learn More" size="sm" @click="handleLearnMore" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * @interface Schedule
 * @description Represents a class schedule with time, days and optional instructor information
 */
interface Schedule {
  /** The time when the class is held (e.g., "9:00 AM") */
  time: string;
  /** Days of the week when the class is offered */
  days: string[];
  /** Optional information about the instructor leading the class */
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
   * URL to the class image
   * If not provided, a colored background will be used instead
   */
  image: {
    type: String,
    default: "",
  },
  /**
   * Title of the class (required)
   */
  title: {
    type: String,
    required: true,
  },
  /**
   * Short description of the class (required)
   */
  description: {
    type: String,
    required: true,
  },
  /**
   * Array of available class schedules
   */
  schedules: {
    type: Array as () => Schedule[],
    default: () => [],
  },
  /**
   * Unique identifier for the class
   * Used for navigation and event handling
   */
  id: {
    type: [String, Number],
    required: true,
  },
  /**
   * Color theme variant for cards without images
   * Controls the background color when no image is provided
   */
  colorVariant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "third"].includes(value),
  },
});

/**
 * Event emitters for component interactions
 */
const emit = defineEmits(["learnMore"]);

/**
 * Computed property that returns the number of available class sessions
 * @returns {number} Count of scheduled sessions for this class
 */
const sessionCount = computed(() => {
  return props.schedules?.length || 0;
});

/**
 * Computed property that determines the appropriate background color class
 * based on the colorVariant prop when no image is provided
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
 * Handles the Learn More button click event
 * Emits the learnMore event with the class ID for parent components to handle navigation
 */
const handleLearnMore = () => {
  emit("learnMore", props.id);
};
</script>
