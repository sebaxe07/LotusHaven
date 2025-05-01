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
        <span class="font-medium text-primary-accent">{{ time }}</span>
        <button
          class="text-sm bg-primary-accent text-white py-1 px-3 rounded hover:bg-secondary-accent transition-colors"
          @click="handleLearnMore"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

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
  time: {
    type: String,
    required: true,
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
