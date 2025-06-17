
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, User, Share } from "lucide-react";
import GemstoneStatsGrid from "./GemstoneStatsGrid";
import GemstoneQuickInfo from "./GemstoneQuickInfo";

interface GemstoneDetailsPanelProps {
  gemstone: {
    author: string;
    location: string;
    excerpt: string;
    likes: number;
  };
  onAuthorClick: (author: string) => void;
  scrollToFullStory: () => void;
}

const GemstoneDetailsPanel = ({ gemstone, onAuthorClick, scrollToFullStory }: GemstoneDetailsPanelProps) => {
  return (
    <div className="space-y-6">
      {/* Author and location info */}
      <div className="space-y-4">
        <button 
          onClick={() => onAuthorClick(gemstone.author)}
          className="flex items-center space-x-3 hover:text-wandora-terracotta transition-colors group"
        >
          <div className="w-12 h-12 bg-wandora-terracotta rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-lg group-hover:text-wandora-terracotta">{gemstone.author}</p>
            <p className="text-wandora-stone text-sm">Travel Storyteller</p>
          </div>
        </button>
        
        <div className="flex items-center space-x-2 text-wandora-stone">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">{gemstone.location}</span>
        </div>
      </div>

      {/* Stats */}
      <GemstoneStatsGrid likes={gemstone.likes} />

      {/* Action buttons */}
      <div className="flex space-x-3">
        <Button className="flex-1 bg-wandora-terracotta hover:bg-wandora-terracotta/90 text-white">
          <Heart className="w-4 h-4 mr-2" />
          Save to Favorites
        </Button>
        <Button variant="outline" className="flex-1">
          <Share className="w-4 h-4 mr-2" />
          Share Story
        </Button>
      </div>

      {/* Story preview */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-wandora-charcoal">Story Preview</h3>
        <p className="text-wandora-stone leading-relaxed">
          {gemstone.excerpt}
        </p>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={scrollToFullStory}
        >
          Read Full Story Below
        </Button>
      </div>

      {/* Quick info */}
      <GemstoneQuickInfo />

      {/* Location badge */}
      <Badge className="bg-wandora-terracotta text-white text-sm px-4 py-2">
        📍 {gemstone.location}
      </Badge>
    </div>
  );
};

export default GemstoneDetailsPanel;
