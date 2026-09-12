export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_images: {
        Row: {
          content_type: string
          created_at: string
          data: string
          name: string
        }
        Insert: {
          content_type?: string
          created_at?: string
          data: string
          name: string
        }
        Update: {
          content_type?: string
          created_at?: string
          data?: string
          name?: string
        }
        Relationships: []
      }
      blog_sync_runs: {
        Row: {
          created_at: string
          id: string
          job_id: string
          message: string | null
          source: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          message?: string | null
          source?: string
          status: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          message?: string | null
          source?: string
          status?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          confirmation_attempted_at: string | null
          confirmation_error: string | null
          confirmation_message_id: string | null
          confirmation_response: string | null
          confirmation_status: string
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          confirmation_attempted_at?: string | null
          confirmation_error?: string | null
          confirmation_message_id?: string | null
          confirmation_response?: string | null
          confirmation_status?: string
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          confirmation_attempted_at?: string | null
          confirmation_error?: string | null
          confirmation_message_id?: string | null
          confirmation_response?: string | null
          confirmation_status?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          created_at: string
          data: Json
          id: string
          is_hidden: boolean
          kind: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: Json
          id?: string
          is_hidden?: boolean
          kind: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          is_hidden?: boolean
          kind?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      sync_cron_tokens: {
        Row: {
          id: string
          token: string
        }
        Insert: {
          id: string
          token?: string
        }
        Update: {
          id?: string
          token?: string
        }
        Relationships: []
      }
      sync_settings: {
        Row: {
          id: string
          interval_hours: number
          last_run_at: string | null
          run_time_utc: string
          updated_at: string
        }
        Insert: {
          id: string
          interval_hours?: number
          last_run_at?: string | null
          run_time_utc?: string
          updated_at?: string
        }
        Update: {
          id?: string
          interval_hours?: number
          last_run_at?: string | null
          run_time_utc?: string
          updated_at?: string
        }
        Relationships: []
      }
      syndicated_articles: {
        Row: {
          content_html: string | null
          content_markdown: string | null
          created_at: string
          external_id: string | null
          faq_json_ld: Json | null
          hero_image_url: string | null
          id: string
          is_hidden: boolean
          json_ld: Json | null
          language_code: string
          meta_description: string | null
          published_at: string | null
          slug: string
          synced_at: string
          title: string
          updated_at: string
        }
        Insert: {
          content_html?: string | null
          content_markdown?: string | null
          created_at?: string
          external_id?: string | null
          faq_json_ld?: Json | null
          hero_image_url?: string | null
          id?: string
          is_hidden?: boolean
          json_ld?: Json | null
          language_code?: string
          meta_description?: string | null
          published_at?: string | null
          slug: string
          synced_at?: string
          title: string
          updated_at?: string
        }
        Update: {
          content_html?: string | null
          content_markdown?: string | null
          created_at?: string
          external_id?: string | null
          faq_json_ld?: Json | null
          hero_image_url?: string | null
          id?: string
          is_hidden?: boolean
          json_ld?: Json | null
          language_code?: string
          meta_description?: string | null
          published_at?: string | null
          slug?: string
          synced_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_mark_sync_run: {
        Args: { _id: string; _message?: string; _status: string }
        Returns: undefined
      }
      admin_set_sync_time: {
        Args: { _id: string; _run_time: string }
        Returns: string
      }
      claim_first_admin: { Args: never; Returns: boolean }
      cron_get_settings: {
        Args: { _id: string; _token: string }
        Returns: {
          interval_hours: number
          last_run_at: string
          run_time_utc: string
        }[]
      }
      cron_log_run: {
        Args: {
          _id: string
          _message?: string
          _source?: string
          _status: string
          _token: string
        }
        Returns: undefined
      }
      cron_mark_run: {
        Args: { _id: string; _token: string }
        Returns: undefined
      }
      cron_store_blog_image: {
        Args: {
          _content_type: string
          _data: string
          _id: string
          _name: string
          _token: string
        }
        Returns: undefined
      }
      cron_upsert_article: {
        Args: { _id: string; _row: Json; _token: string }
        Returns: undefined
      }
      cron_verify_token: {
        Args: { _id: string; _token: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      record_contact_confirmation: {
        Args: {
          _attempted_at: string
          _error: string
          _id: string
          _message_id: string
          _response: string
          _status: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
    },
  },
} as const
