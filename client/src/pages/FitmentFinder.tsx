import { useState } from "react";
import { Link } from "wouter";
import { VehiclePicker } from "@/components/VehiclePicker";
import { WheelCard } from "@/components/WheelCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWheels } from "@/api/wheels";
import { useFitments } from "@/api/fitment";
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";

interface SelectedVehicle {
  make: string;
  model: string;
  year: number;
  engine?: string;
}

export default function FitmentFinder() {
  const [selectedVehicle, setSelectedVehicle] = useState<SelectedVehicle | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { data: fitments = [] } = useFitments(
    selectedVehicle?.make,
    selectedVehicle?.model,
    selectedVehicle?.year
  );

  const { data: compatibleWheels = [] } = useWheels({
    // Filter wheels based on fitment specifications
    sortBy: "rating",
  });

  const handleVehicleSelected = (vehicle: SelectedVehicle) => {
    setSelectedVehicle(vehicle);
    setShowResults(true);
  };

  const getCompatibilityStatus = (wheel: any) => {
    if (!fitments.length || !selectedVehicle) return "unknown";
    
    const fitment = fitments[0];
    if (!fitment.wheelSpecs) return "unknown";
    
    // Check if wheel PCD matches vehicle PCD
    if (wheel.pcd === fitment.wheelSpecs.pcd) {
      return "direct";
    }
    
    return "spacers";
  };

  const renderCompatibilityBadge = (wheel: any) => {
    const status = getCompatibilityStatus(wheel);
    
    switch (status) {
      case "direct":
        return (
          <Badge className="bg-green-500 text-white" data-testid={`badge-direct-fit-${wheel.id}`}>
            <CheckCircle className="w-3 h-3 mr-1" />
            Direct Fit
          </Badge>
        );
      case "spacers":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600" data-testid={`badge-spacers-${wheel.id}`}>
            <AlertTriangle className="w-3 h-3 mr-1" />
            Spacers Required
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-fitment-title">
            Fitment Finder
          </h1>
          <p className="text-muted-foreground text-lg" data-testid="text-fitment-subtitle">
            Find wheels that perfectly fit your vehicle with our expert fitment guide
          </p>
        </div>

        {/* Vehicle Picker */}
        <VehiclePicker 
          onVehicleSelected={handleVehicleSelected} 
          showResults={!!selectedVehicle}
        />

        {/* Results Section */}
        {showResults && selectedVehicle && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="text-results-title">
                  Compatible Wheels for {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})
                </h2>
                <p className="text-muted-foreground" data-testid="text-results-subtitle">
                  Found {compatibleWheels.length} compatible wheel options
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedVehicle(null);
                  setShowResults(false);
                }}
                data-testid="button-new-search"
              >
                New Search
              </Button>
            </div>

            {/* Vehicle Specifications */}
            {fitments.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <h3 className="text-lg font-semibold" data-testid="text-vehicle-specs-title">
                    Your Vehicle Specifications
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Front Size</p>
                      <p className="font-semibold" data-testid="text-spec-front-size">
                        {fitments[0].wheelSpecs?.frontSize}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rear Size</p>
                      <p className="font-semibold" data-testid="text-spec-rear-size">
                        {fitments[0].wheelSpecs?.rearSize}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">PCD</p>
                      <p className="font-semibold" data-testid="text-spec-pcd">
                        {fitments[0].wheelSpecs?.pcd}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Center Bore</p>
                      <p className="font-semibold" data-testid="text-spec-center-bore">
                        {fitments[0].wheelSpecs?.centerBore}mm
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Compatible Wheels Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {compatibleWheels.map((wheel) => (
                <div key={wheel.id} className="relative">
                  <WheelCard wheel={wheel} />
                  <div className="absolute top-3 left-3 z-10">
                    {renderCompatibilityBadge(wheel)}
                  </div>
                </div>
              ))}
            </div>

            {compatibleWheels.length === 0 && (
              <Card className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4" data-testid="text-no-compatible-wheels">
                  No Compatible Wheels Found
                </h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find wheels that directly fit your vehicle. Please contact our fitment experts for custom solutions.
                </p>
                <Link href="/contact">
                  <Button data-testid="button-contact-expert">
                    Contact Fitment Expert
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
