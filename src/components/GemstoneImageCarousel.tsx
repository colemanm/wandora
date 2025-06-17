
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface GemstoneImageCarouselProps {
  title: string;
  image: string;
  sponsored?: boolean;
}

const GemstoneImageCarousel = ({ title, image, sponsored }: GemstoneImageCarouselProps) => {
  // Mock additional photos for carousel
  const additionalPhotos = [
    image,
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop"
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {additionalPhotos.map((photo, index) => (
              <CarouselItem key={index}>
                <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                  <img 
                    src={photo} 
                    alt={`${title} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        {sponsored && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold py-2 px-4 rounded-full">
            ✨ Sponsored Gemstone
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="flex space-x-2 overflow-x-auto">
        {additionalPhotos.map((photo, index) => (
          <div key={index} className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 border-gray-200">
            <img 
              src={photo} 
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GemstoneImageCarousel;
