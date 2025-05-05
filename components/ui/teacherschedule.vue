<template>
    <div class="flex items-center justify-between bg-white rounded-lg shadow w-[467px] h-[167px] overflow-hidden px-6 mb-4">
      <!-- Icon Section (uses yoga{icon_id}.svg) -->
      <div class="w-[72px] h-[72px] flex items-center justify-center bg-[#ffffff] rounded">
        <UiSvgIcon
    :icon="`/icons/yoga${props.icon_id}.svg`"
    :width="107"
    :height="107"
    :color="'bg-primary-accent'"
  />
</div>

  
      <!-- Text Section -->
      <div class="flex flex-col justify-center ml-6 flex-grow">
        <h3 class="text-base font-semibold text-[#2E3030]">{{ title }}</h3>
        <p class="text-sm text-[#5E7E79] mt-1">{{ time }} on {{ days.join(', ') }}</p>
      </div>
  
      <!-- Arrow Button -->
      <button
  class="w-8 h-8 bg-primary-accent rounded-full flex items-center justify-center text-white cursor-pointer"
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
  //import { computed } from 'vue';
  
  const props = defineProps<{
    id: number | string;
    title: string;
    icon_id: number;
    time: string;
    days: string[];
  }>();
  
  // Build icon path dynamically
  //const iconPath = computed(() => `/icons/yoga${props.icon_id}.svg`);
  </script>
  