
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Users, Star } from "lucide-react";

interface AuthorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorName: string;
}

const AuthorProfileModal = ({ isOpen, onClose, authorName }: AuthorProfileModalProps) => {
  // Mock author data - in a real app this would come from an API
  const authorData = {
    name: authorName,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Travel enthusiast and storyteller with a passion for discovering hidden gems around the world. I believe that the best experiences come from connecting with locals and exploring off the beaten path.",
    location: "New York, USA",
    followers: 1247,
    following: 432,
    totalLikes: 5241,
    gemstones: [
      {
        id: 1,
        title: "Hidden Waterfalls of Iceland",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
        likes: 127,
        location: "Reykjavik, Iceland"
      },
      {
        id: 2,
        title: "Northern Lights Adventure", 
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=200&fit=crop",
        likes: 89,
        location: "Tromsø, Norway"
      },
      {
        id: 3,
        title: "Midnight Sun Hiking",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", 
        likes: 203,
        location: "Lofoten, Norway"
      },
      {
        id: 4,
        title: "Glacier Cave Exploration",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        likes: 156,
        location: "Vatnajökull, Iceland"
      }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-wandora-charcoal">
            Author Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Author Header */}
          <div className="flex items-start space-x-6">
            <img 
              src={authorData.avatar}
              alt={authorData.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-wandora-charcoal mb-2">
                {authorData.name}
              </h2>
              <div className="flex items-center space-x-1 text-wandora-stone mb-3">
                <MapPin className="w-4 h-4" />
                <span>{authorData.location}</span>
              </div>
              <p className="text-wandora-charcoal/80 leading-relaxed mb-4">
                {authorData.bio}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-wandora-stone" />
                  <span className="font-medium">{authorData.followers}</span>
                  <span className="text-wandora-stone text-sm">followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{authorData.following}</span>
                  <span className="text-wandora-stone text-sm">following</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="font-medium">{authorData.totalLikes}</span>
                  <span className="text-wandora-stone text-sm">total likes</span>
                </div>
              </div>
            </div>
            <Button className="bg-wandora-terracotta hover:bg-wandora-terracotta/90">
              Follow
            </Button>
          </div>

          {/* Author's Gemstones */}
          <div>
            <h3 className="text-lg font-semibold text-wandora-charcoal mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-wandora-terracotta" />
              <span>Published Gemstones ({authorData.gemstones.length})</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {authorData.gemstones.map((gemstone) => (
                <div key={gemstone.id} className="group cursor-pointer">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={gemstone.image}
                        alt={gemstone.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                        <span className="text-white text-xs">{gemstone.likes}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-wandora-charcoal group-hover:text-wandora-terracotta transition-colors mb-2">
                        {gemstone.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {gemstone.location}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorProfileModal;
