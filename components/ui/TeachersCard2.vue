<template>
  <div
    class="teacher-card flex flex-col justify-between cursor-pointer transition-all hover:shadow-lg bg-gray-100 rounded-lg"
    :class="cardClasses"
    @click="handleClick"
  >
    <!-- Teacher profile image with responsive sizing -->
    <div
      class="teacher-image w-full h-[50%] rounded-t-lg bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: `url(${imageUrl})`,
      }"
    ></div>

    <!-- Teacher information and activities container -->
    <div class="p-4 flex flex-col h-[50%]">
      <div class="flex items-center justify-between mb-2">
        <!-- Teacher name with semantic heading -->
        <h2 class="font-semibold text-primary-text text-xl">
          {{ name }}
        </h2>
        <!-- Navigation arrow with hover effect -->
        <UiSvgIcon
          icon="/icons/arrow.svg"
          :width="24"
          :height="24"
          :color="arrowColor"
          class="transform rotate-180 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
      <!-- Teacher biography with line clamping for consistent height -->
      <p class="text-sm text-secondary-text line-clamp-2 mb-3">
        {{ shortBio }}
      </p>

      <!-- Associated activities with interactive tags -->
      <div class="mt-auto">
        <!-- Section heading for activities -->
        <h3 class="font-semibold text-primary-text text-base mb-2">
          Activities
        </h3>
        <div class="activities-container">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="activity-tag bg-primary-accent text-white hover:bg-primary-accent-dark px-2 py-1 mb-1.5 mr-1.5 inline-block cursor-pointer transition-colors"
            @click.stop="handleActivityClick(activity.id)"
          >
            {{ formatActivityName(activity.title) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

/**
 * Interface defining required properties for the teacher card component
 */
interface TeacherCardProps {
  /** Unique identifier for the teacher */
  id: number;
  /** Teacher's display name */
  name: string;
  /** Brief teacher biography */
  shortBio: string;
  /** URL to teacher's profile image */
  imageUrl: string;
  /** List of activities associated with this teacher */
  activities: { id: number; title: string }[];
  /** Card size variant for responsive layouts */
  size?: "sm" | "md" | "lg";
}

/**
 * Component props with default values
 */
const props = withDefaults(defineProps<TeacherCardProps>(), {
  size: "md", // Medium size by default
});

/**
 * Navigation arrow color using CSS custom property
 */
const arrowColor = ref("var(--color-primary-accent)");

/**
 * Event emitters for component interactions
 */
const emit = defineEmits<{
  /** Emitted when the card is clicked to view teacher details */
  (e: "click", id: number): void;
  /** Emitted when a specific activity tag is clicked */
  (
    e: "activity-click",
    payload: { teacherId: number; activityId: number }
  ): void;
}>();

/**
 * Formats activity names for optimal display within limited space
 * Uses intelligent truncation based on word structure and length
 *
 * @param {string} name - The original activity name
 * @returns {string} Formatted activity name for display
 */
const formatActivityName = (name: string) => {
  // Handle long activity names
  if (name.length > 15) {
    // Use word-based truncation for multi-word names
    if (name.includes(" ")) {
      const words = name.split(" ");
      // Use first word if it's substantial enough
      if (words[0].length >= 6) {
        return words[0];
      }
      // Otherwise use abbreviated form of first two words
      else if (words.length >= 2) {
        return `${words[0]} ${words[1].substring(0, 3)}`;
      }
    }
    // Truncate single long words
    return name.substring(0, 12) + "...";
  }
  // Keep short names intact
  return name;
};

/**
 * Handles clicks on activity tags
 * Prevents event bubbling to avoid triggering card click simultaneously
 *
 * @param {number} activityId - ID of the clicked activity
 */
const handleActivityClick = (activityId: number) => {
  emit("activity-click", { teacherId: props.id, activityId });
};

/**
 * Handles clicks on the overall teacher card
 * Emits the teacher ID for navigation to detail page
 */
const handleClick = () => {
  emit("click", props.id);
};

/**
 * Dynamically calculates card size classes based on selected variant
 * Provides consistent dimensions for different display contexts
 *
 * @returns {string} CSS classes for card dimensions
 */
const cardClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-full max-w-[280px] h-[360px]"; // Small card
    case "lg":
      return "w-full max-w-[380px] h-[460px]"; // Large card
    case "md":
    default:
      return "w-full max-w-[330px] h-[420px]"; // Medium card (default)
  }
});
</script>

<style scoped>
/* Container for activity tags with vertical scrolling */
.activities-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  max-height: 80px; /* Fixed height to ensure consistent card sizing */
  overflow-y: auto;
  padding-right: 4px; /* Space for scrollbar */
}

/* Individual activity tag styling */
.activity-tag {
  border-radius: var(--radius-base);
  margin-right: 0.375rem;
}

/* Remove margin from last tag in a row */
.activity-tag:last-child {
  margin-right: 0;
}

/* Custom scrollbar styling for activities container */
.activities-container::-webkit-scrollbar {
  width: 4px !important;
}

.activities-container::-webkit-scrollbar-thumb {
  background: var(--color-primary-accent) !important;
  border-radius: 4px !important;
}

.activities-container::-webkit-scrollbar-track {
  background: var(--color-primary) !important;
}

/* Cross-browser scrollbar hiding utilities */
.carousel-no-scrollbar {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
}

.carousel-no-scrollbar::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari and Opera */
  width: 0 !important;
  height: 0 !important;
}

/* Complete scrollbar hiding for all browser variations */
.carousel-no-scrollbar::-webkit-scrollbar-track,
.carousel-no-scrollbar::-webkit-scrollbar-thumb,
.carousel-no-scrollbar::-webkit-scrollbar-thumb:hover {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}

/* Enhanced scrolling experience for activity carousel */
.activities-carousel {
  scroll-behavior: smooth; /* Smooth transitions during scrolling */
  scroll-padding: 0.5rem; /* Space padding during scroll snapping */
  -webkit-overflow-scrolling: touch; /* Improved iOS scrolling */
  /* Fading gradient effect at the edges */
  mask-image: linear-gradient(to right, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
}

/* Overall card styling and animations */
.teacher-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden; /* Contain image within rounded borders */
}

/* Responsive adjustments for small screens */
@media (max-width: 640px) {
  .teacher-card {
    max-width: 100%; /* Full width on mobile */
  }
}

/* Apply hover effects only on devices that support hover */
@media (hover: hover) {
  .teacher-card:hover {
    transform: translateY(-5px); /* Subtle lift effect on hover */
  }
}
</style>
