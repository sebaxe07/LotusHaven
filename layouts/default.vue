<template>
  <div class="flex h-screen bg-primary overflow-x-hidden">
    <!-- Navbar (sidebar on desktop, top bar on mobile/zoomed) -->
    <UiNavbar />

    <!-- Main Content with responsive padding -->
    <div class="flex-1 overflow-auto w-full">
      <!-- Add top padding on mobile for the fixed navbar -->
      <div
        class="h-full overflow-x-hidden"
        :class="{ 'pt-16': isMobileOrZoomed }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const isZoomedIn = ref(false);
const isMobile = ref(false);

const isMobileOrZoomed = computed(() => {
  return isMobile.value || isZoomedIn.value;
});

// Detect if zoom level is high enough to switch to mobile layout
const detectZoom = () => {
  if (typeof window === "undefined") return;

  // Method 1: Check browser zoom ratio
  const ratio = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;

  // Method 2: Check device pixel ratio for Windows scaling
  const pixelRatio = window.devicePixelRatio || 1;

  // Method 3: Check if available width is limited
  const availableWidth = window.innerWidth;

  // Combined detection logic:
  // 1. Browser is zoomed beyond 130%
  // 2. Device has high pixel ratio (Windows scaling)
  // 3. Available width is too small for comfortable sidebar viewing
  isZoomedIn.value = ratio > 1.3 || pixelRatio >= 1.4 || availableWidth < 1300;

  // Check mobile separately using window width
  isMobile.value = window.innerWidth < 1024; // 1024px is lg breakpoint in Tailwind
};

onMounted(() => {
  if (typeof window !== "undefined") {
    // Initial check
    detectZoom();

    // Add listener for resize events
    window.addEventListener("resize", detectZoom);

    // Clean up
    onUnmounted(() => {
      window.removeEventListener("resize", detectZoom);
    });
  }
});
</script>
