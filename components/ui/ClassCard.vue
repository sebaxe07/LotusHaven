<template>
  <div class="bg-box rounded-lg overflow-hidden shadow-md h-full flex flex-col">
    <!-- Class Image - If provided, use the image prop, otherwise use a colored background -->
    <div
      v-if="image"
      class="h-48 bg-cover bg-center"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div v-else class="h-48" :class="backgroundColorClass"></div>

    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-secondary-text mb-4 flex-grow">{{ description }}</p>
      <div class="flex justify-between items-center">
        <span class="font-semibold text-primary-accent">
          <span v-if="sessionCount > 0"
            >{{ sessionCount }} sessions available</span
          >
          <span v-else>Check schedule</span>
        </span>
        <UiButton text="Learn More" size="sm" @click="handleLearnMore" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define the type for a schedule
interface Schedule {
  time: string;
  days: string[];
  professor?: {
    id: number;
    name: string;
  };
}

const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  schedules: {
    type: Array as () => Schedule[],
    default: () => [],
  },
  id: {
    type: [String, Number],
    required: true,
  },
  // Optional color variant for cards without images
  colorVariant: {
    type: String,
    default: "primary", // 'primary', 'secondary', or 'third'
    validator: (value: string) =>
      ["primary", "secondary", "third"].includes(value),
  },
});

const emit = defineEmits(["learnMore"]);

// Calculate the number of available sessions
const sessionCount = computed(() => {
  return props.schedules?.length || 0;
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

// Handle Learn More button click
const handleLearnMore = () => {
  emit("learnMore", props.id);
};
</script>
