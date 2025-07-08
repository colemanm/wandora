
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, Home, Gem, Info, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-wandora-lighter sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo as Home Button - Made larger and more prominent */}
          <Link href="/" className="group flex-shrink-0">
            <img 
              src="/lovable-uploads/e8377627-2912-43bb-9240-47ce9996a2fe.png" 
              alt="Wandora Logo" 
              className="w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition-transform duration-200 drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary flex items-center gap-1 ${
                isActive("/") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/browse"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary flex items-center gap-1 ${
                isActive("/browse") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              <Gem className="w-4 h-4" />
              Browse Gemstones
            </Link>
            <Link
              href="/profile"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary flex items-center gap-1 ${
                isActive("/profile") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary flex items-center gap-1 ${
                isActive("/about") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              <Info className="w-4 h-4" />
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary flex items-center gap-1 ${
                isActive("/contact") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              <Phone className="w-4 h-4" />
              Contact
            </Link>
            <Link
              href="/feedback"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary flex items-center gap-1 ${
                isActive("/feedback") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Feedback
            </Link>
            <Link href="/share">
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
                href="/"
                className={`block px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive("/") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/browse"
                className={`block px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive("/browse") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Gem className="w-4 h-4" />
                Browse Gemstones
              </Link>
              <Link
                href="/profile"
                className={`block px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive("/profile") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive("/about") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive("/contact") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-4 h-4" />
                Contact
              </Link>
              <Link
                href="/feedback"
                className={`block px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive("/feedback") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="w-4 h-4" />
                Feedback
              </Link>
              <Link
                href="/share"
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
