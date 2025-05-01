<template>
  <button
    class="bg-primary-accent rounded-full flex items-center justify-center shadow-md focus:outline-none cursor-pointer hover:bg-secondary-accent transition-all"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :aria-label="`Scroll ${direction}`"
    @click="handleClick"
  >
    <div class="text-secondary flex items-center justify-center">
      <UiSvgIcon
        icon="/icons/arrow.svg"
        :width="iconSize"
        :height="iconSize"
        color="currentColor"
        :class="arrowDirectionClass"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface CarouselArrowProps {
  direction?: "left" | "right" | "up" | "down";
  size?: number;
}

const props = withDefaults(defineProps<CarouselArrowProps>(), {
  direction: "right",
  size: 40,
});

const emit = defineEmits(["click"]);

// Calculate icon size based on button size
const iconSize = computed(() => Math.max(16, Math.floor(props.size * 0.45)));

// Set the appropriate rotation class based on direction
const arrowDirectionClass = computed(() => {
  switch (props.direction) {
    case "left":
      return "";
    case "right":
      return "transform rotate-180";
    case "up":
      return "transform rotate-90";
    case "down":
      return "transform -rotate-90";
    default:
      return "";
  }
});

// Handle click and emit the click event
const handleClick = () => {
  emit("click");
};
</script>
