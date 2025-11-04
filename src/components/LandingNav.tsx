import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <span>PantryPilot</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#examples" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              Sign in
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
