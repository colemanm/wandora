
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, User, Share, Bookmark, Star, Calendar, Eye, X } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface GemstoneDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthorClick: (author: string) => void;
  gemstone: {
    id: number;
    title: string;
    author: string;
    location: string;
    image: string;
    excerpt: string;
    likes: number;
    sponsored?: boolean;
  };
}

const GemstoneDetailModal = ({ isOpen, onClose, onAuthorClick, gemstone }: GemstoneDetailModalProps) => {
  // Mock additional photos for carousel
  const additionalPhotos = [
    gemstone.image,
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop"
  ];

  const fullStory = `${gemstone.excerpt} 

After hours of hiking through unmarked trails, we finally reached this incredible hidden gem. The locals had whispered about this place, but few tourists ever make the journey. The path was challenging, winding through dense forest and over rocky terrain, but every step was worth it.

As we approached, the sound of rushing water grew louder, and suddenly, there it was - a magnificent waterfall cascading down moss-covered rocks into a crystal-clear pool below. The mist created tiny rainbows in the afternoon sunlight, and the whole scene felt like something out of a fairy tale.

We spent the entire afternoon there, taking photos, swimming in the surprisingly warm water, and just soaking in the incredible atmosphere. It's moments like these that remind me why I fell in love with travel in the first place.

If you're planning to visit, I recommend bringing sturdy hiking boots and plenty of water. The best time to visit is early morning when the light hits the falls perfectly, though afternoon visits offer the rainbow effect I mentioned.

This place will forever hold a special place in my heart, and I hope it remains as pristine and magical for future travelers to discover.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen max-h-screen p-0 overflow-hidden bg-white border-none">
        {/* Full screen layout similar to Amazon */}
        <div className="flex flex-col h-full relative">
          {/* Close button - positioned absolutely */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white shadow-md rounded-full w-10 h-10"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-40">
            <DialogTitle className="text-2xl font-serif text-wandora-charcoal pr-16">
              {gemstone.title}
            </DialogTitle>
          </div>

          {/* Main content area - scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid lg:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
              {/* Left side - Images */}
              <div className="space-y-4">
                <div className="relative">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {additionalPhotos.map((photo, index) => (
                        <CarouselItem key={index}>
                          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                            <img 
                              src={photo} 
                              alt={`${gemstone.title} - Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </Carousel>
                  
                  {gemstone.sponsored && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold py-2 px-4 rounded-full">
                      ✨ Sponsored Gemstone
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                <div className="flex space-x-2 overflow-x-auto">
                  {additionalPhotos.map((photo, index) => (
                    <div key={index} className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 border-gray-200">
                      <img 
                        src={photo} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Details */}
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
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-red-500 mb-1">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="font-bold text-lg">{gemstone.likes}</span>
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
                  <Button variant="outline" className="w-full">
                    Read Full Story Below
                  </Button>
                </div>

                {/* Quick info */}
                <div className="space-y-3 p-4 border rounded-lg">
                  <h4 className="font-semibold text-wandora-charcoal">Quick Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-wandora-stone">Best time to visit:</span>
                      <span>Early morning</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wandora-stone">Difficulty level:</span>
                      <span>Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wandora-stone">Duration:</span>
                      <span>Half day</span>
                    </div>
                  </div>
                </div>

                {/* Location badge */}
                <Badge className="bg-wandora-terracotta text-white text-sm px-4 py-2">
                  📍 {gemstone.location}
                </Badge>
              </div>
            </div>

            {/* Full story section */}
            <div className="border-t bg-gray-50">
              <div className="max-w-4xl mx-auto p-6">
                <h3 className="text-2xl font-serif font-bold text-wandora-charcoal mb-6">The Complete Story</h3>
                <div className="prose max-w-none text-wandora-charcoal/80 leading-relaxed whitespace-pre-line">
                  {fullStory}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GemstoneDetailModal;
