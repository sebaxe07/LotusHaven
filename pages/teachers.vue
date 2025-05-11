<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-primary-text">Our Teachers</h1>
    <p class="mb-6 text-secondary-text">
      Meet our experienced and dedicated teachers.
    </p>

    <!-- Loading State - Simple text indicator while data is being fetched -->
    <div v-if="teachersLoading" class="py-4 text-secondary-text">
      Loading teachers...
    </div>
    <!-- Error State - Display error message if data fetch fails -->
    <div v-else-if="teachersError" class="py-4 text-red-500">
      Error: {{ teachersError }}
    </div>
    <!-- Empty State - Message shown when no teachers are available -->
    <div v-else-if="teachers.length === 0" class="py-4 text-secondary-text">
      No teachers found.
    </div>
    <div v-else>
      <!-- Teacher Grid - Responsive layout for displaying all teachers -->
      <div class="teachers-container">
        <!-- Teacher Card Component - Individual teacher profile with activities -->
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
            ({ teacherId, activityId }) =>
              navigateToActivity(activityId) /* Handle activity chip clicks */
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
import type { teacherToCardItem2, TeacherCardItem } from "../types/teachers";
import TeachersCard2 from "../components/ui/TeachersCard2.vue";

// Initialize teacher data and methods from composable
// Provides data fetching, loading states, and formatting utilities
const {
  teachers: teachersData,
  isLoading: teachersLoading,
  error: teachersError,
  fetchTeachers,
  teacherToCardItem,
  teacherToCardItem2,
} = useTeachers();

// Configure SEO metadata for teachers listing page
// Includes page title, description and social media tags
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

// Transform teachers data to standard card format
// Used for compatibility with existing components
const teachers = computed<TeacherCardItem[]>(() => {
  return teachersData.value.map((teacher) => teacherToCardItem(teacher));
});
// Transform teacher data to enhanced card format with additional details
// Used specifically for TeachersCard2 component which shows activities
const cardteachers = computed<teacherToCardItem2[]>(() => {
  return teachersData.value.map((teacher) => teacherToCardItem2(teacher));
});

// Navigate to specific activity detail page when activity chip is clicked
const navigateToActivity = (activityId: number) => {
  navigateTo(`/activity/${activityId}`);
};

// Navigate to teacher profile page when teacher card is clicked
const navigateToTeacherDetail = (id: number) => {
  console.log(`Navigating to teacher with ID: ${id}`);
  navigateTo(`/teacher/${id}`);
};
// Initialize page data on component mount
// Loads teacher data from API or other data source
onMounted(async () => {
  await fetchTeachers();
});
</script>

<style scoped>
/* Flex container for responsive grid layout of teacher cards */
.teachers-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

/* Individual card styling to prevent unwanted growth/shrinking */
.teacher-card-item {
  /* Ensure teacher cards maintain their size but don't grow to fill space */
  flex-grow: 0;
  flex-shrink: 0;
}

/* Mobile-specific adjustments for smaller screens */
@media (max-width: 639px) {
  .teacher-card-item {
    /* On mobile, cards can take up more width */
    width: 100%;
    max-width: 330px;
  }
}
</style>
