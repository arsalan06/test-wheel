import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, PinOff, Settings, Zap, Clock, CheckCircle } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "fitting",
      title: "Wheel Fitting",
      description: "Professional wheel installation with precision torque settings and balancing",
      icon: Wrench,
      features: ["Precision torque application", "Wheel balancing included", "Road force balancing", "TPMS reset"],
      duration: "45-60 minutes",
      price: "From £25 per wheel",
      color: "bg-primary/10 text-primary",
    },
    {
      id: "tyres",
      title: "Tyre Services",
      description: "Premium tyres, fitting, balancing, and alignment services",
      icon: PinOff,
      features: ["Premium tyre brands", "Nitrogen filling", "Puncture repair", "Tyre pressure monitoring"],
      duration: "30-45 minutes",
      price: "From £15 per tyre",
      color: "bg-accent/10 text-accent",
    },
    {
      id: "refurbishment",
      title: "Wheel Refurbishment",
      description: "Restore your wheels to factory condition with our expert refurbishment",
      icon: Settings,
      features: ["Crack welding", "Diamond cutting", "Powder coating", "Custom color matching"],
      duration: "3-5 working days",
      price: "From £80 per wheel",
      color: "bg-green-500/10 text-green-500",
    },
    {
      id: "alignment",
      title: "Wheel Alignment",
      description: "Precision wheel alignment for optimal performance and tyre life",
      icon: Zap,
      features: ["Laser alignment", "Camber adjustment", "Toe adjustment", "Performance setup"],
      duration: "60-90 minutes",
      price: "From £75",
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  const serviceProcess = [
    {
      step: 1,
      title: "Book Online",
      description: "Schedule your service at a time that works for you",
    },
    {
      step: 2,
      title: "Professional Assessment",
      description: "Our experts assess your wheels and provide recommendations",
    },
    {
      step: 3,
      title: "Expert Service",
      description: "State-of-the-art equipment ensures precision work",
    },
    {
      step: 4,
      title: "Quality Check",
      description: "Comprehensive inspection before returning your vehicle",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="text-services-title">
              Professional Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-subtitle">
              Complete automotive services from expert technicians with state-of-the-art equipment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="text-center hover:shadow-lg transition-shadow" data-testid={`card-service-${service.id}`}>
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${service.color}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl" data-testid={`text-service-title-${service.id}`}>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground" data-testid={`text-service-description-${service.id}`}>
                      {service.description}
                    </p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span data-testid={`text-service-feature-${service.id}-${index}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium" data-testid={`text-service-duration-${service.id}`}>
                          {service.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-bold text-primary" data-testid={`text-service-price-${service.id}`}>
                          {service.price}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      data-testid={`button-book-${service.id}`}
                    >
                      Book Service
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-process-title">
              Our Service Process
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-process-subtitle">
              Simple, transparent, and professional service every time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceProcess.map((step) => (
              <div key={step.step} className="text-center" data-testid={`step-${step.step}`}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`text-step-title-${step.step}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-step-description-${step.step}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-why-choose-title">
              Why Choose WheelHub Services?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2" data-testid="text-benefit-speed">Fast Turnaround</h3>
                <p className="text-muted-foreground">
                  Most services completed while you wait or within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2" data-testid="text-benefit-warranty">Warranty Included</h3>
                <p className="text-muted-foreground">
                  All work comes with comprehensive warranty coverage
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <Wrench className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2" data-testid="text-benefit-experts">Expert Technicians</h3>
                <p className="text-muted-foreground">
                  Certified professionals with years of automotive experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
            Ready to Book Your Service?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8" data-testid="text-cta-subtitle">
            Get professional service from our expert team today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold"
                data-testid="button-book-now"
              >
                Book Now
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              data-testid="button-get-quote"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
