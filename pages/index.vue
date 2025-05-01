<template>
  <div class="min-h-screen">
    <!-- Hero Section with Gradient and Logo -->
    <section
      class="h-screen flex flex-col justify-center text-center relative"
      :style="{
        background: `linear-gradient(to bottom, 
                    var(--color-primary) 50%, 
                    var(--color-primary-accent) 100%)`,
      }"
    >
      <div class="container mx-auto px-4">
        <img
          src="/images/logo.svg"
          alt="Lotus Haven Logo"
          class="mx-auto w-40 h-40 mb-8"
        />
        <h1 class="header1 mb-4 text-primary-text">Welcome to Lotus Haven</h1>
        <p class="paragraph text-secondary-text mb-8">
          This is more than a yoga studio—it's a haven to reconnect, recharge,
          and rise. Join a community where movement, breath, and intention come
          together.
        </p>
      </div>
      <!-- Arrow indicating scroll down -->
      <div
        class="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <UiSvgIcon
          icon="/icons/arrow.svg"
          :width="32"
          :height="32"
          :color="arrowColor"
          class="transform rotate-270"
        />
      </div>
    </section>

    <!-- Quote Section -->
    <section class="py-16 bg-primary">
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
            <h3 class="text-primary-text mb-4 leading-snug">
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
            <h3 class="text-primary-text mb-4 leading-snug">
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
            <h3 class="text-primary-text mb-4 leading-snug">
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
        <div class="grid md:grid-cols-3 gap-6">
          <UiClassCard
            v-for="classItem in featuredClasses"
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

        <UiTeachersCarousel v-slot="{ cardWidth }">
          <UiTeacherCard
            v-for="teacher in teachers"
            :id="teacher.id"
            :key="teacher.id"
            :name="teacher.name"
            :image-url="teacher.imageUrl"
            :card-width="cardWidth"
            @click="navigateToTeacherDetail"
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
            @click="signUp"
          />
          <UiButton
            text="Contact Us"
            color="outline-white"
            @click="$router.push('/contact')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ClassCardItem } from "../types/activities.ts";

// Define the arrow color directly
const arrowColor = ref("var(--color-primary-text)");

// Static data for featured classes with multiple schedules
const featuredClasses = ref<ClassCardItem[]>([
  {
    id: 1,
    title: "Morning Meditation",
    description: "Start your day with mindfulness and intention",
    schedules: [
      {
        time: "7:00",
        days: ["Monday", "Wednesday", "Friday"],
        professor: { id: 1, name: "Emma Wilson" },
      },
      {
        time: "8:15",
        days: ["Tuesday", "Thursday"],
        professor: { id: 2, name: "Michael Chen" },
      },
    ],
    image: "https://picsum.photos/200/300",
    colorVariant: "primary",
  },
  {
    id: 2,
    title: "Gentle Flow",
    description: "Reconnect with your body through gentle movements",
    schedules: [
      {
        time: "18:00",
        days: ["Tuesday", "Thursday"],
        professor: { id: 3, name: "Sarah Johnson" },
      },
    ],
    image: "https://picsum.photos/200/300",
    colorVariant: "secondary",
  },
  {
    id: 3,
    title: "Deep Stretch",
    description: "Release tension and improve flexibility",
    schedules: [
      {
        time: "17:00",
        days: ["Wednesday"],
        professor: { id: 1, name: "Emma Wilson" },
      },
      {
        time: "10:30",
        days: ["Saturday"],
        professor: { id: 4, name: "David Rodriguez" },
      },
      {
        time: "19:15",
        days: ["Monday", "Friday"],
        professor: { id: 2, name: "Michael Chen" },
      },
    ],
    image: "https://picsum.photos/200/300",
    colorVariant: "third",
  },
]);

// Static data for teachers carousel
const teachers = ref([
  {
    id: 1,
    name: "Emma Wilson",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    imageUrl:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    imageUrl:
      "https://images.unsplash.com/photo-1529693662653-9d480530a697?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "David Rodriguez",
    imageUrl:
      "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Aisha Patel",
    imageUrl:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "James Taylor",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Olivia Brown",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Liam Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop",
  },
]);

// Handle Learn More button click
const handleLearnMore = (id: number): void => {
  console.log(`Learn more about class with ID: ${id}`);
};

// Navigation functions for the teachers section
const navigateToTeachers = () => {
  console.log("Navigating to all teachers page");
  // Will be implemented when data fetching is added
  // navigateTo('/teachers');
};

const navigateToTeacherDetail = (id: number) => {
  console.log(`Navigating to teacher with ID: ${id}`);
  // Will be implemented when data fetching is added
  // navigateTo(`/teachers/${id}`);
};

const navigateToActivities = () => {
  console.log("Navigating to all activities page");
  // Will be implemented when data fetching is added
  // navigateTo('/activities');
};

// Handle Sign Up button click
const signUp = () => {
  console.log("Opening sign up form");
  // This will be implemented with actual sign up functionality
  // For now it just logs to console
};
</script>
