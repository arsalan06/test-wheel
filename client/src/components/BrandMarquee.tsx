import { useQuery } from "@tanstack/react-query";
import type { Brand } from "@shared/schema";

export function BrandMarquee() {
  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  // Duplicate brands for seamless scrolling
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-12 bg-muted overflow-hidden">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-2">Trusted Brands</h3>
        <p className="text-muted-foreground">We stock wheels from the world's leading manufacturers</p>
      </div>
      <div className="relative">
        <div className="flex brand-marquee">
          <div className="flex space-x-16 px-8">
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={`${brand.id}-${index}`}
                className="flex items-center justify-center w-32 h-16 bg-card rounded-lg custom-shadow flex-shrink-0"
                data-testid={`brand-logo-${brand.name.toLowerCase().replace(' ', '-')}`}
              >
                <span className="text-lg font-bold text-muted-foreground">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
