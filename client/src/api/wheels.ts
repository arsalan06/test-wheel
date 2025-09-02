import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Wheel, Brand } from "@shared/schema";

export interface WheelFilters {
  brandIds?: string[];
  sizes?: string[];
  finishes?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: string;
}

export function useWheels(filters?: WheelFilters) {
  const queryParams = new URLSearchParams();
  
  if (filters?.brandIds?.length) {
    queryParams.set("brandIds", filters.brandIds.join(","));
  }
  if (filters?.sizes?.length) {
    queryParams.set("sizes", filters.sizes.join(","));
  }
  if (filters?.finishes?.length) {
    queryParams.set("finishes", filters.finishes.join(","));
  }
  if (filters?.minPrice) {
    queryParams.set("minPrice", filters.minPrice.toString());
  }
  if (filters?.maxPrice) {
    queryParams.set("maxPrice", filters.maxPrice.toString());
  }
  if (filters?.inStockOnly) {
    queryParams.set("inStockOnly", "true");
  }
  if (filters?.sortBy) {
    queryParams.set("sortBy", filters.sortBy);
  }

  const queryString = queryParams.toString();
  const url = `/api/wheels${queryString ? `?${queryString}` : ""}`;

  return useQuery<(Wheel & { brand?: Brand })[]>({
    queryKey: ["/api/wheels", filters],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch wheels");
      }
      const wheels = await response.json();
      
      // Fetch brand data for each wheel
      const brandsResponse = await fetch("/api/brands");
      const brands: Brand[] = await brandsResponse.json();
      
      return wheels.map((wheel: Wheel) => ({
        ...wheel,
        brand: brands.find(b => b.id === wheel.brandId),
      }));
    },
  });
}

export function useWheel(id: string) {
  return useQuery<Wheel & { brand?: Brand }>({
    queryKey: ["/api/wheels", id],
    queryFn: async () => {
      const [wheelResponse, brandsResponse] = await Promise.all([
        fetch(`/api/wheels/${id}`),
        fetch("/api/brands"),
      ]);
      
      if (!wheelResponse.ok) {
        throw new Error("Failed to fetch wheel");
      }
      
      const wheel: Wheel = await wheelResponse.json();
      const brands: Brand[] = await brandsResponse.json();
      
      return {
        ...wheel,
        brand: brands.find(b => b.id === wheel.brandId),
      };
    },
    enabled: !!id,
  });
}

export function useBrands() {
  return useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });
}
