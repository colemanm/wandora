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
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
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
    },
    {
      id: 7,
      title: "Northern Lights in Lapland",
      author: "Astrid Lindqvist",
      location: "Rovaniemi, Finland",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
      excerpt: "Chasing the aurora borealis through the Arctic wilderness. Standing in -30°C temperatures, watching the sky dance in emerald greens and cosmic purples was absolutely magical.",
      likes: 198
    },
    {
      id: 8,
      title: "Ancient Temples of Bagan",
      author: "Min Thu",
      location: "Bagan, Myanmar",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      excerpt: "Hot air ballooning over 2,000 temples at sunrise. The ancient city spread below like a forgotten dream, with golden pagodas emerging from morning mist.",
      sponsored: true,
      likes: 167
    },
    {
      id: 9,
      title: "Coffee Plantations of Colombia",
      author: "Sofia Guerrero",
      location: "Salento, Colombia",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop",
      excerpt: "Learning the art of coffee making from third-generation farmers. Every bean tells a story of tradition, passion, and the perfect mountain climate.",
      likes: 143
    },
    {
      id: 10,
      title: "Himalayan Monastery Trek",
      author: "Tenzin Norbu",
      location: "Ladakh, India",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      excerpt: "A three-day journey to reach a monastery perched impossibly high in the mountains. The monks' morning prayers echoing across the valleys was pure transcendence.",
      likes: 185
    },
    {
      id: 11,
      title: "Maasai Village Experience",
      author: "Joseph Kimani",
      location: "Maasai Mara, Kenya",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
      excerpt: "Living with the Maasai people for a week, learning their traditions and wisdom. The connection to nature and community here is something the modern world has forgotten.",
      likes: 134
    },
    {
      id: 12,
      title: "Underground Cenotes of Yucatan",
      author: "Maria Gonzalez",
      location: "Tulum, Mexico",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
      excerpt: "Diving into crystal-clear underground caves that the Maya considered sacred. Swimming through these limestone cathedrals felt like entering another world.",
      sponsored: true,
      likes: 221
    },
    {
      id: 13,
      title: "Fjords of Norway",
      author: "Erik Hansen",
      location: "Geiranger, Norway",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      excerpt: "Kayaking through mirror-like waters surrounded by towering waterfalls. The silence was so complete you could hear your own heartbeat echoing off the cliff walls.",
      likes: 176
    },
    {
      id: 14,
      title: "Lavender Fields of Provence",
      author: "Claire Dubois",
      location: "Valensole, France",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
      excerpt: "Cycling through endless purple fields during peak bloom season. The intoxicating scent and the gentle hum of bees created a sensory experience I'll never forget.",
      likes: 156
    },
    {
      id: 15,
      title: "Great Wall Sunrise Hike",
      author: "Li Wei",
      location: "Jinshanling, China",
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop",
      excerpt: "Hiking a remote section of the Great Wall before dawn to catch the sunrise. Having this ancient wonder almost entirely to ourselves was an indescribable privilege.",
      likes: 192
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
            <div className="flex gap-2 items-center">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className={`flex items-center justify-center ${viewMode === "grid" ? "bg-wandora-terracotta hover:bg-wandora-terracotta/90" : "border-wandora-terracotta text-wandora-terracotta hover:bg-wandora-terracotta hover:text-white"}`}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid View
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                onClick={() => setViewMode("map")}
                className={`flex items-center justify-center ${viewMode === "map" ? "bg-wandora-terracotta hover:bg-wandora-terracotta/90" : "border-wandora-terracotta text-wandora-terracotta hover:bg-wandora-terracotta hover:text-white"}`}
              >
                <MapPin className="w-4 h-4 mr-2" />
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

        {/* Content based on view mode */}
        {viewMode === "grid" ? (
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
        ) : (
          <div className="animate-fade-in">
            <GemstoneMap />
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
