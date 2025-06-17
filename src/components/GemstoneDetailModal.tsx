
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import GemstoneImageCarousel from "./GemstoneImageCarousel";
import GemstoneDetailsPanel from "./GemstoneDetailsPanel";
import GemstoneFullStory from "./GemstoneFullStory";

interface GemstoneDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthorClick: (author: string) => void;
  gemstone: {
    id: number;
    title: string;
    author: string;
    location: string;
    image: string;
    excerpt: string;
    likes: number;
    sponsored?: boolean;
  };
}

const GemstoneDetailModal = ({ isOpen, onClose, onAuthorClick, gemstone }: GemstoneDetailModalProps) => {
  const scrollToFullStory = () => {
    const fullStoryElement = document.getElementById('full-story-section');
    if (fullStoryElement) {
      fullStoryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 z-50 w-screen h-screen max-w-none max-h-none p-0 m-0 bg-white border-none overflow-hidden">
        {/* Full screen layout similar to Amazon */}
        <div className="flex flex-col h-full relative">
          {/* Close button - positioned absolutely */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white shadow-md rounded-full w-10 h-10"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-40 flex-shrink-0">
            <DialogTitle className="text-2xl font-serif text-wandora-charcoal pr-16">
              {gemstone.title}
            </DialogTitle>
          </div>

          {/* Main content area - scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid lg:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
              {/* Left side - Images */}
              <GemstoneImageCarousel 
                title={gemstone.title}
                image={gemstone.image}
                sponsored={gemstone.sponsored}
              />

              {/* Right side - Details */}
              <GemstoneDetailsPanel 
                gemstone={gemstone}
                onAuthorClick={onAuthorClick}
                scrollToFullStory={scrollToFullStory}
              />
            </div>

            {/* Full story section */}
            <GemstoneFullStory excerpt={gemstone.excerpt} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GemstoneDetailModal;
