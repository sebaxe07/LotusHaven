export interface Activity {
  id: number;
  title: string;
  description: string;
  schedule: string; // Time in 24h format
  images: string[]; // Array of image URLs
  highlighted: boolean;
  teacher: number; // Foreign key to teacher table
}

export interface ClassCardItem {
  id: number;
  title: string;
  description: string;
  time: string;
  image?: string; // Optional as we might use a fallback or the first image from images array
  colorVariant: string;
}
