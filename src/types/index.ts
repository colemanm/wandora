// Enhanced types with computed fields and relationships
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  bio?: string
  location?: string
  created_at: string
  updated_at: string
  // Computed fields
  follower_count?: number
  following_count?: number
  gemstone_count?: number
}

export interface Gemstone {
  id: string
  user_id: string
  title: string
  description: string
  location_name: string
  latitude: number
  longitude: number
  user_rating?: number
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
  // Computed fields
  average_rating?: number
  current_user_rating?: number
  is_liked?: boolean
  is_saved?: boolean
  images?: GemstoneImage[]
  author?: User
}

export interface GemstoneImage {
  id: string
  gemstone_id: string
  image_url: string
  display_order: number
  created_at: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}

export interface GemstoneRating {
  id: string
  gemstone_id: string
  user_id: string
  rating: number
  created_at: string
  updated_at: string
}

export interface GemstoneView {
  id: string
  gemstone_id: string
  user_id: string
  created_at: string
}

export interface GemstoneCreateData {
  title: string
  description: string
  location_name: string
  latitude: number
  longitude: number
  user_rating?: number
  images: File[]
}

export interface UserProfile {
  name: string
  bio?: string
  location?: string
  avatar?: File
}

// Legacy types for backward compatibility
export interface Gemstone_Legacy {
  id: number
  title: string
  author: string
  location: string
  image: string
  excerpt: string
  sponsored?: boolean
  likes: number
}