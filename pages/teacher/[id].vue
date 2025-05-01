<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Showing the dynamic ID directly to ensure we're in the dynamic route -->
    <h1 class="text-2xl font-bold mb-4">Teacher Details Page</h1>
    <p class="mb-4 font-bold">Teacher ID: {{ teacherId }}</p>

    <div v-if="isLoading" class="py-4">Loading teacher data...</div>
    <div v-else-if="error" class="py-4 text-red-500">
      Error: {{ error.message }}
    </div>
    <div v-else-if="!selectedTeacher" class="py-4">Teacher not found.</div>

    <NuxtLink
      to="/teachers"
      class="text-blue-500 hover:underline mt-4 inline-block"
    >
      Back to Teachers
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useTeachers } from "../../composables/useTeachers";

// Use the teachers composable
const { selectedTeacher, isLoading, error, fetchTeacherById } = useTeachers();

// Get the route to access parameters
const route = useRoute();
const teacherId = computed(() => route.params.id);

// Fetch teacher data when the component mounts
onMounted(async () => {
  await fetchTeacherById(Number(teacherId.value));
});
</script>
