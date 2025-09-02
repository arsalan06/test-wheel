import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBasketStore } from "@/store/basket";
import { useToast } from "@/hooks/use-toast";
import { Heart, Star } from "lucide-react";
import type { Wheel, Brand } from "@shared/schema";

interface WheelCardProps {
  wheel: Wheel & { brand?: Brand };
}

export function WheelCard({ wheel }: WheelCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useBasketStore();
  const { toast } = useToast();

  const getStockStatus = () => {
    if ((wheel.stock || 0) === 0) return { label: "Pre-Order", color: "destructive" };
    if ((wheel.stock || 0) <= 5) return { label: "Low Stock", color: "secondary" };
    return { label: "In Stock", color: "default" };
  };

  const stockStatus = getStockStatus();

  const handleAddToQuote = () => {
    if (!(wheel.sizes || []).length) return;
    
    addItem({
      wheelId: wheel.id,
      name: wheel.name,
      image: wheel.images[0] || "",
      selectedSize: (wheel.sizes || [])[0],
      selectedFinish: (wheel.finishes || [])[0] || "Standard",
      quantity: 4, // Default to set of 4
      pricePerWheel: wheel.price,
    });
    
    toast({
      title: "Added to Quote",
      description: `${wheel.name} has been added to your quote.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "text-accent fill-current" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card className="wheel-card overflow-hidden" data-testid={`card-wheel-${wheel.id}`}>
      <div className="relative">
        <Link href={`/wheels/${wheel.id}`}>
          <img
            src={(wheel.images || [])[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"}
            alt={wheel.name}
            className="w-full h-48 object-cover"
            loading="lazy"
            data-testid={`img-wheel-${wheel.id}`}
          />
        </Link>
        
        <div className="absolute top-3 left-3 flex space-x-2">
          <Badge 
            variant={stockStatus.color as any}
            className="text-xs"
            data-testid={`badge-stock-${wheel.id}`}
          >
            {stockStatus.label}
          </Badge>
          {wheel.isNew && (
            <Badge 
              className="text-xs bg-accent text-accent-foreground"
              data-testid={`badge-new-${wheel.id}`}
            >
              New
            </Badge>
          )}
          {wheel.financeAvailable && (
            <Badge 
              variant="outline"
              className="text-xs"
              data-testid={`badge-finance-${wheel.id}`}
            >
              Finance
            </Badge>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors ${
            isWishlisted ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          data-testid={`button-wishlist-${wheel.id}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <Link href={`/wheels/${wheel.id}`}>
          <h3 className="font-semibold text-card-foreground mb-1 hover:text-primary transition-colors" data-testid={`text-wheel-name-${wheel.id}`}>
            {wheel.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2" data-testid={`text-wheel-description-${wheel.id}`}>
          {wheel.description}
        </p>
        
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex">
            {renderStars(wheel.rating || 0)}
          </div>
          <span className="text-xs text-muted-foreground" data-testid={`text-wheel-reviews-${wheel.id}`}>
            ({wheel.reviewCount} reviews)
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {(wheel.sizes || []).slice(0, 3).map((size, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="text-xs"
              data-testid={`badge-size-${wheel.id}-${index}`}
            >
              {size}
            </Badge>
          ))}
          {(wheel.sizes || []).length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{(wheel.sizes || []).length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-foreground" data-testid={`text-wheel-price-${wheel.id}`}>
              £{wheel.price}
            </span>
            <span className="text-sm text-muted-foreground ml-1">per wheel</span>
          </div>
          <Button 
            onClick={handleAddToQuote}
            className="text-sm font-medium"
            data-testid={`button-add-quote-${wheel.id}`}
          >
            Add to Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
