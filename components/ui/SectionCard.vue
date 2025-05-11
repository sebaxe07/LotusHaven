<template>
  <div class="p-4 sm:p-6 bg-gray-100 rounded-xl shadow-lg">
    <div class="flex flex-wrap items-center mb-4 sm:mb-5 gap-3">
      <div class="text-primary-accent flex-shrink-0">
        <UiSvgIcon
          :icon="getIconPath('professor')"
          class="w-6 h-6 sm:w-7 sm:h-7"
        />
      </div>
      <!-- Added proper styling to indicate clickable teacher link -->
      <NuxtLink
        :to="'/teacher/' + schedule.professor?.id"
        :class="[
          'px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-md break-words max-w-full transition-colors group flex items-center gap-2',
          schedule.professor?.name
            ? 'bg-primary-accent-light hover:bg-primary-accent-light text-primary-text'
            : 'bg-gray-200 text-secondary-text',
        ]"
        :aria-label="
          schedule.professor?.name
            ? `View details of ${schedule.professor.name}`
            : 'View instructor details'
        "
      >
        <span>{{ schedule.professor?.name || "Instructor Led" }}</span>
        <!-- Arrow icon is decorative and should be hidden from screen readers -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill-rule="evenodd"
            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </NuxtLink>
    </div>

    <div class="space-y-3 sm:space-y-4 text-secondary-text">
      <div class="flex items-start">
        <div class="mr-3 sm:mr-4 text-primary-accent flex-shrink-0 pt-1">
          <UiSvgIcon
            :icon="getIconPath('calendar')"
            class="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        <div>
          <p
            v-for="day in schedule.days"
            :key="day"
            class="text-sm sm:text-base"
          >
            {{ capitalizeFirstLetter(day) }} - {{ schedule.time }}
          </p>
        </div>
      </div>

      <div v-if="schedule.professor?.phone" class="flex items-center">
        <div class="mr-3 sm:mr-4 text-primary-accent flex-shrink-0">
          <UiSvgIcon
            :icon="getIconPath('phone')"
            class="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        <a
          :href="`tel:${schedule.professor.phone}`"
          class="text-sm sm:text-base hover:text-primary-accent hover:underline break-all"
        >
          {{ formatPhoneNumber(schedule.professor.phone) }}
        </a>
      </div>

      <div v-if="schedule.professor?.email" class="flex items-center">
        <div class="mr-3 sm:mr-4 text-primary-accent flex-shrink-0">
          <UiSvgIcon
            :icon="getIconPath('email')"
            class="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        <a
          :href="`mailto:${schedule.professor.email}`"
          class="text-sm sm:text-base hover:text-primary-accent hover:underline break-all"
        >
          {{ responsiveEmail }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

interface Professor {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  photo_url?: string;
}

interface Schedule {
  professor?: Professor;
  days: string[];
  time: string;
}

const props = defineProps({
  schedule: {
    type: Object as PropType<Schedule>,
    required: true,
  },
});

const getIconPath = (name: string): string => {
  return "/icons/section-" + name + ".svg";
};

const capitalizeFirstLetter = (string: string): string => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Format phone number to display as (xxx) xxx-xxxx if possible
const formatPhoneNumber = (phoneNumber: string | number) => {
  if (phoneNumber === undefined || phoneNumber === null) return "";

  // Convert to string if it's a number
  const phoneStr = String(phoneNumber);

  // Remove all non-numeric characters
  const cleaned = phoneStr.replace(/\D/g, "");

  // Check if we have a 10-digit number (US format)
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(
      3,
      6
    )}-${cleaned.substring(6, 10)}`;
  }

  // Return original if not a standard 10-digit number
  return phoneStr;
};

// Use a more responsive approach to email display
const responsiveEmail = computed(() => {
  const email = props.schedule.professor?.email;
  if (!email) return "";

  // For small screens, truncate aggressively to avoid layout issues
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024;

  if (windowWidth < 768) {
    // More aggressive truncation for mobile
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email;

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex); // Includes the @ symbol

    if (username.length > 10) {
      // Just show truncated username + domain
      return `${username.substring(0, 7)}...${domain}`;
    }

    // Show full username + domain
    return email;
  }

  // For larger screens with long emails
  if (email.length > 25) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email;

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex); // Includes the @ symbol

    // Truncate username if it's very long
    if (username.length > 15) {
      return `${username.substring(0, 12)}...${domain}`;
    }

    // Otherwise show full email
    return email;
  }

  return email;
});
</script>

<style scoped>
/* Ensure text wrapping works properly */
.break-words {
  word-break: break-word;
}

.break-all {
  word-break: break-all;
}
</style>
