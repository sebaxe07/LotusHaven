export interface Schedule {
  time: string;
  days: string[];
  professor?: {
    id: number;
    name: string;
  };
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  short_desc: string; // Adding short description field to match database schema
  schedules: Schedule[]; // Array of schedules with times, days and professors
  images: string[]; // Array of image URLs
  highlighted: boolean;
  difficulty_level: number; // 1: Beginner, 2: Intermediate, 3: Advanced
  icon_id: number; // ID of the yoga pose icon (1-6)
}

export interface ClassCardItem {
  short_desc: string;
  id: number;
  title: string;
  description: string;
  schedules: Schedule[]; // Now using schedules instead of a single time
  image?: string; // Optional as we might use a fallback or the first image from images array
  colorVariant: string;
  difficulty_level: number; // 1: Beginner, 2: Intermediate, 3: Advanced
  icon_id: number; // ID of the yoga pose icon (1-6)
}
