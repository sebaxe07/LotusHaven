<template>
  <!-- Responsive top navigation bar
     Displays when on mobile devices or when browser zoom level is high -->
  <div
    class="fixed top-0 left-0 right-0 bg-secondary shadow-lg z-50"
    :class="{ hidden: !isMobileOrZoomed }"
  >
    <div class="flex items-center justify-between p-4">
      <!-- Logo and Title -->
      <div class="flex items-center space-x-3">
        <NuxtLink to="/" aria-label="Go to homepage">
          <nuxt-img
            src="/images/logo.svg"
            alt=""
            width="40"
            height="40"
            class="drop-shadow-md"
          />
        </NuxtLink>
        <h1 class="text-lg font-bold text-primary-accent">Lotus Haven</h1>
      </div>

      <!-- Mobile Menu Toggle - Improved hamburger animation -->
      <button
        aria-label="Toggle navigation menu"
        class="text-secondary-text p-2 focus:outline-none"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <div class="w-6 h-5 flex flex-col justify-between">
          <span
            class="w-full h-0.5 bg-secondary-text rounded-full transform origin-center transition-all duration-300"
            :class="mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''"
          ></span>
          <span
            class="w-full h-0.5 bg-secondary-text rounded-full transition-all duration-200"
            :class="mobileMenuOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span
            class="w-full h-0.5 bg-secondary-text rounded-full transform origin-center transition-all duration-300"
            :class="mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
          ></span>
        </div>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div
      v-if="mobileMenuOpen"
      class="bg-secondary shadow-lg overflow-y-auto"
      style="max-height: calc(100vh - 72px)"
    >
      <div class="p-4">
        <SideNavigation />
      </div>

      <!-- Social Icons -->
      <div
        class="flex justify-center space-x-4 p-4 border-t border-third-accent/50"
      >
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Facebook page"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/facebook.svg"
            alt="Facebook"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Twitter profile"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/twitter.svg"
            alt="Twitter"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our LinkedIn page"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
      </div>
    </div>
  </div>

  <!-- Permanent sidebar navigation for desktop view
     Hidden automatically on mobile or when browser is zoomed -->
  <div
    class="bg-secondary h-full shadow-xl flex-col items-center border-r border-third-accent/50 w-72"
    :class="{ hidden: isMobileOrZoomed, flex: !isMobileOrZoomed }"
  >
    <!-- Logo and Title Section -->
    <div class="flex flex-col space-y-4 items-center justify-center pt-8 pb-6">
      <NuxtLink
        to="/"
        aria-label="Go to homepage"
        class="transition-transform hover:scale-105"
      >
        <nuxt-img
          src="/images/logo.svg"
          alt=""
          width="100"
          height="100"
          class="drop-shadow-md"
        />
      </NuxtLink>

      <h1 class="text-2xl font-bold text-primary-accent tracking-wide">
        Lotus Haven
      </h1>
    </div>

    <!-- Divider -->
    <div class="w-3/4 h-px bg-third-accent/50 mb-6"></div>

    <!-- Navigation Links -->
    <div class="w-full px-4 flex-grow">
      <SideNavigation />
    </div>

    <!-- Footer Section -->
    <div class="w-full p-6 border-t border-third-accent/50 mt-auto">
      <!-- Social Icons -->
      <div class="flex justify-center space-x-4 mb-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Facebook page"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/facebook.svg"
            alt="Facebook"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Twitter profile"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/twitter.svg"
            alt="Twitter"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our LinkedIn page"
          class="social-icon-link"
        >
          <nuxt-img
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            width="20"
            height="20"
            class="social-icon"
          />
        </a>
      </div>

      <!-- Copyright Text -->
      <p class="text-secondary-text text-xs text-center">
        &copy; 2025 HyperDaGiaZeySe.<br />
        All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

/**
 * Reactive state for the navigation component
 */
const mobileMenuOpen = ref(false); // Controls mobile menu visibility
const route = useRoute();
const isZoomedIn = ref(false); // Tracks if browser is zoomed in
const isMobile = ref(false); // Tracks if viewport is mobile-sized

/**
 * Determines whether to show the mobile layout or desktop sidebar
 * Used to adapt navigation UI for both small screens and zoomed-in browsers
 */
const isMobileOrZoomed = computed(() => {
  return isMobile.value || isZoomedIn.value;
});

/**
 * Auto-close mobile menu when navigating between routes
 * Prevents menu from staying open after user navigates to a new page
 */
watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
  }
);

/**
 * Detects browser zoom level and viewport size to determine appropriate layout
 * Uses multiple detection methods for cross-browser compatibility
 */
const detectZoom = () => {
  if (typeof window === "undefined") return;

  // Calculate browser zoom ratio from window dimensions
  const ratio = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
  // Get device pixel ratio for detecting OS-level scaling
  const pixelRatio = window.devicePixelRatio || 1;

  // Measure available screen width for layout decisions
  const availableWidth = window.innerWidth;

  /**
   * Determine if we should use mobile layout based on three criteria:
   * - Browser zoom level exceeds 130%
   * - High device pixel ratio indicates OS display scaling
   * - Window width is too narrow for comfortable sidebar viewing
   */
  isZoomedIn.value = ratio > 1.3 || pixelRatio >= 1.4 || availableWidth < 1300;

  // Set mobile status based on Tailwind's lg breakpoint
  isMobile.value = window.innerWidth < 1024;
};

/**
 * Component initialization on mount
 * Sets up event listeners and initial state detection
 */
onMounted(() => {
  if (typeof window !== "undefined") {
    // Perform initial layout detection
    detectZoom();

    // Set up responsive behavior
    window.addEventListener("resize", detectZoom);

    /**
     * Handler to close mobile menu when user scrolls
     * Improves UX by clearing the menu when user begins page navigation
     */
    const closeMenuOnScroll = () => {
      if (mobileMenuOpen.value) {
        mobileMenuOpen.value = false;
      }
    };
    /**
     * Dynamically add/remove scroll listener based on menu state
     * This optimizes performance by only listening when necessary
     */
    watch(mobileMenuOpen, (isOpen) => {
      if (isOpen) {
        // When menu opens, listen for scroll events to close it
        window.addEventListener("scroll", closeMenuOnScroll, { passive: true });
      } else {
        // When menu closes, remove the listener to avoid unnecessary processing
        window.removeEventListener("scroll", closeMenuOnScroll);
      }
    });

    /**
     * Clean up event listeners when component is destroyed
     * Prevents memory leaks and unexpected behavior
     */
    onUnmounted(() => {
      window.removeEventListener("resize", detectZoom);
      window.removeEventListener("scroll", closeMenuOnScroll);
    });
  }
});
</script>

<style scoped>
/**
 * Social media icon styling
 * Creates circular buttons with hover effects for social media links
 */
.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(207, 218, 217, 0.8);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

/**
 * Interactive hover state for social icons
 * Creates visual feedback with color change, elevation and shadow
 */
.social-icon-link:hover {
  background-color: var(--color-primary-accent);
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/**
 * Icon image transition effect
 */
.social-icon {
  transition: filter 0.2s ease;
}

/**
 * Change icon color to white on hover
 * Ensures proper contrast with the background color
 */
.social-icon-link:hover .social-icon {
  filter: brightness(0) invert(1);
}
</style>
