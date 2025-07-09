-- Sample Gemstones Data for Wandora
-- Run this SQL in your Supabase SQL Editor
-- This will create sample travel gemstones

-- First, create a system user if it doesn't exist
DO $$
DECLARE
    wandora_user_id UUID;
BEGIN
    -- Check if user exists
    SELECT id INTO wandora_user_id FROM users WHERE email = 'wandora@wandora.app';
    
    -- If user doesn't exist, create one
    IF wandora_user_id IS NULL THEN
        INSERT INTO users (id, email, name, bio, created_at, updated_at)
        VALUES (
            'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            'wandora@wandora.app',
            'Wandora',
            'Your travel companion for discovering hidden gems around the world. Official curator of extraordinary experiences.',
            NOW(),
            NOW()
        );
        wandora_user_id := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    END IF;
    
    -- Insert sample gemstones

    -- Gemstone 1: Hidden Waterfall in Sekumpul
    INSERT INTO gemstones (id, user_id, title, description, location_name, latitude, longitude, user_rating, view_count, like_count, created_at, updated_at)
    VALUES (
        'b0000000-1234-5678-9012-123456789012',
        wandora_user_id,
        'Hidden Waterfall in Sekumpul',
        'After a challenging 45-minute trek through lush jungle paths, I discovered this breathtaking cascade hidden in northern Bali. The sound of rushing water echoed through the valley as mist kissed my face. Local guides shared stories of ancient ceremonies held here by Balinese royalty. The swim in the emerald pool below was pure magic - cold, refreshing, and surrounded by tropical birds singing in the canopy above.',
        'Sekumpul Falls, Bali, Indonesia',
        -8.1515,
        115.1481,
        5,
        209,
        42,
        NOW() - INTERVAL '15 days',
        NOW() - INTERVAL '4 days'
    );
    
    -- Add images for gemstone 1

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000000-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800', 0, NOW());

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000000-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 1, NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000000-1234-5678-9012-123456789012', 'user_dgjpv', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000000-1234-5678-9012-123456789012', 'user_m76rhk', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000000-1234-5678-9012-123456789012', 'user_ix3z8e', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000000-1234-5678-9012-123456789012', 'user_b1yqbs', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000000-1234-5678-9012-123456789012', 'user_2vc8bf', 4, NOW(), NOW());

    -- Gemstone 2: Sunrise Over Machu Picchu
    INSERT INTO gemstones (id, user_id, title, description, location_name, latitude, longitude, user_rating, view_count, like_count, created_at, updated_at)
    VALUES (
        'b0000001-1234-5678-9012-123456789012',
        wandora_user_id,
        'Sunrise Over Machu Picchu',
        'Waking up at 4 AM for the sunrise hike was worth every sleepy step. As the first rays of sunlight broke over the Andes, the ancient citadel emerged from morning mist like something from a dream. Standing where the Incas once walked, I felt connected to centuries of human achievement. The llamas grazing peacefully among the ruins added a touch of whimsy to this profound moment.',
        'Machu Picchu, Cusco, Peru',
        -13.1631,
        -72.545,
        5,
        72,
        23,
        NOW() - INTERVAL '1 days',
        NOW() - INTERVAL '27 days'
    );
    
    -- Add images for gemstone 2

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000001-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800', 0, NOW());

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000001-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800', 1, NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000001-1234-5678-9012-123456789012', 'user_99ttb', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000001-1234-5678-9012-123456789012', 'user_kpcmn', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000001-1234-5678-9012-123456789012', 'user_mhxzcs', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000001-1234-5678-9012-123456789012', 'user_y2liy', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000001-1234-5678-9012-123456789012', 'user_q297tm', 5, NOW(), NOW());

    -- Gemstone 3: Northern Lights Dance in Tromsø
    INSERT INTO gemstones (id, user_id, title, description, location_name, latitude, longitude, user_rating, view_count, like_count, created_at, updated_at)
    VALUES (
        'b0000002-1234-5678-9012-123456789012',
        wandora_user_id,
        'Northern Lights Dance in Tromsø',
        'After three cloudy nights of waiting, the aurora finally appeared like green ribbons dancing across the Arctic sky. I stood in -15°C temperature, completely mesmerized as the lights shifted from emerald to violet. A local Sami guide shared traditional stories about the spirits dancing in the sky while we sipped hot coffee around a crackling fire. One of those moments that reminds you how small and magical our world truly is.',
        'Tromsø, Norway',
        69.6492,
        18.9553,
        5,
        114,
        54,
        NOW() - INTERVAL '6 days',
        NOW() - INTERVAL '14 days'
    );
    
    -- Add images for gemstone 3

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000002-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', 0, NOW());

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000002-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800', 1, NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000002-1234-5678-9012-123456789012', 'user_lb2pcf', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000002-1234-5678-9012-123456789012', 'user_zn9xat', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000002-1234-5678-9012-123456789012', 'user_r25cdi', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000002-1234-5678-9012-123456789012', 'user_6pctzr', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000002-1234-5678-9012-123456789012', 'user_o0mnjb', 5, NOW(), NOW());

    -- Gemstone 4: Cherry Blossoms in Philosopher's Path
    INSERT INTO gemstones (id, user_id, title, description, location_name, latitude, longitude, user_rating, view_count, like_count, created_at, updated_at)
    VALUES (
        'b0000003-1234-5678-9012-123456789012',
        wandora_user_id,
        'Cherry Blossoms in Philosopher''s Path',
        'Walking the ancient stone path during peak sakura season felt like stepping into a living painting. Pink petals drifted down like snow, carpeting the pathway in soft pastels. I stopped at small temples along the route, where monks shared tea and spoke about the transient beauty of life - mono no aware. The gentle sound of temple bells mixed with laughter from families having hanami picnics created a symphony of spring joy.',
        'Philosopher''s Path, Kyoto, Japan',
        35.0116,
        135.7981,
        4,
        461,
        89,
        NOW() - INTERVAL '27 days',
        NOW() - INTERVAL '9 days'
    );
    
    -- Add images for gemstone 4

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000003-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', 0, NOW());

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000003-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800', 1, NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000003-1234-5678-9012-123456789012', 'user_0hqpjh', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000003-1234-5678-9012-123456789012', 'user_2xc0jnu', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000003-1234-5678-9012-123456789012', 'user_9x6mi9', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000003-1234-5678-9012-123456789012', 'user_thzycs', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000003-1234-5678-9012-123456789012', 'user_7ustsr', 5, NOW(), NOW());

    -- Gemstone 5: Underwater Paradise at Blue Hole
    INSERT INTO gemstones (id, user_id, title, description, location_name, latitude, longitude, user_rating, view_count, like_count, created_at, updated_at)
    VALUES (
        'b0000004-1234-5678-9012-123456789012',
        wandora_user_id,
        'Underwater Paradise at Blue Hole',
        'Diving into the crystalline waters of this natural cenote felt like entering another world. Stalactites hung like ancient chandeliers as rays of sunlight pierced the azure depths. Swimming alongside nurse sharks and tropical fish, I felt weightless and free. The local Maya guides explained how their ancestors considered cenotes sacred portals to the underworld - a belief I completely understood in this ethereal underwater cathedral.',
        'Blue Hole, Belize',
        17.3126,
        -87.5347,
        5,
        295,
        73,
        NOW() - INTERVAL '21 days',
        NOW() - INTERVAL '18 days'
    );
    
    -- Add images for gemstone 5

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000004-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 0, NOW());

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000004-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800', 1, NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000004-1234-5678-9012-123456789012', 'user_okxtns', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000004-1234-5678-9012-123456789012', 'user_q7adlb', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000004-1234-5678-9012-123456789012', 'user_hg4k3r', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000004-1234-5678-9012-123456789012', 'user_ttsczq', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000004-1234-5678-9012-123456789012', 'user_9d0t0l', 5, NOW(), NOW());

    -- Gemstone 6: Sahara Sunset from Dunes
    INSERT INTO gemstones (id, user_id, title, description, location_name, latitude, longitude, user_rating, view_count, like_count, created_at, updated_at)
    VALUES (
        'b0000005-1234-5678-9012-123456789012',
        wandora_user_id,
        'Sahara Sunset from Dunes',
        'Riding camels across endless golden dunes to reach our desert camp was like traveling back in time. As the sun set over the Sahara, the sky exploded in oranges, purples, and deep reds. Berber guides prepared tagine over open fires while telling stories passed down through generations. Sleeping under a blanket of stars so bright they seemed close enough to touch - no city lights, just infinite cosmos above.',
        'Erg Chebbi, Merzouga, Morocco',
        31.0801,
        -4.0133,
        5,
        402,
        75,
        NOW() - INTERVAL '17 days',
        NOW() - INTERVAL '25 days'
    );
    
    -- Add images for gemstone 6

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000005-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800', 0, NOW());

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000005-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?w=800', 1, NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000005-1234-5678-9012-123456789012', 'user_04jxsk', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000005-1234-5678-9012-123456789012', 'user_cjijl', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000005-1234-5678-9012-123456789012', 'user_9zdog7', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000005-1234-5678-9012-123456789012', 'user_ipv5ll', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000005-1234-5678-9012-123456789012', 'user_c6i4rh', 5, NOW(), NOW());

    -- Gemstone 7: Glacier Bay Wildlife Encounter
    INSERT INTO gemstones (id, user_id, title, description, location_name, latitude, longitude, user_rating, view_count, like_count, created_at, updated_at)
    VALUES (
        'b0000006-1234-5678-9012-123456789012',
        wandora_user_id,
        'Glacier Bay Wildlife Encounter',
        'Kayaking through icy waters when a pod of humpback whales surfaced just 30 feet away was pure magic. Their massive forms gracefully breached while seals sunbathed on floating icebergs. The silence of the wilderness was profound - only broken by the crack of glaciers calving into the sea. Eagles circled overhead as brown bears fished for salmon along the shoreline. Alaska''s untamed beauty humbled me completely.',
        'Glacier Bay National Park, Alaska, USA',
        58.6658,
        -137.0167,
        5,
        353,
        66,
        NOW() - INTERVAL '28 days',
        NOW() - INTERVAL '20 days'
    );
    
    -- Add images for gemstone 7

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000006-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 0, NOW());

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000006-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 1, NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000006-1234-5678-9012-123456789012', 'user_5p42qd', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000006-1234-5678-9012-123456789012', 'user_zmz45d', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000006-1234-5678-9012-123456789012', 'user_hkl6y7', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000006-1234-5678-9012-123456789012', 'user_ja3ogz', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000006-1234-5678-9012-123456789012', 'user_yooocd', 5, NOW(), NOW());

    -- Gemstone 8: Lost Temple in Angkor Thom
    INSERT INTO gemstones (id, user_id, title, description, location_name, latitude, longitude, user_rating, view_count, like_count, created_at, updated_at)
    VALUES (
        'b0000007-1234-5678-9012-123456789012',
        wandora_user_id,
        'Lost Temple in Angkor Thom',
        'Discovering Ta Prohm before the crowds arrived felt like being the first explorer to find these ancient ruins. Massive tree roots had claimed the temple stones, creating a hauntingly beautiful fusion of nature and architecture. Sunbeams filtered through jungle canopy, illuminating carved apsaras (celestial dancers) still smiling after 800 years. The whispers of history echoed through stone corridors where Khmer kings once walked.',
        'Angkor Archaeological Park, Siem Reap, Cambodia',
        13.4125,
        103.867,
        4,
        446,
        61,
        NOW() - INTERVAL '10 days',
        NOW() - INTERVAL '20 days'
    );
    
    -- Add images for gemstone 8

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000007-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800', 0, NOW());

    INSERT INTO gemstone_images (gemstone_id, image_url, display_order, created_at)
    VALUES ('b0000007-1234-5678-9012-123456789012', 'https://images.unsplash.com/photo-1565533624504-3b19e2a50e42?w=800', 1, NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000007-1234-5678-9012-123456789012', 'user_w6zc38', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000007-1234-5678-9012-123456789012', 'user_d7wmqf', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000007-1234-5678-9012-123456789012', 'user_ztgiyk', 4, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000007-1234-5678-9012-123456789012', 'user_yqf4aq', 5, NOW(), NOW());

    INSERT INTO gemstone_ratings (gemstone_id, user_id, rating, created_at, updated_at)
    VALUES ('b0000007-1234-5678-9012-123456789012', 'user_49eikz', 5, NOW(), NOW());

    
    -- Update like counts based on actual likes
    UPDATE gemstones SET like_count = (
        SELECT COUNT(*) FROM gemstone_likes WHERE gemstone_id = gemstones.id
    );
    
END $$;

-- Create some sample user interactions (you can run this optionally)
-- This adds realistic engagement to the gemstones

INSERT INTO gemstone_likes (gemstone_id, user_id, created_at)
SELECT 
    g.id,
    'user_' || generate_random_uuid()::text,
    NOW() - (random() * INTERVAL '30 days')
FROM gemstones g, generate_series(1, 15) s
WHERE g.user_id = (SELECT id FROM users WHERE email = 'wandora@wandora.app')
ON CONFLICT DO NOTHING;

INSERT INTO gemstone_views (gemstone_id, user_id, created_at)
SELECT 
    g.id,
    'user_' || generate_random_uuid()::text,
    NOW() - (random() * INTERVAL '30 days')
FROM gemstones g, generate_series(1, 50) s
WHERE g.user_id = (SELECT id FROM users WHERE email = 'wandora@wandora.app')
ON CONFLICT DO NOTHING;

-- Final message
SELECT 'Sample data created successfully! 🎉' as result;
