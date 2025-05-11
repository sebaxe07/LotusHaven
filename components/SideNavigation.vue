<template>
  <!-- Main navigation container for the sidebar -->
  <nav class="w-full">
    <ul class="space-y-2">
      <!-- Dynamically generate navigation links from the navItems array -->
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          :to="item.to"
          class="nav-link flex items-center px-4 py-3 rounded-lg transition-all duration-200"
          :class="{ 'active-link': isLinkActive(item) }"
        >
          <!-- Icon container - conditionally rendered if icon path is provided -->
          <div v-if="item.icon" class="icon-container mr-3">
            <UiSvgIcon
              :icon="item.icon"
              :width="20"
              :height="20"
              color="currentColor"
            />
          </div>
          <!-- Navigation link text -->
          <span>{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// Import Vue Router utilities for navigation and route management
import { useRoute } from "vue-router";

// Get current route information for highlighting active links
const route = useRoute();

// Navigation menu configuration
// Each item defines a link destination, label, icon, and optional child routes
const navItems = [
  { label: "Home", to: "/", icon: "/icons/home.svg" },
  { label: "Highlights", to: "/highlights", icon: "/icons/star.svg" },
  {
    label: "Activities",
    to: "/activities",
    icon: "/icons/activity.svg",
    childRoutes: ["/activity/"],
  },
  {
    label: "Teachers",
    to: "/teachers",
    icon: "/icons/people.svg",
    childRoutes: ["/teacher/"],
  },
  { label: "About Us", to: "/about", icon: "/icons/info.svg" },
  { label: "Contact Us", to: "/contact", icon: "/icons/mail.svg" },
];

/**
 * Interface defining the structure of navigation items
 */
interface NavItem {
  label: string; // Display text for the navigation item
  to: string; // Route path to navigate to when clicked
  icon?: string; // Optional path to the icon SVG
  childRoutes?: string[]; // Optional child route prefixes for active state detection
}

/**
 * Determines if a navigation item should be highlighted as active
 * Handles special cases like child routes and home page
 *
 * @param item - Navigation item to check
 * @returns boolean indicating if the link should be styled as active
 */
const isLinkActive = (item: NavItem) => {
  // Exact match for most routes
  if (route.path === item.to) {
    return true;
  }

  // Special case for home page - only active when exactly at root
  if (item.to === "/" && route.path !== "/") {
    return false;
  }

  // Check if current path is a child route for this navigation item
  // Example: Highlight "Activities" when on "/activity/123"
  if (item.childRoutes && item.childRoutes.length) {
    return item.childRoutes.some((childRoute: string) =>
      route.path.startsWith(childRoute)
    );
  }

  return false;
};
</script>

<style scoped>
/* Base navigation link styling */
.nav-link {
  color: var(--color-secondary-text);
  font-weight: 500;
  position: relative;
  overflow: hidden; /* Contains the animated indicator */
}

/* Hover state styling - subtle background color and text color change */
.nav-link:hover {
  color: var(--color-secondary-accent);
  background-color: rgba(118, 197, 185, 0.1);
}

/* Vertical indicator bar - starts at 0 height */
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 3px;
  background-color: var(--color-primary-accent);
  transition: height 0.2s ease; /* Smooth animation for indicator */
}

/* Animate indicator to full height on hover */
.nav-link:hover::after {
  height: 100%;
}

/* Active link styling - highlighted state */
.active-link {
  color: var(--color-primary-accent);
  background-color: rgba(118, 197, 185, 0.15);
  font-weight: 600; /* Make active link bolder */
}

/* Active indicator - always visible at full height */
.active-link::after {
  height: 100%;
}
</style>
