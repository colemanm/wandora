
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
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop",
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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
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
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
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
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      excerpt: "Diving into crystal-clear underground caves that the Maya considered sacred. Swimming through these limestone cathedrals felt like entering another world.",
      sponsored: true,
      likes: 221
    },
    {
      id: 13,
      title: "Fjords of Norway",
      author: "Erik Hansen",
      location: "Geiranger, Norway",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
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
    },
    {
      id: 16,
      title: "Underground London Book Tunnels",
      author: "Oliver Winchester",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      excerpt: "Exploring the secret network of tunnels beneath famous London bookshops. These hidden literary passages connect independent stores and host clandestine poetry readings.",
      likes: 145
    },
    {
      id: 17,
      title: "Parisian Rooftop Beekeeping",
      author: "Margot Leroy",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
      excerpt: "Learning urban beekeeping on the rooftops of Montmartre. High above the bustling streets, beekeepers tend to hives that produce some of the city's finest honey.",
      sponsored: true,
      likes: 178
    },
    {
      id: 18,
      title: "NYC Abandoned Subway Exploration",
      author: "Marcus Rodriguez",
      location: "New York City, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      excerpt: "Guided tours through forgotten subway stations and abandoned train tracks. Beneath the city that never sleeps lies a fascinating world frozen in time.",
      likes: 203
    },
    {
      id: 19,
      title: "Tokyo Manhole Cover Art Hunt",
      author: "Kenji Matsumoto",
      location: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      excerpt: "Discovering the intricate art hidden beneath Tokyo's streets. Each ward has unique manhole covers featuring local landmarks, flowers, and cultural symbols.",
      likes: 167
    },
    {
      id: 20,
      title: "Roman Catacombs Photography",
      author: "Giuseppe Fontana",
      location: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
      excerpt: "Capturing the haunting beauty of Rome's underground burial chambers. These ancient catacombs tell stories of early Christianity through carved symbols and frescoes.",
      sponsored: true,
      likes: 189
    },
    {
      id: 21,
      title: "Barcelona's Secret Modernist Buildings",
      author: "Carmen Vidal",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
      excerpt: "Beyond Gaudí lies a treasure trove of hidden modernist architecture. Private courtyards and lesser-known buildings reveal the movement's true diversity.",
      likes: 156
    },
    {
      id: 22,
      title: "Amsterdam Canal House Concerts",
      author: "Pieter Van Der Berg",
      location: "Amsterdam, Netherlands",
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
      excerpt: "Intimate classical concerts in historic canal house living rooms. Local musicians open their 17th-century homes for magical evening performances.",
      likes: 134
    },
    {
      id: 23,
      title: "Dubai Desert Falconry Experience",
      author: "Fatima Al-Rashid",
      location: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&h=600&fit=crop",
      excerpt: "Learning the ancient art of falconry in the Arabian desert. Working with Bedouin trainers and their magnificent birds connects you to centuries of tradition.",
      sponsored: true,
      likes: 198
    },
    {
      id: 24,
      title: "Singapore Urban Foraging Tour",
      author: "Wei Lin Tan",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
      excerpt: "Discovering edible plants in Singapore's urban landscape. Expert guides reveal how to find wild herbs and fruits growing in the city's green spaces.",
      likes: 142
    },
    {
      id: 25,
      title: "Sydney Harbour Bridge Climbing",
      author: "Jack Morrison",
      location: "Sydney, Australia",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      excerpt: "Scaling the iconic Harbour Bridge at dawn for sunrise views. The guided climb offers unparalleled perspectives of the Opera House and sparkling harbour below.",
      likes: 223
    },
    {
      id: 26,
      title: "Rio's Favela Street Art Workshop",
      author: "Bruno Santos",
      location: "Rio de Janeiro, Brazil",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      excerpt: "Creating murals with local artists in Rio's hillside communities. These workshops showcase how street art transforms neighborhoods and builds cultural bridges.",
      likes: 187
    },
    {
      id: 27,
      title: "Moscow Metro Architecture Tours",
      author: "Anastasia Volkov",
      location: "Moscow, Russia",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      excerpt: "Exploring Moscow's palatial underground stations with art historians. Each metro stop is a museum showcasing Soviet-era mosaics, sculptures, and chandeliers.",
      sponsored: true,
      likes: 165
    },
    {
      id: 28,
      title: "Istanbul's Underground Cistern Concert",
      author: "Elif Demir",
      location: "Istanbul, Turkey",
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop",
      excerpt: "Attending a classical music concert in the 6th-century Basilica Cistern. The acoustics of this ancient underground chamber create an otherworldly musical experience.",
      likes: 156
    },
    {
      id: 29,
      title: "Kyoto Temple Meditation Retreat",
      author: "Hiroshi Yamamoto",
      location: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
      excerpt: "Three days of silent meditation with Buddhist monks in a 1,200-year-old temple. The pre-dawn ceremonies and mindful tea preparation taught me about inner peace.",
      sponsored: true,
      likes: 198
    },
    {
      id: 30,
      title: "Vegas Underground Tunnel Art Tour",
      author: "Sarah Mitchell",
      location: "Las Vegas, USA",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      excerpt: "Discovering hidden murals in the flood tunnels beneath the Strip. These underground galleries showcase the raw creativity of Vegas' alternative art scene.",
      likes: 143
    },
    {
      id: 31,
      title: "Edinburgh Underground Ghost Tours",
      author: "Fiona MacLeod",
      location: "Edinburgh, Scotland",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop",
      excerpt: "Exploring the Real Mary King's Close and other buried streets beneath the Royal Mile. These 16th-century underground chambers tell haunting tales of medieval life.",
      likes: 167
    },
    {
      id: 32,
      title: "Marrakech Rooftop Yoga at Sunrise",
      author: "Yasmin Benjelloun",
      location: "Marrakech, Morocco",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      excerpt: "Practicing yoga on traditional riads' rooftops as the medina awakens below. The call to prayer mingles with morning stretches in this magical experience.",
      likes: 189
    },
    {
      id: 33,
      title: "Stockholm Archipelago Ice Swimming",
      author: "Astrid Eriksson",
      location: "Stockholm, Sweden",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      excerpt: "Joining locals for winter ice swimming followed by sauna sessions. This centuries-old Nordic tradition connects you deeply with nature's harsh beauty.",
      sponsored: true,
      likes: 134
    },
    {
      id: 34,
      title: "Cape Town Wine Cave Tastings",
      author: "Thabo Mthembu",
      location: "Cape Town, South Africa",
      image: "https://images.unsplash.com/photo-1510138150817-b86624fc8c44?w=800&h=600&fit=crop",
      excerpt: "Descending into 18th-century wine cellars carved into Table Mountain's granite. These underground tastings pair exceptional wines with fascinating geological history.",
      likes: 176
    },
    {
      id: 35,
      title: "Mumbai Dabbawalas Shadow Experience",
      author: "Priya Sharma",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800&h=600&fit=crop",
      excerpt: "Following the legendary lunch delivery system through Mumbai's chaotic streets. This 125-year-old network achieves 99.99% accuracy without modern technology.",
      likes: 203
    },
    {
      id: 36,
      title: "Bangkok Temple Cat Meditation",
      author: "Siriporn Chaiyawat",
      location: "Bangkok, Thailand",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      excerpt: "Meditating alongside temple cats in ancient Buddhist monasteries. These sacred felines are believed to bring good luck and add unexpected zen to spiritual practice.",
      likes: 156
    },
    {
      id: 37,
      title: "Melbourne Lane Graffiti Walking Tour",
      author: "Jackson Clarke",
      location: "Melbourne, Australia",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      excerpt: "Exploring Melbourne's famous laneways with the artists who created them. These narrow alleys showcase some of the world's most vibrant and ever-changing street art.",
      sponsored: true,
      likes: 189
    },
    {
      id: 38,
      title: "Vienna Classical Music in Sewers",
      author: "Klaus Weber",
      location: "Vienna, Austria",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      excerpt: "Attending underground concerts in Vienna's 19th-century sewer system. The acoustics of these vaulted tunnels create a unique venue for classical performances.",
      likes: 145
    },
    {
      id: 39,
      title: "Havana Classic Car Mechanic Workshop",
      author: "Carlos Mendez",
      location: "Havana, Cuba",
      image: "https://images.unsplash.com/photo-1571406252791-db278046499f?w=800&h=600&fit=crop",
      excerpt: "Learning to maintain 1950s American cars with Cuban mechanics. These vintage beauties are kept running through incredible ingenuity and resourcefulness.",
      likes: 167
    },
    // 12 new gemstones from popular places with niche activities
    {
      id: 40,
      title: "Underground London Book Tunnels",
      author: "Oliver Winchester",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      excerpt: "Exploring the secret network of tunnels beneath famous London bookshops. These hidden literary passages connect independent stores and host clandestine poetry readings.",
      likes: 145
    },
    {
      id: 41,
      title: "Parisian Rooftop Beekeeping",
      author: "Margot Leroy",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
      excerpt: "Learning urban beekeeping on the rooftops of Montmartre. High above the bustling streets, beekeepers tend to hives that produce some of the city's finest honey.",
      sponsored: true,
      likes: 178
    },
    {
      id: 42,
      title: "NYC Abandoned Subway Exploration",
      author: "Marcus Rodriguez",
      location: "New York City, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      excerpt: "Guided tours through forgotten subway stations and abandoned train tracks. Beneath the city that never sleeps lies a fascinating world frozen in time.",
      likes: 203
    },
    {
      id: 43,
      title: "Tokyo Manhole Cover Art Hunt",
      author: "Kenji Matsumoto",
      location: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      excerpt: "Discovering the intricate art hidden beneath Tokyo's streets. Each ward has unique manhole covers featuring local landmarks, flowers, and cultural symbols.",
      likes: 167
    },
    {
      id: 44,
      title: "Roman Catacombs Photography",
      author: "Giuseppe Fontana",
      location: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
      excerpt: "Capturing the haunting beauty of Rome's underground burial chambers. These ancient catacombs tell stories of early Christianity through carved symbols and frescoes.",
      sponsored: true,
      likes: 189
    },
    {
      id: 45,
      title: "Barcelona's Secret Modernist Buildings",
      author: "Carmen Vidal",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1562441969-c00c5ac5f79a?w=800&h=600&fit=crop",
      excerpt: "Beyond Gaudí lies a treasure trove of hidden modernist architecture. Private courtyards and lesser-known buildings reveal the movement's true diversity.",
      likes: 156
    },
    {
      id: 46,
      title: "Amsterdam Canal House Concerts",
      author: "Pieter Van Der Berg",
      location: "Amsterdam, Netherlands",
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
      excerpt: "Intimate classical concerts in historic canal house living rooms. Local musicians open their 17th-century homes for magical evening performances.",
      likes: 134
    },
    {
      id: 47,
      title: "Dubai Desert Falconry Experience",
      author: "Fatima Al-Rashid",
      location: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&h=600&fit=crop",
      excerpt: "Learning the ancient art of falconry in the Arabian desert. Working with Bedouin trainers and their magnificent birds connects you to centuries of tradition.",
      sponsored: true,
      likes: 198
    },
    {
      id: 48,
      title: "Singapore Urban Foraging Tour",
      author: "Wei Lin Tan",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
      excerpt: "Discovering edible plants in Singapore's urban landscape. Expert guides reveal how to find wild herbs and fruits growing in the city's green spaces.",
      likes: 142
    },
    {
      id: 49,
      title: "Sydney Harbour Bridge Climbing",
      author: "Jack Morrison",
      location: "Sydney, Australia",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      excerpt: "Scaling the iconic Harbour Bridge at dawn for sunrise views. The guided climb offers unparalleled perspectives of the Opera House and sparkling harbour below.",
      likes: 223
    },
    {
      id: 50,
      title: "Las Vegas Magic Underground",
      author: "David Chen",
      location: "Las Vegas, USA",
      image: "https://images.unsplash.com/photo-1551448429-79c019eed126?w=800&h=600&fit=crop",
      excerpt: "Secret magic societies meet in hidden venues beneath the Strip. Learn close-up magic from masters who perform for private audiences in underground speakeasies.",
      likes: 178
    },
    {
      id: 51,
      title: "Miami Art Deco Ghost Tours",
      author: "Isabella Martinez",
      location: "Miami, USA",
      image: "https://images.unsplash.com/photo-1462723346497-56fd3f6872df?w=800&h=600&fit=crop",
      excerpt: "Exploring the haunted history of South Beach's iconic Art Deco district. These late-night tours reveal the ghostly tales behind the pastel facades.",
      sponsored: true,
      likes: 134
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
