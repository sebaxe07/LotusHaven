<template>
  <nav class="w-10/12 h-full flex items-center justify-center">
    <ul class="space-y-4">
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          :to="item.to"
          class="header3 hover:text-secondary-accent text-disabled transition-colors"
          active-class="text-primary-accent hover:bg-primary-600"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  { label: "Home", to: "/" },
  { label: "Highlights", to: "/highlights" },
  { label: "Activities", to: "/activities" },
  { label: "Teachers", to: "/teachers" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];
</script>
