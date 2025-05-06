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
          <p v-for="day in schedule.days" :key="day" class="text-md">{{ day }} - {{ schedule.time }}</p>
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
import { computed } from 'vue'; // Import computed
import type { PropType } from 'vue';

interface Professor {
  id: number;
  name?: string; // Made name optional to match example of "Instructor Led"
  phone?: string;
  email?: string;
  photo_url?: string;
}

interface Schedule {
  professor?: Professor;
  days: string[];
  time: string;
}

// Define the props for this component
const props = defineProps({
  schedule: {
    type: Object as PropType<Schedule>,
    required: true,
  },
});

const getIconPath = (name: string): string => {
  return '/icons/section-' + name + '.svg'; // Fallback icon
};
// --- End Icon Mapping ---


// Computed property to truncate the email
const truncatedEmail = computed(() => {
  const email = props.schedule.professor?.email;
  if (!email) {
    return '';
  }

  const atSymbolIndex = email.indexOf('@');
  if (atSymbolIndex === -1) {
    return email; // Should not happen for valid emails
  }

  const localPart = email.substring(0, atSymbolIndex);
  const domainPart = email.substring(atSymbolIndex); // Includes '@'

  // Example: "anya.sharma@lotushaven.com"
  // localPart: "anya.sharma"
  // domainPart: "@lotushaven.com"

  // Truncate domainPart to "@" + first 3 chars of domain + "..."
  // e.g. "@lot..."
  let truncatedDomain = domainPart;
  if (domainPart.length > 4) { // @ + 3 chars = 4
    truncatedDomain = domainPart.substring(0, 4) + '...'; // e.g., "@lot..."
  }

  // Combine local part with truncated domain
  const fullTruncatedEmail = localPart + truncatedDomain;

  // Optional: if the fullTruncatedEmail is still too long, you might want to truncate the localPart too
  // For example, limit the total length
  const maxLength = 20; // Adjust this to your desired max length
  if (fullTruncatedEmail.length > maxLength) {
    // This is a more aggressive truncation if the above is still too long.
    // You might want to prioritize showing more of the local part or handle this differently.
    // For "anya.sharma@lot...", if still too long, maybe "anya.s...@lot..."
    // Or simply cut the whole thing:
    return fullTruncatedEmail.substring(0, maxLength - 3) + '...';
  }

  return fullTruncatedEmail;
});

</script>

<style scoped>
/* Styles from previous example */
.shrink-0 {
  flex-shrink: 0;
}
</style>