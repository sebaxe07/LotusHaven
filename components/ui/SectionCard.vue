<template>
  <div class="p-6 bg-gray-100 rounded-xl shadow-lg">
    <div class="flex items-center mb-5">
      <div class="mr-4 text-teal-600 pt-1">
        <UiSvgIcon
            :icon="getIconPath('professor')"
            class="w-30 h-30 mt-1 text-teal-500"
        />
      </div>
      <div :class="['px-4 py-2 text-lg font-medium rounded-md', schedule.professor?.name ? 'bg-teal-200 bg-opacity-70 text-gray-800' : 'bg-gray-200 text-gray-600']">
        {{ schedule.professor?.name || 'Instructor Led' }}
      </div>
    </div>

    <div class="space-y-4 text-gray-700">
      <div class="flex items-start">
        <div class="mr-4 text-teal-600 shrink-0 pt-1">
          <UiSvgIcon
              :icon="getIconPath('calendar')"
              class="w-30 h-30 mt-1 text-teal-500"
          />
        </div>
        <div>
          <p v-for="day in schedule.days" :key="day" class="text-md">
            {{ capitalizeFirstLetter(day) }} - {{ schedule.time }}
          </p>
        </div>
      </div>

      <div class="flex items-center" v-if="schedule.professor?.phone">
        <div class="mr-4 text-teal-600 shrink-0">
          <UiSvgIcon
              :icon="getIconPath('phone')"
              class="w-30 h-30 mt-1 text-teal-500"
          />
        </div>
        <a :href="`tel:${schedule.professor.phone}`" class="text-md hover:text-teal-700 hover:underline">{{ schedule.professor.phone }}</a>
      </div>

      <div class="flex items-center" v-if="schedule.professor?.email">
        <div class="mr-4 text-teal-600 shrink-0">
          <UiSvgIcon
              :icon="getIconPath('email')"
              class="w-30 h-30 mt-1 text-teal-500"
          />
        </div>
        <a :href="`mailto:${schedule.professor.email}`" class="text-md hover:text-teal-700 hover:underline" :title="schedule.professor.email">
          {{ truncatedEmail }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
// Assuming UiSvgIcon is a component you have, if not, this line would cause an error.
// If it's globally registered or auto-imported, you might not need to explicitly import it.
// import UiSvgIcon from './UiSvgIcon.vue'; // Or the correct path

interface Professor {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  photo_url?: string;
}

interface Schedule {
  professor?: Professor;
  days: string[]; // Expecting strings like "monday", "tuesday"
  time: string;
}

const props = defineProps({
  schedule: {
    type: Object as PropType<Schedule>,
    required: true,
  },
});

const getIconPath = (name: string): string => {
  return '/icons/section-' + name + '.svg';
};

// Method to capitalize the first letter of a string
const capitalizeFirstLetter = (string: string): string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const truncatedEmail = computed(() => {
  const email = props.schedule.professor?.email;
  if (!email) return '';
  const atSymbolIndex = email.indexOf('@');
  if (atSymbolIndex === -1) return email;
  const localPart = email.substring(0, atSymbolIndex);
  const domainPart = email.substring(atSymbolIndex);
  let truncatedDomain = domainPart;
  if (domainPart.length > 4) {
    truncatedDomain = domainPart.substring(0, 4) + '...';
  }
  const fullTruncatedEmail = localPart + truncatedDomain;
  const maxLength = 20;
  if (fullTruncatedEmail.length > maxLength) {
    return fullTruncatedEmail.substring(0, maxLength - 3) + '...';
  }
  return fullTruncatedEmail;
});

</script>

<style scoped>
.shrink-0 {
  flex-shrink: 0;
}
</style>