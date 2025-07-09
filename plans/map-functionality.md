# Map Functionality Implementation Plan

## Status
**Planning** - Ready for implementation

## Overview

Implement comprehensive map functionality for Wandora using Maptiler SDK as specified in the PRD. This includes:
- Main map view for browsing gemstones
- Location picker for create/edit pages  
- Static map display on detail pages
- Built-in clustering and geolocation features

## Technology Requirements

### Dependencies to Install
```bash
npm install @maptiler/sdk
npm install @types/maptiler
```

### Dependencies to Remove
```bash
npm uninstall mapbox-gl  # Currently installed but unused
```

### Technology Stack Alignment
- **Primary Mapping**: Maptiler SDK (per PRD specification)
- **Clustering**: Built-in Maptiler clustering at zoom level 14
- **Geocoding**: Maptiler geocoding API
- **Static Maps**: Maptiler Static Maps API

## Environment Variables

```bash
# From PRD specification
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key
```

## Implementation Phases

### Phase 1: Setup & Migration
**Goal**: Prepare codebase for Maptiler integration

- [ ] Remove unused Mapbox GL JS dependency
- [ ] Install Maptiler SDK and TypeScript definitions
- [ ] Set up Maptiler configuration in `/src/lib/mapUtils.ts`
- [ ] Create base map utilities for Maptiler
- [ ] Implement geolocation hook in `/src/hooks/useGeolocation.ts`

### Phase 2: Location Picker Component
**Goal**: Interactive location selection for gemstone creation/editing

- [ ] Create `/src/components/LocationPicker.tsx` with Maptiler SDK
- [ ] Add Maptiler geocoding search functionality
- [ ] Implement draggable marker for precise positioning
- [ ] Add "Current location" button using geolocation
- [ ] Include coordinate validation and manual input
- [ ] Test on create and edit gemstone pages

### Phase 3: Static Maps
**Goal**: Display static map images on detail pages

- [ ] Create `/src/components/StaticMap.tsx` using Maptiler Static API
- [ ] Implement fallback handling for failed loads
- [ ] Add responsive sizing
- [ ] Integrate into gemstone detail page sidebar
- [ ] Replace existing placeholder map

### Phase 4: Main Map View
**Goal**: Interactive map for browsing all gemstones

- [ ] Create `/app/map/page.tsx` with Maptiler SDK
- [ ] Implement gemstone markers on map
- [ ] Use built-in Maptiler clustering (zoom level 14)
- [ ] Create map popup component for gemstone previews
- [ ] Add filtering and search controls
- [ ] Ensure responsive design for mobile/desktop

### Phase 5: Integration & Cleanup
**Goal**: Complete integration and remove old references

- [ ] Update create/edit pages to use LocationPicker
- [ ] Remove placeholder map references
- [ ] Update navigation to include map page
- [ ] Remove unused Mapbox references from codebase
- [ ] Test across all screen sizes and devices
- [ ] Update CLAUDE.md per requirements below

## File Structure

```
/app/
  └── map/
      └── page.tsx                 # Main map view with Maptiler SDK

/src/components/
  ├── LocationPicker.tsx           # Interactive location picker
  ├── StaticMap.tsx               # Static map display
  └── map/
      ├── MapMarker.tsx           # Custom marker component
      ├── MapPopup.tsx            # Gemstone popup
      └── MapControls.tsx         # Map control buttons

/src/lib/
  └── mapUtils.ts                 # Maptiler utilities and config

/src/hooks/
  └── useGeolocation.ts           # Location detection hook
```

## Component Specifications

### LocationPicker Component
```typescript
interface LocationPickerProps {
  initialLatitude?: number
  initialLongitude?: number
  onLocationChange: (lat: number, lng: number, address?: string) => void
  className?: string
}
```

### StaticMap Component
```typescript
interface StaticMapProps {
  latitude: number
  longitude: number
  width?: number
  height?: number
  zoom?: number
  onClick?: () => void
  className?: string
}
```

### Main Map Page Features
- Interactive Maptiler map with navigation controls
- Gemstone markers with custom icons
- Built-in clustering at zoom level 14
- Search bar with Maptiler geocoding
- Filter controls (date, rating, author)
- Responsive design for mobile and desktop

## Technical Considerations

### Performance
- **Built-in Clustering**: Maptiler handles clustering automatically at zoom level 14
- **Marker Optimization**: Use sprite sheets for custom markers
- **Lazy Loading**: Load map components only when needed
- **Caching**: Cache geocoding results to reduce API calls

### Mobile & Accessibility
- **Touch Controls**: Maptiler SDK provides touch-friendly controls
- **Accessibility**: Leverage Maptiler's built-in accessibility features
- **Keyboard Navigation**: Support keyboard map navigation
- **Screen Reader**: Provide alternative text for map content

### Error Handling
- **Graceful Degradation**: Show fallback content when maps fail to load
- **API Limits**: Handle rate limiting with user-friendly messages
- **Network Issues**: Provide retry mechanisms for failed requests
- **Coordinate Validation**: Validate latitude/longitude inputs

## Testing Strategy

### Component Testing
- [ ] LocationPicker: Test geocoding, marker dragging, current location
- [ ] StaticMap: Test various sizes, coordinates, fallback handling
- [ ] Main Map: Test clustering, popups, filtering, search

### Integration Testing
- [ ] Create page: Verify location picker saves coordinates
- [ ] Edit page: Verify existing coordinates are loaded correctly
- [ ] Detail page: Verify static map displays correct location
- [ ] Map page: Verify all gemstones display with correct clustering

### Cross-Browser Testing
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Touch interactions and gestures

### Performance Testing
- [ ] Large datasets (100+ gemstones) clustering performance
- [ ] Map loading speed on slow connections
- [ ] Memory usage during extended map interactions

## CLAUDE.md Updates Required

When implementation is complete, update CLAUDE.md:

### Technology Stack Section
- [ ] Remove "Mapbox GL JS (installed, awaiting integration)"
- [ ] Add "Maptiler SDK" to current implementation
- [ ] Update planned integrations to reflect completion

### Current Implementation Status Section
- [ ] Move "Interactive Map View" from "Planned Features" to "Completed Features"
- [ ] Move "Location Picker" from "Planned Features" to "Completed Features"
- [ ] Update "Map Integration" from "In Progress" to "Completed"

### File Structure Section
- [ ] Add `/app/map/` directory
- [ ] Add `/src/components/map/` directory
- [ ] Add `/src/hooks/useGeolocation.ts`

### Environment Variables Section
- [ ] Confirm `NEXT_PUBLIC_MAPTILER_API_KEY` is documented

### Next Steps Section
- [ ] Remove map integration priority items
- [ ] Update to focus on next major feature (likely Follow System)

## Success Criteria

✅ **Complete when all of the following work correctly:**

1. **Main Map View**: Users can browse all gemstones on an interactive map
2. **Clustering**: Nearby gemstones cluster automatically at zoom level 14
3. **Location Selection**: Users can pick locations on create/edit pages
4. **Static Maps**: Detail pages show minimap of gemstone location
5. **Geolocation**: "Current location" button works on supported devices
6. **Responsive**: All map features work on mobile and desktop
7. **Performance**: Map handles large numbers of gemstones smoothly
8. **Error Handling**: Graceful fallbacks when map services are unavailable

## Notes

- This plan aligns with the PRD specification for Maptiler SDK usage
- Built-in clustering simplifies implementation compared to custom solutions
- Focus on leveraging Maptiler's built-in features rather than custom implementations
- Prioritize user experience with smooth interactions and clear visual feedback