# Wandora Setup Guide

This guide will help you set up the Wandora application for local development.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account
- A Maptiler account

## Environment Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd wandora
npm install
```

### 2. Environment Variables

Copy the environment template and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Maptiler Configuration
NEXT_PUBLIC_MAPTILER_API_KEY=your-maptiler-api-key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## Service Setup

### 1. Supabase Setup

1. **Create a new project** at [supabase.com](https://supabase.com)
2. **Get your keys** from Project Settings → API
3. **Run the database setup** (see Database Setup section below)
4. **Configure Storage** (see Storage Setup section below)

### 2. Maptiler Setup

1. **Sign up** at [maptiler.com](https://www.maptiler.com/)
2. **Get your API key** from Account → Keys
3. **Copy the key** to your `.env.local` file

## Database Setup

### 1. Database Migration Strategy

We use a dual-approach migration system:

- **Fresh Setup**: Use `setup/supabase-setup.sql` for new projects
- **Existing Database**: Use incremental migrations in `setup/migrations/`

### 2. Fresh Database Setup (Recommended)

For new projects, run the complete schema:

```bash
# Copy the contents of setup/supabase-setup.sql
# Paste into your Supabase SQL Editor and execute
```

This creates all tables, indexes, policies, functions, and storage buckets in one go.

### 3. Incremental Migrations (Existing Database)

If you have an existing database, apply only new migrations:

```bash
# Check setup/migrations/ for new migration files
# Run migrations in order: 001_initial_schema.sql, 002_*, etc.
# Only run migrations that haven't been applied yet
```

### 4. Migration Best Practices

- **Always backup** your database before applying migrations
- **Test migrations** on development database first
- **Document** which migrations have been applied
- **Keep supabase-setup.sql updated** with latest schema

### 5. Creating New Migrations

When making schema changes during development:

1. Create a new migration file in `setup/migrations/`
2. Use naming convention: `00X_description.sql`
3. **Always update** `setup/supabase-setup.sql` with the changes
4. Test both the migration and fresh setup

See `setup/migrations/README.md` for detailed migration workflow.

### 6. Set up Authentication

Supabase Auth is configured by default. You can customize:

1. **Auth providers** in Authentication → Providers
2. **Email templates** in Authentication → Email Templates
3. **URL configuration** in Authentication → URL Configuration

## Storage Setup

### 1. Storage Setup

Storage buckets and policies are automatically created when you run the database setup SQL.

If you need to create them manually:

```sql
-- Create buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('gemstone-images', 'gemstone-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('user-avatars', 'user-avatars', true);

-- Storage policies are included in the main schema
```

### 2. Verify Storage Setup

1. Go to **Storage** in your Supabase dashboard
2. Verify both buckets exist: `gemstone-images` and `user-avatars`
3. Check that policies are properly configured

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Verification

### 1. Test Database Connection

```bash
# Test if environment variables are loaded
npm run dev
```

Check the console for any connection errors.

### 2. Test Image Upload

1. Create a test user account
2. Try uploading an image in the gemstone creation form
3. Check if the image appears in Supabase Storage

### 3. Test Map Integration

1. Navigate to the map view
2. Verify the map loads correctly
3. Test creating a gemstone with location

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your project URL and API keys
   - Check if RLS policies are correctly set up

2. **Map Not Loading**
   - Verify your Maptiler API key
   - Check browser console for errors

3. **Image Upload Failing**
   - Verify storage buckets exist
   - Check storage policies are correctly configured

### Getting Help

- Check the [Supabase documentation](https://supabase.com/docs)
- Check the [Maptiler documentation](https://docs.maptiler.com/)
- Review the project's DATA.md for database schema
- Review the project's PRD for feature requirements

## Next Steps

After setup is complete:

1. **Test all features** with dummy data
2. **Customize styling** according to your preferences
3. **Deploy to production** (Vercel recommended)
4. **Set up monitoring** and error tracking