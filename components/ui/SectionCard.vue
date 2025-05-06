<template>
  <div class="p-5 bg-gray-100 rounded-lg shadow-sm">
    <h3 class="mb-3 text-lg font-semibold text-gray-800">
      {{ schedule.professor?.name || 'Instructor Led' }}
    </h3>
    <div class="space-y-2 text-sm text-gray-700">
      <div class="flex items-center">
        <span class="mr-2 text-teal-600">🗓️</span>
        <div>
          <p v-for="day in schedule.days" :key="day">{{ day }}</p>
          <p>{{ schedule.time }}</p>
        </div>
      </div>
      <div class="flex items-center" v-if="schedule.professor?.phone">
        <span class="mr-2 text-teal-600">📞</span>
        <a :href="`tel:${schedule.professor.phone}`" class="hover:text-teal-700 hover:underline">{{ schedule.professor.phone }}</a>
      </div>
      <div class="flex items-center" v-if="schedule.professor?.email">
        <span class="mr-2 text-teal-600">✉️</span>
        <a :href="`mailto:${schedule.professor.email}`" class="hover:text-teal-700 hover:underline">{{ schedule.professor.email }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

// Define the structure of the professor and schedule objects for type safety
interface Professor {
  name?: string;
  phone?: string;
  email?: string;
}

interface Schedule {
  professor?: Professor;
  days: string[];
  time: string;
  // Add any other properties that a schedule object might have
}

// Define the props for this component
defineProps({
  schedule: {
    type: Object as PropType<Schedule>,
    required: true,
  },
});
</script>

<style scoped>
/* You can add component-specific styles here if needed */
</style>