<template>
  <nav class="w-full">
    <ul class="space-y-2">
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          :to="item.to"
          class="nav-link flex items-center px-4 py-3 rounded-lg transition-all duration-200"
          :class="{ 'active-link': isLinkActive(item) }"
        >
          <div v-if="item.icon" class="icon-container mr-3">
            <UiSvgIcon
              :icon="item.icon"
              :width="20"
              :height="20"
              color="currentColor"
            />
          </div>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

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

// Check if a navigation link should be active
interface NavItem {
  label: string;
  to: string;
  icon?: string;
  childRoutes?: string[];
}

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
  if (item.childRoutes && item.childRoutes.length) {
    return item.childRoutes.some((childRoute: string) =>
      route.path.startsWith(childRoute)
    );
  }

  return false;
};
</script>

<style scoped>
.nav-link {
  color: var(--color-secondary-text);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-link:hover {
  color: var(--color-secondary-accent);
  background-color: rgba(118, 197, 185, 0.1);
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 3px;
  background-color: var(--color-primary-accent);
  transition: height 0.2s ease;
}

.nav-link:hover::after {
  height: 100%;
}

.active-link {
  color: var(--color-primary-accent);
  background-color: rgba(118, 197, 185, 0.15);
  font-weight: 600;
}

.active-link::after {
  height: 100%;
}
</style>
