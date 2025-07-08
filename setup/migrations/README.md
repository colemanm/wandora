# Database Migration System

This directory contains the migration system for Wandora's database schema.

## Migration Strategy

We use a dual-approach migration system:

1. **Incremental Migrations** (`migrations/`) - For tracking changes during development
2. **Full Schema** (`supabase-setup.sql`) - Always kept current for fresh installations

## Directory Structure

```
setup/
├── migrations/
│   ├── README.md                 # This file
│   ├── 001_initial_schema.sql    # Initial database setup
│   ├── 002_add_user_bio.sql      # Example future migration
│   └── ...                       # Numbered migrations
├── supabase-setup.sql            # Current complete schema
└── SETUP.md                      # Setup instructions
```

## Migration Naming Convention

- Format: `{number}_{description}.sql`
- Numbers: 3-digit zero-padded (001, 002, 003...)
- Description: Snake_case, descriptive but concise
- Examples:
  - `001_initial_schema.sql`
  - `002_add_user_preferences.sql`
  - `003_create_notifications_table.sql`

## Creating a New Migration

### 1. Create Migration File

```bash
# Create next numbered migration
touch setup/migrations/00X_description.sql
```

### 2. Write Migration SQL

```sql
-- Migration: 002_add_user_preferences
-- Description: Add user preferences table for settings
-- Date: 2024-01-15

-- Add new column to users table
ALTER TABLE users ADD COLUMN preferences JSONB DEFAULT '{}';

-- Create index for preferences queries
CREATE INDEX idx_users_preferences ON users USING gin(preferences);

-- Update RLS policies if needed
-- (Add any policy changes here)
```

### 3. Update Full Schema

After creating a migration, **always update** `supabase-setup.sql` to reflect the current state:

```sql
-- In supabase-setup.sql, add the new column to the CREATE TABLE statement
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  preferences JSONB DEFAULT '{}',  -- <- Add this
  -- ... other columns
);

-- Add the new index
CREATE INDEX idx_users_preferences ON users USING gin(preferences);
```

## Running Migrations

### For Fresh Setup
```bash
# Run the complete schema (recommended for new projects)
# Copy contents of supabase-setup.sql to Supabase SQL Editor
```

### For Existing Database
```bash
# Run only the new migration
# Copy contents of the specific migration file to Supabase SQL Editor
```

### Migration Status Tracking

We don't currently use automated migration tracking. To track which migrations have been applied:

1. **Document in team communications** which migrations have been run
2. **Use git history** to see when migrations were added
3. **Future**: Consider adding a `migrations` table to track applied migrations

## Best Practices

### 1. Always Test Migrations
- Test on a development database first
- Ensure migration is reversible (document rollback steps)
- Test with existing data

### 2. Keep Migrations Small
- One logical change per migration
- Avoid complex multi-step changes
- Break large changes into smaller migrations

### 3. Document Changes
- Add comments explaining the purpose
- Include rollback instructions
- Note any breaking changes

### 4. Update Full Schema
- **Critical**: Always update `supabase-setup.sql` after creating migrations
- Keep it in sync with the latest state
- Test that fresh setup works with updated schema

## Example Migration Workflow

```bash
# 1. Create migration file
touch setup/migrations/003_add_gemstone_tags.sql

# 2. Write migration SQL
cat > setup/migrations/003_add_gemstone_tags.sql << 'EOF'
-- Migration: 003_add_gemstone_tags
-- Description: Add tags support to gemstones
-- Date: 2024-01-20

-- Create tags table
CREATE TABLE gemstone_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID REFERENCES gemstones(id) ON DELETE CASCADE,
  tag VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gemstone_id, tag)
);

-- Create index
CREATE INDEX idx_gemstone_tags_gemstone_id ON gemstone_tags(gemstone_id);
CREATE INDEX idx_gemstone_tags_tag ON gemstone_tags(tag);

-- Add RLS policies
ALTER TABLE gemstone_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view tags" ON gemstone_tags FOR SELECT USING (true);
CREATE POLICY "Users can manage tags on own gemstones" ON gemstone_tags 
  FOR ALL USING (EXISTS (SELECT 1 FROM gemstones WHERE id = gemstone_id AND user_id = auth.uid()));
EOF

# 3. Update supabase-setup.sql with the new table
# (Add the CREATE TABLE, indexes, and policies to the main schema file)

# 4. Test migration on development database
# 5. Apply to production when ready
```

## Rollback Strategy

For each migration, document rollback steps:

```sql
-- Migration: 003_add_gemstone_tags
-- Rollback instructions:
-- DROP TABLE gemstone_tags;
```

## Production Deployment

1. **Backup database** before applying migrations
2. **Apply migrations** in order during maintenance window
3. **Verify** all features work correctly
4. **Monitor** for any issues post-deployment

## Future Improvements

- Add automated migration tracking table
- Create CLI tools for migration management
- Add migration validation and testing
- Implement automatic rollback capabilities