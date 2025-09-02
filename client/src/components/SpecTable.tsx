import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Wheel } from "@shared/schema";

interface SpecTableProps {
  wheel: Wheel;
}

export function SpecTable({ wheel }: SpecTableProps) {
  const specifications = [
    { label: "Available Sizes", value: (wheel.sizes || []).join(", ") },
    { label: "PCD (Bolt Pattern)", value: wheel.pcd || "N/A" },
    { label: "Offset Range", value: wheel.offsetMin && wheel.offsetMax ? `ET${wheel.offsetMin} to ET${wheel.offsetMax}` : "N/A" },
    { label: "Center Bore", value: wheel.centerBore ? `${wheel.centerBore}mm` : "N/A" },
    { label: "Available Finishes", value: (wheel.finishes || []).join(", ") },
    { label: "Stock Level", value: (wheel.stock || 0) > 0 ? `${wheel.stock} sets` : "Out of stock" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span data-testid="text-specs-title">Technical Specifications</span>
          <div className="flex space-x-2">
            {wheel.financeAvailable && (
              <Badge variant="outline" data-testid="badge-finance-available">
                Finance Available
              </Badge>
            )}
            {wheel.isNew && (
              <Badge className="bg-accent text-accent-foreground" data-testid="badge-new-product">
                New Product
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Specification</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specifications.map((spec, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium" data-testid={`text-spec-label-${index}`}>
                  {spec.label}
                </TableCell>
                <TableCell data-testid={`text-spec-value-${index}`}>
                  {spec.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Additional Info */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2" data-testid="text-fitment-note-title">
            Fitment Note
          </h4>
          <p className="text-sm text-muted-foreground" data-testid="text-fitment-note">
            Please verify compatibility with your specific vehicle before ordering. 
            Our fitment experts are available to help ensure the perfect fit.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
