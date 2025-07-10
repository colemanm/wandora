# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 IMPORTANT: Keep This Document Updated

**Every time you make changes to the Wandora application, you MUST update this document to reflect:**
- ✅ New features that have been completed (move from "Planned" to "Completed")
- 🚧 Features currently in progress (update status and progress)
- 📋 New items added to the roadmap or todo list
- 🔄 Changes to the technology stack or architecture
- 📁 Updates to file structure or component organization
- 🐛 New troubleshooting information or common issues

**The "Current Implementation Status" section below should always be accurate and up-to-date.**

### 📋 Working with Plans (CRITICAL WORKFLOW)

**When implementing features that have detailed plans in `/plans/`, you MUST maintain synchronization between this document and the specific plan document:**

#### 🚀 Starting Work on a Plan
1. **Update CLAUDE.md**: Move feature from "Planned" to "In Progress" 
2. **Update Plan Status**: Change plan status from "Planning" to "In Progress"
3. **Add Current Phase**: Include current implementation phase in CLAUDE.md status

#### 🔄 During Implementation
**Update BOTH documents as you work:**
- ✅ **Plan Document**: Check off completed items in implementation phases
- 🚧 **CLAUDE.md**: Update "In Progress" section with current phase/milestone
- 📝 **Technical Details**: Document decisions and changes in plan document
- 🔄 **Status Sync**: Ensure both documents reflect the same current state

#### 🎯 Completing Implementation Phases
**When finishing major phases:**
1. **Plan Document**: Mark phase as complete with checkboxes
2. **CLAUDE.md**: Update progress description to reflect completed phase
3. **File Structure**: Update CLAUDE.md if new files/directories were added

#### ✅ Plan Completion
**When a plan is fully implemented:**
1. **Plan Document**: Update status to "Completed"
2. **CLAUDE.md**: Follow the plan's specific "CLAUDE.md Updates Required" section
3. **Status Migration**: Move features from "In Progress" to "Completed"
4. **Clean Up**: Remove detailed next steps that are now complete

**⚠️ NEVER let these documents get out of sync - they should always show the same current reality.**

## Development Commands

