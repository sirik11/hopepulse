import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

// Store on globalThis so Next.js hot reload doesn't create new instances
const g = globalThis as typeof globalThis & { _supabase?: SupabaseClient };

export const supabase: SupabaseClient =
  g._supabase ?? (g._supabase = createClient(supabaseUrl, supabaseAnonKey));

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
