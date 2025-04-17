<template>
  <nav>
    <ul class="space-y-2">
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          :to="item.to"
          class="block py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
          active-class="bg-primary-500 text-white hover:bg-primary-600"
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
  { label: "Activities", to: "/activities" },
  { label: "Teachers", to: "/teachers" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];
</script>
