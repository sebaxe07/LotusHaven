<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Profile Section - Main content area with teacher details -->
    <div
      class="w-full lg:w-2/3 px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col bg-white"
    >
      <!-- Back Navigation - Return button to previous page -->
      <button
        class="cursor-pointer flex items-center gap-2 text-primary-accent hover:underline text-sm mb-4 self-start"
        @click="goBack"
      >
        <UiSvgIcon
          icon="/icons/arrow.svg"
          :width="20"
          :height="20"
          :color="'var(--color-primary-accent)'"
        />
        Back
      </button>

      <!-- State Management - Loading, error and empty states -->
      <div v-if="isLoading" class="py-4 self-center">
        Loading teacher data...
      </div>
      <div v-else-if="error" class="py-4 text-red-500 self-center">
        Error: {{ error.message }}
      </div>
      <div v-else-if="!selectedTeacher" class="py-4 self-center">
        Teacher not found.
      </div>
      <div v-else class="flex flex-col items-center flex-grow">
        <!-- Responsive Container - Centered -->
        <div
          class="w-full max-w-3xl flex flex-col items-start gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-10 lg:mt-16"
        >
          <!-- Breadcrumb Navigation - Shows current location in site hierarchy -->
          <div
            class="text-secondary-accent font-figtree text-sm sm:text-base font-normal leading-tight tracking-wide self-start"
          >
            <NuxtLink to="/teachers" class="hover:underline">Teachers</NuxtLink>
            <span class="mx-1">/</span>
            <span
              >{{ selectedTeacher.name }} {{ selectedTeacher.surname }}</span
            >
          </div>

          <!-- Profile Header - Teacher photo and personal information in responsive layout -->
          <div
            class="flex flex-col md:flex-row items-start gap-6 md:gap-8 w-full"
          >
            <img
              :src="selectedTeacher.photo_url"
              alt="Teacher Photo"
              class="rounded-lg object-cover w-full md:w-3/5 h-auto aspect-[3/2] shadow-md"
            />

            <!-- Teacher Identity - Name and contact information -->
            <div
              class="flex flex-col justify-start items-start gap-6 w-full md:w-2/5"
            >
              <!-- Teacher name display - Primary heading -->
              <h1
                class="font-figtree font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide text-primary-text break-words"
              >
                {{ selectedTeacher.name }} {{ selectedTeacher.surname }}
              </h1>

              <!-- Contact methods - Phone and email with icons -->
              <div
                class="flex flex-col justify-center items-start gap-4 w-full mt-2 sm:mt-4"
              >
                <!-- Phone Contact - Direct call link with formatted display -->
                <div class="flex items-center gap-4">
                  <div
                    class="bg-primary-accent-light rounded-full p-2 flex items-center justify-center w-10 h-10 min-w-10"
                  >
                    <UiSvgIcon
                      icon="/icons/phone.svg"
                      :width="24"
                      :height="24"
                      :color="'var(--color-primary-accent)'"
                    />
                  </div>
                  <a
                    :href="`tel:${selectedTeacher.phone}`"
                    class="text-primary-text font-figtree text-sm sm:text-base hover:text-primary-accent transition-colors cursor-pointer"
                  >
                    {{ formattedPhone }}
                  </a>
                </div>
                <!-- Email Contact - Direct mailto link with visual styling -->
                <div class="flex items-center gap-4">
                  <div
                    class="bg-primary-accent-light rounded-full p-2 flex items-center justify-center w-10 h-10 min-w-10"
                  >
                    <UiSvgIcon
                      icon="/icons/email.svg"
                      :width="24"
                      :height="24"
                      :color="'var(--color-primary-accent)'"
                    />
                  </div>
                  <a
                    :href="`mailto:${selectedTeacher.email}`"
                    class="text-primary-text font-figtree text-sm sm:text-base underline underline-offset-2 hover:text-primary-accent transition-colors cursor-pointer"
                  >
                    {{ selectedTeacher.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Teacher Biography - Professional background and experience description -->
          <p
            class="text-sm sm:text-base font-normal leading-relaxed tracking-wide text-secondary-accent font-figtree whitespace-pre-wrap w-full"
          >
            {{ selectedTeacher.short_cv }}
          </p>
        </div>
      </div>
    </div>

    <!-- Schedule Section - Teacher's activities and classes in sidebar layout -->
    <div
      class="w-full lg:w-1/3 p-4 sm:p-6 lg:p-8 bg-[#F8F8F8] flex flex-col items-center relative"
    >
      <!-- Visual Separator - Gradient vertical divider for desktop layout only -->
      <div class="hidden lg:block absolute left-0 top-10 bottom-10 w-[3px]">
        <div
          class="h-full bg-gradient-to-b from-transparent via-primary-accent to-transparent opacity-70"
        ></div>
      </div>

      <div class="w-full max-w-md flex flex-col relative">
        <!-- Section Header - Activities heading with decorative accent bar -->
        <div class="flex flex-row items-center mb-4 mt-4 lg:mt-16">
          <!-- Visual accent element - vertical bar -->
          <div class="h-8 w-1 bg-primary-accent rounded-r-full block"></div>
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-primary-text font-figtree ml-3"
          >
            {{
              selectedTeacher
                ? `${selectedTeacher.name}'s Activities`
                : "Activities"
            }}
          </h2>
        </div>

        <!-- Teacher Schedule - List of classes and sessions taught by this teacher -->
        <div
          v-if="selectedTeacher?.activities?.length"
          class="mt-4 lg:mt-8 w-full space-y-3"
        >
          <!-- Dynamically generated schedule items with click navigation -->
          <UiTeacherSchedule
            v-for="activityItem in selectedTeacher.activities"
            :id="activityItem.activity.id"
            :key="activityItem.activity.id"
            :title="activityItem.activity.title"
            :icon_id="activityItem.activity.icon_id"
            :time="activityItem.time"
            :days="activityItem.days"
            @click="navigateToActivity(activityItem.activity.id)"
          />
        </div>
        <!-- Empty state when teacher has no scheduled activities -->
        <div
          v-else
          class="mt-4 text-sm text-secondary-text text-center lg:text-left"
        >
          No activities listed.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import Vue core functionality
import { onMounted, computed } from "vue";
// Import router utilities for navigation and route management
import { useRoute, useRouter } from "vue-router";
// Import Nuxt utilities for navigation and head metadata
import { navigateTo, useHead } from "nuxt/app";
// Import teacher data management composable
import { useTeachers } from "../../composables/useTeachers";

// Initialize teacher data and methods from composable
const { selectedTeacher, isLoading, error, fetchTeacherById } = useTeachers();

// Set up route and navigation utilities
const route = useRoute();
const router = useRouter();

// Extract and convert teacher ID from route parameters
const teacherId = Number(route.params.id);

// Dynamic page title generation for optimal SEO
// Includes teacher name for personalized, descriptive titles when available
const pageTitle = computed(() => {
  if (!selectedTeacher.value) return "Teacher Profile | Lotus Haven";
  return `${selectedTeacher.value.name} ${selectedTeacher.value.surname} | Yoga Teacher | Lotus Haven`;
});

// Dynamic meta description that includes teacher name when available
// Provides personalized SEO content for each teacher profile
const pageDescription = computed(() => {
  if (!selectedTeacher.value)
    return "View our yoga teacher's profile, classes and contact information at Lotus Haven.";
  return `Learn about ${selectedTeacher.value.name} ${selectedTeacher.value.surname}, yoga teacher at Lotus Haven. View their class schedule, contact information, and professional background.`;
});

// Configure reactive SEO metadata for teacher profile pages
// Uses computed properties to dynamically update based on loaded teacher data
useHead(() => ({
  title: pageTitle.value,
  meta: [
    { name: "description", content: pageDescription.value },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Open Graph tags for better social media sharing
    { property: "og:title", content: pageTitle.value },
    { property: "og:description", content: pageDescription.value },
    { property: "og:type", content: "profile" },
    // Conditionally include teacher photo as OG image when available
    ...(selectedTeacher.value?.photo_url
      ? [{ property: "og:image", content: selectedTeacher.value.photo_url }]
      : []),
  ],
}));

// Navigation handler for the back button
// Returns user to previous page in browser history
const goBack = () => {
  router.back();
};

// Format phone number to standard US format (xxx) xxx xxxx
// Handles various input formats and provides consistent display
const formattedPhone = computed(() => {
  if (!selectedTeacher.value) return "";

  // Handle both number and string types
  const phoneStr = String(selectedTeacher.value.phone || "");
  if (!phoneStr) return "";

  // Remove all non-numeric characters
  const cleaned = phoneStr.replace(/\D/g, "");

  // Check if we have the right number of digits (10 for US numbers)
  if (cleaned.length !== 10) {
    return phoneStr; // Return original if not 10 digits
  }

  // Format as (xxx) xxx xxxx
  return `(${cleaned.substring(0, 3)}) ${cleaned.substring(
    3,
    6
  )} ${cleaned.substring(6, 10)}`;
});

// Fetch teacher data when component mounts
// Uses ID from route params to retrieve specific teacher profile
onMounted(async () => {
  if (!Number.isNaN(teacherId)) {
    await fetchTeacherById(teacherId);
  }
});

// Navigation handler for activity click events
// Routes to detailed activity page when user clicks on a schedule item
const navigateToActivity = (activityId: number) => {
  navigateTo(`/activity/${activityId}`);
};
</script>

<style scoped>
/* Custom background color for icon containers with reduced opacity */
.bg-primary-accent-light {
  background-color: rgba(118, 197, 185, 0.15);
}

/* Desktop-only gradient for the vertical divider between main content and sidebar */
@media (min-width: 1024px) {
  .via-primary-accent {
    --tw-gradient-stops: transparent, #76c5b9, transparent;
  }
}
</style>
