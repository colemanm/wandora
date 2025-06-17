
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";

interface GemstoneFormProps {
  formData: {
    title: string;
    location: string;
    author: string;
    email: string;
    story: string;
    tips: string;
  };
  imageFile: File | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (file: File | null) => void;
}

const GemstoneForm = ({ formData, imageFile, onSubmit, onChange, onImageChange }: GemstoneFormProps) => {
  return (
    <Card className="bg-white shadow-sm animate-slide-up">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-wandora-charcoal">
          Tell Your Story
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-wandora-charcoal mb-2">
                Gemstone Title *
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={onChange}
                placeholder="e.g., Hidden Beach in Santorini"
                className="border-wandora-sand focus:border-wandora-terracotta"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-wandora-charcoal mb-2">
                Location *
              </label>
              <Input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={onChange}
                placeholder="e.g., Santorini, Greece"
                className="border-wandora-sand focus:border-wandora-terracotta"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-wandora-charcoal mb-2">
                Your Name *
              </label>
              <Input
                id="author"
                name="author"
                type="text"
                required
                value={formData.author}
                onChange={onChange}
                placeholder="Your full name"
                className="border-wandora-sand focus:border-wandora-terracotta"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-wandora-charcoal mb-2">
                Email Address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={onChange}
                placeholder="your@email.com"
                className="border-wandora-sand focus:border-wandora-terracotta"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-wandora-charcoal mb-2">
              Photo
            </label>
            <ImageUpload onImageChange={onImageChange} />
            <p className="text-sm text-wandora-stone mt-1">
              Share a photo that captures the essence of your experience
            </p>
          </div>

          <div>
            <label htmlFor="story" className="block text-sm font-medium text-wandora-charcoal mb-2">
              Your Story *
            </label>
            <Textarea
              id="story"
              name="story"
              required
              value={formData.story}
              onChange={onChange}
              placeholder="Tell us about your experience. What made this moment special? How did you discover this place? What emotions did you feel?"
              rows={6}
              className="border-wandora-sand focus:border-wandora-terracotta resize-none"
            />
          </div>

          <div>
            <label htmlFor="tips" className="block text-sm font-medium text-wandora-charcoal mb-2">
              Travel Tips (Optional)
            </label>
            <Textarea
              id="tips"
              name="tips"
              value={formData.tips}
              onChange={onChange}
              placeholder="Share any practical tips for fellow travelers who might want to visit this place"
              rows={3}
              className="border-wandora-sand focus:border-wandora-terracotta resize-none"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-wandora-terracotta hover:bg-wandora-terracotta/90 text-white py-3 text-lg"
          >
            Create Your Gemstone
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GemstoneForm;
