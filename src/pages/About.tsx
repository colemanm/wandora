
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, User, Map } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-wandora-cream to-wandora-sand overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-wandora-terracotta to-wandora-sage rounded-full flex items-center justify-center mx-auto mb-8">
            <Book className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-wandora-charcoal mb-6">
            About Wandora
          </h1>
          <p className="text-xl text-wandora-stone max-w-3xl mx-auto leading-relaxed">
            We believe every journey has a story worth telling. Wandora is where authentic travel experiences come alive, connecting wanderers through the power of shared discovery.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-wandora-charcoal mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-wandora-stone mb-6 leading-relaxed">
                In a world of curated feeds and tourist traps, we're building a platform for genuine travel storytelling. Wandora celebrates the unexpected moments, hidden discoveries, and cultural connections that make travel truly transformative.
              </p>
              <p className="text-lg text-wandora-stone mb-8 leading-relaxed">
                Every "gemstone" shared on our platform is a real experience from a real traveler, creating an authentic collection of worldwide adventures that inspire and guide fellow explorers.
              </p>
              <Link to="/share">
                <Button className="bg-wandora-terracotta hover:bg-wandora-terracotta/90 text-white px-8 py-3">
                  Share Your Story
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&h=800&fit=crop" 
                alt="Mountain landscape"
                className="rounded-lg shadow-2xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-wandora-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-wandora-charcoal mb-6">
              What We Stand For
            </h2>
            <p className="text-lg text-wandora-stone max-w-3xl mx-auto">
              Our values guide everything we do, from the stories we share to the community we're building.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wandora-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-wandora-charcoal mb-4">
                  Authenticity
                </h3>
                <p className="text-wandora-stone leading-relaxed">
                  We celebrate real experiences from real travelers. No staged photos or sponsored content - just genuine stories from the heart.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wandora-sage rounded-full flex items-center justify-center mx-auto mb-6">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-wandora-charcoal mb-4">
                  Discovery
                </h3>
                <p className="text-wandora-stone leading-relaxed">
                  We're passionate about uncovering hidden gems and off-the-beaten-path experiences that guide books often miss.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wandora-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-wandora-charcoal mb-4">
                  Community
                </h3>
                <p className="text-wandora-stone leading-relaxed">
                  We're building a global community of storytellers who inspire each other to explore, discover, and share.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-wandora-charcoal mb-8">
            The Wandora Story
          </h2>
          <div className="prose prose-lg max-w-none text-wandora-stone">
            <p className="mb-6 leading-relaxed">
              Wandora was born from a simple realization: the best travel recommendations don't come from guidebooks or influencers, but from fellow travelers who've experienced something truly special.
            </p>
            <p className="mb-6 leading-relaxed">
              After countless trips where the most memorable moments were the unplanned discoveries - a hidden café in Prague, a sunset viewpoint in Bali known only to locals, a cultural festival stumbled upon by chance - we knew there had to be a better way to share these "gemstones" of travel.
            </p>
            <p className="mb-8 leading-relaxed">
              Today, Wandora is home to thousands of authentic travel stories from adventurers around the world. Each gemstone is a window into someone's journey, a invitation to see the world through their eyes, and a spark of inspiration for your next adventure.
            </p>
          </div>
          <Link to="/browse">
            <Button size="lg" className="bg-wandora-sage hover:bg-wandora-sage/90 text-white px-8 py-3">
              Explore Our Gemstones
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wandora-terracotta to-wandora-sage">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Wandora Community
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Whether you're sharing your own adventures or discovering new destinations through others' eyes, you're part of a community that values authentic experiences and meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/share">
              <Button size="lg" className="bg-white text-wandora-terracotta hover:bg-gray-100 px-8 py-3">
                Share Your Gemstone
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-wandora-terracotta px-8 py-3">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
