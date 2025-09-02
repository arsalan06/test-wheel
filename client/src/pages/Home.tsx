import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandMarquee } from "@/components/BrandMarquee";
import { TestimonialCard } from "@/components/TestimonialCard";
import { useQuery } from "@tanstack/react-query";
import { Shield, Wrench, CreditCard, ArrowRight } from "lucide-react";
import type { Wheel, Brand, Testimonial } from "@shared/schema";

export default function Home() {
  const { data: wheels = [] } = useQuery<(Wheel & { brand?: Brand })[]>({
    queryKey: ["/api/wheels", { sortBy: "rating", limit: 3 }],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const featuredCollections = [
    {
      id: "performance",
      title: "Performance Series",
      description: "Lightweight forged wheels for sports cars and performance vehicles",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      priceFrom: 400,
    },
    {
      id: "luxury",
      title: "Luxury Chrome",
      description: "Premium chrome and polished finishes for luxury vehicles",
      image: "https://pixabay.com/get/gc8e05a2be6000cfa0648c6c7c4f1b64f83fa147fd159f10791533aa29feeb1d02d38b248b3915bca6d6fdd4fbd1f6d37dbad6708009dcdcc966e060c997ee26e_1280.jpg",
      priceFrom: 600,
    },
    {
      id: "offroad",
      title: "Off-Road Ready",
      description: "Durable wheels built for trucks, SUVs and off-road adventures",
      image: "https://pixabay.com/get/gc04e353b74d4b23bffcb03cb5f4505e27f44be716423ddb8d5cc1bb7f885047f57f46b692f84a19b7c5cba7df8fddc276efe71f5622be31599f4a72ca1c752a2_1280.jpg",
      priceFrom: 300,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800"
            alt="Professional automotive garage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
              Premium Wheels for<br />
              <span className="text-accent">Every Vehicle</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
              Professional fitment, unbeatable prices, and expert advice for your automotive upgrade journey
            </p>

            {/* USP Chips */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="font-medium" data-testid="text-usp-price-match">Price Match Guarantee</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-accent" />
                <span className="font-medium" data-testid="text-usp-fitment">Professional Fitment</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-accent" />
                <span className="font-medium" data-testid="text-usp-finance">Finance Available</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href="/fitment">
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
                  data-testid="button-find-wheels"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Find My Wheels
                </Button>
              </Link>
              <Link href="/shop">
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white px-8 py-4 text-lg font-semibold"
                  data-testid="button-shop-now"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-collections-title">
              Featured Collections
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-collections-subtitle">
              Discover our curated selection of premium wheels from top automotive brands
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.map((collection) => (
              <Card key={collection.id} className="wheel-card overflow-hidden" data-testid={`card-collection-${collection.id}`}>
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-2" data-testid={`text-collection-title-${collection.id}`}>
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`text-collection-description-${collection.id}`}>
                    {collection.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground" data-testid={`text-collection-price-${collection.id}`}>
                      From £{collection.priceFrom}
                    </span>
                    <Link href="/shop">
                      <Button data-testid={`button-view-collection-${collection.id}`}>
                        View Collection
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Testimonials */}
      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://pixabay.com/get/gda3ff7703c5873c10ea8fbfe0ff3d159bc62f3d904fbfbcee9a6d1207c1068daf5f1a909422c14fa9b6a8506860cbb85d06cc1036d8ea412bfa3291e5cdd7d93_1280.jpg"
            alt="Happy customer with vehicle"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
              What Our Customers Say
            </h2>
            <p className="text-primary-foreground/80 text-lg" data-testid="text-testimonials-subtitle">
              Thousands of satisfied customers trust us with their vehicles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
