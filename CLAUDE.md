# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (runs on port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Overview

**Wandora** is a Next.js-based travel storytelling platform where users can discover and share authentic travel experiences called "gemstones." Built with Next.js App Router, TypeScript, React, and Tailwind CSS.

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom wandora-* color palette
- **UI Components**: shadcn/ui component library
- **Routing**: Next.js App Router (file-based routing)
- **State Management**: Local React state (useState)
- **Icons**: Lucide React
- **Data**: Static mock data in `src/data/GemstoneData.ts`

## Architecture Overview

### Core Data Model
```typescript
interface Gemstone {
  id: number;
  title: string;
  author: string;
  location: string;
  image: string;
  excerpt: string;
  sponsored?: boolean;
  likes: number;
}
```

### Component Structure
- **Pages** (`app/`): Next.js App Router pages with high-level state management
- **Feature Components** (`src/components/`): Domain-specific components (Gemstone*, Author*, etc.)
- **UI Components** (`src/components/ui/`): Reusable shadcn/ui components
- **Data** (`src/data/`): Static data and type definitions

### Key Features Components
- **GemstoneDetailModal**: Full-screen gemstone story viewer
- **GemstoneGrid**: Responsive grid layout for gemstone cards
- **GemstoneForm**: Create new gemstone stories
- **AuthorProfileModal**: Author profile and story collection
- **SearchAndFilters**: Client-side search and filtering
- **Navigation**: Responsive navigation with mobile menu

## Development Patterns

### State Management
- Uses local React state (`useState`) throughout
- Modal state managed at parent component level
- Props down, events up pattern for component communication
- No global state management (Redux, Context, etc.)

### Data Flow
- All gemstone data sourced from static `GemstoneData.ts`
- Client-side filtering and search
- Form submissions logged to console (no backend persistence)
- No real-time features or API integration

### Styling Approach
- Custom Tailwind configuration with wandora-* colors
- Responsive design with mobile-first approach
- CSS animations with staggered delays
- Dark mode support configured but not implemented

## Important Notes

### Current Limitations
- **Frontend-only**: No backend integration or data persistence
- **Static Data**: All content is mock data
- **No Authentication**: User system not implemented
- **No Image Upload**: ImageUpload component exists but non-functional

### File Structure
- `/app/` - Next.js App Router pages and layouts
- `/src/components/` - Feature and UI components
- `/src/data/` - Static data and interfaces
- `/src/hooks/` - Custom React hooks
- `/src/lib/` - Utility functions

### Path Aliases
- `@/*` maps to `./src/*` (configured in tsconfig.json)

### Next.js Specific Features
- **App Router**: File-based routing with layouts
- **Image Optimization**: Configured for Unsplash images
- **Font Optimization**: Google Fonts (Inter, Playfair Display)
- **Client Components**: Uses "use client" directive for interactivity

## Testing
No test framework is currently configured. Tests would need to be added separately.