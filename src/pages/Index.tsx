import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Search, User, MapPin } from "lucide-react";
import GemstoneDetailModal from "@/components/GemstoneDetailModal";
import AuthorProfileModal from "@/components/AuthorProfileModal";

const Index = () => {
  const [selectedGemstone, setSelectedGemstone] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [isGemstoneModalOpen, setIsGemstoneModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  const handleAuthorClick = (authorName: string) => {
    setSelectedAuthor(authorName);
    setIsAuthorModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1920&h=1080&fit=crop&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Discover Travel
            <span className="block text-purple-400">Gemstones</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Uncover authentic travel stories from hidden corners of the world. 
            Share your own adventures and inspire wanderers everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Explore Gemstones
              </Button>
            </Link>
            <Link to="/share">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 text-lg">
                <User className="w-5 h-5 mr-2" />
                Share Your Story
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Wandora Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our community of storytellers and discover the world through authentic experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                Discover
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse authentic travel stories organized by location. Find hidden gems and unique experiences shared by fellow adventurers.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                Share
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tell your own travel story. Share that magical moment, hidden spot, or cultural encounter that made your journey unforgettable.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                Inspire
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Help others plan their adventures. Your gemstone might be the spark that ignites someone's next great journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Share Your Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Every journey has a story worth telling. Share your travel gemstone and become part of our global community of explorers.
          </p>
          <Link to="/share">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Start Sharing Your Story
            </Button>
          </Link>
        </div>
      </section>

      {/* Modals */}
      {selectedGemstone && (
        <GemstoneDetailModal
          isOpen={isGemstoneModalOpen}
          onClose={() => setIsGemstoneModalOpen(false)}
          onAuthorClick={handleAuthorClick}
          gemstone={selectedGemstone}
        />
      )}
      
      <AuthorProfileModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
        authorName={selectedAuthor}
      />
    </div>
  );
};

export default Index;
