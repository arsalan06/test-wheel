import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useUIStore } from "@/store/ui";
import { useBasketStore } from "@/store/basket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ShoppingCart, Target } from "lucide-react";

export function Header() {
  const [location] = useLocation();
  const { searchQuery, setSearchQuery, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const { getTotalItems, openBasket } = useBasketStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop Wheels", href: "/shop" },
    { name: "Fitment Finder", href: "/fitment" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden" data-testid="button-mobile-menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-lg font-medium py-6"
                        onClick={closeMobileMenu}
                        data-testid={`link-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            
            <Link href="/" className="flex items-center space-x-2" data-testid="link-logo">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">WheelHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={`font-medium transition-colors ${
                    isActiveLink(item.href) ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                  data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <Input
                type="text"
                placeholder="Search wheels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm"
                data-testid="input-search"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              data-testid="button-search-mobile"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={openBasket}
              className="relative"
              data-testid="button-basket"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  data-testid="text-basket-count"
                >
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="flex items-center bg-muted rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <Input
                type="text"
                placeholder="Search wheels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm"
                data-testid="input-search-mobile"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
