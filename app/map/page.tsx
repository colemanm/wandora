'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Gemstone } from '@/types';
import { mapUtils, geocodingUtils } from '@/lib/mapUtils';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useGeolocation from '@/hooks/useGeolocation';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapIcon, Search, Navigation, ZoomIn, ZoomOut, Layers } from 'lucide-react';

export default function MapPage() {
  const { user } = useAuth();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{[key: string]: mapboxgl.Marker}>({});
  
  
  const [gemstones, setGemstones] = useState<Gemstone[]>([]);
  const [filteredGemstones, setFilteredGemstones] = useState<Gemstone[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedGemstone, setSelectedGemstone] = useState<Gemstone | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    latitude: currentLatitude,
    longitude: currentLongitude,
    getCurrentPosition,
    error: geoError
  } = useGeolocation();

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) {
      console.log('Map container ref not available');
      return;
    }

    try {
      console.log('Initializing map...');
      console.log('Container:', mapContainer.current);
      console.log('Container dimensions:', {
        width: mapContainer.current.offsetWidth,
        height: mapContainer.current.offsetHeight
      });
      
      // Check if container has dimensions
      if (mapContainer.current.offsetWidth === 0 || mapContainer.current.offsetHeight === 0) {
        console.error('Container has zero dimensions');
        return;
      }
      
      // Set access token - fallback to hardcoded token for testing
      const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiY29sZW1hbm0iLCJhIjoiY21jMjZ6OXUxMDVpbDJqcThrNWMwbG52bSJ9.3Ovo6oIhNm8h85nz7Tw2Ug';
      console.log('Token check:', token ? 'Token exists' : 'Token missing');
      console.log('Token source:', process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ? 'Environment' : 'Hardcoded fallback');
      if (!token) {
        console.error('Mapbox access token not found');
        setError('Mapbox access token not configured');
        return;
      }
      mapboxgl.accessToken = token;
      console.log('Access token set:', mapboxgl.accessToken ? 'Yes' : 'No');
      
      // Create map instance using the ref
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.006, 40.7128],
        zoom: 2,
      });

      console.log('Map instance created:', map.current);

      // Add map loaded event
      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setMapInitialized(true);
        updateMarkers();
      });

      // Add error handling
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setError('Failed to load map. Please check your internet connection.');
      });

      // Add additional debugging events
      map.current.on('style.load', () => {
        console.log('Map style loaded');
      });

      map.current.on('styledata', () => {
        console.log('Map style data loaded');
      });

      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map. Please check your API key.');
      }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Fetch gemstones
  useEffect(() => {
    fetchGemstones();
  }, []);

  // Update markers when gemstones change
  const updateMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Add new markers
    filteredGemstones.forEach(gemstone => {
      const markerElement = document.createElement('div');
      markerElement.className = 'w-8 h-8 bg-wandora-600 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-110';
      markerElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-xs">💎</div>';
      
      // Add click handler
      markerElement.addEventListener('click', () => {
        setSelectedGemstone(gemstone);
        if (map.current) {
          map.current.flyTo({
            center: [gemstone.longitude, gemstone.latitude],
            zoom: 12
          });
        }
      });

      const marker = mapUtils.createMarker({
        longitude: gemstone.longitude,
        latitude: gemstone.latitude,
        element: markerElement,
      });

      marker.addTo(map.current!);
      markers.current[gemstone.id] = marker;
    });
  };

  // Update markers when filtered gemstones change
  useEffect(() => {
    if (map.current) {
      updateMarkers();
    }
  }, [filteredGemstones]);

  // Apply search filter
  useEffect(() => {
    let filtered = [...gemstones];

    if (searchQuery.trim()) {
      filtered = filtered.filter(g => 
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.location_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.author?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGemstones(filtered);
  }, [gemstones, searchQuery]);

  const fetchGemstones = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const supabase = createClient();
      const { data, error } = await supabase
        .from('gemstones')
        .select(`
          *,
          author:users(id, name, avatar_url),
          images:gemstone_images(image_url, display_order)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedGemstones = data.map(gemstone => ({
        ...gemstone,
        images: gemstone.images?.sort((a: any, b: any) => a.display_order - b.display_order) || []
      }));

      setGemstones(processedGemstones);
      setFilteredGemstones(processedGemstones);
    } catch (err: any) {
      console.error('Error fetching gemstones:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const results = await geocodingUtils.searchLocations(searchQuery);
      if (results.length > 0 && map.current) {
        const [lng, lat] = results[0].center;
        map.current.flyTo({
          center: [lng, lat],
          zoom: 12
        });
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleCurrentLocation = () => {
    getCurrentPosition();
  };

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (map.current) {
      // Fit to show all markers
      if (filteredGemstones.length > 0) {
        const bounds = mapUtils.getBounds(filteredGemstones.map(g => ({
          longitude: g.longitude,
          latitude: g.latitude
        })));
        
        if (bounds) {
          map.current.fitBounds(bounds, {
            padding: 50
          });
        }
      } else {
        map.current.flyTo({
          center: [-74.006, 40.7128],
          zoom: 2
        });
      }
    }
  };

  // Use current location when available
  useEffect(() => {
    if (currentLatitude && currentLongitude && map.current) {
      map.current.flyTo({
        center: [currentLongitude, currentLatitude],
        zoom: 12
      });
    }
  }, [currentLatitude, currentLongitude]);

  // Don't block map rendering while loading gemstones
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center">
  //       <div className="text-center">
  //         <Loader2 className="w-12 h-12 animate-spin text-wandora-primary mx-auto mb-4" />
  //         <p className="text-wandora-dark">Loading map...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wandora-lighter to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapIcon className="w-5 h-5" />
              Map Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchGemstones} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-5rem)]">
      {/* Map Container */}
      <div 
        ref={mapContainer}
        className="w-full h-full"
        style={{ 
          backgroundColor: '#f0f0f0',
          minHeight: 'calc(100vh - 5rem)',
          width: '100%'
        }}
      />

      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <Card className="shadow-lg">
          <CardContent className="p-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search gemstones or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={handleSearch}
                size="sm"
                className="px-4"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Counter */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        {loading ? (
          <Badge variant="secondary" className="text-sm">
            <Loader2 className="w-3 h-3 animate-spin mr-1" />
            Loading gemstones...
          </Badge>
        ) : filteredGemstones.length > 0 ? (
          <Badge variant="secondary" className="text-sm">
            {filteredGemstones.length} gemstone{filteredGemstones.length !== 1 ? 's' : ''} found
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-sm">
            No gemstones found
          </Badge>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="flex flex-col space-y-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCurrentLocation}
            className="w-10 h-10 p-0"
            title="Use current location"
          >
            <Navigation className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleZoomIn}
            className="w-10 h-10 p-0"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleZoomOut}
            className="w-10 h-10 p-0"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleResetView}
            className="w-10 h-10 p-0"
            title="Reset view"
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected Gemstone Info */}
      {selectedGemstone && (
        <div className="absolute bottom-4 left-4 z-10">
          <Card className="w-80 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{selectedGemstone.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{selectedGemstone.location_name}</p>
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">{selectedGemstone.description}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => window.open(`/gemstone/${selectedGemstone.id}`, '_blank')}
                  className="flex-1"
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedGemstone(null)}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}