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
        <h2 class="font-semibold text-gray-900 text-xl">
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
      <p class="text-sm text-gray-700 line-clamp-2 mb-3">
        {{ shortBio }}
      </p>

      <!-- Activities section -->
      <div class="mt-auto">
        <!-- Activities label as H3 for secondary prominence -->
        <h3 class="font-semibold text-gray-800 text-base mb-2">Activities</h3>
        <div
          ref="activitiesCarousel"
          class="flex gap-2 overflow-x-auto whitespace-nowrap carousel-no-scrollbar activities-carousel"
          @wheel.prevent="handleWheel"
        >
          <Button
            v-for="activity in activities"
            :key="activity.id"
            variant="secondary"
            class="rounded-full text-xs shrink-0"
            @click.stop="handleActivityClick(activity.id)"
          >
            {{ activity.title }}
          </Button>
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
const activitiesCarousel = ref<HTMLElement | null>(null);

const emit = defineEmits<{
  (e: "click", id: number): void;
  (
    e: "activity-click",
    payload: { teacherId: number; activityId: number }
  ): void;
}>();

const handleActivityClick = (activityId: number) => {
  emit("activity-click", { teacherId: props.id, activityId });
};

const handleClick = () => {
  emit("click", props.id);
};

const handleWheel = (event: WheelEvent) => {
  if (activitiesCarousel.value) {
    // Use sensitivity for better scroll control
    const sensitivity = 0.5;
    activitiesCarousel.value.scrollLeft += event.deltaY * sensitivity;
  }
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
