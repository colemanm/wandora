
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Grid3X3 } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: "grid" | "map";
  setViewMode: (mode: "grid" | "map") => void;
}

const SearchAndFilters = ({ searchTerm, setSearchTerm, viewMode, setViewMode }: SearchAndFiltersProps) => {
  return (
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
  );
};

export default SearchAndFilters;
