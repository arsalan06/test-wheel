import { useThemeMode } from "@/hooks/useThemeMode";
import { Phone, MapPin, Clock, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const { isDarkMode, toggleDarkMode } = useThemeMode();

  return (
    <div className="hidden lg:block bg-muted text-muted-foreground text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span data-testid="phone-number">0800 123 4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span data-testid="location-link">Find Store Near You</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span data-testid="opening-hours">Mon-Fri 8AM-6PM, Sat 9AM-5PM</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-background transition-colors"
            data-testid="button-theme-toggle"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{isDarkMode ? "Light" : "Dark"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
