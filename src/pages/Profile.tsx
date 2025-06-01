import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, BookmarkIcon, PenTool, MapPin, Calendar, Users, Edit2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import GemstoneCard from "@/components/GemstoneCard";
import GemstoneDetailModal from "@/components/GemstoneDetailModal";
import AuthorProfileModal from "@/components/AuthorProfileModal";
import ProfileEditForm from "@/components/ProfileEditForm";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [selectedGemstone, setSelectedGemstone] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [isGemstoneModalOpen, setIsGemstoneModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const { toast } = useToast();

  // Mock user data - in a real app, this would come from authentication/database
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Passionate traveler and storyteller. Always seeking hidden gems and authentic experiences around the world.",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    stats: {
      published: 8,
      liked: 42,
      saved: 15,
      followers: 127,
      following: 89
    }
  });

  // Mock gemstones data - would be filtered by user in real app
  const publishedGemstones = [
    {
      id: 1,
      title: "Hidden Waterfalls of Iceland",
      author: "Alex Johnson",
      location: "Reykjavik, Iceland",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      excerpt: "Discovering a secret waterfall that locals rarely share with tourists.",
      likes: 127
    },
    {
      id: 16,
      title: "Secret Jazz Clubs of New Orleans",
      author: "Alex Johnson",
      location: "New Orleans, LA",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      excerpt: "Finding authentic jazz in the backstreets where locals still gather for late-night sessions.",
      likes: 89
    }
  ];

  const likedGemstones = [
    {
      id: 3,
      title: "Sunrise at Mount Fuji",
      author: "Yuki Tanaka",
      location: "Fujinomiya, Japan",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
      excerpt: "The spiritual journey to witness dawn break over Japan's sacred mountain.",
      sponsored: true,
      likes: 203
    },
    {
      id: 7,
      title: "Northern Lights in Lapland",
      author: "Astrid Lindqvist",
      location: "Rovaniemi, Finland",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
      excerpt: "Chasing the aurora borealis through the Arctic wilderness.",
      likes: 198
    }
  ];

  const savedGemstones = [
    {
      id: 5,
      title: "Sahara Desert Camping",
      author: "Ahmed Hassan",
      location: "Merzouga, Morocco",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      excerpt: "Sleeping under a blanket of stars with nothing but sand dunes for miles.",
      likes: 74
    }
  ];

  const handleGemstoneClick = (gemstone: any) => {
    setSelectedGemstone(gemstone);
    setIsGemstoneModalOpen(true);
  };

  const handleAuthorClick = (authorName: string) => {
    setSelectedAuthor(authorName);
    setIsAuthorModalOpen(true);
  };

  const handleSaveProfile = (updatedData: any) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
    setIsEditProfileOpen(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-wandora-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-white shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="text-2xl">{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="font-serif text-3xl font-bold text-wandora-charcoal">{userData.name}</h1>
                  <Sheet open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-wandora-terracotta text-wandora-terracotta hover:bg-wandora-terracotta hover:text-white"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                      <ProfileEditForm
                        userData={userData}
                        onSave={handleSaveProfile}
                        onCancel={() => setIsEditProfileOpen(false)}
                      />
                    </SheetContent>
                  </Sheet>
                </div>
                
                <p className="text-wandora-stone mb-4 max-w-2xl">{userData.bio}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-wandora-stone mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {userData.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {userData.joinDate}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="text-center">
                    <div className="font-semibold text-xl text-wandora-charcoal">{userData.stats.published}</div>
                    <div className="text-sm text-wandora-stone">Published</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-xl text-wandora-charcoal">{userData.stats.liked}</div>
                    <div className="text-sm text-wandora-stone">Liked</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-xl text-wandora-charcoal">{userData.stats.saved}</div>
                    <div className="text-sm text-wandora-stone">Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-xl text-wandora-charcoal">{userData.stats.followers}</div>
                    <div className="text-sm text-wandora-stone">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-xl text-wandora-charcoal">{userData.stats.following}</div>
                    <div className="text-sm text-wandora-stone">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white">
            <TabsTrigger value="published" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              Published ({userData.stats.published})
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Liked ({userData.stats.liked})
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <BookmarkIcon className="w-4 h-4" />
              Saved ({userData.stats.saved})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl font-semibold text-wandora-charcoal mb-2">
                Your Published Gemstones
              </h2>
              <p className="text-wandora-stone">
                Stories you've shared with the Wandora community
              </p>
            </div>
            
            {publishedGemstones.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publishedGemstones.map((gemstone, index) => (
                  <div 
                    key={gemstone.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <GemstoneCard 
                      {...gemstone} 
                      onCardClick={() => handleGemstoneClick(gemstone)}
                      onAuthorClick={() => handleAuthorClick(gemstone.author)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <PenTool className="w-16 h-16 text-wandora-stone mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-wandora-charcoal mb-2">
                  No published gemstones yet
                </h3>
                <p className="text-wandora-stone mb-6">
                  Share your first travel story with the community
                </p>
                <Button className="bg-wandora-terracotta hover:bg-wandora-terracotta/90">
                  Create Your First Gemstone
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="liked" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl font-semibold text-wandora-charcoal mb-2">
                Your Liked Gemstones
              </h2>
              <p className="text-wandora-stone">
                Stories that inspired and moved you
              </p>
            </div>
            
            {likedGemstones.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {likedGemstones.map((gemstone, index) => (
                  <div 
                    key={gemstone.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <GemstoneCard 
                      {...gemstone} 
                      onCardClick={() => handleGemstoneClick(gemstone)}
                      onAuthorClick={() => handleAuthorClick(gemstone.author)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-wandora-stone mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-wandora-charcoal mb-2">
                  No liked gemstones yet
                </h3>
                <p className="text-wandora-stone">
                  Start exploring and like stories that resonate with you
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl font-semibold text-wandora-charcoal mb-2">
                Your Saved Gemstones
              </h2>
              <p className="text-wandora-stone">
                Stories you want to revisit and remember
              </p>
            </div>
            
            {savedGemstones.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedGemstones.map((gemstone, index) => (
                  <div 
                    key={gemstone.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <GemstoneCard 
                      {...gemstone} 
                      onCardClick={() => handleGemstoneClick(gemstone)}
                      onAuthorClick={() => handleAuthorClick(gemstone.author)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookmarkIcon className="w-16 h-16 text-wandora-stone mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-wandora-charcoal mb-2">
                  No saved gemstones yet
                </h3>
                <p className="text-wandora-stone">
                  Save stories you want to read again or use for inspiration
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Modals */}
        {selectedGemstone && isGemstoneModalOpen && (
          <GemstoneDetailModal
            isOpen={isGemstoneModalOpen}
            onClose={() => {
              setIsGemstoneModalOpen(false);
              setSelectedGemstone(null);
            }}
            onAuthorClick={handleAuthorClick}
            gemstone={selectedGemstone}
          />
        )}
        
        {selectedAuthor && isAuthorModalOpen && (
          <AuthorProfileModal
            isOpen={isAuthorModalOpen}
            onClose={() => {
              setIsAuthorModalOpen(false);
              setSelectedAuthor("");
            }}
            authorName={selectedAuthor}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
