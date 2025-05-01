import type { Ref } from "vue";
import { ref } from "vue";
import type { Activity, ClassCardItem, Schedule } from "../types/activities.ts";

// Define types for the raw database responses
interface TeacherData {
  id: number;
  name: string;
  surname?: string;
  photo_url?: string;
}

interface TeacherActivityData {
  time: string;
  days: string[];
  teacher: TeacherData | null;
}

interface RawActivityData {
  activity_id: number; // Updated to match the CSV column name
  title: string;
  description: string;
  images: string[];
  highlighted: boolean;
  short_desc: string; // Added to match the CSV column
  difficulty_level: number; // Adding difficulty level field
  icon_id: number; // Adding icon ID field
  TeacherActivities: TeacherActivityData[];
  [key: string]: unknown; // For any other fields that might be present
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

      // Transform the data to match our Activity interface
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

      // Transform the data to match our Activity interface
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
            teacher:Teachers(teacher_id, name, surname, photo_url, short_cv, email)
          )
        `
        )
        .eq("activity_id", activityId)
        .single();

      if (supabaseError) throw supabaseError;

      // Transform the data to match our Activity interface
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
      id: rawActivity.activity_id, // Map activity_id to id as expected by our interface
      title: rawActivity.title,
      description: rawActivity.description,
      short_desc: rawActivity.short_desc, // Include short_desc in our transformed data
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
                  id: ta.teacher.id,
                  name: ta.teacher.name,
                }
              : undefined,
          })
        ) || [],
    };
  };

  /**
   * Convert an Activity to ClassCardItem format for display
   */
  const activityToClassCard = (
    activity: Activity,
    index: number
  ): ClassCardItem => {
    return {
      id: activity.id,
      title: activity.title,
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
   * Get color variant based on index for visual variety
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
