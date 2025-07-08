
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, Home, Gem, Info, Phone, MessageSquare, LogOut, Map, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

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
              Browse
            </Link>
            <Link
              href="/map"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary flex items-center gap-1 ${
                isActive("/map") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              <Map className="w-4 h-4" />
              Map
            </Link>
            <Link
              href="/search"
              className={`text-sm font-medium transition-colors hover:text-wandora-primary flex items-center gap-1 ${
                isActive("/search") ? "text-wandora-primary" : "text-wandora-dark"
              }`}
            >
              <Search className="w-4 h-4" />
              Search
            </Link>
            
            {user ? (
              <>
                <Link href="/create">
                  <Button className="bg-wandora-primary hover:bg-wandora-primary/90 text-white px-6">
                    Create Gemstone
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="w-8 h-8 cursor-pointer">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback>{profile?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={() => setShowAuthModal(true)} variant="outline">
                Sign In
              </Button>
            )}
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
                Browse
              </Link>
              <Link
                href="/map"
                className={`block px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive("/map") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Map className="w-4 h-4" />
                Map
              </Link>
              <Link
                href="/search"
                className={`block px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive("/search") ? "text-wandora-primary bg-wandora-light" : "text-wandora-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Search className="w-4 h-4" />
                Search
              </Link>
              
              {user ? (
                <>
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
                    href="/create"
                    className="block px-3 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full bg-wandora-primary hover:bg-wandora-primary/90 text-white">
                      Create Gemstone
                    </Button>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-sm font-medium text-wandora-dark hover:text-wandora-primary transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsOpen(false);
                  }}
                  className="block w-full px-3 py-2"
                >
                  <Button className="w-full" variant="outline">
                    Sign In
                  </Button>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </nav>
  );
};

export default Navigation;
