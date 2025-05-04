<template>
  <div
    class="teacher-card flex flex-col justify-center items-center cursor-pointer transition-all hover:shadow-lg"
    :style="{ width: '309px', height: '383px', padding: '20px 24px 23px 20px', borderRadius: '10px', background: '#F2F2F2' }"
    @click="handleClick"
  >
    <div
      class="teacher-image"
      :style="{
        width: '265px',
        height: '177px',
        borderRadius: '10px',
        background: `url(${imageUrl}) center / cover no-repeat lightgray`
      }"
    ></div>

    <div class="mt-4 text-center w-full">
      <h4 class="text-xl font-semibold text-gray-900">{{ name }}<span class="inline-block ml-2 text-primary-accent text-2xl">→</span></h4>
      <p class="mt-1 text-sm text-gray-700 line-clamp-2">
         {{ shortBio }}
      </p>


      <div class="mt-3 text-left">
        <p class="text-sm font-semibold text-gray-800">Activities</p>
      <div class="flex gap-2 mt-1 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <Button
          v-for="activity in activities"
          :key="activity.id"
          variant="secondary"
          class="rounded-full text-xs shrink-0"
            @click.stop="handleActivityClick(activity.id)"
          >
           {{ activity.title }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'

interface TeacherCardProps {
  id: number;
  name: string;
  shortBio: string;
  imageUrl: string;
  activities: { id: number; title: string }[]; 
}
const props = defineProps<TeacherCardProps>();

const emit = defineEmits<{
  (e: "click", id: number): void;
  (e: "activity-click", payload: { teacherId: number; activityId: number }): void;
}>();


const handleActivityClick = (activityId: number) => {
  emit("activity-click", { teacherId: props.id, activityId });
};


const handleClick = () => {
  emit("click", props.id);
};



</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  /* For Chrome, Safari, and Opera */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>