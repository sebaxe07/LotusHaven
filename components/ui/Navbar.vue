<template>
  <!-- Mobile navbar (top) -->
  <div class="lg:hidden fixed top-0 left-0 right-0 bg-secondary shadow-lg z-50">
    <div class="flex items-center justify-between p-4">
      <!-- Logo and Title -->
      <div class="flex items-center space-x-3">
        <NuxtLink to="/" aria-label="Go to homepage">
          <nuxt-img
            src="/images/logo.svg"
            alt="Logo"
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

  <!-- Desktop sidebar (left side) -->
  <div
    class="hidden lg:flex w-72 bg-secondary h-full shadow-xl flex-col items-center border-r border-third-accent/50"
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
          alt="Logo"
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
import { ref, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const mobileMenuOpen = ref(false);

// Close mobile menu when route changes
watch(
  () => useRoute().fullPath,
  () => {
    mobileMenuOpen.value = false;
  }
);

// Added client-side script for scroll handling
if (typeof window !== "undefined") {
  // Create a debounced version of the scroll handler
  const closeMenuOnScroll = () => {
    if (mobileMenuOpen.value) {
      mobileMenuOpen.value = false;
    }
  };

  // Set up watch effect that adds/removes event listener based on menu state
  watch(mobileMenuOpen, (isOpen) => {
    if (isOpen) {
      // Menu opened - add scroll listener
      window.addEventListener("scroll", closeMenuOnScroll, { passive: true });
    } else {
      // Menu closed - remove scroll listener (only needed when menu is open)
      window.removeEventListener("scroll", closeMenuOnScroll);
    }
  });

  // Clear event listener when component unmounts
  onUnmounted(() => {
    window.removeEventListener("scroll", closeMenuOnScroll);
  });
}
</script>

<style scoped>
.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(
    207,
    218,
    217,
    0.8
  ); /* Brighter version of third-accent */
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.social-icon-link:hover {
  background-color: var(--color-primary-accent);
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.social-icon {
  transition: filter 0.2s ease;
}

social-icon-link:hover .social-icon {
  filter: brightness(0) invert(1); /* Make icon white on hover */
}
</style>
