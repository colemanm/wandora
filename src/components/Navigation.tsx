
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-wandora-lighter sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/lovable-uploads/39226ff4-763a-4008-b768-583954bcf3fa.png" 
              alt="Wandora Logo" 
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
            />
            <span className="font-serif text-xl font-bold text-wandora-dark">
              Wandora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary ${
                isActive("/") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary ${
                isActive("/browse") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              Browse Gemstones
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary ${
                isActive("/about") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary ${
                isActive("/contact") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              Contact
            </Link>
            <Link to="/share">
              <Button className="bg-wandora-primary hover:bg-wandora-primary/90 text-white px-6">
                Create a Gemstone
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-wandora-dark"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-wandora-lighter">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/browse") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Browse Gemstones
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/about") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/contact") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
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
                <Button className="w-full bg-wandora-primary hover:bg-wandora-primary/90 text-white">
                  Create a Gemstone
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
