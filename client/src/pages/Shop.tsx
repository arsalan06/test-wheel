import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WheelCard } from "@/components/WheelCard";
import { FiltersDrawer } from "@/components/FiltersDrawer";
import { useWheels } from "@/api/wheels";
import { useUIStore } from "@/store/ui";
import { SlidersHorizontal } from "lucide-react";
import type { WheelFilters } from "@/api/wheels";

export default function Shop() {
  const { toggleFilters } = useUIStore();
  const [filters, setFilters] = useState<WheelFilters>({
    brandIds: [],
    sizes: [],
    finishes: [],
    minPrice: 200,
    maxPrice: 2000,
    inStockOnly: false,
    sortBy: "popularity",
  });

  const { data: wheels = [], isLoading } = useWheels(filters);

  const handleFiltersChange = (newFilters: WheelFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-4 animate-pulse">
                <div className="bg-muted h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-muted h-4 rounded w-3/4"></div>
                  <div className="bg-muted h-3 rounded w-1/2"></div>
                  <div className="bg-muted h-4 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-shop-title">
              Shop Wheels
            </h1>
            <p className="text-muted-foreground" data-testid="text-shop-subtitle">
              Find the perfect wheels for your vehicle
            </p>
          </div>
          <Button
            variant="outline"
            onClick={toggleFilters}
            className="lg:hidden"
            data-testid="button-mobile-filters"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <FiltersDrawer
            onFiltersChange={handleFiltersChange}
            currentFilters={filters}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort & Results Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-muted-foreground" data-testid="text-results-count">
                Showing 1-{wheels.length} of {wheels.length} wheels
              </p>
              <Select value={filters.sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-64" data-testid="select-sort-by">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity" data-testid="option-sort-popularity">Sort by Popularity</SelectItem>
                  <SelectItem value="price_asc" data-testid="option-sort-price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc" data-testid="option-sort-price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest" data-testid="option-sort-newest">Newest First</SelectItem>
                  <SelectItem value="rating" data-testid="option-sort-rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wheels.map((wheel) => (
                <WheelCard key={wheel.id} wheel={wheel} />
              ))}
            </div>

            {wheels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg" data-testid="text-no-wheels">
                  No wheels found matching your criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    brandIds: [],
                    sizes: [],
                    finishes: [],
                    minPrice: 200,
                    maxPrice: 2000,
                    inStockOnly: false,
                    sortBy: "popularity",
                  })}
                  className="mt-4"
                  data-testid="button-clear-filters-no-results"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
