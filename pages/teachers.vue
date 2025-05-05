<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Our Teachers</h1>
    <p class="mb-6">Meet our experienced and dedicated teachers.</p>

    <div v-if="teachersLoading" class="py-4">Loading teachers...</div>
    <div v-else-if="teachersError" class="py-4 text-red-500">
      Error: {{ teachersError }}
    </div>
    <div v-else-if="teachers.length === 0" class="py-4">No teachers found.</div>
    <div v-else>

      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        <TeachersCard2
          v-for="teacher in cardteachers"
          :key="teacher.id"
          :id="teacher.id"
          :name="teacher.fullName"
          :shortBio="teacher.shortBio"
          :imageUrl="teacher.imageUrl"
          :activities="teacher.activities"
          @click="navigateToTeacherDetail(teacher.id)"
          @activity-click="({ teacherId, activityId }) => navigateToActivity(activityId)"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTeachers } from "../composables/useTeachers";
import { navigateTo } from "nuxt/app";
import type { teacherToCardItem2, TeacherCardItem } from "../types/teachers"; // Import the Teacher type
import TeachersCard2 from "../components/ui/TeachersCard2.vue"; // Import TeachersCard2

// Use the teachers composable
const {
  teachers: teachersData,
  isLoading: teachersLoading,
  error: teachersError,
  fetchTeachers,
  teacherToCardItem,
  teacherToCardItem2
} = useTeachers();

// Format the teachers data as a nicely indented JSON string
//const formattedTeachersData = computed(() => {
  //if (!teachers.value || teachers.value.length === 0) return "";
  //return JSON.stringify(teachers.value, null, 2);
//});
const teachers = computed<TeacherCardItem[]>(() => {
  return teachersData.value.map((teacher) => teacherToCardItem(teacher));
});
// Transform teacher data to card items for the carousel
const cardteachers = computed<teacherToCardItem2[]>(() => {
  return teachersData.value.map((teacher) => teacherToCardItem2(teacher));
});

const navigateToActivity = (activityId: number) => {
  navigateTo(`/activity/${activityId}`);
};




const navigateToTeacherDetail = (id: number) => {
  console.log(`Navigating to teacher with ID: ${id}`);
  navigateTo(`/teacher/${id}`); // Changed from /teachers/${id} to /teacher/${id}
};
// Fetch all teachers when component mounts
onMounted(async () => {
  await fetchTeachers();
});

</script>
