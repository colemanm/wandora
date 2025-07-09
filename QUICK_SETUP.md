# Quick Setup Instructions (Updated v1.1)

You're getting a database relationship error because the database tables haven't been created yet. Here's how to fix it:

## ✨ Latest Updates
- **Automatic user profile creation** - No more RLS policy errors during signup
- **Improved date handling** - Proper creation timestamps for all users
- **Enhanced storage policies** - Better file upload security

## 1. Set Up Supabase Database

1. **Go to your Supabase dashboard**: https://app.supabase.com/project/wwysvciprkscobzqrbax
2. **Open the SQL Editor** (in the left sidebar)
3. **Copy and paste the entire contents** of `setup/supabase-setup.sql` into the SQL Editor
4. **Click "Run"** to execute the script

This will create:
- All database tables (users, gemstones, gemstone_images, etc.)
- Indexes for performance
- Row Level Security policies
- Storage buckets for images
- Database functions and triggers

## 2. Verify Setup

After running the SQL script, you can verify it worked by:

1. **Check Tables**: Go to "Table Editor" in Supabase - you should see 8 tables
2. **Check Storage**: Go to "Storage" - you should see 2 buckets (`gemstone-images`, `user-avatars`)
3. **Test the App**: Go back to your app and the error should be resolved

## 3. Test User Flow

Once the database is set up:

1. **Sign up** for a new account (this will create a user record)
2. **Create a gemstone** (this will test the full flow)
3. **Browse gemstones** to see your creation

## If You Still Get Errors

If you get authentication errors, it might be because:
- RLS policies are blocking access
- The user record wasn't created properly

In that case, you can temporarily disable RLS on the users table:
```sql
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```

Then re-enable it after testing:
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

## Database Schema File Location

The complete database setup script is at:
`setup/supabase-setup.sql`

This contains all the SQL needed to set up your database from scratch.