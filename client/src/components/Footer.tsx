import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Facebook, MessageCircle, Camera } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Successfully subscribed to newsletter!",
        });
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">WheelHub</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Premium automotive wheels and professional fitment services for every vehicle.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full"
                data-testid="button-social-facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full"
                data-testid="button-social-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full"
                data-testid="button-social-instagram"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/shop">
                <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-shop">
                  Shop Wheels
                </Button>
              </Link>
              <Link href="/fitment">
                <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-fitment">
                  Fitment Finder
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-services">
                  Services
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-gallery">
                  Gallery
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-about">
                  About Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/contact">
                <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-contact">
                  Contact Us
                </Button>
              </Link>
              <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-fitting-guide">
                Fitting Guide
              </Button>
              <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-returns">
                Returns Policy
              </Button>
              <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-warranty">
                Warranty
              </Button>
              <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" data-testid="link-footer-faq">
                FAQ
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest wheel releases and special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                className="w-full text-sm"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            © 2024 WheelHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-primary" data-testid="link-privacy">
              Privacy Policy
            </Button>
            <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-primary" data-testid="link-terms">
              Terms of Service
            </Button>
            <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-primary" data-testid="link-cookies">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
