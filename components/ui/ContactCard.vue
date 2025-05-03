<template>
  <div class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
    <div class="flex gap-4">
      <!-- Avatar/Image -->
      <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img
          :src="imageUrl"
          :alt="name"
          class="w-full h-full object-cover"
        />
      </div>
      <!-- Content -->
      <div>
        <h3 class="text-xl font-semibold text-primary-text mb-1">{{ name }}</h3>
        <p class="text-secondary-text mb-2">{{ role }}</p>
        <p class="text-secondary-text">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ContactCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

defineProps<ContactCardProps>();
</script>