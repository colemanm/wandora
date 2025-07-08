# Product Requirements Document: Wandora

## 1. Introduction

Wandora is a social travel application designed for users to discover and share unique travel experiences. At its core, Wandora allows users to create "Gemstones," which are rich, multimedia posts about their travels. These Gemstones can be shared with a global community of fellow explorers. The platform aims to be a source of inspiration for travelers and a space for them to connect over shared interests and experiences.

## 2. Target Audience

*   **Casual Travelers**: Individuals and families looking for inspiration for their next vacation or trip.
*   **Backpackers & Adventurers**: Explorers seeking off-the-beaten-path locations and authentic experiences shared by others.
*   **Digital Nomads & Content Creators**: Users who travel frequently and want to document and share their journeys with a wider audience.

## 3. Core Features

### 3.1. User Accounts and Profiles

*   **User Registration & Authentication**: Users can sign up for an account using email/password or social logins.
*   **User Profiles**: Each user has a public profile that includes:
    *   A profile picture and bio.
    *   A gallery of the Gemstones they have created.
    *   A list of users they are following and who are following them.
*   **Follow System**: Users can follow other users to see their new Gemstones in a dedicated feed.

### 3.2. Gemstones: Sharing Travel Experiences

*   **Gemstone Creation**: Users can create a new Gemstone with the following attributes:
    *   **Title**: A catchy title for the travel experience.
    *   **Description**: A rich text description of the experience.
    *   **Photos**: Ability to upload one or more photos.
    *   **Location**: Geotag the Gemstone to a specific location (searchable and visible on a map).
    *   **Rating**: A user-defined rating for the experience (e.g., 1-5 stars).
*   **Public Sharing**: All Gemstones are shared publicly on the platform by default.
*   **View & Like Tracking**: Each Gemstone will display the number of unique views and likes it has received.

### 3.3. Discovery and Exploration

*   **Main Feed**: A primary feed that shows Gemstones from followed users and recommended content.
*   **Map View**:
    *   An interactive map that displays Gemstones based on their geographical location.
    *   Users can navigate the map, and click on Gemstone pins to see a preview and link to the full post.
*   **Full-Text Search**:
    *   A powerful search functionality that allows users to search for Gemstones based on keywords in the title and description.
    *   Search results are ordered by relevance.
    *   Filters can be applied to search results (e.g., by location, rating).
*   **Gemstone Interaction**: When viewing a Gemstone, users can:
    *   **Save**: Save a Gemstone to a personal collection for later.
    *   **Rate**: Give their own rating to the Gemstone, which contributes to an aggregate rating.
    *   **View Author's Profile**: Easily navigate to the profile of the user who created the Gemstone.

## 4. Non-Functional Requirements

*   **Performance**: The application should be fast and responsive, especially the map view and image loading.
*   **Scalability**: The backend should be able to handle a growing number of users, Gemstones, and interactions.
*   **Security**: User data and credentials must be stored securely.
*   **Usability**: The user interface should be intuitive and easy to navigate for a non-technical audience.

## 5. Future Considerations (V2)

*   **Commenting**: Allow users to leave comments on Gemstones.
*   **Private Gemstones**: An option for users to create private Gemstones visible only to them or selected followers.
*   **Collections**: Allow users to organize their saved Gemstones into collections (e.g., "Trip to Japan", "Best Beaches").
*   **Advanced Search Filters**: More granular search filters (e.g., search by user, date range, tags).
*   **Offline Access**: Ability to view saved Gemstones and create drafts offline.

## 6. Decisions & Clarifications

*   **Technology Stack**: The following technology stack will be used:
    *   **Frontend Framework**: Next.js
    *   **CSS Framework**: Tailwind CSS
    *   **Component Library**: shadcn/ui
    *   **Database**: PostgreSQL via Supabase
    *   **Authentication & User Profiles**: Supabase Auth
    *   **Image Storage**: Supabase Storage
    *   **Mapping**: Maptiler SDK
*   **User Registration**: Only requires email, name, and password. Profile picture and bio are optional.
*   **Follow System**: One-way following - users can follow others and be followed by others.
*   **User Ratings**: Multiple user ratings on Gemstones are averaged together. Display shows both the user's individual rating and the aggregate average rating.
*   **Geolocation**: Uses exact coordinates or allows clicking on map when creating a Gemstone.
*   **View Tracking**: Tracks unique views per Gemstone (one view per user per Gemstone).
*   **Feed Algorithm**: To be determined - currently shows Gemstones from followed users and recommended content.
*   **Data Validation**: No character limits implemented initially.
*   **Content Moderation**: Deferred for now.
*   **User Onboarding**: Deferred for now.
*   **Notifications**: User notifications (e.g., for new followers, likes) will be handled via email. The implementation of this feature is deferred for a later version.
*   **Likes vs. Saved**: These are two distinct actions.
    *   **Likes**: A public action that increments a visible counter on the Gemstone, indicating its popularity.
    *   **Saved**: A private action allowing a user to bookmark a Gemstone for their own reference. This will not be publicly visible.
*   **Map Clustering**: Maptiler SDK provides a built-in clustering feature. We will use the default implementation to group nearby Gemstones into a single pin on the map (clustering at zoom level 14). This pin will expand when clicked or when the user zooms in.

## 7. Environment Configuration

The following environment variables need to be configured:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Maptiler Configuration
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key
``` 