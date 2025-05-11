<template>
  <div class="relative w-full">
    <!-- Navigation arrow for scrolling left -->
    <div
      v-if="canScrollLeft"
      class="absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-opacity"
      :class="{ 'opacity-0': !canScrollLeft, 'opacity-100': canScrollLeft }"
    >
      <UiCarouselArrow direction="left" :size="40" @click="scrollLeft" />
    </div>

    <!-- Main carousel container with horizontally scrolling content -->
    <div class="px-10 overflow-hidden">
      <div
        ref="carouselContainer"
        class="carousel-container flex overflow-x-auto py-4 carousel-no-scrollbar snap-x"
        @wheel="onWheel"
        @scroll="handleScroll"
      >
        <!-- Individual class card items with dynamic width -->
        <div
          v-for="activity in activities"
          :key="activity.id"
          :style="{ width: cardWidth, minWidth: cardWidth }"
          class="px-2 snap-start"
        >
          <UiClassCard
            :id="activity.id"
            :title="activity.title"
            :description="
              activity.short_desc ||
              activity.description.substring(0, 120) + '...'
            "
            :image="activity.image"
            :schedules="activity.schedules"
            :color-variant="activity.colorVariant"
            @learn-more="$emit('learn-more', activity.id)"
          />
        </div>
      </div>
    </div>

    <!-- Navigation arrow for scrolling right -->
    <div
      v-if="canScrollRight"
      class="absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-opacity"
      :class="{ 'opacity-0': !canScrollRight, 'opacity-100': canScrollRight }"
    >
      <UiCarouselArrow direction="right" :size="40" @click="scrollRight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import type { ClassCardItem } from "../../types/activities";

/**
 * Component props definition
 */
defineProps({
  /**
   * Array of class/activity items to display in the carousel
   * Each item contains details like image, title, description, and scheduling info
   */
  activities: {
    type: Array as () => ClassCardItem[],
    required: true,
  },
});

/**
 * Event emitted when a user clicks "Learn More" on a class card
 * Passes the ID of the selected class to the parent component
 */
defineEmits<{
  "learn-more": [id: number];
}>();

/**
 * Reference to the DOM element containing the scrollable carousel content
 */
const carouselContainer = ref<HTMLElement | null>(null);

/**
 * Base sensitivity multiplier for mousewheel scrolling
 * Higher values make the carousel scroll faster
 */
const SCROLL_SENSITIVITY = 1.2;

/**
 * Reactive state variables to track scroll position for arrow visibility
 */
const canScrollLeft = ref(false);
const canScrollRight = ref(true); // Default to true until fully rendered

/**
 * Tracks current viewport width for responsive design
 * Falls back to desktop size if window is not available (SSR)
 */
const screenWidth = ref(
  typeof window !== "undefined" ? window.innerWidth : 1024
);

/**
 * Computes the number of cards to display based on screen width breakpoints
 * Uses fractional values for some breakpoints to show partial cards
 * @returns {number} Number of cards to display at current viewport width
 */
const cardsToShow = computed(() => {
  if (screenWidth.value < 640) return 1.2; // Mobile: 1.2 cards
  if (screenWidth.value < 768) return 1.5; // Small tablet: 1.5 cards
  if (screenWidth.value < 1024) return 2; // Tablet: 2 cards
  if (screenWidth.value < 1280) return 2.5; // Small desktop: 2.5 cards
  return 3; // Desktop: 3 cards
});

/**
 * Calculates the width for each card as a percentage of container width
 * Accounts for margins between cards to create consistent spacing
 * @returns {string} CSS calculation string for card width
 */
const cardWidth = computed(() => {
  const containerWidth = 100; // Base percentage width
  return `calc(${containerWidth / cardsToShow.value}% - 1rem)`;
});

/**
 * Handles window resize events to update responsive layout
 * Updates screen width measurement and recalculates scroll positions
 */
const handleResize = () => {
  screenWidth.value = window.innerWidth;

  // Delay scroll state check to ensure DOM updates are complete
  setTimeout(() => {
    handleScroll();
  }, 100);
};

