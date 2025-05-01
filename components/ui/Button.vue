<template>
  <button
    :class="[
      'font-semibold transition-all rounded-base cursor-pointer',
      isDisabled ? disabledClasses : buttonClasses,
      extraClasses,
    ]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ButtonProps {
  text?: string;
  color?: "primary" | "secondary" | "white" | "outline" | "outline-white";
  disabled?: boolean;
  extraClasses?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

const emit = defineEmits(["click"]);

const props = withDefaults(defineProps<ButtonProps>(), {
  text: "",
  color: "primary",
  disabled: false,
  extraClasses: "",
  fullWidth: false,
  size: "md",
});

const isDisabled = computed(() => props.disabled);

// Size-based classes
const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-1 px-4 text-sm";
    case "lg":
      return "py-3 px-8 text-lg";
    case "md":
    default:
      return "py-2 px-6";
  }
});

// Width classes
const widthClasses = computed(() => (props.fullWidth ? "w-full" : ""));

// Color-based classes
const colorClasses = computed(() => {
  switch (props.color) {
    case "primary":
      return "bg-primary-accent text-white hover:bg-secondary-accent";
    case "secondary":
      return "bg-secondary-accent text-white hover:bg-primary-accent";
    case "white":
      return "bg-white text-primary-accent hover:bg-opacity-90";
    case "outline":
      return "border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white";
    case "outline-white":
      return "border-2 border-white text-white hover:bg-white hover:text-primary-accent";
    default:
      return "bg-primary-accent text-white hover:bg-secondary-accent";
  }
});

// Combine all classes
const buttonClasses = computed(() => {
  return `${colorClasses.value} ${sizeClasses.value} ${widthClasses.value}`;
});

// Disabled state classes
const disabledClasses = computed(() => {
  return `bg-disabled text-secondary-text cursor-not-allowed ${sizeClasses.value} ${widthClasses.value}`;
});

// Handle click event
const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit("click", event);
  }
};
</script>
