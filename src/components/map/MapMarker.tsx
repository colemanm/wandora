'use client';

import { MapPin, Star } from 'lucide-react';
import { Gemstone } from '@/types';

interface MapMarkerProps {
  gemstone: Gemstone;
  isSelected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function MapMarker({ 
  gemstone, 
  isSelected = false, 
  onClick, 
  size = 'md' 
}: MapMarkerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        border-2 
        border-white 
        shadow-lg 
        cursor-pointer 
        transition-all 
        duration-200 
        hover:scale-110
        ${isSelected ? 'bg-wandora-600 scale-110' : 'bg-wandora-500'}
      `}
      onClick={onClick}
    >
      <div className="w-full h-full flex items-center justify-center text-white">
        <MapPin className={iconSizeClasses[size]} />
      </div>
      
      {/* Rating indicator */}
      {gemstone.user_rating && (
        <div className="absolute -top-1 -right-1 bg-yellow-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
          {gemstone.user_rating}
        </div>
      )}
    </div>
  );
}