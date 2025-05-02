<template>
  <div class="relative w-full">
    <!-- Left arrow navigation - only visible when not at left edge -->
    <div
      v-if="canScrollLeft"
      class="absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-opacity"
      :class="{ 'opacity-0': !canScrollLeft, 'opacity-100': canScrollLeft }"
    >
      <UiCarouselArrow direction="left" :size="40" @click="scrollLeft" />
    </div>

    <!-- Carousel container with horizontal scrolling -->
    <div class="px-10 overflow-hidden">
      <div
        ref="carouselContainer"
        class="carousel-container flex overflow-x-auto py-4 carousel-no-scrollbar snap-x"
        @wheel="onWheel"
        @scroll="handleScroll"
      >
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

    <!-- Right arrow navigation - only visible when not at right edge -->
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

defineProps({
  activities: {
    type: Array as () => ClassCardItem[],
    required: true,
  },
});

defineEmits<{
  "learn-more": [id: number];
}>();

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
  if (screenWidth.value < 640) return 1.2; // Mobile: 1.2 cards
  if (screenWidth.value < 768) return 1.5; // Small tablet: 1.5 cards
  if (screenWidth.value < 1024) return 2; // Tablet: 2 cards
  if (screenWidth.value < 1280) return 2.5; // Small desktop: 2.5 cards
  return 3; // Desktop: 3 cards
});

// Calculate card width as percentage, accounting for margins
const cardWidth = computed(() => {
  // Account for the margins (px-2 = 0.5rem on each side = 1rem total per card)
  // Also account for the padding added for arrow space (px-10 = 2.5rem total)
  const containerWidth = 100; // 100%

  // Calculate available space percentage accounting for padding
  return `calc(${containerWidth / cardsToShow.value}% - 1rem)`;
});

// Handle screen resize
const handleResize = () => {
  screenWidth.value = window.innerWidth;
  // Re-check scroll state on resize
  setTimeout(() => {
    handleScroll();
  }, 100);
};

// Handle scroll events to update arrow visibility
const handleScroll = () => {
  if (!carouselContainer.value) return;

  const container = carouselContainer.value;

  // Check if we can scroll left (not at the start)
  canScrollLeft.value = container.scrollLeft > 5; // Small threshold to account for rounding errors

  // Check if we can scroll right (not at the end)
  // Add small buffer (5px) to account for rounding errors
  canScrollRight.value =
    container.scrollLeft < container.scrollWidth - container.clientWidth - 5;
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

// Improved wheel handler with better cross-device compatibility
const onWheel = (e: WheelEvent) => {
  if (!carouselContainer.value) return;

  const container = carouselContainer.value;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  // Check if we're at the edges - let vertical scrolling happen there
  if (
    (e.deltaY > 0 && container.scrollLeft >= maxScrollLeft - 5) || // Near right edge
    (e.deltaY < 0 && container.scrollLeft <= 5) // Near left edge
  ) {
    return; // At edge, let default vertical scroll happen
  }

  // Prevent default to avoid both vertical and horizontal scrolling simultaneously
  e.preventDefault();

  // Use dynamic sensitivity based on how fast the user is scrolling
  const deltaMagnitude = Math.abs(e.deltaY);
  const dynamicSensitivity =
    SCROLL_SENSITIVITY * (1 + Math.min(1.5, deltaMagnitude / 100));

  // Apply smooth scrolling directly
  container.scrollLeft += e.deltaY * dynamicSensitivity;
};

onMounted(() => {
  const container = carouselContainer.value;
  if (container) {
    // Add passive: false to properly prevent default
    container.addEventListener("wheel", onWheel, { passive: false });
  }

  // Add resize listener
  window.addEventListener("resize", handleResize);
  // Set initial width
  handleResize();

  // Initial check for scroll arrows
  setTimeout(() => {
    handleScroll();
  }, 200); // Increased delay to ensure content is rendered
});

onBeforeUnmount(() => {
  if (carouselContainer.value) {
    carouselContainer.value.removeEventListener("wheel", onWheel);
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Add smooth scrolling behavior to container while avoiding lag */
.carousel-container {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS devices */
}

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
