import type { Ref } from "vue";
import { ref } from "vue";
import type { Activity, ClassCardItem } from "../types/activities.ts";

/**
 * Composable for managing activity data operations
 */
export function useActivities() {
  const activities: Ref<Activity[]> = ref([]);
  const highlightedActivities: Ref<Activity[]> = ref([]);
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
      const { data, error: supabaseError } = await supabase
        .from("Activities")
        .select("*");

      if (supabaseError) throw supabaseError;

      activities.value = data || [];
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
        .select("*")
        .eq("highlighted", true);

      if (supabaseError) throw supabaseError;

      highlightedActivities.value = data || [];
    } catch (err: unknown) {
      console.error("Error fetching highlighted activities:", err);
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
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
      time: activity.schedule || "Check schedule",
      image:
        activity.images && activity.images.length > 0
          ? activity.images[0]
          : undefined,
      colorVariant: getColorVariant(index),
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
    isLoading,
    error,
    fetchActivities,
    fetchHighlightedActivities,
    activityToClassCard,
    getColorVariant,
  };
}
