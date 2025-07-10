'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  Layers,
  Star
} from 'lucide-react';

interface MapControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  filters: {
    rating: string;
    author: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
  onCurrentLocation: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  searchResults: any[];
  onSearchResultSelect: (result: any) => void;
  isSearching: boolean;
  resultCount: number;
}

export default function MapControls({
  searchQuery,
  onSearchChange,
  onSearch,
  filters,
  onFiltersChange,
  onCurrentLocation,
  onZoomIn,
  onZoomOut,
  onResetView,
  searchResults,
  onSearchResultSelect,
  isSearching,
  resultCount
}: MapControlsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    setShowSearchResults(value.length > 0);
  };

  const handleSearchResultSelect = (result: any) => {
    onSearchResultSelect(result);
    setShowSearchResults(false);
  };

  const clearFilters = () => {
    onFiltersChange({
      rating: '',
      author: '',
      dateRange: ''
    });
  };

  const hasActiveFilters = filters.rating || filters.author || filters.dateRange;

  return (
    <div className="absolute top-4 left-4 right-4 z-10 space-y-2">
      {/* Search Bar */}
      <Card className="shadow-lg">
        <CardContent className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search locations or gemstones..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              className="pl-10 pr-20"
            />
            <div className="absolute right-2 top-2 flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="h-6 w-6 p-0"
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onSearch}
                className="h-6 w-6 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchResultSelect(result)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{result.place_name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters */}
      {showFilters && (
        <Card className="shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Filters</h3>
              <div className="flex items-center space-x-2">
                {hasActiveFilters && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowFilters(false)}
                  className="h-5 w-5 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Rating</label>
                <Select 
                  value={filters.rating} 
                  onValueChange={(value) => onFiltersChange({ ...filters, rating: value })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any rating</SelectItem>
                    <SelectItem value="5">5 stars</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="2">2+ stars</SelectItem>
                    <SelectItem value="1">1+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium mb-1 block">Date</label>
                <Select 
                  value={filters.dateRange} 
                  onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium mb-1 block">Author</label>
                <Input
                  placeholder="Author name"
                  value={filters.author}
                  onChange={(e) => onFiltersChange({ ...filters, author: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Counter */}
      {resultCount > 0 && (
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-xs">
            {resultCount} gemstone{resultCount !== 1 ? 's' : ''} found
          </Badge>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 space-y-2">
        <div className="flex flex-col space-y-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={onCurrentLocation}
            className="w-10 h-10 p-0"
          >
            <Navigation className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={onZoomIn}
            className="w-10 h-10 p-0"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={onZoomOut}
            className="w-10 h-10 p-0"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={onResetView}
            className="w-10 h-10 p-0"
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}