/**
 * Updates navigation arrow visibility based on current scroll position
 * Shows/hides arrows depending on whether user can scroll in each direction
 */
const handleScroll = () => {
  if (!carouselContainer.value) return;

  const container = carouselContainer.value;

  // Show left arrow if not at beginning of carousel (with small threshold)
  canScrollLeft.value = container.scrollLeft > 5;

  // Show right arrow if not at end of carousel (with small buffer)
  canScrollRight.value =
    container.scrollLeft < container.scrollWidth - container.clientWidth - 5;
};

/**
 * Scrolls the carousel left by one card width when left arrow is clicked
 * Uses smooth scrolling animation for better user experience
 */
const scrollLeft = () => {
  if (carouselContainer.value) {
    const scrollAmount =
      carouselContainer.value.clientWidth / cardsToShow.value;
    carouselContainer.value.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }
};

/**
 * Scrolls the carousel right by one card width when right arrow is clicked
 * Uses smooth scrolling animation for better user experience
 */
const scrollRight = () => {
  if (carouselContainer.value) {
    const scrollAmount =
      carouselContainer.value.clientWidth / cardsToShow.value;
    carouselContainer.value.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};

/**
 * Handles mousewheel events to enable horizontal scrolling with the mousewheel
 * Provides a natural scrolling experience while preventing page scrolling conflicts
 * @param {WheelEvent} e - The wheel event object
 */
const onWheel = (e: WheelEvent) => {
  if (!carouselContainer.value) return;

  const container = carouselContainer.value;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  // Allow vertical scrolling when carousel is at either edge
  if (
    (e.deltaY > 0 && container.scrollLeft >= maxScrollLeft - 5) || // At right edge
    (e.deltaY < 0 && container.scrollLeft <= 5) // At left edge
  ) {
    return; // Let default vertical scroll behavior happen
  }

  // Prevent vertical page scrolling when scrolling horizontally
  e.preventDefault();

  // Adjust sensitivity dynamically based on scroll speed
  const deltaMagnitude = Math.abs(e.deltaY);
  const dynamicSensitivity =
    SCROLL_SENSITIVITY * (1 + Math.min(1.5, deltaMagnitude / 100));

  // Apply horizontal scrolling with calculated sensitivity
  container.scrollLeft += e.deltaY * dynamicSensitivity;
};

/**
 * Component lifecycle hook for initialization
 * Sets up event listeners and initializes component state
 */
onMounted(() => {
  const container = carouselContainer.value;
  if (container) {
    // Register wheel event with passive: false to allow preventDefault()
    container.addEventListener("wheel", onWheel, { passive: false });
  }

  // Set up responsive behavior
  window.addEventListener("resize", handleResize);
  handleResize();

  // Initialize scroll arrow visibility after content renders
  setTimeout(() => {
    handleScroll();
  }, 200);
});

/**
 * Component lifecycle hook for cleanup
 * Removes event listeners to prevent memory leaks
 */
onBeforeUnmount(() => {
  if (carouselContainer.value) {
    carouselContainer.value.removeEventListener("wheel", onWheel);
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/**
 * Cross-browser styles to hide scrollbars while maintaining scroll functionality
 * Ensures a clean visual appearance across different browsers
 */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/**
 * Smooth scrolling behavior styles
 * Ensures fluid motion and touch responsiveness
 */
.carousel-container {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS devices */
}

/**
 * Enhanced scrollbar hiding for the carousel
 * Ensures no scrollbars appear across all browsers and modes
 */
.carousel-no-scrollbar {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
}

.carousel-no-scrollbar::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari and Opera */
  width: 0 !important;
  height: 0 !important;
}

/**
 * Additional override styles to handle all scrollbar parts
 * Ensures complete scrollbar hiding even with custom scrollbar themes
 */
.carousel-no-scrollbar::-webkit-scrollbar-track,
.carousel-no-scrollbar::-webkit-scrollbar-thumb,
.carousel-no-scrollbar::-webkit-scrollbar-thumb:hover {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}
</style>
