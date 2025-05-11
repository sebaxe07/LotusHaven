<template>
  <div
    class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
  >
    <div class="flex gap-4">
      <!-- Profile image with circular crop -->
      <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img :src="imageUrl" alt="" class="w-full h-full object-cover" />
      </div>
      <!-- Contact information and description -->
      <div>
        <h2 class="text-xl font-semibold text-primary-text mb-1">{{ name }}</h2>
        <p class="text-secondary-text mb-2">{{ role }}</p>
        <p class="text-secondary-text">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Interface defining the required properties for the ContactCard component
 */
interface ContactCardProps {
  /** The name of the contact person */
  name: string;
  /** The role or position of the contact person */
  role: string;
  /** Brief description or additional information about the contact */
  description: string;
  /** URL to the contact's profile image */
  imageUrl: string;
}

/**
 * Component props with TypeScript interface for type checking
 */
defineProps<ContactCardProps>();
</script>
