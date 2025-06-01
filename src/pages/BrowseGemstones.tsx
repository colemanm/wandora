import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Grid3X3 } from "lucide-react";
import GemstoneCard from "@/components/GemstoneCard";
import GemstoneMap from "@/components/GemstoneMap";
import GemstoneDetailModal from "@/components/GemstoneDetailModal";
import AuthorProfileModal from "@/components/AuthorProfileModal";

const BrowseGemstones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "map">("map");
  const [selectedGemstone, setSelectedGemstone] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [isGemstoneModalOpen, setIsGemstoneModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  const gemstones = [
    {
      id: 1,
      title: "Hidden Waterfalls of Iceland",
      author: "Emma Kowalski",
      location: "Reykjavik, Iceland",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      excerpt: "Discovering a secret waterfall that locals rarely share with tourists. After days of research and conversations with locals, I found myself standing before one of Iceland's most breathtaking hidden gems.",
      sponsored: true,
      likes: 127
    },
    {
      id: 2,
      title: "Street Art in Buenos Aires",
      author: "Carlos Rodriguez",
      location: "Buenos Aires, Argentina",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      excerpt: "The hidden murals that tell stories of a neighborhood's transformation. Walking through the winding streets of Palermo, each wall seemed to whisper tales of resilience and creativity.",
      likes: 89
    },
    {
      id: 3,
      title: "Sunrise at Mount Fuji",
      author: "Yuki Tanaka",
      location: "Fujinomiya, Japan",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
      excerpt: "The spiritual journey to witness dawn break over Japan's sacred mountain. At 4 AM, surrounded by pilgrims and photographers, I understood why this moment is considered sacred.",
      sponsored: true,
      likes: 203
    },
    {
      id: 4,
      title: "Night Markets of Taipei",
      author: "Lisa Chen",
      location: "Taipei, Taiwan",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop",
      excerpt: "Following the scent of xiaolongbao through narrow alleyways. The real magic of Taipei happens after sunset, when the city transforms into a food lover's paradise.",
      likes: 156
    },
    {
      id: 5,
      title: "Sahara Desert Camping",
      author: "Ahmed Hassan",
      location: "Merzouga, Morocco",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      excerpt: "Sleeping under a blanket of stars with nothing but sand dunes for miles. The silence of the Sahara is unlike anything I've ever experienced - it's profound and transformative.",
      likes: 74
    },
    {
      id: 6,
      title: "Floating Markets of Bangkok",
      author: "Siriporn Wannakul",
      location: "Bangkok, Thailand",
      image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800&h=600&fit=crop",
      excerpt: "Navigating the colorful chaos of Thailand's most authentic floating market. Away from tourist crowds, vendors sell fresh fruits and handmade goods from their wooden boats.",
      likes: 112
    }
  ];

  const filteredGemstones = gemstones.filter(
    (gemstone) =>
      gemstone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gemstone.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gemstone.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGemstoneClick = (gemstone: any) => {
    console.log("Gemstone clicked:", gemstone);
    setSelectedGemstone(gemstone);
    setIsGemstoneModalOpen(true);
  };

  const handleAuthorClick = (authorName: string) => {
    console.log("Author clicked:", authorName);
    setSelectedAuthor(authorName);
    setIsAuthorModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-wandora-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-wandora-charcoal mb-6">
            Browse Travel Gemstones
          </h1>
          <p className="text-lg text-wandora-stone max-w-2xl mx-auto">
            Explore authentic travel stories from around the world. Find your next adventure or discover hidden gems in places you've already been.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 animate-slide-up">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wandora-stone w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by location, title, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-wandora-sand focus:border-wandora-terracotta"
            />
          </div>
        </div>

        {/* Map View */}
        <div className="mb-8 animate-fade-in">
          <GemstoneMap />
        </div>

        {/* Toggle Button and Results */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-wandora-stone">
            Showing {filteredGemstones.length} of {gemstones.length} gemstones
          </p>
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === "map" ? "grid" : "map")}
            className="border-wandora-terracotta text-wandora-terracotta hover:bg-wandora-terracotta hover:text-white"
          >
            {viewMode === "map" ? (
              <>
                <Grid3X3 className="w-4 h-4 mr-2" />
                View as Grid
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </>
            )}
          </Button>
        </div>

        {/* Grid View (when toggled) */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGemstones.map((gemstone, index) => (
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
        )}

        {filteredGemstones.length === 0 && viewMode === "grid" && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-wandora-stone mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-wandora-charcoal mb-4">
              No gemstones found
            </h3>
            <p className="text-wandora-stone">
              Try adjusting your search terms or browse all available stories.
            </p>
          </div>
        )}
      </div>

      {/* Modals - Only render when we have valid data */}
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

export default BrowseGemstones;
