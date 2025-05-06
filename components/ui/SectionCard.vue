<template>
  <div class="p-6 bg-gray-100 rounded-xl shadow-lg">
    <div class="flex items-center mb-5">
      <div class="mr-4 text-teal-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </div>
      <div :class="['px-4 py-2 text-lg font-medium rounded-md', schedule.professor?.name ? 'bg-teal-200 bg-opacity-70 text-gray-800' : 'bg-gray-200 text-gray-600']">
        {{ schedule.professor?.name || 'Instructor Led' }}
      </div>
    </div>

    <div class="space-y-4 text-gray-700">
      <div class="flex items-start">
        <div class="mr-4 text-teal-600 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 pt-0.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
          </svg>
        </div>
        <div>
          <p v-for="day in schedule.days" :key="day" class="text-md">{{ day }} - {{ schedule.time }}</p>
        </div>
      </div>

      <div class="flex items-center" v-if="schedule.professor?.phone">
        <div class="mr-4 text-teal-600 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
        </div>
        <a :href="`tel:${schedule.professor.phone}`" class="text-md hover:text-teal-700 hover:underline">{{ schedule.professor.phone }}</a>
      </div>

      <div class="flex items-center" v-if="schedule.professor?.email">
        <div class="mr-4 text-teal-600 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
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