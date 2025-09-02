import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUIStore } from "@/store/ui";
import type { Brand } from "@shared/schema";

interface FiltersDrawerProps {
  onFiltersChange: (filters: any) => void;
  currentFilters: any;
}

export function FiltersDrawer({ onFiltersChange, currentFilters }: FiltersDrawerProps) {
  const { isFiltersOpen, closeFilters } = useUIStore();
  const [localFilters, setLocalFilters] = useState(currentFilters);

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const sizes = ["17\"", "18\"", "19\"", "20\"", "21\"", "22\""];
  const finishes = ["Gloss Black", "Matte Black", "Silver", "White", "Chrome", "Bronze", "Gunmetal"];

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const newBrands = checked
      ? [...(localFilters.brandIds || []), brandId]
      : (localFilters.brandIds || []).filter((id: string) => id !== brandId);
    
    setLocalFilters(prev => ({ ...prev, brandIds: newBrands }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...(localFilters.sizes || []), size]
      : (localFilters.sizes || []).filter((s: string) => s !== size);
    
    setLocalFilters(prev => ({ ...prev, sizes: newSizes }));
  };

  const handleFinishChange = (finish: string, checked: boolean) => {
    const newFinishes = checked
      ? [...(localFilters.finishes || []), finish]
      : (localFilters.finishes || []).filter((f: string) => f !== finish);
    
    setLocalFilters(prev => ({ ...prev, finishes: newFinishes }));
  };

  const handlePriceRangeChange = (values: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1],
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    closeFilters();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      brandIds: [],
      sizes: [],
      finishes: [],
      minPrice: 200,
      maxPrice: 2000,
      inStockOnly: false,
      sortBy: "popularity",
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const content = (
    <div className="p-6 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Brand Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Brand</Label>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={(localFilters.brandIds || []).includes(brand.id)}
                  onCheckedChange={(checked) => handleBrandChange(brand.id, !!checked)}
                  data-testid={`checkbox-brand-${brand.name.toLowerCase().replace(' ', '-')}`}
                />
                <Label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm cursor-pointer"
                >
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Wheel Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={(localFilters.sizes || []).includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => handleSizeChange(size, !(localFilters.sizes || []).includes(size))}
                className="text-xs"
                data-testid={`button-size-${size.replace('"', 'inch')}`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Price Range</Label>
          <div className="space-y-4">
            <div className="px-3 py-2 bg-muted rounded-lg">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>£200</span>
                <span>£2000</span>
              </div>
              <Slider
                value={[localFilters.minPrice || 200, localFilters.maxPrice || 2000]}
                onValueChange={handlePriceRangeChange}
                min={200}
                max={2000}
                step={50}
                className="w-full"
                data-testid="slider-price-range"
              />
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.minPrice || ""}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, minPrice: parseInt(e.target.value) || 200 }))}
                className="text-sm"
                data-testid="input-price-min"
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.maxPrice || ""}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) || 2000 }))}
                className="text-sm"
                data-testid="input-price-max"
              />
            </div>
          </div>
        </div>

        {/* Finish Filter */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Finish</Label>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {finishes.map((finish) => (
              <div key={finish} className="flex items-center space-x-2">
                <Checkbox
                  id={`finish-${finish}`}
                  checked={(localFilters.finishes || []).includes(finish)}
                  onCheckedChange={(checked) => handleFinishChange(finish, !!checked)}
                  data-testid={`checkbox-finish-${finish.toLowerCase().replace(' ', '-')}`}
                />
                <Label
                  htmlFor={`finish-${finish}`}
                  className="text-sm cursor-pointer"
                >
                  {finish}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Filter */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="stock-only"
              checked={localFilters.inStockOnly || false}
              onCheckedChange={(checked) => setLocalFilters(prev => ({ ...prev, inStockOnly: !!checked }))}
              data-testid="checkbox-stock-only"
            />
            <Label htmlFor="stock-only" className="text-sm font-medium cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleApplyFilters} 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            data-testid="button-apply-filters"
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClearFilters} 
            className="w-full"
            data-testid="button-clear-filters"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-card rounded-xl p-6 h-fit sticky top-24">
        {content}
      </div>

      {/* Mobile Sheet */}
      <Sheet open={isFiltersOpen} onOpenChange={closeFilters}>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    </>
  );
}
