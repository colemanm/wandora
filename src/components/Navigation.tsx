
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-wandora-sand sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-wandora-terracotta to-wandora-sage rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Book className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-wandora-charcoal">
              Wandora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-wandora-terracotta ${
                isActive("/") ? "text-wandora-terracotta" : "text-wandora-charcoal"
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`text-sm font-medium transition-colors hover:text-wandora-terracotta ${
                isActive("/browse") ? "text-wandora-terracotta" : "text-wandora-charcoal"
              }`}
            >
              Browse Gemstones
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-wandora-terracotta ${
                isActive("/about") ? "text-wandora-terracotta" : "text-wandora-charcoal"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-wandora-terracotta ${
                isActive("/contact") ? "text-wandora-terracotta" : "text-wandora-charcoal"
              }`}
            >
              Contact
            </Link>
            <Link to="/share">
              <Button className="bg-wandora-terracotta hover:bg-wandora-terracotta/90 text-white px-6">
                Share Your Gemstone
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-wandora-charcoal"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-wandora-sand">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/") ? "text-wandora-terracotta bg-wandora-cream" : "text-wandora-charcoal"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/browse") ? "text-wandora-terracotta bg-wandora-cream" : "text-wandora-charcoal"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Browse Gemstones
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/about") ? "text-wandora-terracotta bg-wandora-cream" : "text-wandora-charcoal"
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/contact") ? "text-wandora-terracotta bg-wandora-cream" : "text-wandora-charcoal"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/share"
                className="block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full bg-wandora-terracotta hover:bg-wandora-terracotta/90 text-white">
                  Share Your Gemstone
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
