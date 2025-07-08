# Gemstone Data Structure

This document describes the data structure for Gemstones in the Wandora travel storytelling platform.

## Gemstone Interface

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

## Field Descriptions

### Required Fields

- **`id`** (`number`): Unique identifier for the gemstone
- **`title`** (`string`): The title of the travel story/gemstone
- **`author`** (`string`): Full name of the story author
- **`location`** (`string`): Geographic location where the story takes place (format: "City, Country")
- **`image`** (`string`): URL to the main image for the gemstone story
- **`excerpt`** (`string`): Brief description/preview of the story content
- **`likes`** (`number`): Number of likes the story has received

### Optional Fields

- **`sponsored`** (`boolean`): Whether the story is sponsored content (defaults to `false` if not specified)

## Example Data

```typescript
{
  id: 1,
  title: "Hidden Waterfalls of Iceland",
  author: "Emma Kowalski",
  location: "Reykjavik, Iceland",
  image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
  excerpt: "Discovering a secret waterfall that locals rarely share with tourists. After days of research and conversations with locals, I found myself standing before one of Iceland's most breathtaking hidden gems.",
  sponsored: true,
  likes: 127
}
```

## Data Guidelines

### Image URLs
- Currently using Unsplash URLs with consistent dimensions (800x600)
- Format: `https://images.unsplash.com/photo-[id]?w=800&h=600&fit=crop`

### Location Format
- Use "City, Country" format for consistency
- Examples: "Reykjavik, Iceland", "Tokyo, Japan", "Barcelona, Spain"

### Excerpt Length
- Keep excerpts concise but descriptive
- Typically 1-2 sentences that capture the essence of the story
- Focus on the unique aspect or emotional impact of the experience

### Sponsored Content
- Only include `sponsored: true` for sponsored stories
- Omit the field entirely for non-sponsored content (defaults to `false`)

## Data Source

The gemstone data is stored in `/src/data/GemstoneData.ts` and exported as:
- `Gemstone` interface for type definitions
- `gemstones` array containing all story data

---

# User Profile Data Structure

This document describes the data structure for User Profiles in the Wandora travel storytelling platform.

## User Profile Interface

```typescript
interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
}
```

## Field Descriptions

### Required Fields

- **`name`** (`string`): Full name of the user
- **`email`** (`string`): User's email address
- **`avatar`** (`string`): URL or base64 data URL for the user's profile picture
- **`bio`** (`string`): User's biography/description
- **`location`** (`string`): User's current location

## Example Data

```typescript
{
  name: "Emma Kowalski",
  email: "emma@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c88c?w=200&h=200&fit=crop&crop=face",
  bio: "Adventure seeker and travel photographer with a passion for discovering hidden gems around the world.",
  location: "Reykjavik, Iceland"
}
```

## Data Guidelines

### Avatar Images
- Accepts both external URLs and base64 data URLs
- Recommended dimensions: 200x200 pixels minimum
- For external URLs, use square aspect ratio with face crop
- Base64 format used for user-uploaded images via file input

### Email Format
- Must be a valid email address
- Used for identification and contact purposes
- Should follow standard email validation patterns

### Bio Guidelines
- Free-form text describing the user
- Typically 1-3 sentences about interests, expertise, or travel philosophy
- No strict character limit but should be concise

### Location Format
- Free-form text for user's current location
- Can be as specific or general as user prefers
- Examples: "Reykjavik, Iceland", "San Francisco Bay Area", "Nomadic"

### Name Format
- Full name as preferred by the user
- Used for display purposes and avatar initials generation
- Avatar fallback shows first letter of each word in the name

## Usage Context

User profile data is primarily used in:
- Profile editing forms (`ProfileEditForm` component)
- Author display on gemstone stories
- User authentication and identification
- Avatar generation and display throughout the application

## Data Persistence

Currently, user profile data is managed locally within React components and is not persisted to a backend database. Changes are handled through component state and callback functions.