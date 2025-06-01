
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, BookmarkIcon, PenTool, MapPin, Calendar, Users, Edit2, Crown, User, Star } from "lucide-react";
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
    isFounder: true,
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-32 h-32 shadow-lg">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-wandora-primary to-wandora-secondary text-white">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <h1 className="font-serif text-4xl font-bold text-gray-900 flex items-center gap-3">
                        <User className="w-8 h-8 text-wandora-primary" />
                        {userData.name}
                      </h1>
                      {userData.isFounder && (
                        <Badge 
                          className="bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 font-semibold px-3 py-1 text-sm shadow-md hover:shadow-lg transition-shadow"
                        >
                          <Crown className="w-4 h-4 mr-1" />
                          Founder
                        </Badge>
                      )}
                    </div>
                    <Sheet open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-2 border-wandora-primary text-wandora-primary hover:bg-wandora-primary hover:text-white transition-colors"
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
                  
                  <p className="text-gray-600 mb-6 max-w-2xl text-lg leading-relaxed">{userData.bio}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">{userData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Joined {userData.joinDate}</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{userData.stats.published}</div>
                      <div className="text-sm text-gray-600 font-medium">Published</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{userData.stats.liked}</div>
                      <div className="text-sm text-gray-600 font-medium">Liked</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{userData.stats.saved}</div>
                      <div className="text-sm text-gray-600 font-medium">Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{userData.stats.followers}</div>
                      <div className="text-sm text-gray-600 font-medium">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{userData.stats.following}</div>
                      <div className="text-sm text-gray-600 font-medium">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="published" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 p-2 rounded-lg shadow-sm">
              <TabsTrigger value="published" className="flex items-center gap-2 text-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <PenTool className="w-5 h-5" />
                Published ({userData.stats.published})
              </TabsTrigger>
              <TabsTrigger value="liked" className="flex items-center gap-2 text-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Heart className="w-5 h-5" />
                Liked ({userData.stats.liked})
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2 text-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <BookmarkIcon className="w-5 h-5" />
                Saved ({userData.stats.saved})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="published" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                  <PenTool className="w-8 h-8 text-wandora-primary" />
                  Your Published Gemstones
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                <Card className="bg-gray-50 border-0 shadow-lg">
                  <CardContent className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-wandora-primary to-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <PenTool className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                      No published gemstones yet
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      Share your first travel story with the community
                    </p>
                    <Button className="bg-wandora-primary hover:bg-wandora-primary/90 text-white px-8 py-3 text-lg">
                      Create Your First Gemstone
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="liked" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                  <Heart className="w-8 h-8 text-wandora-primary" />
                  Your Liked Gemstones
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                <Card className="bg-gray-50 border-0 shadow-lg">
                  <CardContent className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-wandora-primary to-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                      No liked gemstones yet
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      Start exploring and like stories that resonate with you
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="saved" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                  <BookmarkIcon className="w-8 h-8 text-wandora-primary" />
                  Your Saved Gemstones
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                <Card className="bg-gray-50 border-0 shadow-lg">
                  <CardContent className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-wandora-primary to-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookmarkIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                      No saved gemstones yet
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      Save stories you want to read again or use for inspiration
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

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
  );
};

export default Profile;
