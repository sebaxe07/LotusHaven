<template>
  <div
    class="flex items-center justify-between bg-white rounded-lg shadow w-full overflow-hidden p-4 sm:p-6 mb-4 gap-3 transition-all hover:shadow-md"
  >
    <!-- Icon Section (uses yoga{icon_id}.svg) -->
    <div
      class="min-w-[50px] w-[50px] sm:min-w-[65px] sm:w-[65px] md:min-w-[72px] md:w-[72px] aspect-square flex items-center justify-center bg-white rounded"
    >
      <UiSvgIcon
        :icon="`/icons/yoga${props.icon_id}.svg`"
        :width="60"
        :height="60"
        class="w-full h-full object-contain"
        :color="'#76C5B9'"
      />
    </div>

    <!-- Text Section -->
    <div class="flex flex-col justify-center flex-grow overflow-hidden">
      <h3 class="text-sm sm:text-base font-semibold text-[#2E3030] truncate">
        {{ title }}
      </h3>
      <p class="text-xs sm:text-sm text-[#5E7E79] mt-1 truncate">
        {{ time }} on {{ formattedDays }}
      </p>
    </div>

    <!-- Arrow Button -->
    <button
      class="min-w-[32px] w-8 h-8 bg-primary-accent rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
      @click.stop="$emit('click')"
    >
      <UiSvgIcon
        icon="/icons/arrow.svg"
        :width="16"
        :height="16"
        :color="'white'"
        class="rotate-180"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  id: number | string;
  title: string;
  // eslint-disable-next-line vue/prop-name-casing
  icon_id: number;
  time: string;
  days: string[];
}>();

// Capitalize the first letter of each day
const formattedDays = computed(() => {
  return props.days
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(", ");
});

defineEmits(["click"]);
</script>

<style scoped>
/* Add a subtle hover effect */
button:hover {
  box-shadow: 0 0 8px rgba(118, 197, 185, 0.4);
}
</style>
