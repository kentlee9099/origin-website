export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      site_config: {
        Row: { id: string; site_name: string; tagline: string; description: string | null; og_image_url: string | null; langs: string[]; default_lang: string; updated_at: string }
        Insert: Omit<Database['public']['Tables']['site_config']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_config']['Insert']>
      }
      nav_items: {
        Row: { id: string; label: string; href: string; sort_order: number; is_cta: boolean; is_visible: boolean; created_at: string; updated_at: string }
        Insert: Omit<Database['public']['Tables']['nav_items']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['nav_items']['Insert']>
      }
      ticker_items: {
        Row: { id: string; text: string; link_url: string | null; sort_order: number; is_visible: boolean; created_at: string }
        Insert: Omit<Database['public']['Tables']['ticker_items']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['ticker_items']['Insert']>
      }
      hero_content: {
        Row: { id: string; headline: string; headline_highlight: string; subtitle: string; cta_primary_label: string; cta_primary_href: string; cta_secondary_label: string | null; cta_secondary_href: string | null; stats: Json; updated_at: string }
        Insert: Omit<Database['public']['Tables']['hero_content']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['hero_content']['Insert']>
      }
      about_content: {
        Row: { id: string; badge: string; headline: string; headline_highlight: string; body_paragraphs: string[]; stats: Json; updated_at: string }
        Insert: Omit<Database['public']['Tables']['about_content']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['about_content']['Insert']>
      }
      about_features: {
        Row: { id: string; icon: string; title: string; description: string; sort_order: number; is_visible: boolean; created_at: string; updated_at: string }
        Insert: Omit<Database['public']['Tables']['about_features']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['about_features']['Insert']>
      }
      services: {
        Row: { id: string; icon: string; category_en: string; title: string; description: string; features: string[]; cta_label: string; cta_href: string; sort_order: number; is_visible: boolean; created_at: string; updated_at: string }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      cases: {
        Row: { id: string; title: string; category: string; description: string; image_url: string | null; media_type: string; video_url: string | null; sort_order: number; is_visible: boolean; created_at: string; updated_at: string }
        Insert: Omit<Database['public']['Tables']['cases']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['cases']['Insert']>
      }
      insights: {
        Row: { id: string; title: string; category: string; type: string; description: string; image_url: string | null; video_url: string | null; author_name: string; author_role: string; published_at: string; is_visible: boolean; created_at: string; updated_at: string }
        Insert: Omit<Database['public']['Tables']['insights']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['insights']['Insert']>
      }
      testimonials: {
        Row: { id: string; rating: number; quote: string; author_name: string; author_title: string; author_company: string; author_avatar: string | null; sort_order: number; is_visible: boolean; created_at: string; updated_at: string }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      cta_content: {
        Row: { id: string; badge: string | null; headline: string; headline_highlight: string; headline_suffix: string | null; body: string; cta_primary_label: string; cta_primary_href: string; cta_secondary_label: string | null; cta_secondary_href: string | null; trust_signals: Json; updated_at: string }
        Insert: Omit<Database['public']['Tables']['cta_content']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['cta_content']['Insert']>
      }
      media_assets: {
        Row: { id: string; bucket: string; storage_path: string; public_url: string; original_name: string; mime_type: string; size_bytes: number; width: number | null; height: number | null; alt_text: string | null; used_by: string | null; created_at: string }
        Insert: Omit<Database['public']['Tables']['media_assets']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['media_assets']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
