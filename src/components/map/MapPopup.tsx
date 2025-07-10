'use client';

import { Gemstone } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Eye, Heart, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MapPopupProps {
  gemstone: Gemstone;
  onClose?: () => void;
}

export default function MapPopup({ gemstone, onClose }: MapPopupProps) {
  return (
    <Card className="w-80 max-w-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={gemstone.author?.avatar_url} />
              <AvatarFallback className="text-xs">
                {gemstone.author?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{gemstone.author?.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            {gemstone.user_rating && (
              <Badge variant="secondary" className="text-xs">
                <Star className="w-3 h-3 fill-current text-yellow-500 mr-1" />
                {gemstone.user_rating}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Image */}
        {gemstone.images && gemstone.images.length > 0 && (
          <div className="relative w-full h-32 rounded-lg overflow-hidden">
            <Image
              src={gemstone.images[0].image_url}
              alt={gemstone.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        {/* Title and Location */}
        <div>
          <h3 className="font-semibold text-lg leading-tight mb-1">
            {gemstone.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {gemstone.location_name}
          </p>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3">
          {gemstone.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {gemstone.view_count || 0}
            </span>
            <span className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              {gemstone.like_count || 0}
            </span>
          </div>
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {gemstone.created_at ? new Date(gemstone.created_at).toLocaleDateString() : 'Recently'}
          </span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/gemstone/${gemstone.id}`} className="flex-1">
            <Button size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {onClose && (
            <Button size="sm" variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}