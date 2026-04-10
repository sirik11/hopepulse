import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server client with full access (only used in API routes)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder"
);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
        };
      };
      saved_diagnoses: {
        Row: {
          id: string;
          user_id: string;
          cancer_type: string;
          stage: string;
          age_group: string;
          notes: string | null;
          created_at: string;
        };
      };
      chat_history: {
        Row: {
          id: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          created_at: string;
        };
      };
      bookmarked_cases: {
        Row: {
          id: string;
          user_id: string;
          case_id: string;
          created_at: string;
        };
      };
    };
  };
};
