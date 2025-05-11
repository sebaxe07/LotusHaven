<template>
  <div class="p-4 sm:p-6 bg-gray-100 rounded-xl shadow-lg">
    <div class="flex flex-wrap items-center mb-4 sm:mb-5 gap-3">
      <!-- Instructor icon with responsive sizing -->
      <div class="text-primary-accent flex-shrink-0">
        <UiSvgIcon
          :icon="getIconPath('professor')"
          class="w-6 h-6 sm:w-7 sm:h-7"
        />
      </div>
      <!-- Instructor name with visual feedback for interaction -->
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
        <!-- Decorative arrow icon that appears on hover -->
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
      <!-- Schedule information section with dates and times -->
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
      <!-- Phone contact information with clickable link -->
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

      <!-- Email contact with responsive display and clickable link -->
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

/**
 * Represents an instructor with contact information
 */
interface Professor {
  /** Unique identifier for the instructor */
  id: number;
  /** Instructor's display name */
  name?: string;
  /** Contact phone number */
  phone?: string;
  /** Contact email address */
  email?: string;
  /** URL to instructor's profile photo */
  photo_url?: string;
}

/**
 * Represents a class session schedule with time and instructor
 */
interface Schedule {
  /** Instructor information for this session */
  professor?: Professor;
  /** Days of the week when the class is held */
  days: string[];
  /** Time when the class is held (e.g. "9:00 AM") */
  time: string;
}

/**
 * Component props definition with validation
 */
const props = defineProps({
  /**
   * Session schedule data to display
   * Contains instructor information, days, and time
   */
  schedule: {
    type: Object as PropType<Schedule>,
    required: true,
  },
});

/**
 * Generates the path to SVG icons used in the component
 * @param {string} name - Base name of the icon
 * @returns {string} Complete path to the SVG icon file
 */
const getIconPath = (name: string): string => {
  return "/icons/section-" + name + ".svg";
};

/**
 * Formats day names with capitalized first letter
 * @param {string} string - Day name to format
 * @returns {string} Day name with first letter capitalized
 */
const capitalizeFirstLetter = (string: string): string => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Formats phone numbers to standard US format (xxx) xxx-xxxx when possible
 * Falls back to original format if not a standard 10-digit number
 *
 * @param {string|number} phoneNumber - Raw phone number to format
 * @returns {string} Formatted phone number for display
 */
const formatPhoneNumber = (phoneNumber: string | number) => {
  if (phoneNumber === undefined || phoneNumber === null) return "";

  // Convert to string if it's a number
  const phoneStr = String(phoneNumber);

  // Remove all non-numeric characters
  const cleaned = phoneStr.replace(/\D/g, "");

  // Format as (xxx) xxx-xxxx for standard US 10-digit numbers
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(
      3,
      6
    )}-${cleaned.substring(6, 10)}`;
  }

  // Return original if not a standard 10-digit number
  return phoneStr;
};

/**
 * Intelligently formats email addresses based on screen size
 * Truncates long email addresses to prevent layout issues while maintaining readability
 *
 * @returns {string} Responsively formatted email address
 */
const responsiveEmail = computed(() => {
  const email = props.schedule.professor?.email;
  if (!email) return "";

  // Get current viewport width with SSR fallback
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024;

  // Mobile viewport formatting
  if (windowWidth < 768) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email;

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex); // Includes the @ symbol

    // Aggressively truncate long usernames on small screens
    if (username.length > 10) {
      return `${username.substring(0, 7)}...${domain}`;
    }

    return email;
  }

  // Desktop viewport formatting for long emails
  if (email.length > 25) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email;

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);

    // Moderate truncation for long usernames on larger screens
    if (username.length > 15) {
      return `${username.substring(0, 12)}...${domain}`;
    }
  }

  // Default: show full email when space permits
  return email;
});
</script>

<style scoped>
/**
 * Text wrapping utilities for optimal display
 * Prevents content overflow and improves readability
 */

/* Breaks words at appropriate points for natural reading */
.break-words {
  word-break: break-word;
}

/* More aggressive word breaking for long unbroken strings like emails */
.break-all {
  word-break: break-all;
}
</style>
