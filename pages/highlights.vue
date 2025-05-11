<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-2 text-primary-text">Highlights</h1>
    <p class="mb-8 text-secondary-text">
      Explore the highlighted activities and special classes offered at Lotus
      Haven.
    </p>

    <!-- Loading State - Animated spinner while data is being fetched -->
    <div v-if="isLoading" class="py-12 text-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-accent border-r-transparent align-[-0.125em]"
      ></div>
      <p class="mt-4 text-secondary-text">Loading highlighted activities...</p>
    </div>

    <!-- Error State - User-friendly error display with retry option -->
    <div v-else-if="error" class="py-8 text-center">
      <div
        class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg"
      >
        <p class="font-medium">Error: {{ error.message }}</p>
        <button
          class="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition"
          @click="retryFetch"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- Empty State - Friendly message when no activities are available -->
    <div
      v-else-if="highlightedActivities.length === 0"
      class="py-12 text-center"
    >
      <div class="bg-third-accent/20 px-6 py-8 rounded-lg">
        <h3 class="text-xl font-medium text-secondary-accent mb-2">
          No Highlighted Activities
        </h3>
        <p class="text-secondary-text">
          Check back soon for our featured classes and activities.
        </p>
      </div>
    </div>

    <!-- Content Container - Wrapper for all content when data is available -->
    <div v-else>
      <!-- Hero Feature - Randomly selected premium activity with full details -->
      <div v-if="featuredActivity" class="mb-12">
        <UiFeaturedHighlight
          :id="featuredActivity.id"
          :title="featuredActivity.title"
          :description="
            featuredActivity.short_desc || featuredActivity.description
          "
          :image="featuredActivity.image"
          :schedules="featuredActivity.schedules"
          :color-variant="featuredActivity.colorVariant"
          :difficulty-level="featuredActivity.difficulty_level"
          @learn-more="navigateToActivity"
        />
      </div>

      <!-- Activity Carousel - Secondary featured activities in horizontal scrollable layout -->
      <div v-if="otherHighlightedActivities.length > 0" class="mb-10">
        <h2 class="text-2xl font-semibold mb-4 text-primary-text">
          Featured Classes
        </h2>
        <UiClassesCarousel
          :activities="otherHighlightedActivities"
          @learn-more="navigateToActivity"
        />
      </div>

      <!-- Benefits Grid - Selling points of premium classes with visual indicators -->
      <div class="mt-12 bg-box p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-primary-text">
          Why Join Our Highlighted Classes?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Benefit Item - Expert Instructors Feature -->
          <div class="flex items-start">
            <div class="bg-primary-accent rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-primary-text">Expert Instructors</h3>
              <p class="mt-1 text-secondary-text">
                Learn from our carefully selected teachers with years of
                experience.
              </p>
            </div>
          </div>
          <!-- Benefit Item - Premium Content Feature -->
          <div class="flex items-start">
            <div class="bg-secondary-accent rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-primary-text">Premium Content</h3>
              <p class="mt-1 text-secondary-text">
                Our highlighted activities represent the best we have to offer.
              </p>
            </div>
          </div>
          <!-- Benefit Item - Flexible Scheduling Feature -->
          <div class="flex items-start">
            <div class="bg-third-accent rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-secondary-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-primary-text">Flexible Scheduling</h3>
              <p class="mt-1 text-secondary-text">
                Multiple sessions per week to fit into your busy calendar.
              </p>
            </div>
          </div>
          <!-- Benefit Item - Inclusivity Feature -->
          <div class="flex items-start">
            <div class="bg-primary-accent/70 rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-primary-text">All Levels Welcome</h3>
              <p class="mt-1 text-secondary-text">
                We offer classes suitable for beginners through advanced
                practitioners.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Conversion Section - Sign-up prompt with contextual background -->
      <div class="mt-12 text-center p-8 bg-primary-accent/10 rounded-lg">
        <h2 class="text-2xl font-bold mb-3 text-primary-text">
          Ready to Experience Our Highlighted Classes?
        </h2>
        <p class="mb-6 max-w-2xl mx-auto text-secondary-text">
          Join Lotus Haven today and transform your practice with our specially
          curated classes designed to enhance your mind, body, and spirit.
        </p>
        <!-- CTA Button - Primary call-to-action for conversion -->
        <UiButton
          text="Sign Up Now"
          color="primary"
          size="lg"
          @click="router.push('/contact')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useActivities } from "../composables/useActivities";
