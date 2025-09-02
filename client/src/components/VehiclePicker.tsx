import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

interface VehiclePickerProps {
  onVehicleSelected?: (vehicle: {
    make: string;
    model: string;
    year: number;
    engine?: string;
  }) => void;
  showResults?: boolean;
}

export function VehiclePicker({ onVehicleSelected, showResults = false }: VehiclePickerProps) {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");

  const { data: makes = [] } = useQuery<string[]>({
    queryKey: ["/api/vehicles/makes"],
  });

  const { data: models = [] } = useQuery<string[]>({
    queryKey: ["/api/vehicles", selectedMake, "models"],
    enabled: !!selectedMake,
  });

  const { data: years = [] } = useQuery<number[]>({
    queryKey: ["/api/vehicles", selectedMake, selectedModel, "years"],
    enabled: !!selectedMake && !!selectedModel,
  });

  const { data: fitments = [] } = useQuery({
    queryKey: ["/api/fitments"],
    select: (data: any[]) => 
      data.filter(f => 
        f.make === selectedMake && 
        f.model === selectedModel && 
        f.year === parseInt(selectedYear)
      ),
    enabled: !!selectedMake && !!selectedModel && !!selectedYear,
  });

  const getStepStatus = (step: number) => {
    switch (step) {
      case 1: return selectedMake ? "complete" : "current";
      case 2: return selectedModel ? "complete" : selectedMake ? "current" : "pending";
      case 3: return selectedYear ? "complete" : selectedModel ? "current" : "pending";
      case 4: return selectedEngine ? "complete" : selectedYear ? "current" : "pending";
      default: return "pending";
    }
  };

  const StepIndicator = ({ step, label }: { step: number; label: string }) => {
    const status = getStepStatus(step);
    return (
      <div className="flex items-center space-x-2">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
          status === "complete" 
            ? "bg-primary text-primary-foreground" 
            : status === "current"
            ? "bg-accent text-accent-foreground"
            : "bg-muted text-muted-foreground"
        }`}>
          {status === "complete" ? <CheckCircle className="w-4 h-4" /> : step}
        </div>
        <span className={`font-medium ${
          status === "pending" ? "text-muted-foreground" : "text-foreground"
        }`}>
          {label}
        </span>
      </div>
    );
  };

  const handleFindWheels = () => {
    if (selectedMake && selectedModel && selectedYear) {
      onVehicleSelected?.({
        make: selectedMake,
        model: selectedModel,
        year: parseInt(selectedYear),
        engine: selectedEngine || undefined,
      });
    }
  };

  const canProceed = selectedMake && selectedModel && selectedYear;

  return (
    <Card className="w-full">
      <CardContent className="p-8">
        {/* Stepper Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <StepIndicator step={1} label="Make" />
          <StepIndicator step={2} label="Model" />
          <StepIndicator step={3} label="Year" />
          <StepIndicator step={4} label="Engine" />
        </div>

        {/* Vehicle Selection Form */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="make-select" className="block text-sm font-medium mb-2">
              Select Your Vehicle Make
            </Label>
            <Select 
              value={selectedMake} 
              onValueChange={(value) => {
                setSelectedMake(value);
                setSelectedModel("");
                setSelectedYear("");
                setSelectedEngine("");
              }}
            >
              <SelectTrigger data-testid="select-vehicle-make">
                <SelectValue placeholder="Choose make..." />
              </SelectTrigger>
              <SelectContent>
                {makes.map((make) => (
                  <SelectItem key={make} value={make} data-testid={`option-make-${make.toLowerCase()}`}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="model-select" className="block text-sm font-medium mb-2">
                Model
              </Label>
              <Select 
                value={selectedModel} 
                onValueChange={(value) => {
                  setSelectedModel(value);
                  setSelectedYear("");
                  setSelectedEngine("");
                }}
                disabled={!selectedMake}
              >
                <SelectTrigger data-testid="select-vehicle-model">
                  <SelectValue placeholder={selectedMake ? "Choose model..." : "Select make first"} />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model} value={model} data-testid={`option-model-${model.toLowerCase().replace(' ', '-')}`}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="year-select" className="block text-sm font-medium mb-2">
                Year
              </Label>
              <Select 
                value={selectedYear} 
                onValueChange={(value) => {
                  setSelectedYear(value);
                  setSelectedEngine("");
                }}
                disabled={!selectedModel}
              >
                <SelectTrigger data-testid="select-vehicle-year">
                  <SelectValue placeholder={selectedModel ? "Choose year..." : "Select model first"} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} data-testid={`option-year-${year}`}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="engine-select" className="block text-sm font-medium mb-2">
                Engine/Trim
              </Label>
              <Select 
                value={selectedEngine} 
                onValueChange={setSelectedEngine}
                disabled={!selectedYear}
              >
                <SelectTrigger data-testid="select-vehicle-engine">
                  <SelectValue placeholder={selectedYear ? "Choose engine..." : "Select year first"} />
                </SelectTrigger>
                <SelectContent>
                  {fitments.map((fitment, index) => (
                    <SelectItem 
                      key={index} 
                      value={fitment.engine || `Engine ${index + 1}`}
                      data-testid={`option-engine-${index}`}
                    >
                      {fitment.engine || `Engine ${index + 1}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleFindWheels}
            disabled={!canProceed}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 text-lg font-semibold"
            data-testid="button-find-wheels"
          >
            Find Compatible Wheels
          </Button>
        </div>

        {/* Fitment Results */}
        {showResults && fitments.length > 0 && (
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4" data-testid="text-fitment-results">
              Compatible Specifications
            </h3>
            <div className="space-y-4">
              {fitments.map((fitment, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="font-medium">Front Size</Label>
                      <p className="text-muted-foreground" data-testid={`text-front-size-${index}`}>
                        {fitment.wheelSpecs?.frontSize}
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium">Rear Size</Label>
                      <p className="text-muted-foreground" data-testid={`text-rear-size-${index}`}>
                        {fitment.wheelSpecs?.rearSize}
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium">PCD</Label>
                      <p className="text-muted-foreground" data-testid={`text-pcd-${index}`}>
                        {fitment.wheelSpecs?.pcd}
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium">Offset Range</Label>
                      <p className="text-muted-foreground" data-testid={`text-offset-${index}`}>
                        {fitment.wheelSpecs?.offsetRange}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
