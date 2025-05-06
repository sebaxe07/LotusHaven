<template>
<div class="p-6 transition-shadow duration-300 bg-gray-100 rounded-lg shadow-sm hover:shadow-md">
  <div class="flex items-start space-x-4">
    <UiSvgIcon :icon="getIconPath(activity.icon_id)" class="w-12 h-12 mt-1 text-teal-500" />
    <div class="flex-1">
      <h3 class="mb-2 text-xl font-semibold text-gray-800">{{ activity.title }}</h3>
      <p class="mb-4 text-sm text-gray-600">{{ activity.short_desc }}</p>
      <Button @click="learnMore">Learn more</Button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { Activity } from '../../types/activities.js';
import Button from "./Button.vue";


const props = defineProps<{
  activity: Activity;
}>();



const getIconPath = (iconId: number): string => {

  if (iconId >= 1 && iconId <= 6) {
    return `/icons/activity-icon-${iconId}.svg`;
  }
  return '/icons/default-icon.svg';
};


const learnMore = () => {
  console.log('Learn more about:', props.activity.title);
  useRouter().push(`/activity/${props.activity.id}`);
};
</script>

<style scoped></style>