- `npm run dev` - Start development server (runs on port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Overview

**Wandora** is a Next.js-based social travel platform where users can discover and share authentic travel experiences called "gemstones." Built with Next.js App Router, TypeScript, React, Tailwind CSS, and Supabase for backend services.

## Technology Stack

### Current Implementation
- **Framework**: Next.js 15 with App Router
- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom wandora-* color palette
- **UI Components**: shadcn/ui component library
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **Image Storage**: Supabase Storage buckets
- **Icons**: Lucide React
- **Mapping**: Mapbox GL JS (migrated from Maptiler for better performance)
- **Static Maps**: Mapbox Static Images API

## Architecture Overview

### Database Schema (Supabase)
- **users**: User profiles and authentication
- **gemstones**: Travel experience posts
- **gemstone_images**: Image attachments for gemstones
- **gemstone_likes**: User likes on gemstones
- **saved_gemstones**: User saved gemstones
- **gemstone_ratings**: User ratings for gemstones
- **gemstone_views**: View tracking
- **follows**: User follow relationships

### Current Data Model
```typescript
interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  bio?: string
  location?: string
  created_at: string
  updated_at: string
}

interface Gemstone {
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
  images?: GemstoneImage[]
  author?: User
}
```

### Component Structure
- **Pages** (`app/`): Next.js App Router pages
- **Feature Components** (`src/components/`): Domain-specific components
- **UI Components** (`src/components/ui/`): Reusable shadcn/ui components
- **Authentication** (`src/components/auth/`): Login/signup components
- **Types** (`src/types/`): TypeScript interfaces
- **Utilities** (`src/lib/`): Helper functions and configurations

## Current Implementation Status

### ✅ Completed Features
- **User Authentication**: Email/password login and signup
- **User Profiles**: Profile creation, editing, avatar upload
- **Gemstone Creation**: Full CRUD with image upload
- **Gemstone Display**: Browse page with filtering
- **Gemstone Details**: Full detail view with interactions
- **Like/Save System**: Users can like and save gemstones
- **Search**: Text-based search functionality
- **Image Upload**: Supabase Storage integration
- **View Tracking**: Unique view counting per gemstone
- **Responsive Design**: Mobile-friendly interface
- **Interactive Map View**: Browse gemstones on map with clustering
- **Location Picker**: Map-based location selection for create/edit
- **Static Maps**: Minimap display on detail pages
- **Geolocation**: Current location detection

### 🚧 In Progress
- None

### 📋 Planned Features
- **Follow System**: User following functionality
- **Rating System**: Multi-user rating aggregation
- **Collections**: Organized saved gemstones

## File Structure

```
/app/                          # Next.js App Router pages
  ├── browse/                  # Browse gemstones page
  ├── create/                  # Create new gemstone
  ├── gemstone/[id]/          # Gemstone detail pages
  │   ├── page.tsx            # Detail view
  │   └── edit/               # Edit gemstone
  ├── map/                    # Interactive map view
  ├── profile/                # User profile page
  └── ...                     # Other pages

/src/
  ├── components/             # React components
  │   ├── auth/              # Authentication components
  │   ├── map/               # Map-specific components
  │   │   ├── MapMarker.tsx  # Custom marker component
  │   │   ├── MapPopup.tsx   # Gemstone popup
  │   │   └── MapControls.tsx # Map control buttons
  │   ├── ui/                # shadcn/ui components
  │   ├── LocationPicker.tsx # Interactive location picker
  │   ├── StaticMap.tsx      # Static map display
  │   └── ...                # Feature components
  ├── contexts/              # React contexts
  │   └── AuthContext.tsx    # Authentication context
  ├── lib/                   # Utility functions
  │   ├── supabase/          # Supabase client setup
  │   └── mapUtils.ts        # Mapbox utilities and config
  ├── types/                 # TypeScript definitions
  │   ├── index.ts          # Main type definitions
  │   └── database.ts       # Database schema types
  └── hooks/                 # Custom React hooks
      └── useGeolocation.ts  # Location detection hook

/plans/                       # Feature development plans
  ├── README.md              # Planning process documentation
  └── map-functionality.md   # Map implementation plan

/setup/                       # Database migrations
  └── migrations/            # SQL schema files
```

## Development Patterns

### Authentication Flow
- Supabase Auth handles user sessions
- AuthContext provides user state globally
- Protected routes check authentication status
- Automatic profile creation on signup

### Data Flow
- All data stored in Supabase PostgreSQL
- Real-time updates via Supabase client
- Row Level Security (RLS) for data protection
- Image storage in Supabase Storage buckets

### State Management
- React Context for authentication state
- Local state (`useState`) for component state
- No global state management library needed

### Error Handling
- Try-catch blocks for async operations
- User-friendly error messages
- Loading states for better UX
- Fallback UI for failed operations

## Environment Variables

Required environment variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Mapping Configuration
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

## Database Security

### Row Level Security Policies
- Users can only edit their own profiles
- Gemstones are publicly viewable
- Users can only edit their own gemstones
- Likes/saves are user-specific
- Images are linked to gemstone ownership

### Authentication
- Supabase Auth handles JWT tokens
- Middleware handles session refresh
- Client-side and server-side auth checks

## Performance Optimizations

### Current Optimizations
- Singleton pattern for Supabase client
- Image optimization via Next.js
- Lazy loading for images
- Data caching to prevent unnecessary re-fetches
- Optimistic UI updates for likes/saves

### Future Optimizations
- Infinite scroll for gemstone feeds
- Image resizing and compression
- CDN integration for global performance
- Map performance optimization for large datasets

## Next Steps

### Follow System Implementation (Priority)
1. **Backend**: Follow/unfollow API endpoints
2. **Frontend**: Follow buttons and follower lists
3. **Feed**: Personalized feed based on follows

### Planning Process & Documentation Workflow

#### 📋 Plan-Driven Development
- **Detailed Plans**: Complex features have dedicated plans in `/plans/` directory
- **Implementation Tracking**: Plans include phase-by-phase progress tracking with checkboxes
- **CLAUDE.md Updates**: Plans specify exactly how to update this document when complete

#### 🔄 Dual-Document Workflow
**CLAUDE.md (High-Level Status)**
- Current implementation status (Planning/In Progress/Completed)
- Technology stack and architecture changes
- File structure updates
- High-level progress descriptions

**Plan Documents (Detailed Progress)**
- Step-by-step implementation phases
- Technical decisions and specifications
- Detailed progress tracking with checkboxes
- Environment variables and dependencies
- Testing strategies and success criteria

#### 📝 Documentation Responsibilities
**Before Starting Implementation:**
- [ ] Review plan document thoroughly
- [ ] Update CLAUDE.md: Move feature to "In Progress"
- [ ] Update plan status to "In Progress"
- [ ] Note current phase in CLAUDE.md

**During Active Development:**
- [ ] Check off completed items in plan document
- [ ] Update CLAUDE.md progress description regularly
- [ ] Document technical decisions in plan document
- [ ] Update file structure in CLAUDE.md when adding new files

**After Completing Each Phase:**
- [ ] Mark phase complete in plan document
- [ ] Update CLAUDE.md to reflect phase completion
- [ ] Test implementation against plan's success criteria

**Upon Plan Completion:**
- [ ] Follow plan's "CLAUDE.md Updates Required" section exactly
- [ ] Update plan status to "Completed"
- [ ] Move features from "In Progress" to "Completed" in CLAUDE.md
- [ ] Update technology stack if new tools were integrated
- [ ] Clean up "Next Steps" section

**⚠️ Both documents must always reflect the same current reality - never let them drift apart.**

## Testing Strategy

- Manual testing across all features
- Cross-browser compatibility testing
- Mobile responsiveness testing
- Authentication flow testing
- Database operation testing

## Deployment Notes

- Deployed on Vercel (Next.js optimized)
- Database hosted on Supabase
- Environment variables configured in deployment
- Automatic deployments on main branch

## Troubleshooting

### Common Issues
- Authentication state not persisting: Check middleware setup
- Images not loading: Verify Supabase Storage policies
- Database timeouts: Check RLS policies and indexing
- Mobile layout issues: Test responsive breakpoints

### Debug Tools
- Browser developer tools for client-side issues
- Supabase dashboard for database queries
- Next.js build output for optimization insights
- Network tab for API call monitoring