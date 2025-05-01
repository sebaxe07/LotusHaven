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
  schedules: Schedule[]; // Array of schedules with times, days and professors
  images: string[]; // Array of image URLs
  highlighted: boolean;
}

export interface ClassCardItem {
  id: number;
  title: string;
  description: string;
  schedules: Schedule[]; // Now using schedules instead of a single time
  image?: string; // Optional as we might use a fallback or the first image from images array
  colorVariant: string;
}
