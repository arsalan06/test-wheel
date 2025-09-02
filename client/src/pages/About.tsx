import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Award, MapPin, Phone, Clock } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Years in Business", value: "15+", icon: Award },
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Wheels Fitted", value: "50,000+", icon: Target },
    { label: "Partner Brands", value: "25+", icon: Award },
  ];

  const team = [
    {
      name: "Mike Johnson",
      role: "Founder & CEO",
      experience: "20+ years automotive experience",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    },
    {
      name: "Sarah Williams",
      role: "Head of Fitment",
      experience: "15+ years wheel specialist",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c100?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    },
    {
      name: "David Chen",
      role: "Technical Director",
      experience: "12+ years engineering",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-about-title">
            About WheelHub
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-about-intro">
            We've been the UK's trusted wheel specialists for over 15 years, helping automotive enthusiasts 
            transform their vehicles with premium wheels and professional fitment services.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center" data-testid={`card-stat-${index}`}>
                  <CardContent className="pt-8">
                    <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-foreground mb-2" data-testid={`text-stat-value-${index}`}>
                      {stat.value}
                    </div>
                    <p className="text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="text-story-title">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p data-testid="text-story-paragraph-1">
                  WheelHub was founded in 2009 with a simple mission: to provide automotive enthusiasts 
                  with access to the world's finest wheels, backed by expert knowledge and professional service.
                </p>
                <p data-testid="text-story-paragraph-2">
                  What started as a small workshop has grown into one of the UK's most trusted wheel retailers, 
                  but we've never lost sight of our core values: quality, expertise, and exceptional customer service.
                </p>
                <p data-testid="text-story-paragraph-3">
                  Today, we work with leading manufacturers worldwide to bring you the latest innovations in 
                  wheel technology, from lightweight forged racing wheels to luxury chrome finishes.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="WheelHub workshop"
                className="w-full h-auto rounded-xl shadow-lg"
                data-testid="img-workshop"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-team-title">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-team-subtitle">
              Passionate automotive experts dedicated to helping you find the perfect wheels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center" data-testid={`card-team-${index}`}>
                <CardContent className="pt-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    data-testid={`img-team-${index}`}
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-1" data-testid={`text-team-name-${index}`}>
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2" data-testid={`text-team-role-${index}`}>
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid={`text-team-experience-${index}`}>
                    {member.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="text-location-title">
                Visit Our Showroom
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-primary-foreground/90" data-testid="text-address">
                      123 Automotive Park<br />
                      Birmingham B12 9QR<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-primary-foreground/90" data-testid="text-phone">
                      0800 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Opening Hours</h3>
                    <div className="text-primary-foreground/90 space-y-1" data-testid="text-opening-hours">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 bg-white/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-white/60 mx-auto mb-4" />
                <p className="text-white/80" data-testid="text-map-placeholder">Interactive Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
