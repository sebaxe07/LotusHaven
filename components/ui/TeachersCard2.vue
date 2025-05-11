<template>
  <div
    class="teacher-card flex flex-col justify-between cursor-pointer transition-all hover:shadow-lg bg-gray-100 rounded-lg"
    :class="cardClasses"
    @click="handleClick"
  >
    <!-- Teacher image taking up half of the card -->
    <div
      class="teacher-image w-full h-[50%] rounded-t-lg bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: `url(${imageUrl})`,
      }"
    ></div>

    <!-- Content section -->
    <div class="p-4 flex flex-col h-[50%]">
      <div class="flex items-center justify-between mb-2">
        <!-- Teacher name as H2 for prominence -->
        <h2 class="font-semibold text-primary-text text-xl">
          {{ name }}
        </h2>
        <!-- Arrow icon for navigation -->
        <UiSvgIcon
          icon="/icons/arrow.svg"
          :width="24"
          :height="24"
          :color="arrowColor"
          class="transform rotate-180 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>

      <!-- Teacher bio -->
      <p class="text-sm text-secondary-text line-clamp-2 mb-3">
        {{ shortBio }}
      </p>

      <!-- Activities section -->
      <div class="mt-auto">
        <!-- Activities label as H3 for secondary prominence -->
        <h3 class="font-semibold text-primary-text text-base mb-2">
          Activities
        </h3>
        <div class="activities-container">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="activity-tag bg-primary-accent text-white hover:bg-primary-accent-dark px-2 py-1 mb-1.5 mr-1.5 inline-block cursor-pointer transition-colors"
            @click.stop="handleActivityClick(activity.id)"
          >
            {{ formatActivityName(activity.title) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "./Button.vue";

interface TeacherCardProps {
  id: number;
  name: string;
  shortBio: string;
  imageUrl: string;
  activities: { id: number; title: string }[];
  size?: "sm" | "md" | "lg"; // Optional size prop for different card dimensions
}

const props = withDefaults(defineProps<TeacherCardProps>(), {
  size: "md",
});

const arrowColor = ref("var(--color-primary-accent)");

const emit = defineEmits<{
  (e: "click", id: number): void;
  (
    e: "activity-click",
    payload: { teacherId: number; activityId: number }
  ): void;
}>();

// Format activity names to be more meaningful even when short
const formatActivityName = (name: string) => {
  // For very long names, use intelligent shortening
  if (name.length > 15) {
    // If name has spaces, try to extract meaningful parts
    if (name.includes(" ")) {
      const words = name.split(" ");
      // If first word is long enough, use it; otherwise use first two words
      if (words[0].length >= 6) {
        return words[0];
      } else if (words.length >= 2) {
        return `${words[0]} ${words[1].substring(0, 3)}`;
      }
    }
    // For single long words, keep more characters
    return name.substring(0, 12) + "...";
  }
  // Short names can be shown completely
  return name;
};

const handleActivityClick = (activityId: number) => {
  emit("activity-click", { teacherId: props.id, activityId });
};

const handleClick = () => {
  emit("click", props.id);
};

// Computed classes based on size prop for more flexibility
const cardClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-full max-w-[280px] h-[360px]";
    case "lg":
      return "w-full max-w-[380px] h-[460px]";
    case "md":
    default:
      return "w-full max-w-[330px] h-[420px]";
  }
});
</script>

<style scoped>
.activities-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  max-height: 80px;
  overflow-y: auto;
  padding-right: 4px;
}

.activity-tag {
  border-radius: var(--radius-base);
  margin-right: 0.375rem;
}

.activity-tag:last-child {
  margin-right: 0;
}

/* Ensuring the vertical scrollbar has your custom styling */
.activities-container::-webkit-scrollbar {
  width: 4px !important;
}

.activities-container::-webkit-scrollbar-thumb {
  background: var(--color-primary-accent) !important;
  border-radius: 4px !important;
}

.activities-container::-webkit-scrollbar-track {
  background: var(--color-primary) !important;
}

.carousel-no-scrollbar {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
}

.carousel-no-scrollbar::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari and Opera */
  width: 0 !important;
  height: 0 !important;
}

/* Override global scrollbar styles specifically for this component */
.carousel-no-scrollbar::-webkit-scrollbar-track,
.carousel-no-scrollbar::-webkit-scrollbar-thumb,
.carousel-no-scrollbar::-webkit-scrollbar-thumb:hover {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}

.activities-carousel {
  scroll-behavior: smooth; /* Add smooth scrolling effect */
  scroll-padding: 0.5rem; /* Add padding when scrolling to elements */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  mask-image: linear-gradient(to right, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
}

.teacher-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden; /* Ensure the image stays within rounded corners */
}

@media (max-width: 640px) {
  .teacher-card {
    max-width: 100%;
  }
}

@media (hover: hover) {
  .teacher-card:hover {
    transform: translateY(-5px);
  }
}
</style>