import { useRouter } from "vue-router";
import { useHead } from "nuxt/app";

// Configure SEO metadata for highlights page with proper titles and descriptions
useHead({
  title: "Featured Highlights & Special Classes | Lotus Haven Yoga",
  meta: [
    {
      name: "description",
      content:
        "Explore our highlighted yoga classes and special activities at Lotus Haven. Discover premium sessions taught by expert instructors for all experience levels.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Open Graph tags for better social media sharing
    {
      property: "og:title",
      content: "Featured Yoga Classes & Highlights | Lotus Haven",
    },
    {
      property: "og:description",
      content:
        "Discover our premium yoga classes taught by expert instructors at Lotus Haven. Special activities for all experience levels.",
    },
    { property: "og:type", content: "website" },
  ],
});

// Initialize activities data and methods from composable
// Provides featured activities data and loading states
const { highlightedActivities, isLoading, error, fetchHighlightedActivities } =
  useActivities();

// Initialize Vue Router for page navigation
const router = useRouter();

// Track the index of the randomly selected featured activity
const featuredActivityIndex = ref(0);

// Convert raw activity data into formatted card objects with consistent structure
const highlightedActivitiesAsCards = computed(() => {
  if (!highlightedActivities.value || highlightedActivities.value.length === 0)
    return [];

  return highlightedActivities.value.map((activity, index) => {
    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      short_desc: activity.short_desc,
      schedules: activity.schedules,
      image:
        activity.images && activity.images.length > 0
          ? activity.images[0]
          : undefined,
      colorVariant: getColorVariant(index),
      difficulty_level: activity.difficulty_level,
      icon_id: activity.icon_id,
    };
  });
});

// Extract the currently selected featured activity to highlight at the top of the page
// Returns null if no activities are available
const featuredActivity = computed(() => {
  if (highlightedActivitiesAsCards.value.length === 0) return null;
  return highlightedActivitiesAsCards.value[featuredActivityIndex.value];
});

// Filter out the featured activity to display the remaining activities in the carousel
// Returns empty array if only one or zero activities are available
const otherHighlightedActivities = computed(() => {
  if (highlightedActivitiesAsCards.value.length <= 1) return [];

  // Filter out the featured activity by index
  return highlightedActivitiesAsCards.value.filter(
    (_, index) => index !== featuredActivityIndex.value
  );
});

// Assign color themes to activities using a cyclic pattern
// Ensures visual variety when displaying multiple activity cards
const getColorVariant = (index: number): string => {
  const variants = ["primary", "secondary", "third"];
  return variants[index % variants.length];
};

// Select a random activity to feature at the top of the page
// Adds dynamic content variation between page visits
const randomizeFeaturedActivity = () => {
  if (highlightedActivitiesAsCards.value.length > 0) {
    featuredActivityIndex.value = Math.floor(
      Math.random() * highlightedActivitiesAsCards.value.length
    );
  }
};

// Handle navigation to individual activity detail pages
// Triggered by clicking "Learn More" buttons
const navigateToActivity = (id: number) => {
  router.push(`/activity/${id}`);
};

// Error recovery handler for data fetching failures
// Attempts to reload data when user clicks "Retry" button
const retryFetch = async () => {
  await fetchHighlightedActivities();
  randomizeFeaturedActivity();
};

// Initialize page data on component mount
// Loads activities and selects a random feature
onMounted(async () => {
  await fetchHighlightedActivities();
  randomizeFeaturedActivity();
});
</script>
