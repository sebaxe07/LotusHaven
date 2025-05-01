import type { Activity } from "./activities.ts";

export interface TeacherActivity {
  time: string;
  days: string[];
  activity: Activity;
}

export interface Teacher {
  id: number;
  name: string;
  surname: string;
  fullName?: string; // Computed property
  photo_url: string;
  short_cv: string;
  phone: number;
  email: string;
  activities?: TeacherActivity[]; // Activities associated with this teacher
}

export interface TeacherCardItem {
  id: number;
  name: string;
  fullName: string;
  imageUrl: string;
  shortBio?: string;
}
