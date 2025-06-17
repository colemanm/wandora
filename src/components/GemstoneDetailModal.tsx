
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, User, Share, Bookmark, X } from "lucide-react";
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
      <DialogContent className="max-w-none w-full h-full max-h-none m-0 p-0 rounded-none overflow-y-auto bg-wandora-cream">
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
        >
          <X className="w-6 h-6 text-wandora-charcoal" />
        </button>

        <div className="min-h-full">
          {/* Photo Carousel - Full width */}
          <div className="relative h-96 md:h-[60vh]">
            <Carousel className="w-full h-full">
              <CarouselContent>
                {additionalPhotos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96 md:h-[60vh] w-full">
                      <img 
                        src={photo} 
                        alt={`${gemstone.title} - Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-6" />
              <CarouselNext className="right-6" />
            </Carousel>
            
            {gemstone.sponsored && (
              <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold py-2 px-4 rounded">
                ✨ Sponsored
              </div>
            )}
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
            <DialogHeader>
              <DialogTitle className="text-3xl md:text-4xl font-serif text-wandora-charcoal text-left">
                {gemstone.title}
              </DialogTitle>
            </DialogHeader>

            {/* Author and Location Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onAuthorClick(gemstone.author)}
                  className="flex items-center space-x-2 hover:text-wandora-terracotta transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium text-lg">{gemstone.author}</span>
                </button>
                <div className="flex items-center space-x-1 text-wandora-stone">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{gemstone.location}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                  <span className="font-medium text-lg">{gemstone.likes}</span>
                </div>
                <Button variant="outline" size="lg">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="lg">
                  <Share className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Full Story */}
            <div className="prose max-w-none">
              <h3 className="text-2xl font-semibold text-wandora-charcoal mb-6">The Full Story</h3>
              <div className="text-wandora-charcoal/80 leading-relaxed text-lg whitespace-pre-line">
                {fullStory}
              </div>
            </div>

            {/* Location Badge */}
            <div className="flex justify-start">
              <Badge className="bg-wandora-terracotta text-white text-lg py-2 px-4">
                {gemstone.location}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GemstoneDetailModal;
