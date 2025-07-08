export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          bio: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      gemstones: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          location_name: string
          latitude: number
          longitude: number
          user_rating: number | null
          view_count: number
          like_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          location_name: string
          latitude: number
          longitude: number
          user_rating?: number | null
          view_count?: number
          like_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          location_name?: string
          latitude?: number
          longitude?: number
          user_rating?: number | null
          view_count?: number
          like_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      gemstone_images: {
        Row: {
          id: string
          gemstone_id: string
          image_url: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          gemstone_id: string
          image_url: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          gemstone_id?: string
          image_url?: string
          display_order?: number
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      gemstone_ratings: {
        Row: {
          id: string
          gemstone_id: string
          user_id: string
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          gemstone_id: string
          user_id: string
          rating: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gemstone_id?: string
          user_id?: string
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      gemstone_likes: {
        Row: {
          id: string
          gemstone_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          gemstone_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          gemstone_id?: string
          user_id?: string
          created_at?: string
        }
      }
      saved_gemstones: {
        Row: {
          id: string
          gemstone_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          gemstone_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          gemstone_id?: string
          user_id?: string
          created_at?: string
        }
      }
      gemstone_views: {
        Row: {
          id: string
          gemstone_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          gemstone_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          gemstone_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_gemstone_average_rating: {
        Args: {
          gemstone_id: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}