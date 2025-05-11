<template>
  <div
    class="p-4 sm:p-6 transition-shadow duration-300 bg-gray-100 rounded-lg shadow-sm hover:shadow-md h-full"
  >
    <div class="flex flex-col h-full">
      <!-- Image section - now clickable -->
      <div
        class="mb-4 w-full rounded-lg overflow-hidden cursor-pointer"
        :aria-label="`View details of ${activity.title || 'this activity'}`"
        @click="learnMore"
      >
        <img
          v-if="activity.images && activity.images.length > 0"
          :src="activity.images[0]"
          alt=""
          class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div
          v-else
          class="w-full h-48 bg-gray-200 flex items-center justify-center transition-transform duration-300 hover:scale-105"
        >
          <UiSvgIcon
            :icon="getIconPath(activity.icon_id || 1)"
            class="w-12 h-12 text-secondary-text"
          />
        </div>
      </div>

      <!-- Content section -->
      <div class="flex-1 flex flex-col">
        <h3
          class="mb-2 text-lg sm:text-xl font-semibold text-primary-text break-words"
        >
          {{ activity.title || "Unnamed Activity" }}
        </h3>
        <p class="mb-4 text-sm text-secondary-text line-clamp-3 flex-grow">
          {{
            activity.short_desc ||
            activity.description ||
            "No description available"
          }}
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-if="activity.difficulty_level"
            class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
            :class="getDifficultyClass(activity.difficulty_level)"
          >
            {{ getDifficultyLabel(activity.difficulty_level) }}
          </span>
        </div>
        <Button class="w-full sm:w-auto mt-auto" @click="learnMore"
          >Learn more</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from "../../types/activities";
import Button from "./Button.vue";
import { navigateTo } from "nuxt/app";

const props = defineProps<{
  activity: Activity;
}>();

const getIconPath = (iconId: number): string => {
  try {
    if (iconId && iconId >= 1 && iconId <= 6) {
      return `/icons/activity-icon-${iconId}.svg`;
    }
    return "/icons/activity-icon-1.svg"; // Default to first icon if invalid
  } catch (error) {
    console.warn("Error getting icon path:", error);
    return "/icons/activity-icon-1.svg";
  }
};

const getDifficultyClass = (level: number) => {
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

const getDifficultyLabel = (level: number) => {
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

const learnMore = () => {
  try {
    if (props.activity && props.activity.id) {
      console.log(
        "Navigating to activity:",
        props.activity.title,
        "ID:",
        props.activity.id
      );
      navigateTo(`/activity/${props.activity.id}`);
    } else {
      console.error("Cannot navigate: Invalid activity ID", props.activity);
    }
  } catch (error) {
    console.error("Navigation error:", error);
  }
};
</script>

<style scoped>
/* Ensure consistent height with flex layout */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.break-words {
  word-break: break-word;
  hyphens: auto;
}
</style>
