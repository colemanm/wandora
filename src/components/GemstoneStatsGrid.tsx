
import { Heart, Star, Eye } from "lucide-react";

interface GemstoneStatsGridProps {
  likes: number;
}

const GemstoneStatsGrid = ({ likes }: GemstoneStatsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-1 text-red-500 mb-1">
          <Heart className="w-5 h-5 fill-current" />
          <span className="font-bold text-lg">{likes}</span>
        </div>
        <p className="text-sm text-gray-600">Likes</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-1">
          <Star className="w-5 h-5 fill-current" />
          <span className="font-bold text-lg">4.8</span>
        </div>
        <p className="text-sm text-gray-600">Rating</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center space-x-1 text-blue-500 mb-1">
          <Eye className="w-5 h-5" />
          <span className="font-bold text-lg">2.3k</span>
        </div>
        <p className="text-sm text-gray-600">Views</p>
      </div>
    </div>
  );
};

export default GemstoneStatsGrid;
