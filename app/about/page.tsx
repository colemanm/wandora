"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book, User, Map, Target, Users, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-wandora-primary to-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Wandora
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting travelers through authentic experiences and shared discoveries. 
            Every journey has a story worth telling.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-wandora-primary rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're building a platform for genuine travel storytelling that celebrates authentic 
                experiences over curated feeds. Wandora connects wanderers through real stories 
                from real travelers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every "gemstone" shared represents a meaningful moment, hidden discovery, or 
                cultural connection that transforms how we see the world.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-wandora-secondary rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To create the world's most trusted community of travel storytellers, where 
                authentic experiences inspire and guide fellow explorers to discover the 
                extraordinary in every journey.
              </p>
              <Link href="/share">
                <Button className="bg-wandora-primary hover:bg-wandora-primary/90 text-white px-8 py-3">
                  Share Your Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
              What We Stand For
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core values shape everything we do, from the stories we celebrate 
              to the community we're building together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wandora-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Authenticity
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We celebrate genuine experiences from real travelers. No staged content—just 
                  honest stories that inspire and connect us all.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Discovery
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We're passionate about uncovering hidden gems and off-the-beaten-path 
                  experiences that traditional guides often overlook.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-wandora-primary to-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Community
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We're building a global network of storytellers who inspire each other 
                  to explore, discover, and share meaningful experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
              The Wandora Story
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p className="text-lg leading-relaxed">
              Wandora was born from a simple realization: the best travel recommendations don't 
              come from guidebooks or influencers, but from fellow travelers who've experienced 
              something truly special.
            </p>
            <p className="text-lg leading-relaxed">
              After countless trips where the most memorable moments were unplanned discoveries—a 
              hidden café in Prague, a sunset viewpoint in Bali known only to locals, a cultural 
              festival stumbled upon by chance—we knew there had to be a better way to share these 
              precious "gemstones" of travel.
            </p>
            <p className="text-lg leading-relaxed">
              Today, Wandora is home to thousands of authentic travel stories from adventurers 
              around the world. Each gemstone is a window into someone's journey, an invitation 
              to see the world through their eyes, and a spark of inspiration for your next adventure.
            </p>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/browse">
              <Button size="lg" className="bg-wandora-secondary hover:bg-wandora-secondary/90 text-white px-8 py-3">
                Explore Our Gemstones
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wandora-primary to-wandora-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Join the Wandora Community
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Whether you're sharing your own adventures or discovering new destinations through 
            others' experiences, you're part of a community that values authenticity and 
            meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/share">
              <Button size="lg" className="bg-white text-wandora-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                Share Your Gemstone
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-wandora-primary px-8 py-3 font-semibold">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}