<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Left: Profile Section - Now with centered content -->
    <div
      class="w-full lg:w-2/3 px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col bg-white"
    >
      <!-- Back link - Keep this aligned left -->
      <button
        class="cursor-pointer flex items-center gap-2 text-primary-accent hover:underline text-sm mb-4 self-start"
        @click="goBack"
      >
        <UiSvgIcon
          icon="/icons/arrow.svg"
          :width="20"
          :height="20"
          :color="'var(--color-primary-accent)'"
        />
        Back
      </button>

      <!-- Loading / Error / Not Found -->
      <div v-if="isLoading" class="py-4 self-center">
        Loading teacher data...
      </div>
      <div v-else-if="error" class="py-4 text-red-500 self-center">
        Error: {{ error.message }}
      </div>
      <div v-else-if="!selectedTeacher" class="py-4 self-center">
        Teacher not found.
      </div>
      <div v-else class="flex flex-col items-center flex-grow">
        <!-- Responsive Container - Centered -->
        <div
          class="w-full max-w-3xl flex flex-col items-start gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-10 lg:mt-16"
        >
          <!-- Breadcrumb - Keep this aligned left -->
          <div
            class="text-secondary-accent font-figtree text-sm sm:text-base font-normal leading-tight tracking-wide self-start"
          >
            <NuxtLink to="/teachers" class="hover:underline">Teachers</NuxtLink>
            <span class="mx-1">/</span>
            <span
              >{{ selectedTeacher.name }} {{ selectedTeacher.surname }}</span
            >
          </div>

          <!-- Row: Image + Name + Contact - Responsive Layout -->
          <div
            class="flex flex-col md:flex-row items-start gap-6 md:gap-8 w-full"
          >
            <img
              :src="selectedTeacher.photo_url"
              alt="Teacher Photo"
              class="rounded-lg object-cover w-full md:w-3/5 h-auto aspect-[3/2] shadow-md"
            />

            <!-- Name + Contact Info -->
            <div
              class="flex flex-col justify-start items-start gap-6 w-full md:w-2/5"
            >
              <h1
                class="font-figtree font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide text-primary-text break-words"
              >
                {{ selectedTeacher.name }} {{ selectedTeacher.surname }}
              </h1>

              <div
                class="flex flex-col justify-center items-start gap-4 w-full mt-2 sm:mt-4"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="bg-primary-accent-light rounded-full p-2 flex items-center justify-center w-10 h-10 min-w-10"
                  >
                    <UiSvgIcon
                      icon="/icons/phone.svg"
                      :width="24"
                      :height="24"
                      :color="'var(--color-primary-accent)'"
                    />
                  </div>
                  <a
                    :href="`tel:${selectedTeacher.phone}`"
                    class="text-primary-text font-figtree text-sm sm:text-base hover:text-primary-accent transition-colors cursor-pointer"
                  >
                    {{ formattedPhone }}
                  </a>
                </div>
                <div class="flex items-center gap-4">
                  <div
                    class="bg-primary-accent-light rounded-full p-2 flex items-center justify-center w-10 h-10 min-w-10"
                  >
                    <UiSvgIcon
                      icon="/icons/email.svg"
                      :width="24"
                      :height="24"
                      :color="'var(--color-primary-accent)'"
                    />
                  </div>
                  <a
                    :href="`mailto:${selectedTeacher.email}`"
                    class="text-primary-text font-figtree text-sm sm:text-base underline underline-offset-2 hover:text-primary-accent transition-colors cursor-pointer"
                  >
                    {{ selectedTeacher.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Bio -->
          <p
            class="text-sm sm:text-base font-normal leading-relaxed tracking-wide text-secondary-accent font-figtree whitespace-pre-wrap w-full"
          >
            {{ selectedTeacher.short_cv }}
          </p>
        </div>
      </div>
    </div>

    <!-- Right: Activities Section - With improved mobile responsiveness -->
    <div
      class="w-full lg:w-1/3 p-4 sm:p-6 lg:p-8 bg-[#F8F8F8] flex flex-col items-center relative"
    >
      <!-- Designer vertical divider (visible only on lg screens) -->
      <div class="hidden lg:block absolute left-0 top-10 bottom-10 w-[3px]">
        <div
          class="h-full bg-gradient-to-b from-transparent via-primary-accent to-transparent opacity-70"
        ></div>
      </div>

      <div class="w-full max-w-md flex flex-col relative">
        <!-- Activities heading with decorative element - improved for mobile -->
        <div class="flex flex-row items-center mb-4 mt-4 lg:mt-16">
          <div class="h-8 w-1 bg-primary-accent rounded-r-full block"></div>
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-primary-text font-figtree ml-3"
          >
            {{
              selectedTeacher
                ? `${selectedTeacher.name}'s Activities`
                : "Activities"
            }}
          </h2>
        </div>

        <!-- Activities list with improved mobile layout -->
        <div
          v-if="selectedTeacher?.activities?.length"
          class="mt-4 lg:mt-8 w-full space-y-3"
        >
          <UiTeacherSchedule
            v-for="activityItem in selectedTeacher.activities"
            :id="activityItem.activity.id"
            :key="activityItem.activity.id"
            :title="activityItem.activity.title"
            :icon_id="activityItem.activity.icon_id"
            :time="activityItem.time"
            :days="activityItem.days"
            @click="navigateToActivity(activityItem.activity.id)"
          />
        </div>
        <div
          v-else
          class="mt-4 text-sm text-secondary-text text-center lg:text-left"
        >
          No activities listed.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { navigateTo } from "nuxt/app";
import { useTeachers } from "../../composables/useTeachers";

const { selectedTeacher, isLoading, error, fetchTeacherById } = useTeachers();
const route = useRoute();
const router = useRouter();
const teacherId = Number(route.params.id);

const goBack = () => {
  router.back();
};

// Format phone number to (xxx) xxx xxxx format
const formattedPhone = computed(() => {
  if (!selectedTeacher.value) return "";

  // Handle both number and string types
  const phoneStr = String(selectedTeacher.value.phone || "");
  if (!phoneStr) return "";

  // Remove all non-numeric characters
  const cleaned = phoneStr.replace(/\D/g, "");

  // Check if we have the right number of digits (10 for US numbers)
  if (cleaned.length !== 10) {
    return phoneStr; // Return original if not 10 digits
  }

  // Format as (xxx) xxx xxxx
  return `(${cleaned.substring(0, 3)}) ${cleaned.substring(
    3,
    6
  )} ${cleaned.substring(6, 10)}`;
});

onMounted(async () => {
  if (!Number.isNaN(teacherId)) {
    await fetchTeacherById(teacherId);
  }
});

const navigateToActivity = (activityId: number) => {
  navigateTo(`/activity/${activityId}`);
};
</script>

<style scoped>
.bg-primary-accent-light {
  background-color: rgba(118, 197, 185, 0.15);
}

@media (min-width: 1024px) {
  .via-primary-accent {
    --tw-gradient-stops: transparent, #76c5b9, transparent;
  }
}
</style>
