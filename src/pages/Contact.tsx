
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
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
    <div className="min-h-screen bg-wandora-cream py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-wandora-charcoal mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-wandora-stone max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have questions, suggestions, or want to partner with us, 
            we're here to help make your Wandora experience exceptional.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm animate-slide-up">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-wandora-charcoal">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-wandora-charcoal mb-2">
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
                    <label htmlFor="subject" className="block text-sm font-medium text-wandora-charcoal mb-2">
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
                      className="border-wandora-sand focus:border-wandora-terracotta"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-wandora-charcoal mb-2">
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
                      className="border-wandora-sand focus:border-wandora-terracotta resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-wandora-terracotta hover:bg-wandora-terracotta/90 text-white py-3 text-lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-wandora-charcoal">
                  How Can We Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-wandora-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-wandora-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-medium text-wandora-charcoal mb-1">General Inquiries</h4>
                    <p className="text-sm text-wandora-stone">
                      Questions about Wandora, how it works, or need help with your account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-wandora-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Book className="w-5 h-5 text-wandora-sage" />
                  </div>
                  <div>
                    <h4 className="font-medium text-wandora-charcoal mb-1">Partnerships</h4>
                    <p className="text-sm text-wandora-stone">
                      Interested in collaborating with Wandora or becoming a featured contributor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-wandora-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-wandora-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-medium text-wandora-charcoal mb-1">Press & Media</h4>
                    <p className="text-sm text-wandora-stone">
                      Press inquiries, media kits, and interview requests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-wandora-terracotta to-wandora-sage text-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-3">
                  Join Our Community
                </h3>
                <p className="text-white/90 mb-4 text-sm">
                  Connect with fellow travelers, get updates on new features, and be the first to know about community events.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-white text-white hover:bg-white hover:text-wandora-terracotta"
                >
                  Follow Our Journey
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-semibold text-wandora-charcoal mb-3">
                  Response Time
                </h3>
                <p className="text-sm text-wandora-stone">
                  We typically respond to all inquiries within 24-48 hours. For urgent matters, 
                  please mark your subject line with "URGENT" and we'll prioritize your message.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
