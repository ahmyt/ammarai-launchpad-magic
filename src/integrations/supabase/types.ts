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
      customer_reviews: {
        Row: {
          approved_at: string | null
          created_at: string
          display_order: number
          featured: boolean
          id: string
          rating: number
          review_date: string
          review_text: string
          review_title: string
          reviewer_name: string
          source: string
          source_url: string | null
          status: string
          submission_id: string | null
          updated_at: string
          verified: boolean
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          display_order?: number
          featured?: boolean
          id?: string
          rating: number
          review_date: string
          review_text: string
          review_title: string
          reviewer_name: string
          source?: string
          source_url?: string | null
          status?: string
          submission_id?: string | null
          updated_at?: string
          verified?: boolean
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          display_order?: number
          featured?: boolean
          id?: string
          rating?: number
          review_date?: string
          review_text?: string
          review_title?: string
          reviewer_name?: string
          source?: string
          source_url?: string | null
          status?: string
          submission_id?: string | null
          updated_at?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "customer_reviews_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: true
            referencedRelation: "review_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_events: {
        Row: {
          created_at: string
          event: string
          id: string
          ip_hash: string
          offer_id: string
          page: string
          source: string
        }
        Insert: {
          created_at?: string
          event: string
          id?: string
          ip_hash?: string
          offer_id: string
          page?: string
          source: string
        }
        Update: {
          created_at?: string
          event?: string
          id?: string
          ip_hash?: string
          offer_id?: string
          page?: string
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "offer_events_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          code: string
          created_at: string
          discount_label: string
          expires_at: string | null
          headline: string
          id: string
          is_active: boolean
          label: string
          max_uses: number | null
          slug: string
          starts_at: string | null
          terms: string
          updated_at: string
          use_type: string
          used_count: number
        }
        Insert: {
          code: string
          created_at?: string
          discount_label?: string
          expires_at?: string | null
          headline: string
          id?: string
          is_active?: boolean
          label?: string
          max_uses?: number | null
          slug: string
          starts_at?: string | null
          terms?: string
          updated_at?: string
          use_type?: string
          used_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          discount_label?: string
          expires_at?: string | null
          headline?: string
          id?: string
          is_active?: boolean
          label?: string
          max_uses?: number | null
          slug?: string
          starts_at?: string | null
          terms?: string
          updated_at?: string
          use_type?: string
          used_count?: number
        }
        Relationships: []
      }
      review_settings: {
        Row: {
          date_from: string | null
          date_to: string | null
          display_count: number
          featured_first: boolean
          id: string
          min_rating: number
          sort_order: string
          updated_at: string
        }
        Insert: {
          date_from?: string | null
          date_to?: string | null
          display_count?: number
          featured_first?: boolean
          id?: string
          min_rating?: number
          sort_order?: string
          updated_at?: string
        }
        Update: {
          date_from?: string | null
          date_to?: string | null
          display_count?: number
          featured_first?: boolean
          id?: string
          min_rating?: number
          sort_order?: string
          updated_at?: string
        }
        Relationships: []
      }
      review_submissions: {
        Row: {
          admin_notes: string | null
          consent: boolean
          created_at: string
          email: string
          id: string
          rating: number
          review_date: string
          review_text: string
          review_title: string
          reviewer_name: string
          source: string
          source_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          consent?: boolean
          created_at?: string
          email: string
          id?: string
          rating: number
          review_date?: string
          review_text: string
          review_title: string
          reviewer_name: string
          source?: string
          source_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          consent?: boolean
          created_at?: string
          email?: string
          id?: string
          rating?: number
          review_date?: string
          review_text?: string
          review_title?: string
          reviewer_name?: string
          source?: string
          source_url?: string | null
          status?: string
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
          category: string | null
          content_html: string | null
          content_markdown: string | null
          content_type: string | null
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
          category?: string | null
          content_html?: string | null
          content_markdown?: string | null
          content_type?: string | null
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
          category?: string | null
          content_html?: string | null
          content_markdown?: string | null
          content_type?: string | null
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
      admin_moderate_review: {
        Args: {
          _featured?: boolean
          _status: string
          _submission_id: string
          _verified?: boolean
        }
        Returns: string
      }
      admin_offer_stats: { Args: { _offer_id: string }; Returns: Json }
      admin_set_sync_time: {
        Args: { _id: string; _run_time: string }
        Returns: string
      }
      claim_first_admin: { Args: never; Returns: boolean }
      claim_offer: {
        Args: {
          _ip_hash: string
          _offer_id: string
          _page: string
          _source: string
        }
        Returns: Json
      }
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
      get_active_offer: {
        Args: never
        Returns: {
          code: string
          discount_label: string
          expires_at: string
          headline: string
          id: string
          label: string
          remaining: number
          slug: string
          starts_at: string
          terms: string
          use_type: string
        }[]
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
      record_offer_event: {
        Args: {
          _event: string
          _ip_hash: string
          _offer_id: string
          _page: string
          _source: string
        }
        Returns: undefined
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
