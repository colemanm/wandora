"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface Gemstone {
  id: number;
  title: string;
  author: string;
  location: string;
  image: string;
  excerpt: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const GemstoneMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const gemstones: Gemstone[] = [
    {
      id: 1,
      title: "Hidden Waterfalls of Iceland",
      author: "Emma Kowalski",
      location: "Reykjavik, Iceland",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      excerpt: "Discovering a secret waterfall that locals rarely share with tourists...",
      coordinates: [-21.9426, 64.1466]
    },
    {
      id: 2,
      title: "Street Art in Buenos Aires",
      author: "Carlos Rodriguez",
      location: "Buenos Aires, Argentina",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      excerpt: "The hidden murals that tell stories of a neighborhood's transformation...",
      coordinates: [-58.3816, -34.6037]
    },
    {
      id: 3,
      title: "Sunrise at Mount Fuji",
      author: "Yuki Tanaka",
      location: "Fujinomiya, Japan",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
      excerpt: "The spiritual journey to witness dawn break over Japan's sacred mountain...",
      coordinates: [138.7274, 35.3606]
    },
    {
      id: 4,
      title: "Night Markets of Taipei",
      author: "Lisa Chen",
      location: "Taipei, Taiwan",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop",
      excerpt: "Following the scent of xiaolongbao through narrow alleyways...",
      coordinates: [121.5654, 25.0330]
    },
    {
      id: 5,
      title: "Sahara Desert Camping",
      author: "Ahmed Hassan",
      location: "Merzouga, Morocco",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      excerpt: "Sleeping under a blanket of stars with nothing but sand dunes for miles...",
      coordinates: [-4.0135, 31.0801]
    },
    {
      id: 6,
      title: "Floating Markets of Bangkok",
      author: "Siriporn Wannakul",
      location: "Bangkok, Thailand",
      image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800&h=600&fit=crop",
      excerpt: "Navigating the colorful chaos of Thailand's most authentic floating market...",
      coordinates: [100.5018, 13.7563]
    }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [30, 15],
      zoom: 2,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      // Add gemstone markers
      gemstones.forEach((gemstone) => {
        // Create a custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'gemstone-marker';
        markerEl.style.width = '40px';
        markerEl.style.height = '40px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.backgroundColor = '#C17B47';
        markerEl.style.border = '3px solid white';
        markerEl.style.cursor = 'pointer';
        markerEl.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        markerEl.style.display = 'flex';
        markerEl.style.alignItems = 'center';
        markerEl.style.justifyContent = 'center';
        
        const iconEl = document.createElement('div');
        iconEl.innerHTML = '💎';
        iconEl.style.fontSize = '16px';
        markerEl.appendChild(iconEl);

        // Create popup content
        const popupContent = `
          <div style="max-width: 250px;">
            <img src="${gemstone.image}" alt="${gemstone.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
            <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 4px 0; color: #2C3E50;">${gemstone.title}</h3>
            <p style="font-size: 12px; color: #95A5A6; margin: 0 0 8px 0;">by ${gemstone.author}</p>
            <p style="font-size: 14px; color: #2C3E50; margin: 0; line-height: 1.4;">${gemstone.excerpt.substring(0, 100)}...</p>
          </div>
        `;

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(popupContent);

        new mapboxgl.Marker(markerEl)
          .setLngLat(gemstone.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-wandora-cream">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <MapPin className="w-16 h-16 text-wandora-terracotta mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-wandora-charcoal mb-2">
              Interactive Gemstone Map
            </h3>
            <p className="text-wandora-stone">
              Enter your Mapbox public token to explore gemstones on an interactive map
            </p>
          </div>
          
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="border-wandora-sand focus:border-wandora-terracotta"
            />
            <Button 
              type="submit" 
              className="w-full bg-wandora-terracotta hover:bg-wandora-terracotta/90"
              disabled={!mapboxToken.trim()}
            >
              Load Map
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-wandora-cream rounded-lg">
            <p className="text-sm text-wandora-stone text-center">
              Get your free Mapbox token at{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-wandora-terracotta hover:underline font-medium"
              >
                mapbox.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-sm">
        <h3 className="font-serif text-lg font-semibold text-wandora-charcoal mb-2">
          Discover Gemstones
        </h3>
        <p className="text-sm text-wandora-stone">
          Click on the 💎 markers to explore travel stories from around the world
        </p>
      </div>
    </div>
  );
};

export default GemstoneMap;
