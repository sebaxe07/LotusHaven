import type { Activity } from "./activities.ts";

/**
 * Represents a relationship between a teacher and an activity/class they teach
 * Including schedule information (time and days)
 */
export interface TeacherActivity {
  time: string; // Time format (e.g., "10:00 AM")
  days: string[]; // Array of days when the teacher conducts this activity
  activity: Activity; // The activity/class details
}

/**
 * Core Teacher model containing personal and professional information
 */
export interface Teacher {
  id: number; // Unique identifier
  name: string; // First name
  surname: string; // Last name
  fullName?: string; // Computed full name (for display purposes)
  photo_url: string; // Profile image URL
  short_cv: string; // Professional biography
  phone: number; // Contact phone number
  email: string; // Contact email address
  activities?: TeacherActivity[]; // Classes/sessions taught by this teacher
}

/**
 * Simplified Teacher presentation model for card displays
 */
export interface TeacherCardItem {
  id: number; // Unique identifier
  name: string; // First name (for casual display)
  fullName: string; // Complete name for formal display
  imageUrl: string; // Profile image for the card
  shortBio?: string; // Truncated biography preview
}

/**
 * Enhanced Teacher card presentation model with activity information
 */
export interface teacherToCardItem2 {
  id: number; // Unique identifier
  name: string; // First name
  fullName: string; // Complete name
  imageUrl: string; // Profile image URL
  shortBio: string; // Truncated biography
  activities: {
    id: number; // Activity identifier
    title: string; // Activity name
  }[]; // List of activities taught by this teacher
}
