<template>
  <div class="relative w-full">
    <!-- Left arrow navigation - only visible when not at left edge -->
    <div
      v-if="canScrollLeft"
      class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-opacity"
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

    <!-- Right arrow navigation - only visible when not at right edge -->
    <div
      v-if="canScrollRight"
      class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 transition-opacity"
      :class="{ 'opacity-0': !canScrollRight, 'opacity-100': canScrollRight }"
    >
      <UiCarouselArrow direction="right" :size="40" @click="scrollRight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const carouselContainer = ref<HTMLElement | null>(null);
const SCROLL_SENSITIVITY = 1.2;

// Track scroll state
const canScrollLeft = ref(false);
const canScrollRight = ref(true); // Default to true since most carousels have content to scroll

// Responsive card width calculation
const screenWidth = ref(
  typeof window !== "undefined" ? window.innerWidth : 1024
);

// Determine number of cards to show based on screen width
const cardsToShow = computed(() => {
  if (screenWidth.value < 640) return 1.5; // Mobile: 1.5 cards
  if (screenWidth.value < 768) return 2; // Small tablet: 2 cards
  if (screenWidth.value < 1024) return 3; // Tablet: 3 cards
  return 4; // Desktop: exactly 4 cards
});

// Calculate card width as percentage, accounting for margins
const cardWidth = computed(() => {
  // Account for the margins (mx-2 = 0.5rem on each side = 1rem total per card)
  const containerWidth = 100; // 100%

  // For exact fit, calculate width considering the margins
  return `${containerWidth / cardsToShow.value}%`;
});

// Handle screen resize
const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

// Handle scroll events to update arrow visibility
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

// Function to scroll left with the arrow
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

// Function to scroll right with the arrow
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

// Wheel handler that prevents default if we should handle the scroll
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
    // Remove the wheel event from the template and use direct listener
    container.addEventListener("wheel", onWheel, { passive: false });
    // Remove the smooth-scroll behavior which can cause lag
    container.classList.remove("scroll-smooth");
  }

  // Add resize listener
  window.addEventListener("resize", handleResize);
  // Set initial width
  handleResize();

  // Initial check for scroll arrows
  setTimeout(() => {
    handleScroll();
  }, 100); // Small delay to ensure content is rendered
});

onBeforeUnmount(() => {
  if (carouselContainer.value) {
    carouselContainer.value.removeEventListener("wheel", onWheel);
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.carousel-no-scrollbar {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
}

.carousel-no-scrollbar::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari and Opera */
  width: 0 !important;
  height: 0 !important;
}

/* Override global scrollbar styles specifically for this component */
.carousel-no-scrollbar::-webkit-scrollbar-track,
.carousel-no-scrollbar::-webkit-scrollbar-thumb,
.carousel-no-scrollbar::-webkit-scrollbar-thumb:hover {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}
</style>
