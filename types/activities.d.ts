/**
 * Represents a class schedule with time, days, and assigned teacher
 */
export interface Schedule {
  time: string; // Time format (e.g., "10:00 AM")
  days: string[]; // Array of days when the class is held
  professor?: {
    id: number; // Teacher ID for reference
    name: string; // Teacher's display name
    email: string; // Teacher's email address
    phone: string; // Teacher's phone number
  };
}

/**
 * Core Activity model representing a yoga class or activity
 */
export interface Activity {
  id: number;
  title: string;
  description: string;
  short_desc: string; // Brief description for cards and previews
  schedules: Schedule[]; // Array of schedules with times, days and professors
  images: string[]; // Array of image URLs
  highlighted: boolean; // Whether this activity should be featured
  difficulty_level: number; // 1: Beginner, 2: Intermediate, 3: Advanced
  icon_id: number; // ID of the yoga pose icon (1-6)
}

/**
 * Presentation model for displaying activities in card format
 */
export interface ClassCardItem {
  id: number;
  title: string;
  short_desc: string; // Brief description for cards
  description: string; // Full description
  schedules: Schedule[]; // Class schedules
  image?: string; // Primary display image
  colorVariant: string; // Visual theme for the card
  difficulty_level: number; // 1: Beginner, 2: Intermediate, 3: Advanced
  icon_id: number; // ID of the yoga pose icon (1-6)
}
