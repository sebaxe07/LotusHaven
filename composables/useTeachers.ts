import type { Ref } from "vue";
import { ref } from "vue";
import type {
  Teacher,
  TeacherActivity,
  TeacherCardItem,
  teacherToCardItem2,
} from "../types/teachers.ts";

// Database response type definitions
/**
 * Represents raw teacher data from the database
 */
interface RawTeacherData {
  teacher_id: number; // Primary key in database
  name: string;
  surname: string;
  photo_url: string;
  short_cv: string;
  phone: number;
  email: string;
  TeacherActivities?: RawTeacherActivityData[]; // Related activities
  [key: string]: unknown; // Additional fields from database
}

/**
 * Represents teacher-activity relationship data from the database
 */
interface RawTeacherActivityData {
  id: number; // Junction table ID
  time: string; // Class time
  days: string[]; // Days of the week
  activity: RawActivityData; // Nested activity data
}

/**
 * Represents raw activity data from the database when retrieved through teacher relations
 */
interface RawActivityData {
  activity_id: number;
  title: string;
  description: string;
  short_desc: string;
  images: string[];
  highlighted: boolean;
  difficulty_level: number; // 1: Beginner, 2: Intermediate, 3: Advanced
  icon_id: number; // ID of the yoga pose icon (1-6)
  [key: string]: unknown; // Additional fields from database
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

      if (supabaseError) throw supabaseError; // Process and transform database records to domain model
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

      if (supabaseError) throw supabaseError; // Transform database record to domain model
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
   * Transform raw database data into our Teacher domain model
   * Maps database fields to the expected schema and processes nested relationships
   *
   * @param rawTeacher - Raw teacher data from database
   * @returns Structured Teacher object for application use
   */
  const transformTeacherData = (rawTeacher: RawTeacherData): Teacher => {
    // Process related activities if they exist
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
          difficulty_level: ta.activity.difficulty_level || 1, // Default to beginner (1) if not specified
          icon_id: ta.activity.icon_id || 1, // Default to icon 1 if not specified
          schedules: [], // We'll handle this separately if needed
        },
      })) || []; // Create the teacher object with computed full name property
    return {
      id: rawTeacher.teacher_id,
      name: rawTeacher.name,
      surname: rawTeacher.surname,
      fullName: `${rawTeacher.name} ${rawTeacher.surname}`, // Pre-computed for convenience
      photo_url: rawTeacher.photo_url,
      short_cv: rawTeacher.short_cv,
      phone: rawTeacher.phone,
      email: rawTeacher.email,
      activities, // Add processed activities to the teacher
    };
  };
  /**
   * Convert a Teacher object to TeacherCardItem format for display in UI components
   * Creates a simplified version with truncated biography for card displays
   *
   * @param teacher - The complete teacher data
   * @returns A formatted TeacherCardItem for display in list views
   */
  const teacherToCardItem = (teacher: Teacher): TeacherCardItem => {
    return {
      id: teacher.id,
      name: teacher.name,
      fullName: `${teacher.name} ${teacher.surname}`,
      imageUrl: teacher.photo_url,
      shortBio:
        teacher.short_cv.substring(0, 100) +
        (teacher.short_cv.length > 100 ? "..." : ""), // Truncate bio for preview
    };
  };
  /**
   * Convert a Teacher to enhanced card format with activity information
   * Creates a display-ready object with teacher details and simplified activities list
   *
   * @param teacher - The complete teacher data including activities
   * @returns An enhanced card representation with activity previews
   */
  const teacherToCardItem2 = (teacher: Teacher): teacherToCardItem2 => {
    return {
      id: teacher.id,
      name: teacher.name,
      fullName: `${teacher.name} ${teacher.surname}`,
      imageUrl: teacher.photo_url,
      shortBio:
        teacher.short_cv.substring(0, 100) +
        (teacher.short_cv.length > 100 ? "..." : ""), // Truncate bio for preview
      activities:
        teacher.activities?.map((a) => ({
          id: a.activity.id,
          title: a.activity.title,
        })) || [], // Extract minimal activity info or provide empty array
    };
  };

  return {
    teachers,
    selectedTeacher,
    isLoading,
    error,
    fetchTeachers,
    fetchTeacherById,
    teacherToCardItem2,
    teacherToCardItem,
  };
}
