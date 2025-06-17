
import { Search } from "lucide-react";

const NoResults = () => {
  return (
    <div className="text-center py-16">
      <Search className="w-16 h-16 text-wandora-stone mx-auto mb-4" />
      <h3 className="font-serif text-2xl font-semibold text-wandora-charcoal mb-4">
        No gemstones found
      </h3>
      <p className="text-wandora-stone">
        Try adjusting your search terms or browse all available stories.
      </p>
    </div>
  );
};

export default NoResults;
