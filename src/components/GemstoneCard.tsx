import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface GemstoneCardProps {
  title: string;
  author: string;
  location: string;
  image: string;
  excerpt: string;
  sponsored?: boolean;
  likes: number;
  onCardClick?: () => void;
  onAuthorClick?: () => void;
}

const GemstoneCard = ({ 
  title, 
  author, 
  location, 
  image, 
  excerpt, 
  sponsored = false, 
  likes,
  onCardClick,
  onAuthorClick 
}: GemstoneCardProps) => {
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAuthorClick?.();
  };

  return (
    <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white relative" onClick={onCardClick}>
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {sponsored && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-sm shadow-md border border-amber-400/30">
              SPONSORED
            </div>
          </div>
        )}
        
        <Badge className="absolute top-4 left-4 bg-wandora-primary text-white">
          {location}
        </Badge>
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          <span className="text-white text-sm font-medium">{likes}</span>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-semibold text-wandora-dark mb-2 group-hover:text-wandora-primary transition-colors">
          {title}
        </h3>
        <p 
          className="text-sm text-wandora-gray mb-3 cursor-pointer hover:text-wandora-primary transition-colors"
          onClick={handleAuthorClick}
        >
          by {author}
        </p>
        <p className="text-wandora-dark/80 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
      </CardContent>
    </Card>
  );
};

export default GemstoneCard;
