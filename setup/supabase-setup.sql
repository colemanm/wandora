-- Wandora Database Setup Script
-- Run this SQL in your Supabase SQL Editor

-- Create Users Table
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

-- Create Gemstones Table
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

-- Create Gemstone Images Table
CREATE TABLE gemstone_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Follows Table
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Create Gemstone Ratings Table
CREATE TABLE gemstone_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, user_id)
);

-- Create Gemstone Likes Table
CREATE TABLE gemstone_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, user_id)
);

-- Create Saved Gemstones Table
CREATE TABLE saved_gemstones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, user_id)
);

-- Create Gemstone Views Table
CREATE TABLE gemstone_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, user_id)
);

-- Create Performance Indexes
CREATE INDEX idx_gemstones_user_id ON gemstones(user_id);
CREATE INDEX idx_gemstones_location ON gemstones(latitude, longitude);
CREATE INDEX idx_gemstones_created_at ON gemstones(created_at DESC);
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
CREATE INDEX idx_gemstone_ratings_gemstone_id ON gemstone_ratings(gemstone_id);
CREATE INDEX idx_gemstone_likes_gemstone_id ON gemstone_likes(gemstone_id);
CREATE INDEX idx_gemstone_views_gemstone_id ON gemstone_views(gemstone_id);

-- Create Search Indexes
CREATE INDEX idx_gemstones_title_search ON gemstones USING gin(to_tsvector('english', title));
CREATE INDEX idx_gemstones_description_search ON gemstones USING gin(to_tsvector('english', description));

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstones ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstone_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstone_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstone_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_gemstones ENABLE ROW LEVEL SECURITY;
ALTER TABLE gemstone_views ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Users
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can view user profiles" ON users FOR SELECT USING (true);

-- Create RLS Policies for Gemstones
CREATE POLICY "Anyone can view gemstones" ON gemstones FOR SELECT USING (true);
CREATE POLICY "Users can create gemstones" ON gemstones FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own gemstones" ON gemstones FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own gemstones" ON gemstones FOR DELETE USING (auth.uid() = user_id);

-- Create RLS Policies for Gemstone Images
CREATE POLICY "Anyone can view gemstone images" ON gemstone_images FOR SELECT USING (true);
CREATE POLICY "Users can add images to own gemstones" ON gemstone_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM gemstones WHERE id = gemstone_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete images from own gemstones" ON gemstone_images FOR DELETE USING (
  EXISTS (SELECT 1 FROM gemstones WHERE id = gemstone_id AND user_id = auth.uid())
);

-- Create RLS Policies for Follows
CREATE POLICY "Anyone can view follows" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can follow others" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow others" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Create RLS Policies for Ratings
CREATE POLICY "Anyone can view ratings" ON gemstone_ratings FOR SELECT USING (true);
CREATE POLICY "Users can rate gemstones" ON gemstone_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ratings" ON gemstone_ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ratings" ON gemstone_ratings FOR DELETE USING (auth.uid() = user_id);

-- Create RLS Policies for Likes
CREATE POLICY "Anyone can view likes" ON gemstone_likes FOR SELECT USING (true);
CREATE POLICY "Users can like gemstones" ON gemstone_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike gemstones" ON gemstone_likes FOR DELETE USING (auth.uid() = user_id);

-- Create RLS Policies for Saved Gemstones
CREATE POLICY "Users can view own saved gemstones" ON saved_gemstones FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save gemstones" ON saved_gemstones FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave gemstones" ON saved_gemstones FOR DELETE USING (auth.uid() = user_id);

-- Create RLS Policies for Views
CREATE POLICY "Anyone can view gemstone views" ON gemstone_views FOR SELECT USING (true);
CREATE POLICY "Users can track views" ON gemstone_views FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Functions
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

-- Create Triggers
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

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('gemstone-images', 'gemstone-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('user-avatars', 'user-avatars', true);

-- Create Storage Policies
CREATE POLICY "Anyone can view gemstone images" ON storage.objects FOR SELECT USING (bucket_id = 'gemstone-images');
CREATE POLICY "Authenticated users can upload gemstone images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gemstone-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete own gemstone images" ON storage.objects FOR DELETE USING (bucket_id = 'gemstone-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view user avatars" ON storage.objects FOR SELECT USING (bucket_id = 'user-avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'user-avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);