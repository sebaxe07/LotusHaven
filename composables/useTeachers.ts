import type { Ref } from "vue";
import { ref } from "vue";
import type {
  Teacher,
  TeacherActivity,
  TeacherCardItem,
} from "../types/teachers.ts";

// Define types for the raw database responses
interface RawTeacherData {
  teacher_id: number;
  name: string;
  surname: string;
  photo_url: string;
  short_cv: string;
  phone: number;
  email: string;
  TeacherActivities?: RawTeacherActivityData[];
  [key: string]: unknown;
}

interface RawTeacherActivityData {
  id: number;
  time: string;
  days: string[];
  activity: RawActivityData;
}

interface RawActivityData {
  activity_id: number;
  title: string;
  description: string;
  short_desc: string;
  images: string[];
  highlighted: boolean;
  [key: string]: unknown;
}

/**
 * Composable for managing teacher data operations
 */
export function useTeachers() {
  const teachers: Ref<Teacher[]> = ref([]);
  const selectedTeacher: Ref<Teacher | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);

  /**
   * Fetch all teachers from the database
   */
  const fetchTeachers = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const supabase = useSupabaseClient();
      const { data, error: supabaseError } = await supabase.from("Teachers")
        .select(`
          *,
          TeacherActivities(
            id,
            time,
            days,
            activity:Activities(*)
          )
        `);

      if (supabaseError) throw supabaseError;

      // Transform the data to match our Teacher interface
      teachers.value = ((data as RawTeacherData[]) || []).map(
        transformTeacherData
      );
    } catch (err: unknown) {
      console.error("Error fetching teachers:", err);
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch a specific teacher by ID
   */
  const fetchTeacherById = async (teacherId: number): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    selectedTeacher.value = null;

    try {
      const supabase = useSupabaseClient();
      const { data, error: supabaseError } = await supabase
        .from("Teachers")
        .select(
          `
          *,
          TeacherActivities(
            id,
            time,
            days,
            activity:Activities(*)
          )
        `
        )
        .eq("teacher_id", teacherId)
        .single();

      if (supabaseError) throw supabaseError;

      // Transform the data to match our Teacher interface
      if (data) {
        selectedTeacher.value = transformTeacherData(data as RawTeacherData);
      }
    } catch (err: unknown) {
      console.error(`Error fetching teacher with ID ${teacherId}:`, err);
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Transform raw database data into our Teacher interface
   */
  const transformTeacherData = (rawTeacher: RawTeacherData): Teacher => {
    // Process activities if they exist
    const activities: TeacherActivity[] =
      rawTeacher.TeacherActivities?.map((ta: RawTeacherActivityData) => ({
        time: ta.time,
        days: ta.days || [],
        activity: {
          id: ta.activity.activity_id,
          title: ta.activity.title,
          description: ta.activity.description,
          short_desc: ta.activity.short_desc,
          images: ta.activity.images,
          highlighted: ta.activity.highlighted,
          schedules: [], // We'll handle this separately if needed
        },
      })) || [];

    // Create the teacher object with computed full name
    return {
      id: rawTeacher.teacher_id,
      name: rawTeacher.name,
      surname: rawTeacher.surname,
      fullName: `${rawTeacher.name} ${rawTeacher.surname}`,
      photo_url: rawTeacher.photo_url,
      short_cv: rawTeacher.short_cv,
      phone: rawTeacher.phone,
      email: rawTeacher.email,
      activities,
    };
  };

  /**
   * Convert a Teacher to TeacherCardItem format for display
   */
  const teacherToCardItem = (teacher: Teacher): TeacherCardItem => {
    return {
      id: teacher.id,
      name: teacher.name,
      fullName: `${teacher.name} ${teacher.surname}`,
      imageUrl: teacher.photo_url,
      shortBio:
        teacher.short_cv.substring(0, 100) +
        (teacher.short_cv.length > 100 ? "..." : ""),
    };
  };

  return {
    teachers,
    selectedTeacher,
    isLoading,
    error,
    fetchTeachers,
    fetchTeacherById,
    teacherToCardItem,
  };
}
