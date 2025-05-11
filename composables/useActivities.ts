import type { Ref } from "vue";
import { ref } from "vue";
import type { Activity, ClassCardItem, Schedule } from "../types/activities.ts";

// Database response type definitions
/**
 * Represents teacher data from the database
 */
interface TeacherData {
  teacher_id: number;
  name: string;
  surname?: string;
  photo_url?: string;
  email: string;
  phone: number;
}

/**
 * Represents teacher-activity relationship data from the database
 */
interface TeacherActivityData {
  time: string;
  days: string[];
  teacher: TeacherData | null;
}

interface RawActivityData {
  activity_id: number;
  title: string;
  description: string;
  images: string[];
  highlighted: boolean;
  short_desc: string;
  difficulty_level: number; // 1: Beginner, 2: Intermediate, 3: Advanced
  icon_id: number; // ID of the yoga pose icon (1-6)
  TeacherActivities: TeacherActivityData[];
  [key: string]: unknown; // For additional fields that may exist in the database
}

/**
 * Composable for managing activity data operations
 */
export function useActivities() {
  const activities: Ref<Activity[]> = ref([]);
  const highlightedActivities: Ref<Activity[]> = ref([]);
  const selectedActivity: Ref<Activity | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);

  /**
   * Fetch all activities from the database
   */
  const fetchActivities = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const supabase = useSupabaseClient();
      const { data, error: supabaseError } = await supabase.from("Activities")
        .select(`
          *,
          TeacherActivities(
            time,
            days,
            teacher:Teachers(teacher_id, name)
          )
        `);

      if (supabaseError) throw supabaseError;

      // Process and transform raw database data to match our domain model
      activities.value = ((data as RawActivityData[]) || []).map(
        transformActivityData
      );
    } catch (err: unknown) {
      console.error("Error fetching activities:", err);
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch only highlighted activities from the database
   */
  const fetchHighlightedActivities = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const supabase = useSupabaseClient();
      const { data, error: supabaseError } = await supabase
        .from("Activities")
        .select(
          `
          *,
          TeacherActivities(
            time,
            days,
            teacher:Teachers(teacher_id, name)
          )
        `
        )
        .eq("highlighted", true);

      if (supabaseError) throw supabaseError;

      // Process and transform featured activity data for display
      highlightedActivities.value = ((data as RawActivityData[]) || []).map(
        transformActivityData
      );
    } catch (err: unknown) {
      console.error("Error fetching highlighted activities:", err);
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch a specific activity by ID with detailed teacher information
   */
  const fetchActivityById = async (activityId: number): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    selectedActivity.value = null;

    try {
      const supabase = useSupabaseClient();
      const { data, error: supabaseError } = await supabase
        .from("Activities")
        .select(
          `
          *,
          TeacherActivities(
            time,
            days,
            teacher:Teachers(teacher_id, name, surname, photo_url, short_cv, email, phone)
          )
        `
        )
        .eq("activity_id", activityId)
        .single();

      if (supabaseError) throw supabaseError; // Transform the database response into our domain model
      if (data) {
        selectedActivity.value = transformActivityData(data as RawActivityData);
      }
    } catch (err: unknown) {
      console.error(`Error fetching activity with ID ${activityId}:`, err);
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
  };
  /**
   * Transform raw database data into our Activity interface
   */
  const transformActivityData = (rawActivity: RawActivityData): Activity => {
    return {
      id: rawActivity.activity_id,
      title: rawActivity.title,
      description: rawActivity.description,
      short_desc: rawActivity.short_desc,
      images: rawActivity.images,
      highlighted: rawActivity.highlighted,
      difficulty_level: rawActivity.difficulty_level || 1, // Default to beginner (1) if not specified
      icon_id: rawActivity.icon_id || 1, // Default to icon 1 if not specified
      schedules:
        rawActivity.TeacherActivities?.map(
          (ta: TeacherActivityData): Schedule => ({
            time: ta.time,
            days: ta.days || [],
            professor: ta.teacher
              ? {
                  id: ta.teacher.teacher_id,
                  name: ta.teacher.name,
                  email: ta.teacher.email,
                  phone: String(ta.teacher.phone),
                }
              : undefined,
          })
        ) || [],
    };
  };
  /**
   * Convert an Activity object to ClassCardItem format for display in UI components
   * Maps activity properties and selects the first image as the primary display image
   *
   * @param activity - The activity data to transform
   * @param index - Used to determine color variation for visual differentiation
   * @returns A formatted ClassCardItem ready for display
   */
  const activityToClassCard = (
    activity: Activity,
    index: number
  ): ClassCardItem => {
    return {
      id: activity.id,
      title: activity.title,
      short_desc: activity.short_desc,
      description: activity.description,
      schedules: activity.schedules,
      image:
        activity.images && activity.images.length > 0
          ? activity.images[0]
          : undefined,
      colorVariant: getColorVariant(index),
      difficulty_level: activity.difficulty_level,
      icon_id: activity.icon_id,
    };
  };
  /**
   * Get color variant based on index for visual variety in activity display
   * Cycles through a predefined set of color themes for consistent UI
   */
  const getColorVariant = (index: number): string => {
    const variants = ["primary", "secondary", "third"];
    return variants[index % variants.length];
  };

  return {
    activities,
    highlightedActivities,
    selectedActivity,
    isLoading,
    error,
    fetchActivities,
    fetchHighlightedActivities,
    fetchActivityById,
    activityToClassCard,
    getColorVariant,
  };
}
