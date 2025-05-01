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
            :time="classItem.time"
            :image="classItem.image"
            :color-variant="classItem.colorVariant"
            @learn-more="handleLearnMore"
          />
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-third-accent bg-opacity-30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center text-primary-text">
          What Our Students Say
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="italic mb-4">
              "Lotus Haven has transformed my approach to wellness. The
              instructors are knowledgeable and supportive, creating a space
              where I feel truly at peace."
            </p>
            <p class="font-bold text-primary-accent">— Sarah M.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="italic mb-4">
              "I've been attending classes for six months, and I've noticed
              significant improvements in my flexibility, focus, and overall
              well-being. Highly recommended!"
            </p>
            <p class="font-bold text-primary-accent">— Michael T.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="py-16 bg-primary-accent text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4">Begin Your Journey Today</h2>
        <p class="text-xl mb-8 max-w-xl mx-auto">
          Join our community and discover the benefits of a mindful practice.
          Your first class is on us!
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button
            class="bg-white text-primary-accent py-2 px-6 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Sign Up Now
          </button>
          <NuxtLink
            to="/contact"
            class="border-2 border-white text-white py-2 px-6 rounded-full font-semibold hover:bg-white hover:text-primary-accent transition-all"
          >
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ClassCardItem } from "../types/activities";

// Define the arrow color directly
const arrowColor = ref("var(--color-primary-text)");

// Static data for featured classes (UI only)
const featuredClasses = ref<ClassCardItem[]>([
  {
    id: 1,
    title: "Morning Meditation",
    description: "Start your day with mindfulness and intention",
    time: "Mon-Fri 7am",
    image: "https://picsum.photos/200/300",
    colorVariant: "primary",
  },
  {
    id: 2,
    title: "Gentle Flow",
    description: "Reconnect with your body through gentle movements",
    time: "Tue & Thu 6pm",
    image: "https://picsum.photos/200/300",
    colorVariant: "secondary",
  },
  {
    id: 3,
    title: "Deep Stretch",
    description: "Release tension and improve flexibility",
    time: "Wed & Sat 5pm",
    image: "https://picsum.photos/200/300",
    colorVariant: "third",
  },
]);

// Handle Learn More button click
const handleLearnMore = (id: number): void => {
  console.log(`Learn more about class with ID: ${id}`);
};
</script>
