export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      close_crm_contacts: {
        Row: {
          avatar_url: string | null
          close_contact_id: string
          created_at: string
          email: string | null
          id: string
          is_staff: boolean | null
          name: string
          phone: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          close_contact_id: string
          created_at?: string
          email?: string | null
          id?: string
          is_staff?: boolean | null
          name: string
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          close_contact_id?: string
          created_at?: string
          email?: string | null
          id?: string
          is_staff?: boolean | null
          name?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      conversation_threads: {
        Row: {
          close_thread_id: string | null
          created_at: string
          id: string
          last_message_at: string | null
          staff_contact_id: string
          subject: string | null
          unread_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          close_thread_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          staff_contact_id: string
          subject?: string | null
          unread_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          close_thread_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          staff_contact_id?: string
          subject?: string | null
          unread_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_threads_staff_contact_id_fkey"
            columns: ["staff_contact_id"]
            isOneToOne: false
            referencedRelation: "close_crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      form_data: {
        Row: {
          created_at: string
          field_reference: string
          field_title: string
          field_value: Json
          form_id: string
          id: string
          response_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          field_reference: string
          field_title: string
          field_value: Json
          form_id: string
          id?: string
          response_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          field_reference?: string
          field_title?: string
          field_value?: Json
          form_id?: string
          id?: string
          response_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      key_personnel: {
        Row: {
          created_at: string
          date_of_birth: string | null
          email: string | null
          first_name: string | null
          has_ownership: boolean | null
          id: string
          key_number: number
          last_name: string | null
          ownership_percentage: number | null
          phone: string | null
          position: string | null
          profile_id: string
          start_date: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          has_ownership?: boolean | null
          id?: string
          key_number: number
          last_name?: string | null
          ownership_percentage?: number | null
          phone?: string | null
          position?: string | null
          profile_id: string
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          has_ownership?: boolean | null
          id?: string
          key_number?: number
          last_name?: string | null
          ownership_percentage?: number | null
          phone?: string | null
          position?: string | null
          profile_id?: string
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "key_personnel_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          close_activity_id: string | null
          close_message_id: string | null
          content: string
          created_at: string
          delivered_at: string | null
          id: string
          is_historical: boolean | null
          message_type: string | null
          read_at: string | null
          sender_id: string | null
          sender_type: string
          sent_at: string
          staff_email: string | null
          staff_name: string | null
          thread_id: string
        }
        Insert: {
          close_activity_id?: string | null
          close_message_id?: string | null
          content: string
          created_at?: string
          delivered_at?: string | null
          id?: string
          is_historical?: boolean | null
          message_type?: string | null
          read_at?: string | null
          sender_id?: string | null
          sender_type: string
          sent_at?: string
          staff_email?: string | null
          staff_name?: string | null
          thread_id: string
        }
        Update: {
          close_activity_id?: string | null
          close_message_id?: string | null
          content?: string
          created_at?: string
          delivered_at?: string | null
          id?: string
          is_historical?: boolean | null
          message_type?: string | null
          read_at?: string | null
          sender_id?: string | null
          sender_type?: string
          sent_at?: string
          staff_email?: string | null
          staff_name?: string | null
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "conversation_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          abn: string | null
          acn: string | null
          address: string | null
          address_line_2: string | null
          business_description: string | null
          business_email: string | null
          business_name: string | null
          business_phone: string | null
          business_type: string | null
          calendly_url: string | null
          city: string | null
          close_contact_id: string | null
          country: string | null
          created_at: string | null
          email: string | null
          entity_type: string | null
          first_name: string | null
          id: string
          industry: string | null
          is_gst_registered: boolean | null
          last_name: string | null
          phone: string | null
          postal_code: string | null
          registered_business_name: string | null
          scheduled_at: string | null
          staff_count: number | null
          state: string | null
          updated_at: string | null
          uses_contractors: boolean | null
          website: string | null
        }
        Insert: {
          abn?: string | null
          acn?: string | null
          address?: string | null
          address_line_2?: string | null
          business_description?: string | null
          business_email?: string | null
          business_name?: string | null
          business_phone?: string | null
          business_type?: string | null
          calendly_url?: string | null
          city?: string | null
          close_contact_id?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          entity_type?: string | null
          first_name?: string | null
          id: string
          industry?: string | null
          is_gst_registered?: boolean | null
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          registered_business_name?: string | null
          scheduled_at?: string | null
          staff_count?: number | null
          state?: string | null
          updated_at?: string | null
          uses_contractors?: boolean | null
          website?: string | null
        }
        Update: {
          abn?: string | null
          acn?: string | null
          address?: string | null
          address_line_2?: string | null
          business_description?: string | null
          business_email?: string | null
          business_name?: string | null
          business_phone?: string | null
          business_type?: string | null
          calendly_url?: string | null
          city?: string | null
          close_contact_id?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          entity_type?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          is_gst_registered?: boolean | null
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          registered_business_name?: string | null
          scheduled_at?: string | null
          staff_count?: number | null
          state?: string | null
          updated_at?: string | null
          uses_contractors?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          id: number
          name: string
          slug: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      shareholders: {
        Row: {
          created_at: string
          id: string
          name: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shareholders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_types: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          page_route: string | null
          priority: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          page_route?: string | null
          priority?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          page_route?: string | null
          priority?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_services: {
        Row: {
          id: number
          service_category_id: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          service_category_id?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          service_category_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_services_service_category_id_fkey"
            columns: ["service_category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_services_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sync_status: {
        Row: {
          created_at: string
          id: string
          last_synced_at: string | null
          sync_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_synced_at?: string | null
          sync_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_synced_at?: string | null
          sync_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tasks: {
        Row: {
          assigned_at: string
          completed_at: string | null
          created_at: string
          id: string
          metadata: Json | null
          started_at: string | null
          status: string
          task_type_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          started_at?: string | null
          status?: string
          task_type_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          started_at?: string | null
          status?: string
          task_type_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tasks_task_type_id_fkey"
            columns: ["task_type_id"]
            isOneToOne: false
            referencedRelation: "task_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_task_completion: {
        Args: { user_uuid: string; task_name: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
