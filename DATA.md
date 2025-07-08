# Wandora Database Schema

This document describes the database schema for the Wandora travel storytelling platform using Supabase PostgreSQL.

## Database Tables

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Gemstones Table
```sql
CREATE TABLE gemstones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location_name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Gemstone Images Table
```sql
CREATE TABLE gemstone_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Follows Table
```sql
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);
```

### Gemstone Ratings Table
```sql
CREATE TABLE gemstone_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, user_id)
);
```

### Gemstone Likes Table
```sql
CREATE TABLE gemstone_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, user_id)
);
```

### Saved Gemstones Table
```sql
CREATE TABLE saved_gemstones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, user_id)
);
```

### Gemstone Views Table
```sql
CREATE TABLE gemstone_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, user_id)
);
```

## TypeScript Interfaces

### Core Data Types
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

interface Gemstone {
  id: string;
  user_id: string;
  title: string;
  description: string;
  location_name: string;
  latitude: number;
  longitude: number;
  user_rating?: number;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  // Computed fields
  average_rating?: number;
  current_user_rating?: number;
  is_liked?: boolean;
  is_saved?: boolean;
  images?: GemstoneImage[];
  author?: User;
}

interface GemstoneImage {
  id: string;
  gemstone_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

interface GemstoneRating {
  id: string;
  gemstone_id: string;
  user_id: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

interface GemstoneView {
  id: string;
  gemstone_id: string;
  user_id: string;
  created_at: string;
}
```

## API Endpoints (REST)

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/gemstones` - Get user's gemstones
- `GET /api/users/:id/followers` - Get user's followers
- `GET /api/users/:id/following` - Get users being followed

### Gemstones
- `GET /api/gemstones` - Get all gemstones (with pagination)
- `GET /api/gemstones/:id` - Get gemstone by ID
- `POST /api/gemstones` - Create new gemstone
- `PUT /api/gemstones/:id` - Update gemstone
- `DELETE /api/gemstones/:id` - Delete gemstone
- `GET /api/gemstones/feed` - Get personalized feed
- `GET /api/gemstones/search` - Search gemstones

### Interactions
- `POST /api/gemstones/:id/like` - Like/unlike gemstone
- `POST /api/gemstones/:id/save` - Save/unsave gemstone
- `POST /api/gemstones/:id/rate` - Rate gemstone
- `POST /api/gemstones/:id/view` - Track gemstone view
- `POST /api/users/:id/follow` - Follow/unfollow user

### Images
- `POST /api/images/upload` - Upload image to Supabase Storage
- `DELETE /api/images/:id` - Delete image

## Database Indexes

```sql
-- Performance indexes
CREATE INDEX idx_gemstones_user_id ON gemstones(user_id);
CREATE INDEX idx_gemstones_location ON gemstones(latitude, longitude);
CREATE INDEX idx_gemstones_created_at ON gemstones(created_at DESC);
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
CREATE INDEX idx_gemstone_ratings_gemstone_id ON gemstone_ratings(gemstone_id);
CREATE INDEX idx_gemstone_likes_gemstone_id ON gemstone_likes(gemstone_id);
CREATE INDEX idx_gemstone_views_gemstone_id ON gemstone_views(gemstone_id);

-- Search indexes
CREATE INDEX idx_gemstones_title_search ON gemstones USING gin(to_tsvector('english', title));
CREATE INDEX idx_gemstones_description_search ON gemstones USING gin(to_tsvector('english', description));
```

## Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstones ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstone_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstone_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstone_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_gemstones ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstone_views ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile and update it
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- All users can read all gemstones (public)
CREATE POLICY "Anyone can view gemstones" ON gemstones FOR SELECT USING (true);
CREATE POLICY "Users can create gemstones" ON gemstones FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own gemstones" ON gemstones FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own gemstones" ON gemstones FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

## Computed Fields & Functions

```sql
-- Function to calculate average rating
CREATE OR REPLACE FUNCTION get_gemstone_average_rating(gemstone_id UUID)
RETURNS DECIMAL AS $$
BEGIN
  RETURN (
    SELECT AVG(rating)::DECIMAL(3,2)
    FROM gemstone_ratings
    WHERE gemstone_ratings.gemstone_id = get_gemstone_average_rating.gemstone_id
  );
END;
$$ LANGUAGE plpgsql;

-- Trigger to update like_count on gemstones
CREATE OR REPLACE FUNCTION update_gemstone_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE gemstones SET like_count = like_count + 1 WHERE id = NEW.gemstone_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE gemstones SET like_count = like_count - 1 WHERE id = OLD.gemstone_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER gemstone_like_count_trigger
  AFTER INSERT OR DELETE ON gemstone_likes
  FOR EACH ROW EXECUTE FUNCTION update_gemstone_like_count();
```

## Supabase Storage Buckets

```sql
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('gemstone-images', 'gemstone-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('user-avatars', 'user-avatars', true);

-- Storage policies
CREATE POLICY "Anyone can view images" ON storage.objects FOR SELECT USING (bucket_id = 'gemstone-images');
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gemstone-images' AND auth.role() = 'authenticated');
```