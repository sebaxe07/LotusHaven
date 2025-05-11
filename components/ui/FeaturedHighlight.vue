<template>
  <div class="relative overflow-hidden bg-box rounded-lg shadow-md">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <!-- Image Section -->
      <div
        v-if="image"
        class="h-64 md:h-full bg-cover bg-center"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div v-else class="h-64 md:h-full" :class="backgroundColorClass"></div>

      <!-- Content Section -->
      <div class="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div class="flex items-center mb-4">
            <span
              class="px-3 py-1 text-sm text-white rounded-full"
              :class="tagColorClass"
              >Featured</span
            >
            <span
              v-if="difficultyLevel"
              class="ml-2 px-2 py-1 text-xs font-medium rounded-full"
              :class="getDifficultyClass(difficultyLevel)"
            >
              {{ getDifficultyLabel(difficultyLevel) }}
            </span>
          </div>
          <h2 class="text-2xl font-bold mb-3 text-primary-text">{{ title }}</h2>
          <p class="mb-6 text-secondary-text">{{ description }}</p>
        </div>

        <div>
          <div v-if="schedules && schedules.length > 0" class="mb-4">
            <h4
              class="text-sm uppercase tracking-wider text-secondary-text mb-2"
            >
              Upcoming Sessions
            </h4>
            <div class="space-y-2">
              <div
                v-for="(schedule, index) in displayedSchedules"
                :key="index"
                class="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-primary-accent mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm">
                  {{ formatSchedule(schedule) }}
                </span>
              </div>
            </div>
          </div>

          <button
            class="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-accent hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-accent transition-colors"
            @click="$emit('learn-more', id)"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-1.5 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Schedule {
  time: string;
  days: string[];
  professor?: {
    id: number;
    name: string;
  };
}

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  schedules: {
    type: Array as () => Schedule[],
    default: () => [],
  },
  colorVariant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "third"].includes(value),
  },
  difficultyLevel: {
    type: Number,
    default: 1,
  },
});

defineEmits(["learn-more"]);

// Format schedule for display
const formatSchedule = (schedule: Schedule): string => {
  const daysStr = schedule.days
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(", ");
  const instructorName = schedule.professor
    ? ` with ${schedule.professor.name}`
    : "";
  return `${schedule.time} on ${daysStr}${instructorName}`;
};

// Only show up to 2 schedules in the featured component
const displayedSchedules = computed(() => {
  return props.schedules.slice(0, 2);
});

// Dynamic background color class based on colorVariant prop
const backgroundColorClass = computed(() => {
  switch (props.colorVariant) {
    case "primary":
      return "bg-primary-accent";
    case "secondary":
      return "bg-secondary-accent";
    case "third":
      return "bg-third-accent";
    default:
      return "bg-primary-accent";
  }
});

// Tag color class based on colorVariant
const tagColorClass = computed(() => {
  switch (props.colorVariant) {
    case "primary":
      return "bg-primary-accent";
    case "secondary":
      return "bg-secondary-accent";
    case "third":
      return "bg-secondary-accent bg-opacity-80";
    default:
      return "bg-primary-accent";
  }
});

// Get difficulty class based on difficulty level
const getDifficultyClass = (level: number): string => {
  switch (level) {
    case 1:
      return "bg-green-100 text-green-800";
    case 2:
      return "bg-blue-100 text-blue-800";
    case 3:
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Get difficulty label based on difficulty level
const getDifficultyLabel = (level: number): string => {
  switch (level) {
    case 1:
      return "Beginner";
    case 2:
      return "Intermediate";
    case 3:
      return "Advanced";
    default:
      return "All Levels";
  }
};
</script>
