# Sample Data Population Script

This script populates your Wandora database with sample travel gemstones created by a system user called "Wandora".

## What it creates:

- **1 System User**: "Wandora" (wandora@wandora.app)
- **12 Sample Gemstones**: Real travel destinations with detailed descriptions
- **Images**: 2 high-quality images per gemstone from Unsplash
- **Sample Interactions**: Likes, views, and ratings to make the app feel active

## Sample Destinations Include:

1. 🏞️ **Sekumpul Falls, Bali** - Hidden waterfall adventure
2. 🏔️ **Machu Picchu, Peru** - Sunrise over ancient ruins  
3. 🌌 **Tromsø, Norway** - Northern Lights experience
4. 🌸 **Kyoto, Japan** - Cherry blossom season
5. 🌊 **Blue Hole, Belize** - Underwater paradise
6. 🏜️ **Sahara, Morocco** - Desert sunset expedition
7. 🐋 **Glacier Bay, Alaska** - Wildlife encounters
8. 🏛️ **Angkor Wat, Cambodia** - Ancient temple discovery
9. 🌅 **Lofoten Islands, Norway** - Midnight sun hiking
10. 🏖️ **Algarve, Portugal** - Secret beach cave
11. 🏰 **Isle of Skye, Scotland** - Highland adventure
12. 🍷 **Tuscany, Italy** - Wine harvest experience

## Setup Instructions:

### 1. Get your Supabase Service Role Key

1. Go to your Supabase dashboard: https://app.supabase.com/project/wwysvciprkscobzqrbax
2. Navigate to **Settings** → **API**  
3. Copy the **service_role** key (NOT the anon key)
4. Add it to your `.env` file:

```bash
# Add this line to your .env file
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Run the Population Script

```bash
npm run populate-data
```

## What happens when you run it:

1. ✅ Creates system user "Wandora" 
2. ✅ Creates 12 detailed gemstones with real locations
3. ✅ Adds 2 images per gemstone
4. ✅ Generates realistic ratings (4-5 stars)
5. ✅ Adds random likes and views for each gemstone
6. ✅ Creates sample user interactions

## After running:

- Browse to `/browse` to see all the sample gemstones
- Visit `/profile` after signing in to see the system user's content
- Each gemstone will have realistic engagement metrics
- You can like, save, and rate the sample content

## Note:

- The script uses the service role key to bypass RLS policies
- Sample images are hosted on Unsplash (high quality, free)
- All locations use real coordinates for map integration
- The system user "Wandora" represents curated platform content

Run this once to get your app populated with beautiful sample content!