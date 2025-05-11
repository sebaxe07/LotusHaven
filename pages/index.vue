<template>
  <div class="min-h-screen">
    <!-- Hero Section with Gradient and Logo -->
    <section
      class="h-screen lg:h-screen flex flex-col justify-center text-center relative"
      :style="{
        background: `linear-gradient(to bottom, 
                    var(--color-primary) 50%, 
                    var(--color-primary-accent) 100%)`,
        height: isMobile ? 'calc(100vh - 64px)' : '100vh',
      }"
    >
      <div class="container mx-auto px-4">
        <img
          src="/images/logo.svg"
          alt="Lotus Haven Logo"
          class="mx-auto w-40 h-40 mb-8"
        />
        <h1 class="header1 mb-4 leading-10 text-primary-text">
          Welcome to Lotus Haven
        </h1>
        <h2 class="text-secondary-text mb-8 header3">
          This is more than a yoga studio—it's a haven to reconnect, recharge,
          and rise.
        </h2>
      </div>
      <!-- Text and arrow for scrolling down -->
      <div
        class="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p class="text-primary-text mb-10">Explore our community!</p>
        <div class="animate-bounce cursor-pointer" @click="scrollToNextSection">
          <UiSvgIcon
            icon="/icons/arrow.svg"
            :width="32"
            :height="32"
            :color="arrowColor"
            class="transform rotate-270"
          />
        </div>
      </div>
    </section>

    <!-- Quote Section -->
    <section id="quote-section" class="py-16 bg-primary">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-primary-text leading-snug">
          "Yoga is the dance of every cell with the music of every <br />
          breath that creates inner serenity and harmony." <br />
          - Debasish Mridha
        </h2>
      </div>
    </section>

    <!-- Who Are We Section -->
    <section class="py-16 bg-secondary">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Left column with image -->
          <div class="mb-8 md:mb-0">
            <NuxtImg
              src="/images/whoarewe1.png"
              alt="Lotus Haven Yoga Studio"
              class="rounded-lg shadow-lg w-full"
              format="webp"
              quality="90"
              loading="eager"
            />
          </div>

          <!-- Right column with text -->
          <div>
            <h2 class="text-primary-text mb-6">Who Are We?</h2>
            <p class="text-secondary-text mb-4">
              Lotus Haven is more than just a yoga studio—it's a sanctuary
              dedicated to holistic wellness and mindful living. Founded in
              2020, our mission is to create a welcoming space where individuals
              of all backgrounds and abilities can explore the transformative
              benefits of yoga and meditation.
            </p>
            <p class="text-secondary-text mb-4">
              Our experienced instructors bring diverse backgrounds and
              specializations, ensuring that every class offers unique insights
              while honoring traditional practices. We believe that yoga is for
              everybody—regardless of age, flexibility, or experience level.
            </p>
            <p class="text-secondary-text">
              At Lotus Haven, we're committed to fostering a supportive
              community where you can disconnect from daily stresses, reconnect
              with yourself, and cultivate balance both on and off the mat.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Levels Section -->
    <section class="py-16 bg-third-accent">
      <div class="container mx-auto px-4">
        <h2 class="text-primary-text text-center mb-12 leading-snug">
          It doesn't matter if you are a beginner or if you have
          <br />experience, there's the right course for you
        </h2>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <!-- Beginner Courses -->
          <div class="text-center">
            <h3 class="text-primary-text mb-4 leading-7">
              Beginner <br />Courses
            </h3>
            <p class="text-secondary-text">
              New to yoga? Our beginner courses provide a gentle introduction to
              fundamental poses, breathing techniques, and mindfulness
              practices. Our supportive instructors will guide you step-by-step,
              helping you build confidence and develop a strong foundation for
              your practice.
            </p>
          </div>

          <!-- Medium and Advanced Courses -->
          <div class="text-center">
            <h3 class="text-primary-text mb-4 leading-7">
              Medium and<br />Advanced
            </h3>
            <p class="text-secondary-text">
              Ready to deepen your practice? Our intermediate and advanced
              courses challenge experienced practitioners with more complex
              sequences, advanced variations, and deeper explorations of yoga
              philosophy. Elevate your practice and discover new dimensions of
              strength, flexibility, and awareness.
            </p>
          </div>

          <!-- Teacher Training -->
          <div class="text-center">
            <h3 class="text-primary-text mb-4 leading-7">
              Courses to become <br />a teacher
            </h3>
            <p class="text-secondary-text">
              Transform your passion into purpose. Our comprehensive teacher
              training programs provide the knowledge, skills, and mentorship
              needed to become a confident and effective yoga instructor. Learn
              anatomy, philosophy, sequencing, and the art of creating
              meaningful experiences for your future students.
            </p>
          </div>
        </div>

        <!-- See All Activities Button -->
        <div class="text-center">
          <UiButton
            text="See All Activities"
            color="primary"
            size="lg"
            @click="navigateToActivities"
          />
        </div>
      </div>
    </section>

    <!-- Featured Classes Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center text-primary-text">
          Featured Classes
        </h2>
        <div v-if="activitiesLoading" class="text-center py-8">
          <p class="text-secondary-text">Loading featured classes...</p>
        </div>
        <div v-else-if="activitiesError" class="text-center py-8 text-red-500">
          <p>
            There was an error loading the featured classes:
            {{ activitiesError }}
          </p>
        </div>
        <div
          v-else-if="highlightedClassCards.length === 0"
          class="text-center py-8"
        >
          <p class="text-secondary-text">
            No featured classes available at the moment.
          </p>
        </div>
        <div v-else class="grid md:grid-cols-3 gap-6">
          <UiClassCard
            v-for="classItem in highlightedClassCards"
            :id="classItem.id"
            :key="classItem.id"
            :title="classItem.title"
            :description="classItem.description"
            :schedules="classItem.schedules"
            :image="classItem.image"
            :color-variant="classItem.colorVariant"
            @learn-more="handleLearnMore"
          />
        </div>
      </div>
    </section>

    <!-- Teachers Section -->
    <section class="py-16 bg-secondary">
      <div class="container mx-auto px-4">
        <div class="flex justify-start gap-4 items-center mb-8">
          <h2 class="text-3xl font-bold text-primary-text">Our Teachers</h2>
          <UiButton
            text="See All "
            color="primary"
            size="sm"
            @click="navigateToTeachers"
          />
        </div>

        <div v-if="teachersLoading" class="text-center py-8">
          <p class="text-secondary-text">Loading teachers...</p>
        </div>
        <div v-else-if="teachersError" class="text-center py-8 text-red-500">
          <p>There was an error loading the teachers: {{ teachersError }}</p>
        </div>
        <div v-else-if="teachers.length === 0" class="text-center py-8">
          <p class="text-secondary-text">
            No teachers available at the moment.
          </p>
        </div>
        <UiTeachersCarousel v-else v-slot="{ cardWidth }">
          <UiTeacherCard
            v-for="teacher in teachers"
            :id="teacher.id"
            :key="teacher.id"
            :name="teacher.fullName"
            :image-url="teacher.imageUrl"
            :card-width="cardWidth"
            @click="navigateToTeacherDetail(teacher.id)"
          />
        </UiTeachersCarousel>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="py-16 bg-primary-accent text-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <h2 class="mb-4">Begin Your Journey Today</h2>
          <p class="mb-8 max-w-2xl mx-auto">
            Join our community and discover the benefits of a mindful practice.
            Your first class is on us! Connect with like-minded individuals and
            explore the transformative power of yoga in a welcoming environment.
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <UiButton
            text="Sign Up Now"
            color="white"
            size="md"
            @click="contactUs"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useActivities } from "../composables/useActivities";
