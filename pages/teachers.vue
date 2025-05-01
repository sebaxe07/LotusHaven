<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Our Teachers</h1>
    <p class="mb-6">Meet our experienced and dedicated teachers.</p>

    <div v-if="isLoading" class="py-4">Loading teachers...</div>
    <div v-else-if="error" class="py-4 text-red-500">
      Error: {{ error.message }}
    </div>
    <div v-else-if="teachers.length === 0" class="py-4">No teachers found.</div>
    <div v-else>
      <!-- Display the formatted JSON -->
      <div class="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[600px]">
        <pre class="text-sm whitespace-pre-wrap">{{
          formattedTeachersData
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTeachers } from "../composables/useTeachers";

// Use the teachers composable
const { teachers, isLoading, error, fetchTeachers } = useTeachers();

// Format the teachers data as a nicely indented JSON string
const formattedTeachersData = computed(() => {
  if (!teachers.value || teachers.value.length === 0) return "";
  return JSON.stringify(teachers.value, null, 2);
});

// Fetch all teachers when component mounts
onMounted(async () => {
  await fetchTeachers();
});
</script>
