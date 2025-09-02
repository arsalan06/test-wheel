import { useState } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-gallery-title">
            Customer Gallery
          </h1>
          <p className="text-muted-foreground text-lg" data-testid="text-gallery-subtitle">
            See how our wheels transform vehicles from ordinary to extraordinary
          </p>
        </div>

        {/* Gallery Component */}
        <ImageGallery 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Upload CTA */}
        <div className="mt-16 bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-upload-cta-title">
            Share Your Ride
          </h2>
          <p className="text-muted-foreground mb-6" data-testid="text-upload-cta-subtitle">
            Show off your new wheels and inspire other automotive enthusiasts
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="button-upload-photo"
          >
            Upload Your Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