import { useTeachers } from "../composables/useTeachers";
import { navigateTo, useHead } from "nuxt/app";
import type { TeacherCardItem } from "../types/teachers";

// SEO configuration for homepage
useHead({
  title: "Lotus Haven | Yoga Studio & Wellness Center",
  meta: [
    {
      name: "description",
      content:
        "Welcome to Lotus Haven, a premier yoga studio and wellness center offering classes for all levels. Join our community to reconnect, recharge, and rise through mindful practice.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // Keywords
    {
      name: "keywords",
      content:
        "yoga studio, wellness center, yoga classes, meditation, mindfulness, beginner yoga, advanced yoga, teacher training",
    },
    // Open Graph tags for better social media sharing
    {
      property: "og:title",
      content: "Lotus Haven | Yoga Studio & Wellness Center",
    },
    {
      property: "og:description",
      content:
        "Discover our welcoming yoga community offering classes for all levels, from beginners to advanced practitioners.",
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/images/logo.svg" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Lotus Haven Yoga" },
    {
      name: "twitter:description",
      content: "A sanctuary dedicated to holistic wellness and mindful living.",
    },
  ],
  link: [{ rel: "canonical", href: "https://lotushaven.com" }],
});

// Define the arrow color directly
const arrowColor = ref("var(--color-primary-text)");

// Add mobile detection
const isMobile = ref(false);

// Check if device is mobile on component mount and on window resize
onMounted(() => {
  if (typeof window !== "undefined") {
    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);
  }
});

