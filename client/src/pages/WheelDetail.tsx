import { useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SpecTable } from "@/components/SpecTable";
import { useWheel } from "@/api/wheels";
import { useBasketStore } from "@/store/basket";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Star, Heart, ShoppingCart, Wrench } from "lucide-react";

export default function WheelDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");
  const [quantity, setQuantity] = useState(4);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { data: wheel, isLoading } = useWheel(id!);
  const { addItem } = useBasketStore();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="w-32 h-10 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!wheel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Wheel Not Found</h1>
          <p className="text-muted-foreground mb-4">The wheel you're looking for doesn't exist.</p>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getStockStatus = () => {
    if (wheel.stock === 0) return { label: "Pre-Order", color: "destructive" };
    if (wheel.stock <= 5) return { label: "Low Stock", color: "secondary" };
    return { label: "In Stock", color: "default" };
  };

  const stockStatus = getStockStatus();

  const handleAddToBasket = () => {
    if (!selectedSize || !selectedFinish) {
      toast({
        title: "Please select options",
        description: "Please select both size and finish before adding to basket.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      wheelId: wheel.id,
      name: wheel.name,
      image: wheel.images[0] || "",
      selectedSize,
      selectedFinish,
      quantity,
      pricePerWheel: wheel.price,
    });

    toast({
      title: "Added to Basket",
      description: `${wheel.name} has been added to your basket.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? "text-accent fill-current" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link href="/shop">
            <Button variant="ghost" size="sm" data-testid="button-back-shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <img
                src={wheel.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"}
                alt={wheel.name}
                className="w-full h-96 object-cover"
                data-testid="img-wheel-main"
              />
            </Card>
            
            {wheel.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {wheel.images.slice(1, 5).map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <img
                      src={image}
                      alt={`${wheel.name} view ${index + 2}`}
                      className="w-full h-20 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      data-testid={`img-wheel-thumbnail-${index}`}
                    />
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-wheel-name">
                    {wheel.name}
                  </h1>
                  <p className="text-lg text-muted-foreground" data-testid="text-wheel-brand">
                    {wheel.brand?.name}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-500" : ""}
                  data-testid="button-wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>

              <p className="text-muted-foreground mb-4" data-testid="text-wheel-description">
                {wheel.description}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex" data-testid="rating-stars">
                  {renderStars(wheel.rating)}
                </div>
                <span className="text-sm text-muted-foreground" data-testid="text-review-count">
                  ({wheel.reviewCount} reviews)
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant={stockStatus.color as any} data-testid="badge-stock-status">
                  {stockStatus.label}
                </Badge>
                {wheel.isNew && (
                  <Badge className="bg-accent text-accent-foreground" data-testid="badge-new">
                    New
                  </Badge>
                )}
                {wheel.financeAvailable && (
                  <Badge variant="outline" data-testid="badge-finance">
                    Finance Available
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground" data-testid="text-wheel-price">
                  £{wheel.price}
                </span>
                <span className="text-lg text-muted-foreground ml-2">per wheel</span>
              </div>
            </div>

            {/* Selection Options */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-options-title">Configure Your Wheels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger data-testid="select-wheel-size">
                      <SelectValue placeholder="Select size..." />
                    </SelectTrigger>
                    <SelectContent>
                      {wheel.sizes.map((size) => (
                        <SelectItem key={size} value={size} data-testid={`option-size-${size.replace('x', '-')}`}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Finish</label>
                  <Select value={selectedFinish} onValueChange={setSelectedFinish}>
                    <SelectTrigger data-testid="select-wheel-finish">
                      <SelectValue placeholder="Select finish..." />
                    </SelectTrigger>
                    <SelectContent>
                      {wheel.finishes.map((finish) => (
                        <SelectItem key={finish} value={finish} data-testid={`option-finish-${finish.toLowerCase().replace(' ', '-')}`}>
                          {finish}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <Select value={quantity.toString()} onValueChange={(val) => setQuantity(parseInt(val))}>
                    <SelectTrigger data-testid="select-wheel-quantity">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1" data-testid="option-quantity-1">1 wheel</SelectItem>
                      <SelectItem value="2" data-testid="option-quantity-2">2 wheels (pair)</SelectItem>
                      <SelectItem value="4" data-testid="option-quantity-4">4 wheels (full set)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Total Price */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold text-primary" data-testid="text-total-price">
                      £{(wheel.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleAddToBasket}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
                    disabled={!selectedSize || !selectedFinish}
                    data-testid="button-add-to-basket"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Basket
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full py-3 text-lg font-semibold"
                    data-testid="button-book-fitting"
                  >
                    <Wrench className="w-5 h-5 mr-2" />
                    Book Fitting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12">
          <SpecTable wheel={wheel} />
        </div>
      </div>
    </div>
  );
}
