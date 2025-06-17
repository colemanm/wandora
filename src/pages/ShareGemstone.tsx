
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";

const ShareGemstone = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    author: "",
    email: "",
    story: "",
    tips: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Image file:', imageFile);
    toast({
      title: "Thank you for creating!",
      description: "Your travel gemstone has been created and will be reviewed by our team.",
    });
    setFormData({
      title: "",
      location: "",
      author: "",
      email: "",
      story: "",
      tips: "",
    });
    setImageFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  return (
    <div className="min-h-screen bg-wandora-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-wandora-charcoal mb-6">
            Create Your Travel Gemstone
          </h1>
          <p className="text-lg text-wandora-stone max-w-2xl mx-auto">
            Every journey has a story worth telling. Create your unique travel experience and inspire fellow wanderers around the world.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm animate-slide-up">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-wandora-charcoal">
                  Tell Your Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="border-wandora-sand focus:border-wandora-terracotta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-wandora-charcoal mb-2">
                      Photo
                    </label>
                    <ImageUpload onImageChange={handleImageChange} />
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-wandora-charcoal">
                  What Makes a Great Gemstone?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-wandora-terracotta mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-wandora-charcoal">Authentic</h4>
                    <p className="text-sm text-wandora-stone">Share your genuine, personal experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Map className="w-5 h-5 text-wandora-terracotta mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-wandora-charcoal">Specific</h4>
                    <p className="text-sm text-wandora-stone">Include specific details about the location</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Upload className="w-5 h-5 text-wandora-terracotta mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-wandora-charcoal">Visual</h4>
                    <p className="text-sm text-wandora-stone">A compelling photo helps tell your story</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-wandora-terracotta to-wandora-sage text-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-3">
                  Join Our Community
                </h3>
                <p className="text-white/90 mb-4">
                  Your story becomes part of a global tapestry of travel experiences, inspiring others to explore and discover.
                </p>
                <p className="text-sm text-white/80">
                  All submissions are reviewed by our team to ensure quality and authenticity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareGemstone;
