import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Configure Mapbox GL JS
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// Default map configuration
export const DEFAULT_MAP_CONFIG: Partial<mapboxgl.MapboxOptions> = {
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-74.006, 40.7128], // New York City as default
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
};

// Default clustering configuration
export const CLUSTERING_CONFIG = {
  clusterMaxZoom: 14, // Per PRD specification
  clusterRadius: 50,
  clusterMinPoints: 2,
};

// Map utility functions
export const mapUtils = {
  /**
   * Create a new map instance with default configuration
   */
  createMap: (container: HTMLElement | string, options: Partial<mapboxgl.MapboxOptions> = {}): mapboxgl.Map => {
    return new mapboxgl.Map({
      container,
      ...DEFAULT_MAP_CONFIG,
      ...options,
    });
  },

  /**
   * Create a marker with custom styling
   */
  createMarker: (options: {
    longitude: number;
    latitude: number;
    element?: HTMLElement;
    draggable?: boolean;
  }): mapboxgl.Marker => {
    return new mapboxgl.Marker({
      element: options.element,
      draggable: options.draggable || false,
    }).setLngLat([options.longitude, options.latitude]);
  },

  /**
   * Get static map URL for a given location using Mapbox Static Images API
   */
  getStaticMapUrl: (options: {
    longitude: number;
    latitude: number;
    zoom?: number;
    width?: number;
    height?: number;
    marker?: boolean;
  }): string => {
    const {
      longitude,
      latitude,
      zoom = 12,
      width = 400,
      height = 300,
      marker = true,
    } = options;

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const baseUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static';
    
    let url = `${baseUrl}`;
    
    if (marker) {
      url += `/pin-s+ff6b6b(${longitude},${latitude})`;
    }
    
    url += `/${longitude},${latitude},${zoom}/${width}x${height}?access_token=${accessToken}`;
    
    return url;
  },

  /**
   * Validate coordinates
   */
  validateCoordinates: (longitude: number, latitude: number): boolean => {
    return (
      longitude >= -180 &&
      longitude <= 180 &&
      latitude >= -90 &&
      latitude <= 90
    );
  },

  /**
   * Calculate distance between two points in kilometers
   */
  calculateDistance: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  /**
   * Format coordinates for display
   */
  formatCoordinates: (longitude: number, latitude: number): string => {
    const lat = latitude >= 0 ? `${latitude.toFixed(6)}°N` : `${Math.abs(latitude).toFixed(6)}°S`;
    const lng = longitude >= 0 ? `${longitude.toFixed(6)}°E` : `${Math.abs(longitude).toFixed(6)}°W`;
    return `${lat}, ${lng}`;
  },

  /**
   * Get map bounds for a collection of points
   */
  getBounds: (points: { longitude: number; latitude: number }[]): mapboxgl.LngLatBounds | null => {
    if (points.length === 0) return null;

    const bounds = new mapboxgl.LngLatBounds();
    points.forEach(point => {
      bounds.extend([point.longitude, point.latitude]);
    });

    return bounds;
  },

  /**
   * Create a GeoJSON source for clustering
   */
  createClusterSource: (data: GeoJSON.FeatureCollection): any => {
    return {
      type: 'geojson',
      data,
      cluster: true,
      clusterMaxZoom: CLUSTERING_CONFIG.clusterMaxZoom,
      clusterRadius: CLUSTERING_CONFIG.clusterRadius,
    };
  },

  /**
   * Create cluster layer styles
   */
  createClusterLayers: () => {
    return {
      // Cluster circles
      clusters: {
        id: 'clusters',
        type: 'circle' as const,
        source: 'gemstones',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      },
      // Cluster count
      clusterCount: {
        id: 'cluster-count',
        type: 'symbol' as const,
        source: 'gemstones',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      },
      // Unclustered points
      unclusteredPoint: {
        id: 'unclustered-point',
        type: 'circle' as const,
        source: 'gemstones',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      }
    };
  },
};

// Geocoding utilities using Mapbox Geocoding API
export const geocodingUtils = {
  /**
   * Search for locations using Mapbox Geocoding API
   */
  searchLocations: async (query: string): Promise<{
    id: string;
    place_name: string;
    center: [number, number];
    bbox?: [number, number, number, number];
  }[]> => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      return data.features?.map((feature: any) => ({
        id: feature.id,
        place_name: feature.place_name,
        center: feature.center,
        bbox: feature.bbox,
      })) || [];
    } catch (error) {
      console.error('Geocoding error:', error);
      return [];
    }
  },

  /**
   * Reverse geocode coordinates to get location name
   */
  reverseGeocode: async (longitude: number, latitude: number): Promise<string | null> => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      return data.features?.[0]?.place_name || null;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  },
};

// Export Mapbox types for components
export { mapboxgl as Map };
export type { Marker } from 'mapbox-gl';
export default mapboxgl;