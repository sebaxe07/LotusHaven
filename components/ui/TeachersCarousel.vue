<!-- 
  TeachersCarousel Component
  
  A responsive, horizontally scrolling carousel used to display teacher cards.
  Features:
  - Responsive layout that adapts to different screen sizes
  - Navigation arrows that appear/disappear based on scroll position
  - Horizontal scrolling with mouse wheel support
  - Smooth scrolling behavior
  - Card width calculation based on viewport width
-->
<template>
  <div class="relative w-full">
    <!-- Left arrow navigation - responsive positioning -->
    <div
      v-if="canScrollLeft"
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10 transition-opacity md:-translate-x-1/2"
      :class="{ 'opacity-0': !canScrollLeft, 'opacity-100': canScrollLeft }"
    >
      <UiCarouselArrow direction="left" :size="40" @click="scrollLeft" />
    </div>

    <!-- Carousel container with horizontal scrolling -->
    <div
      ref="carouselContainer"
      class="carousel-container flex overflow-x-auto py-4 carousel-no-scrollbar snap-x"
      @wheel="onWheel"
      @scroll="handleScroll"
    >
      <slot v-bind="{ cardWidth }"></slot>
    </div>

    <!-- Right arrow navigation - responsive positioning -->
    <div
      v-if="canScrollRight"
      class="absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-opacity md:translate-x-1/2"
      :class="{ 'opacity-0': !canScrollRight, 'opacity-100': canScrollRight }"
    >
      <UiCarouselArrow direction="right" :size="40" @click="scrollRight" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component TeachersCarousel
 * @description A responsive horizontal carousel component for displaying teacher cards with:
 * - Dynamic card sizing based on viewport width
 * - Custom horizontal scrolling behavior with mouse wheel support
 * - Navigation arrows that appear/disappear based on scroll position
 * - Smooth scrolling animation when using arrow navigation
 * - Touch-friendly interactions for mobile devices
 */
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

/**
 * Reference to the carousel container element for DOM manipulation
 */
const carouselContainer = ref<HTMLElement | null>(null);

/**
 * Multiplier for wheel scroll speed to enhance horizontal scrolling responsiveness
 */
const SCROLL_SENSITIVITY = 1.2;

/**
 * Reactive states to track scroll position for showing/hiding navigation arrows
 */
const canScrollLeft = ref(false);
const canScrollRight = ref(true); // Default to true since most carousels have content to scroll

/**
 * Current viewport width for responsive calculations
 * Falls back to 1024px during SSR when window is not available
 */
const screenWidth = ref(
  typeof window !== "undefined" ? window.innerWidth : 1024
);

/**
 * Computes the number of cards to display based on the current viewport width
 * @returns {number} Number of cards to display (can include partial cards)
 */
const cardsToShow = computed(() => {
  if (screenWidth.value < 640) return 1.5; // Mobile: 1.5 cards
  if (screenWidth.value < 768) return 2; // Small tablet: 2 cards
  if (screenWidth.value < 1024) return 3; // Tablet: 3 cards
  return 4; // Desktop: exactly 4 cards
});

/**
 * Calculates individual card width as a percentage of container width
 * @returns {string} CSS percentage width value for each card
 */
const cardWidth = computed(() => {
  // Account for the margins (mx-2 = 0.5rem on each side = 1rem total per card)
  const containerWidth = 100; // 100%

  // For exact fit, calculate width considering the margins
  return `${containerWidth / cardsToShow.value}%`;
});

/**
 * Updates the screen width value when viewport size changes
 * Used for recalculating responsive layout values
 */
const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

/**
 * Updates navigation arrow visibility based on current scroll position
 * Shows/hides left/right arrows depending on if user can scroll further
 */
const handleScroll = () => {
  if (!carouselContainer.value) return;

  const container = carouselContainer.value;

  // Check if we can scroll left (not at the start)
  canScrollLeft.value = container.scrollLeft > 0;

  // Check if we can scroll right (not at the end)
  // Add small buffer (1px) to account for rounding errors
  canScrollRight.value =
    container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
};

/**
 * Scrolls carousel left by one card width when left arrow is clicked
 * Uses smooth scrolling behavior for a polished user experience
 */
const scrollLeft = () => {
  if (carouselContainer.value) {
    // Scroll by exactly one card width + its margin
    const scrollAmount =
      carouselContainer.value.clientWidth / cardsToShow.value;
    carouselContainer.value.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }
};

/**
 * Scrolls carousel right by one card width when right arrow is clicked
 * Uses smooth scrolling behavior for a polished user experience
 */
const scrollRight = () => {
  if (carouselContainer.value) {
    // Scroll by exactly one card width + its margin
    const scrollAmount =
      carouselContainer.value.clientWidth / cardsToShow.value;
    carouselContainer.value.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};

/**
 * Converts vertical mouse wheel movement to horizontal carousel scrolling
 * Provides dynamic sensitivity based on scroll speed for better UX
 * Only intercepts wheel events when carousel can be scrolled further
 *
 * @param {WheelEvent} e - The wheel event object
 */
const onWheel = (e: WheelEvent) => {
  if (!carouselContainer.value) return;

  const container = carouselContainer.value;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  // Check if we're at the edges - let vertical scrolling happen there
  if (
    (e.deltaY > 0 && container.scrollLeft >= maxScrollLeft) ||
    (e.deltaY < 0 && container.scrollLeft <= 0)
  ) {
    return; // At edge, let default vertical scroll happen
  }

  // For all other cases, we'll handle the scrolling horizontally
  e.preventDefault();

  // Use dynamic sensitivity based on how fast the user is scrolling
  const deltaMagnitude = Math.abs(e.deltaY);
  const dynamicSensitivity =
    SCROLL_SENSITIVITY * (1 + Math.min(2, deltaMagnitude / 100));

  container.scrollLeft += e.deltaY * dynamicSensitivity;
};

onMounted(() => {
  const container = carouselContainer.value;
  if (container) {
    // Register wheel event with passive: false to allow preventDefault
    container.addEventListener("wheel", onWheel, { passive: false });
    // Remove smooth-scroll behavior which can cause lag during wheel scrolling
    container.classList.remove("scroll-smooth");
  }

  // Register resize listener for responsive behavior
  window.addEventListener("resize", handleResize);
  // Set initial width
  handleResize();

  // Initial check for scroll arrows visibility
  setTimeout(() => {
    handleScroll();
  }, 100); // Small delay to ensure content is rendered
});

onBeforeUnmount(() => {
  // Clean up event listeners to prevent memory leaks
  if (carouselContainer.value) {
    carouselContainer.value.removeEventListener("wheel", onWheel);
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/**
 * Cross-browser scrollbar hiding
 * Ensures a clean visual presentation without scrollbars while maintaining functionality
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
 * Complete override of global scrollbar styles for this component
 * Ensures consistent appearance across different browsers and themes
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
