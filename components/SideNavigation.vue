<template>
  <nav class="w-full">
    <ul class="space-y-2">
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          :to="item.to"
          class="nav-link flex items-center px-4 py-3 rounded-lg transition-all duration-200"
          :class="{ 'active-link': $route.path === item.to }"
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
const navItems = [
  { label: "Home", to: "/", icon: "/icons/home.svg" },
  { label: "Highlights", to: "/highlights", icon: "/icons/star.svg" },
  { label: "Activities", to: "/activities", icon: "/icons/activity.svg" },
  { label: "Teachers", to: "/teachers", icon: "/icons/people.svg" },
  { label: "About Us", to: "/about", icon: "/icons/info.svg" },
  { label: "Contact Us", to: "/contact", icon: "/icons/mail.svg" },
];
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
