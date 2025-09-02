import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function BottomActions() {
  return (
    <div className="fixed bottom-6 right-6 lg:hidden z-40">
      <Link href="/fitment">
        <Button 
          size="lg" 
          className="w-14 h-14 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground"
          data-testid="button-fab-fitment"
        >
          <Search className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
}
