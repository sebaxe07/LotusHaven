<template>
  <!-- 
    Reusable button component with configurable styles
    Supports multiple variants, sizes, and states
  -->
  <button
    :class="[
      'font-semibold transition-all rounded-base cursor-pointer hover:shadow-md',
      isDisabled ? disabledClasses : buttonClasses,
      extraClasses,
    ]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <!-- Uses slot content if provided, falls back to text prop -->
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * Button component props interface
 */
interface ButtonProps {
  text?: string; // Button text (used if no slot content)
  color?: "primary" | "secondary" | "white" | "outline" | "outline-white"; // Visual style
  disabled?: boolean; // Whether the button is clickable
  extraClasses?: string; // Additional CSS classes
  fullWidth?: boolean; // Whether to fill parent width
  size?: "sm" | "md" | "lg"; // Button size preset
}

// Define emitted events
const emit = defineEmits(["click"]);

// Define props with default values
const props = withDefaults(defineProps<ButtonProps>(), {
  text: "", // Empty text by default
  color: "primary", // Primary style by default
  disabled: false, // Enabled by default
  extraClasses: "", // No extra classes by default
  fullWidth: false, // Normal width by default
  size: "md", // Medium size by default
});

// Reactive disabled state
const isDisabled = computed(() => props.disabled);

/**
 * Computes Tailwind classes for button padding and text size
 * based on the selected size prop
 */
const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-1 px-4 text-sm"; // Small button
    case "lg":
      return "py-3 px-8 text-lg"; // Large button
    case "md":
    default:
      return "py-2 px-6"; // Medium button (default)
  }
});

/**
 * Computes width class based on fullWidth prop
 * Returns empty string for normal width or w-full for full width
 */
const widthClasses = computed(() => (props.fullWidth ? "w-full" : ""));

/**
 * Computes color and style classes based on the color prop
 * Determines background, text, border colors and hover states
 */
const colorClasses = computed(() => {
  switch (props.color) {
    case "primary":
      return "bg-primary-accent text-white hover:bg-secondary-accent";
    case "secondary":
      return "bg-secondary-accent text-white hover:bg-primary-accent";
    case "white":
      return "bg-white text-primary-accent hover:bg-third-accent hover:text-primary-text";
    case "outline":
      return "border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white";
    case "outline-white":
      return "border-2 border-white text-white hover:bg-white hover:text-primary-accent";
    default:
      return "bg-primary-accent text-white hover:bg-secondary-accent";
  }
});

/**
 * Combines all computed style classes for the enabled button state
 */
const buttonClasses = computed(() => {
  return `${colorClasses.value} ${sizeClasses.value} ${widthClasses.value}`;
});

/**
 * Special classes for the disabled button state
 * Preserves sizing but changes colors and cursor
 */
const disabledClasses = computed(() => {
  return `bg-disabled text-secondary-text cursor-not-allowed ${sizeClasses.value} ${widthClasses.value}`;
});

/**
 * Click handler that conditionally emits the click event
 * Prevents event emission when button is disabled
 *
 * @param event - The mouse event from the button click
 */
const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit("click", event);
  }
};
</script>
