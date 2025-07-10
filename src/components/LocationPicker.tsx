'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search, Loader2, Navigation } from 'lucide-react';
import { mapUtils, geocodingUtils } from '@/lib/mapUtils';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useGeolocation from '@/hooks/useGeolocation';

interface LocationPickerProps {
  initialLatitude?: number;
  initialLongitude?: number;
  onLocationChange: (lat: number, lng: number, address?: string) => void;
  className?: string;
}

export default function LocationPicker({
  initialLatitude,
  initialLongitude,
  onLocationChange,
  className = '',
}: LocationPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
  } | null>(null);
  
  const {
    latitude: currentLatitude,
    longitude: currentLongitude,
    loading: geoLoading,
    error: geoError,
    getCurrentPosition,
  } = useGeolocation();

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    const initialLat = initialLatitude || 40.7128;
    const initialLng = initialLongitude || -74.006;

    map.current = mapUtils.createMap(mapContainer.current, {
      center: [initialLng, initialLat],
      zoom: initialLatitude && initialLongitude ? 12 : 2,
    });

    // Add marker
    const markerElement = document.createElement('div');
    markerElement.className = 'w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer';
    markerElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-xs">📍</div>';

    marker.current = mapUtils.createMarker({
      longitude: initialLng,
      latitude: initialLat,
      element: markerElement,
      draggable: true,
    });

    marker.current.addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', async () => {
      if (!marker.current) return;
      
      const lngLat = marker.current.getLngLat();
      const address = await geocodingUtils.reverseGeocode(lngLat.lng, lngLat.lat);
      
      setSelectedLocation({
        latitude: lngLat.lat,
        longitude: lngLat.lng,
        address: address || undefined,
      });
      
      onLocationChange(lngLat.lat, lngLat.lng, address || undefined);
    });

    // Handle map click
    map.current.on('click', async (e) => {
      if (!marker.current || !map.current) return;
      
      const { lng, lat } = e.lngLat;
      
      marker.current.setLngLat([lng, lat]);
      map.current.flyTo({ center: [lng, lat] });
      
      const address = await geocodingUtils.reverseGeocode(lng, lat);
      
      setSelectedLocation({
        latitude: lat,
        longitude: lng,
        address: address || undefined,
      });
      
      onLocationChange(lat, lng, address || undefined);
    });

    // Set initial location if provided
    if (initialLatitude && initialLongitude) {
      setSelectedLocation({
        latitude: initialLatitude,
        longitude: initialLongitude,
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [initialLatitude, initialLongitude, onLocationChange]);

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await geocodingUtils.searchLocations(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search result selection
  const handleSearchResultSelect = (result: any) => {
    if (!map.current || !marker.current) return;

    const [lng, lat] = result.center;
    
    marker.current.setLngLat([lng, lat]);
    map.current.flyTo({ center: [lng, lat], zoom: 12 });
    
    setSelectedLocation({
      latitude: lat,
      longitude: lng,
      address: result.place_name,
    });
    
    onLocationChange(lat, lng, result.place_name);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle current location
  const handleCurrentLocation = () => {
    getCurrentPosition();
  };

  // Use current location when available
  useEffect(() => {
    if (currentLatitude && currentLongitude && map.current && marker.current) {
      marker.current.setLngLat([currentLongitude, currentLatitude]);
      map.current.flyTo({ center: [currentLongitude, currentLatitude], zoom: 12 });
      
      geocodingUtils.reverseGeocode(currentLongitude, currentLatitude).then(address => {
        setSelectedLocation({
          latitude: currentLatitude,
          longitude: currentLongitude,
          address: address || undefined,
        });
        
        onLocationChange(currentLatitude, currentLongitude, address || undefined);
      });
    }
  }, [currentLatitude, currentLongitude, onLocationChange]);

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Section */}
          <div className="space-y-2">
            <Label htmlFor="location-search">Search for a location</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location-search"
                type="text"
                placeholder="Enter city, address, or place name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="pl-10"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
              )}
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-h-40 overflow-y-auto border rounded-md bg-white">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultSelect(result)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{result.place_name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Current Location Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleCurrentLocation}
            disabled={geoLoading}
            className="w-full"
          >
            {geoLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4 mr-2" />
            )}
            Use Current Location
          </Button>
          
          {geoError && (
            <p className="text-sm text-red-500">{geoError}</p>
          )}

          {/* Map Container */}
          <div className="space-y-2">
            <Label>Select location on map</Label>
            <div 
              ref={mapContainer}
              className="w-full h-64 rounded-md border"
            />
            <p className="text-xs text-gray-500">
              Click on the map or drag the marker to select a location
            </p>
          </div>

          {/* Selected Location Display */}
          {selectedLocation && (
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Selected Location:</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {selectedLocation.address || 'Custom location'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {mapUtils.formatCoordinates(selectedLocation.longitude, selectedLocation.latitude)}
              </p>
            </div>
          )}

          {/* Manual Coordinate Input */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="manual-lat" className="text-xs">Latitude</Label>
              <Input
                id="manual-lat"
                type="number"
                step="any"
                placeholder="40.7128"
                value={selectedLocation?.latitude || ''}
                onChange={(e) => {
                  const lat = parseFloat(e.target.value);
                  if (!isNaN(lat) && mapUtils.validateCoordinates(selectedLocation?.longitude || 0, lat)) {
                    const lng = selectedLocation?.longitude || 0;
                    if (marker.current && map.current) {
                      marker.current.setLngLat([lng, lat]);
                      map.current.flyTo({ center: [lng, lat] });
                    }
                    setSelectedLocation(prev => prev ? { ...prev, latitude: lat } : null);
                    onLocationChange(lat, lng);
                  }
                }}
                className="text-xs"
              />
            </div>
            <div>
              <Label htmlFor="manual-lng" className="text-xs">Longitude</Label>
              <Input
                id="manual-lng"
                type="number"
                step="any"
                placeholder="-74.006"
                value={selectedLocation?.longitude || ''}
                onChange={(e) => {
                  const lng = parseFloat(e.target.value);
                  if (!isNaN(lng) && mapUtils.validateCoordinates(lng, selectedLocation?.latitude || 0)) {
                    const lat = selectedLocation?.latitude || 0;
                    if (marker.current && map.current) {
                      marker.current.setLngLat([lng, lat]);
                      map.current.flyTo({ center: [lng, lat] });
                    }
                    setSelectedLocation(prev => prev ? { ...prev, longitude: lng } : null);
                    onLocationChange(lat, lng);
                  }
                }}
                className="text-xs"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}