// Clean up event listener
onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", checkIfMobile);
  }
});

// Function to check if viewport is mobile size
const checkIfMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 1024; // 1024px is the lg breakpoint in Tailwind
  }
};

// Use the activities composable
const {
  highlightedActivities,
  isLoading: activitiesLoading,
  error: activitiesError,
  fetchHighlightedActivities,
  activityToClassCard,
} = useActivities();

// Use the teachers composable
const {
  teachers: teachersData,
  isLoading: teachersLoading,
  error: teachersError,
  fetchTeachers,
  teacherToCardItem,
} = useTeachers();

// Transform highlighted activities into class cards with proper formatting, randomly selecting 3
const highlightedClassCards = computed(() => {
  const activities = highlightedActivities.value;

  // If we have 3 or fewer activities, use them all
  if (activities.length <= 3) {
    return activities.map((activity, index) =>
      activityToClassCard(activity, index)
    );
  }

  // Otherwise, randomly select 3 activities
  const randomActivities = [];
  const usedIndices = new Set();

  // Select 3 unique random activities
  while (
    randomActivities.length < 3 &&
    randomActivities.length < activities.length
  ) {
    const randomIndex = Math.floor(Math.random() * activities.length);

    // Make sure we don't select the same activity twice
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      randomActivities.push(activities[randomIndex]);
    }
  }

  // Transform selected activities into class cards
  return randomActivities.map((activity, index) =>
    activityToClassCard(activity, index)
  );
});

// Transform teacher data to card items for the carousel
const teachers = computed<TeacherCardItem[]>(() => {
  return teachersData.value.map((teacher) => teacherToCardItem(teacher));
});

// Fetch highlighted activities and teachers when component mounts
onMounted(async () => {
  await Promise.all([fetchHighlightedActivities(), fetchTeachers()]);
});

// Handle Learn More button click
const handleLearnMore = (id: number): void => {
  console.log(`Learn more about class with ID: ${id}`);
  navigateTo(`/activity/${id}`); // Added navigation and changed to /activity/${id}
};

// Navigation functions for the teachers section
const navigateToTeachers = () => {
  console.log("Navigating to all teachers page");
  navigateTo("/teachers");
};

const navigateToTeacherDetail = (id: number) => {
  console.log(`Navigating to teacher with ID: ${id}`);
  navigateTo(`/teacher/${id}`); // Changed from /teachers/${id} to /teacher/${id}
};

const navigateToActivities = () => {
  console.log("Navigating to all activities page");
  navigateTo("/activities");
};

// Handle Sign Up button click
const contactUs = () => {
  console.log("Opening sign up form");
  navigateTo("/contact");
};

// Function to scroll to the next section
const scrollToNextSection = () => {
  const nextSection = document.querySelector("#quote-section");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
