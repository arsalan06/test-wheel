import { useQuery } from "@tanstack/react-query";
import type { Fitment } from "@shared/schema";

export function useFitments(make?: string, model?: string, year?: number) {
  const queryParams = new URLSearchParams();
  
  if (make) queryParams.set("make", make);
  if (model) queryParams.set("model", model);
  if (year) queryParams.set("year", year.toString());

  const queryString = queryParams.toString();
  const url = `/api/fitments${queryString ? `?${queryString}` : ""}`;

  return useQuery<Fitment[]>({
    queryKey: ["/api/fitments", { make, model, year }],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch fitments");
      }
      return response.json();
    },
    enabled: !!make,
  });
}

export function useVehicleMakes() {
  return useQuery<string[]>({
    queryKey: ["/api/vehicles/makes"],
  });
}

export function useVehicleModels(make: string) {
  return useQuery<string[]>({
    queryKey: ["/api/vehicles", make, "models"],
    enabled: !!make,
  });
}

export function useVehicleYears(make: string, model: string) {
  return useQuery<number[]>({
    queryKey: ["/api/vehicles", make, model, "years"],
    enabled: !!make && !!model,
  });
}
