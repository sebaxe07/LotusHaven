<!--
  CarouselArrow Component
  
  A customizable arrow button component used for carousel navigation controls.
  This component renders a circular button with an arrow icon that can point in
  different directions (left, right, up, down) and is sized according to the props.
-->
<template>
  <!-- 
    The main button element with interactive states (hover, focus) and 
    dynamic sizing based on the size prop
  -->
  <button
    class="bg-primary-accent rounded-full flex items-center justify-center shadow-md focus:outline-none cursor-pointer hover:bg-secondary-accent transition-all"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :aria-label="`Scroll ${direction}`"
    @click="handleClick"
  >
    <!-- Container for the SVG icon with proper alignment -->
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

/**
 * Interface defining the props for the CarouselArrow component
 * @property {string} direction - The direction the arrow should point (left, right, up, down)
 * @property {number} size - The size of the button in pixels
 */
interface CarouselArrowProps {
  direction?: "left" | "right" | "up" | "down";
  size?: number;
}

/**
 * Component props with default values
 * Default direction is "right" and default size is 40px
 */
const props = withDefaults(defineProps<CarouselArrowProps>(), {
  direction: "right",
  size: 40,
});

/**
 * Event emitter for click events
 */
const emit = defineEmits(["click"]);

/**
 * Calculates the appropriate icon size based on the button size
 * Ensures icon is proportional to the button while maintaining minimum size
 * @returns {number} - The calculated icon size in pixels
 */
const iconSize = computed(() => Math.max(16, Math.floor(props.size * 0.45)));

/**
 * Determines the CSS transform class to rotate the arrow based on the direction prop
 * Base SVG points left, so other directions are created through rotation
 * @returns {string} - The CSS class for arrow rotation
 */
const arrowDirectionClass = computed(() => {
  switch (props.direction) {
    case "left":
      return ""; // Default direction, no rotation needed
    case "right":
      return "transform rotate-180"; // 180° rotation for right-facing arrow
    case "up":
      return "transform rotate-90"; // 90° rotation for up-facing arrow
    case "down":
      return "transform -rotate-90"; // -90° rotation for down-facing arrow
    default:
      return "";
  }
});

// Handle click and emit the click event
const handleClick = () => {
  emit("click");
};
</script>
