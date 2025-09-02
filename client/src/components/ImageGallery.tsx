import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { GalleryImage } from "@shared/schema";

interface ImageGalleryProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function ImageGallery({ selectedCategory = "all", onCategoryChange }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const { data: images = [] } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery", selectedCategory],
  });

  const categories = [
    { id: "all", name: "All" },
    { id: "sports", name: "Sports Cars" },
    { id: "luxury", name: "Luxury" },
    { id: "suv", name: "SUVs" },
    { id: "offroad", name: "Off-Road" },
  ];

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange?.(category.id)}
            className="font-medium"
            data-testid={`button-category-${category.id}`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <Card className="group relative overflow-hidden rounded-xl custom-shadow hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={image.image}
                  alt={image.vehicle}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  data-testid={`img-gallery-${image.id}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-semibold" data-testid={`text-vehicle-${image.id}`}>
                      {image.vehicle}
                    </p>
                    {image.wheelInfo && (
                      <p className="text-sm" data-testid={`text-wheel-info-${image.id}`}>
                        {image.wheelInfo}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <img
                src={image.image}
                alt={image.vehicle}
                className="w-full h-auto max-h-[80vh] object-contain"
                data-testid={`img-gallery-modal-${image.id}`}
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2" data-testid={`text-modal-vehicle-${image.id}`}>
                  {image.vehicle}
                </h3>
                {image.wheelInfo && (
                  <p className="text-muted-foreground" data-testid={`text-modal-wheel-info-${image.id}`}>
                    {image.wheelInfo}
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg" data-testid="text-no-images">
            No images found for this category.
          </p>
        </div>
      )}
    </div>
  );
}
