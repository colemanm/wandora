-- Fix missing user profiles
-- Run this SQL in your Supabase SQL Editor

-- Create profiles for existing auth users who don't have them
INSERT INTO public.users (id, email, name, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'name', split_part(au.email, '@', 1)) as name,
    au.created_at,
    au.created_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Show the results
SELECT 
    'Fixed profiles:' as result,
    count(*) as count
FROM public.users;

-- Verify all auth users now have profiles
SELECT 
    CASE 
        WHEN auth_count = profile_count THEN 'All users have profiles ✅'
        ELSE 'Missing profiles: ' || (auth_count - profile_count)::text || ' ❌'
    END as status
FROM (
    SELECT 
        (SELECT count(*) FROM auth.users) as auth_count,
        (SELECT count(*) FROM public.users) as profile_count
) counts;