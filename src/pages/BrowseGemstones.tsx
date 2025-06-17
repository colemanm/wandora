
import { useState } from "react";
import GemstoneMap from "@/components/GemstoneMap";
import GemstoneDetailModal from "@/components/GemstoneDetailModal";
import AuthorProfileModal from "@/components/AuthorProfileModal";
import SearchAndFilters from "@/components/SearchAndFilters";
import GemstoneStats from "@/components/GemstoneStats";
import GemstoneGrid from "@/components/GemstoneGrid";
import NoResults from "@/components/NoResults";
import { gemstones, Gemstone } from "@/data/GemstoneData";

const BrowseGemstones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedGemstone, setSelectedGemstone] = useState<Gemstone | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [isGemstoneModalOpen, setIsGemstoneModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  const filteredGemstones = gemstones.filter(
    (gemstone) =>
      gemstone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gemstone.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gemstone.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGemstoneClick = (gemstone: Gemstone) => {
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
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Results */}
        <GemstoneStats
          filteredCount={filteredGemstones.length}
          totalCount={gemstones.length}
        />

        {/* Content based on view mode */}
        {viewMode === "grid" ? (
          <>
            {filteredGemstones.length > 0 ? (
              <GemstoneGrid
                gemstones={filteredGemstones}
                onGemstoneClick={handleGemstoneClick}
                onAuthorClick={handleAuthorClick}
              />
            ) : (
              <NoResults />
            )}
          </>
        ) : (
          <div className="animate-fade-in">
            <GemstoneMap />
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
