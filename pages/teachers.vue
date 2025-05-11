<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-primary-text">Our Teachers</h1>
    <p class="mb-6 text-secondary-text">
      Meet our experienced and dedicated teachers.
    </p>

    <div v-if="teachersLoading" class="py-4 text-secondary-text">
      Loading teachers...
    </div>
    <div v-else-if="teachersError" class="py-4 text-red-500">
      Error: {{ teachersError }}
    </div>
    <div v-else-if="teachers.length === 0" class="py-4 text-secondary-text">
      No teachers found.
    </div>
    <div v-else>
      <!-- Flex container for the teachers -->
      <div class="teachers-container">
        <TeachersCard2
          v-for="teacher in cardteachers"
          :id="teacher.id"
          :key="teacher.id"
          :name="teacher.fullName"
          :short-bio="teacher.shortBio"
          :image-url="teacher.imageUrl"
          :activities="teacher.activities"
          class="teacher-card-item"
          @click="navigateToTeacherDetail(teacher.id)"
          @activity-click="
            ({ teacherId, activityId }) => navigateToActivity(activityId)
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTeachers } from "../composables/useTeachers";
import { navigateTo, useHead } from "nuxt/app";
import type { teacherToCardItem2, TeacherCardItem } from "../types/teachers"; // Import the Teacher type
import TeachersCard2 from "../components/ui/TeachersCard2.vue"; // Import TeachersCard2

// Use the teachers composable
const {
  teachers: teachersData,
  isLoading: teachersLoading,
  error: teachersError,
  fetchTeachers,
  teacherToCardItem,
  teacherToCardItem2,
} = useTeachers();

// SEO with useHead
useHead({
  title: "Our Yoga Teachers | Meet the Team | Lotus Haven",
  meta: [
    {
      name: "description",
      content:
        "Meet our experienced and dedicated yoga teachers at Lotus Haven. Our instructors are certified professionals passionate about helping you achieve your wellness goals.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Open Graph tags for better social media sharing
    { property: "og:title", content: "Our Yoga Teachers | Lotus Haven" },
    {
      property: "og:description",
      content:
        "Meet our experienced and dedicated yoga teachers at Lotus Haven.",
    },
    { property: "og:type", content: "website" },
  ],
});

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

<style scoped>
.teachers-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.teacher-card-item {
  /* Ensure teacher cards maintain their size but don't grow to fill space */
  flex-grow: 0;
  flex-shrink: 0;
}

/* Responsive adjustments for the card width */
@media (max-width: 639px) {
  .teacher-card-item {
    /* On mobile, cards can take up more width */
    width: 100%;
    max-width: 330px;
  }
}
</style>
