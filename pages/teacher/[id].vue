<template>
  <div class="flex h-full">
    <!-- Left: Profile Section -->
    <div class="w-2/3 px-10 py-8">
      <!-- Back link -->
      <button class="flex items-center gap-2 text-primary-accent hover:underline text-sm mb-4"  @click="goBack" >
    <!-- SVG Left Arrow Icon -->
    <UiSvgIcon icon="/icons/arrow.svg" :width="20" :height="20" :color="'#76C5B9'" />
            
    Back
  </button>
      <!-- Loading / Error / Not Found -->
      <div v-if="isLoading" class="py-4">Loading teacher data...</div>
      <div v-else-if="error" class="py-4 text-red-500">Error: {{ error.message }}</div>
      <div v-else-if="!selectedTeacher" class="py-4">Teacher not found.</div>
      <div v-else>



  <!-- Centered Container -->
  <div class="w-[851px] flex flex-col items-start gap-[38px] mt-[131px] mx-auto">
      <!-- Breadcrumb -->
  <div class="text-secondary-accent font-figtree text-[16px] font-normal leading-[20px] tracking-[0.25px] w-[269px] ">
  <NuxtLink to="/teachers" class="hover:underline">Teachers</NuxtLink>
  <span class="mx-1">/</span>
  <span>{{ selectedTeacher.name }} {{ selectedTeacher.surname }}</span>
</div>
    <!-- Row: Image + Name + Contact -->
    <div class="flex items-start gap-[38px]">
      <img
        :src="selectedTeacher.photo_url"
        alt="Teacher Photo"
        class="rounded-lg object-cover"
        style="width: 481.693px; height: 321px; aspect-ratio: 481.69 / 321"
      />

      <!-- Name + Contact Info -->
      <div class="flex flex-col justify-start items-start gap-[38px] w-[278px]">
        <h1
        class="font-figtree font-semibold text-[48px] leading-[57px] tracking-[0.25px] text-black absolute whitespace-normal break-words"
        style="width: 225px;">
          {{ selectedTeacher.name }} {{ selectedTeacher.surname }}
        </h1>
        


        <div class="flex flex-col justify-center items-start gap-[9px] mt-[161px] w-full">
          <div class="flex items-center gap-[24px]">
            <UiSvgIcon icon="/icons/phone.svg" :width="45" :height="45" :color="'#76C5B9'" />
            <span class="text-[#2E3030] font-figtree text-[16px] leading-[20px] tracking-[0.25px] ">
              {{ selectedTeacher.phone }}
            </span>
          </div>
          <div class="flex items-center gap-[24px]">
            <UiSvgIcon icon="/icons/email.svg" :width="45" :height="45" :color="'#76C5B9'" />
            <span class="text-[#2E3030] font-figtree text-[16px] leading-[20px] tracking-[0.25px] underline underline-offset-2">
              {{ selectedTeacher.email }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bio -->
    <p class="text-[16px] font-normal leading-[20px] tracking-[0.25px] text-secondary-accent font-figtree whitespace-pre-wrap w-full">
      {{ selectedTeacher.short_cv }}
    </p>
  </div>
</div>
    </div>

    <!-- Right: Activities Section -->
    <div class="w-1/3 border-l p-8 bg-[#F8F8F8] ">
      <h2
  class="text-[40px] font-semibold leading-[20px] tracking-[0.25px] text-black font-figtree mb-6  mt-[157px]  "
>
  Activities
</h2>
      <div class="mt-[60px] mx-[51px]" v-if="selectedTeacher?.activities?.length">
    <Teacherschedule
      v-for="activityItem in selectedTeacher.activities"
      :key="activityItem.activity.id"
      :id="activityItem.activity.id"
      :title="activityItem.activity.title"
      :icon_id="activityItem.activity.icon_id"
      :time="activityItem.time"
      :days="activityItem.days"
      @click="navigateToActivity(activityItem.activity.id)"
    />
  </div>
      <div v-else class="text-sm text-gray-500">No activities listed.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { navigateTo } from "nuxt/app";
import { useTeachers } from "../../composables/useTeachers";
import Teacherschedule from '../../components/ui/teacherschedule.vue';

const { selectedTeacher, isLoading, error, fetchTeacherById } = useTeachers();
const route = useRoute();
const router = useRouter();
const teacherId = Number(route.params.id);


const goBack = () => {
  router.back();
};

onMounted(async () => {
  if (!Number.isNaN(teacherId)) {
    await fetchTeacherById(teacherId);
  }
});
const navigateToActivity = (activityId: number) => {
  navigateTo(`/activity/${activityId}`);
};


//const formatDays = (days: string[]) => days.join(", ");
</script>
