'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Debug environment variables
    console.log('=== ENVIRONMENT DEBUG ===');
    console.log('All env vars starting with NEXT_PUBLIC_:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));
    console.log('NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:', process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
    
    if (!mapContainer.current) {
      console.log('No map container');
      return;
    }

    console.log('=== MAP INITIALIZATION ===');
    console.log('Container dimensions:', {
      width: mapContainer.current.offsetWidth,
      height: mapContainer.current.offsetHeight
    });

    // Set access token
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiY29sZW1hbm0iLCJhIjoiY21jMjZ6OXUxMDVpbDJqcThrNWMwbG52bSJ9.3Ovo6oIhNm8h85nz7Tw2Ug';
    if (!token) {
      console.error('NO TOKEN FOUND');
      return;
    }

    console.log('Token (first 20 chars):', token.substring(0, 20));
    mapboxgl.accessToken = token;

    // Create map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128],
      zoom: 10,
    });

    console.log('Map created:', map);

    map.on('load', () => {
      console.log('MAP LOADED SUCCESSFULLY!');
    });

    map.on('error', (e) => {
      console.error('MAP ERROR:', e);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Map</h1>
      <div 
        ref={mapContainer}
        className="w-full h-96 border border-gray-300"
        style={{ width: '100%', height: '400px' }}
      />
      <p className="mt-4 text-sm text-gray-600">
        Check browser console for debug output
      </p>
    </div>
  );
}