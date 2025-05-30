
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map } from "lucide-react";
import GemstoneCard from "@/components/GemstoneCard";

const BrowseGemstones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const gemstones = [
    {
      id: 1,
      title: "Hidden Waterfalls of Iceland",
      author: "Emma Kowalski",
      location: "Reykjavik, Iceland",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      excerpt: "Discovering a secret waterfall that locals rarely share with tourists. After days of research and conversations with locals, I found myself standing before one of Iceland's most breathtaking hidden gems."
    },
    {
      id: 2,
      title: "Street Art in Buenos Aires",
      author: "Carlos Rodriguez",
      location: "Buenos Aires, Argentina",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      excerpt: "The hidden murals that tell stories of a neighborhood's transformation. Walking through the winding streets of Palermo, each wall seemed to whisper tales of resilience and creativity."
    },
    {
      id: 3,
      title: "Sunrise at Mount Fuji",
      author: "Yuki Tanaka",
      location: "Fujinomiya, Japan",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
      excerpt: "The spiritual journey to witness dawn break over Japan's sacred mountain. At 4 AM, surrounded by pilgrims and photographers, I understood why this moment is considered sacred."
    },
    {
      id: 4,
      title: "Night Markets of Taipei",
      author: "Lisa Chen",
      location: "Taipei, Taiwan",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop",
      excerpt: "Following the scent of xiaolongbao through narrow alleyways. The real magic of Taipei happens after sunset, when the city transforms into a food lover's paradise."
    },
    {
      id: 5,
      title: "Sahara Desert Camping",
      author: "Ahmed Hassan",
      location: "Merzouga, Morocco",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      excerpt: "Sleeping under a blanket of stars with nothing but sand dunes for miles. The silence of the Sahara is unlike anything I've ever experienced - it's profound and transformative."
    },
    {
      id: 6,
      title: "Floating Markets of Bangkok",
      author: "Siriporn Wannakul",
      location: "Bangkok, Thailand",
      image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800&h=600&fit=crop",
      excerpt: "Navigating the colorful chaos of Thailand's most authentic floating market. Away from tourist crowds, vendors sell fresh fruits and handmade goods from their wooden boats."
    }
  ];

  const filteredGemstones = gemstones.filter(
    (gemstone) =>
      gemstone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gemstone.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gemstone.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wandora-stone w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by location, title, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg border-wandora-sand focus:border-wandora-terracotta"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-wandora-terracotta hover:bg-wandora-terracotta/90" : "border-wandora-terracotta text-wandora-terracotta hover:bg-wandora-terracotta hover:text-white"}
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                onClick={() => setViewMode("map")}
                className={viewMode === "map" ? "bg-wandora-terracotta hover:bg-wandora-terracotta/90" : "border-wandora-terracotta text-wandora-terracotta hover:bg-wandora-terracotta hover:text-white"}
              >
                <Map className="w-4 h-4 mr-2" />
                Map View
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-wandora-stone">
            Showing {filteredGemstones.length} of {gemstones.length} gemstones
          </p>
        </div>

        {/* Gemstones Grid */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGemstones.map((gemstone, index) => (
              <div 
                key={gemstone.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <GemstoneCard {...gemstone} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Map className="w-16 h-16 text-wandora-stone mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-wandora-charcoal mb-4">
              Interactive Map Coming Soon
            </h3>
            <p className="text-wandora-stone max-w-md mx-auto">
              We're working on an interactive map to help you explore gemstones by location. For now, enjoy browsing through our grid view!
            </p>
            <Button
              onClick={() => setViewMode("grid")}
              className="mt-6 bg-wandora-terracotta hover:bg-wandora-terracotta/90"
            >
              Switch to Grid View
            </Button>
          </div>
        )}

        {filteredGemstones.length === 0 && (
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
    </div>
  );
};

export default BrowseGemstones;
