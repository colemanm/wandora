
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";
import { toast } from "sonner";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatYouLike: "",
    improvements: "",
    newFeatures: "",
    rating: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setIsSubmitted(true);
    toast.success("Thanks for helping us improve Wandora!");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        whatYouLike: "",
        improvements: "",
        newFeatures: "",
        rating: ""
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-wandora-light to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-wandora-dark mb-2">
              Thank You!
            </h2>
            <p className="text-wandora-dark/70">
              Thanks for helping us improve Wandora!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-wandora-light to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wandora-dark mb-4">
            We Value Your Feedback
          </h1>
          <p className="text-lg text-wandora-dark/70 max-w-xl mx-auto">
            We'd love to hear your thoughts! Let us know what you like, what needs improvement, and any ideas you have.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-wandora-dark">
                  Name (optional)
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-wandora-dark">
                  Email (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="whatYouLike" className="text-wandora-dark">
                What do you like about the site?
              </Label>
              <Textarea
                id="whatYouLike"
                value={formData.whatYouLike}
                onChange={(e) => handleInputChange("whatYouLike", e.target.value)}
                className="mt-1 min-h-[100px]"
                placeholder="Tell us what you enjoy about Wandora..."
              />
            </div>

            <div>
              <Label htmlFor="improvements" className="text-wandora-dark">
                What could be improved?
              </Label>
              <Textarea
                id="improvements"
                value={formData.improvements}
                onChange={(e) => handleInputChange("improvements", e.target.value)}
                className="mt-1 min-h-[100px]"
                placeholder="Share your suggestions for improvements..."
              />
            </div>

            <div>
              <Label htmlFor="newFeatures" className="text-wandora-dark">
                Any new features or ideas you'd like to see?
              </Label>
              <Textarea
                id="newFeatures"
                value={formData.newFeatures}
                onChange={(e) => handleInputChange("newFeatures", e.target.value)}
                className="mt-1 min-h-[100px]"
                placeholder="What new features would make Wandora even better?"
              />
            </div>

            <div>
              <Label className="text-wandora-dark mb-3 block">
                Rate your experience (1–5 stars)
              </Label>
              <RadioGroup
                value={formData.rating}
                onValueChange={(value) => handleInputChange("rating", value)}
                className="flex flex-row space-x-4"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                      <span className="mr-1">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-wandora-primary hover:bg-wandora-primary/90 text-white py-3 text-lg"
            >
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
