"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Book, MessageSquare, Clock, Users, Send, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-wandora-primary to-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Whether you have questions, suggestions, or want to partner with us, 
            we're here to help make your Wandora experience exceptional.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Have a question, suggestion, or just want to say hello? We're all ears! 
                Fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="border-gray-200 focus:border-wandora-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
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
                          className="border-gray-200 focus:border-wandora-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className="border-gray-200 focus:border-wandora-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="border-gray-200 focus:border-wandora-primary resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-wandora-primary hover:bg-wandora-primary/90 text-white py-3 text-lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">How Can We Help?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our team is here to support you every step of the way. Here are some ways we can assist you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-wandora-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">General Inquiries</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Questions about Wandora, how it works, or need help with your account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-wandora-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Book className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">Partnerships</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Interested in collaborating with Wandora or becoming a featured contributor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-wandora-primary to-wandora-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">Press & Media</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Press inquiries, media kits, and interview requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
              What to Expect
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to providing you with timely and helpful responses to all your inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wandora-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Quick Response
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We typically respond to all inquiries within 24-48 hours during business days.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Personal Touch
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every message is read by a real person who cares about your Wandora experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-wandora-primary to-wandora-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                  Follow-up
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We'll follow up to ensure your questions were answered and you're satisfied with our response.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wandora-primary to-wandora-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Connect?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            We're excited to hear from you and help you make the most of your Wandora journey. 
            Let's start the conversation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-wandora-primary hover:bg-gray-100 px-8 py-3 font-semibold transition-colors"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Send us a Message
            </Button>
            <Button 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white hover:text-wandora-primary px-8 py-3 font-semibold transition-all duration-300"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Our Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}