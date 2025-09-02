import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? "text-accent fill-current" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card className="testimonial-card h-full" data-testid={`card-testimonial-${testimonial.id}`}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex mb-4" data-testid={`rating-${testimonial.id}`}>
          {renderStars(testimonial.rating || 0)}
        </div>
        
        <p className="text-primary-foreground/90 mb-4 flex-grow" data-testid={`text-comment-${testimonial.id}`}>
          "{testimonial.comment}"
        </p>
        
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage 
              src={testimonial.avatar || ""} 
              alt={testimonial.name}
              data-testid={`img-avatar-${testimonial.id}`}
            />
            <AvatarFallback data-testid={`text-avatar-fallback-${testimonial.id}`}>
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-primary-foreground" data-testid={`text-name-${testimonial.id}`}>
              {testimonial.name}
            </p>
            <p className="text-sm text-primary-foreground/70" data-testid={`text-location-${testimonial.id}`}>
              {testimonial.location}
            </p>
            {testimonial.vehicle && (
              <p className="text-xs text-primary-foreground/60" data-testid={`text-vehicle-${testimonial.id}`}>
                {testimonial.vehicle}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
