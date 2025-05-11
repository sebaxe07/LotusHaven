<template>
  <!-- Teacher card component with configurable width and hover effects -->
  <div
    class="teacher-card flex-shrink-0 cursor-pointer transition-all hover:shadow-lg mx-2"
    :style="{ width: `calc(${cardWidth} - 1rem)` }"
    @click="handleClick"
  >
    <!-- Square image container with rounded corners -->
    <div class="relative aspect-square rounded-lg overflow-hidden shadow-md">
      <!-- Teacher profile image with lazy loading -->
      <img
        :src="imageUrl"
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Overlay gradient with text information -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white"
      >
        <!-- Teacher name -->
        <h3 class="font-semibold text-lg">{{ name }}</h3>
        <!-- Optional description - only shown if provided -->
        <p v-if="description" class="text-sm text-white/90 mt-1">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Props interface for the TeacherCard component
 */
interface TeacherCardProps {
  id: number; // Unique identifier for the teacher
  name: string; // Teacher's display name
  imageUrl: string; // Path to the teacher's profile image
  description?: string; // Optional short description/bio
  cardWidth?: string; // Optional width specification (CSS value)
}

// Define props with default values
const props = withDefaults(defineProps<TeacherCardProps>(), {
  cardWidth: "25%", // Default width - 4 cards per row (25% each)
  description: "", // Empty description by default
});

// Define emitted events
const emit = defineEmits(["click"]);

/**
 * Click handler that emits the teacher ID to parent components
 * Allows for navigation or other actions when a teacher is selected
 */
const handleClick = () => {
  emit("click", props.id);
};
</script>
