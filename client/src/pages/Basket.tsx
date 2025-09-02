import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useBasketStore } from "@/store/basket";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function Basket() {
  const { items, updateQuantity, removeItem, clearBasket, getTotalPrice, getTotalItems } = useBasketStore();
  const { toast } = useToast();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleRequestQuote = () => {
    toast({
      title: "Quote Requested",
      description: "We'll send you a detailed quote within 24 hours.",
    });
    clearBasket();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-4" data-testid="text-empty-basket-title">
              Your basket is empty
            </h1>
            <p className="text-muted-foreground mb-8" data-testid="text-empty-basket-subtitle">
              Start shopping to add wheels to your basket
            </p>
            <Link href="/shop">
              <Button size="lg" data-testid="button-start-shopping">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/shop">
              <Button variant="ghost" size="sm" data-testid="button-back-shop">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-basket-title">
                Your Quote Request
              </h1>
              <p className="text-muted-foreground" data-testid="text-basket-subtitle">
                {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your basket
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={clearBasket}
            data-testid="button-clear-basket"
          >
            Clear All
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Basket Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} data-testid={`card-basket-item-${item.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                      data-testid={`img-basket-item-${item.id}`}
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1" data-testid={`text-item-name-${item.id}`}>
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-item-specs-${item.id}`}>
                        {item.selectedSize} • {item.selectedFinish}
                      </p>
                      <p className="font-semibold text-primary" data-testid={`text-item-price-${item.id}`}>
                        £{item.pricePerWheel} per wheel
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        data-testid={`button-decrease-${item.id}`}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        data-testid={`input-quantity-${item.id}`}
                      />
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        data-testid={`button-increase-${item.id}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-foreground" data-testid={`text-item-total-${item.id}`}>
                        £{(item.pricePerWheel * item.quantity).toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80"
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle data-testid="text-summary-title">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span data-testid="text-subtotal">£{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fitting (optional)</span>
                    <span className="text-sm text-muted-foreground" data-testid="text-fitting-price">
                      From £100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT</span>
                    <span data-testid="text-vat">£{(getTotalPrice() * 0.2).toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span data-testid="text-total">£{(getTotalPrice() * 1.2).toLocaleString()}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleRequestQuote}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
                    data-testid="button-request-quote"
                  >
                    Request Quote
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center" data-testid="text-quote-info">
                    No payment required. We'll send you a detailed quote with fitting options.
                  </p>
                </div>

                {/* Additional Services */}
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-3" data-testid="text-additional-services">
                    Additional Services
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded" data-testid="checkbox-fitting" />
                      <span className="text-sm">Professional Fitting (+£100)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded" data-testid="checkbox-balancing" />
                      <span className="text-sm">Wheel Balancing (+£40)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded" data-testid="checkbox-alignment" />
                      <span className="text-sm">Wheel Alignment (+£75)</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
