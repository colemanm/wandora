
import GemstoneCard from "@/components/GemstoneCard";
import { Gemstone } from "@/data/GemstoneData";

interface GemstoneGridProps {
  gemstones: Gemstone[];
  onGemstoneClick: (gemstone: Gemstone) => void;
  onAuthorClick: (authorName: string) => void;
}

const GemstoneGrid = ({ gemstones, onGemstoneClick, onAuthorClick }: GemstoneGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {gemstones.map((gemstone, index) => (
        <div 
          key={gemstone.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <GemstoneCard 
            {...gemstone} 
            onCardClick={() => onGemstoneClick(gemstone)}
            onAuthorClick={() => onAuthorClick(gemstone.author)}
          />
        </div>
      ))}
    </div>
  );
};

export default GemstoneGrid;
