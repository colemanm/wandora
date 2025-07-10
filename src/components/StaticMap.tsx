'use client';

import { useState } from 'react';
import { mapUtils } from '@/lib/mapUtils';
import { MapPin, AlertCircle } from 'lucide-react';

interface StaticMapProps {
  latitude: number;
  longitude: number;
  width?: number;
  height?: number;
  zoom?: number;
  onClick?: () => void;
  className?: string;
  showMarker?: boolean;
  alt?: string;
}

export default function StaticMap({
  latitude,
  longitude,
  width = 400,
  height = 300,
  zoom = 12,
  onClick,
  className = '',
  showMarker = true,
  alt = 'Location map',
}: StaticMapProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Validate coordinates
  const isValidCoordinates = mapUtils.validateCoordinates(longitude, latitude);
  
  if (!isValidCoordinates) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Invalid coordinates</p>
        </div>
      </div>
    );
  }

  // Generate static map URL
  const staticMapUrl = mapUtils.getStaticMapUrl({
    longitude,
    latitude,
    zoom,
    width,
    height,
    marker: showMarker,
  });

  // Fallback content when image fails to load
  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg border ${className} ${
          onClick ? 'cursor-pointer hover:bg-gray-200' : ''
        }`}
        style={{ width, height }}
        onClick={onClick}
      >
        <div className="text-center p-4">
          <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Map unavailable</p>
          <p className="text-xs text-gray-400 mt-1">
            {mapUtils.formatCoordinates(longitude, latitude)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative inline-block ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg animate-pulse"
          style={{ width, height }}
        >
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}
      
      {/* Static map image */}
      <img
        src={staticMapUrl}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-lg border ${onClick ? 'hover:opacity-90' : ''} ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      
      {/* Overlay for interactive maps */}
      {onClick && (
        <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white bg-opacity-90 rounded-full p-2">
              <MapPin className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}