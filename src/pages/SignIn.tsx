import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded admin credentials - TEMPORARY until backend is set up
    const restaurantAdmin = { email: "jaryd.dev@gmail.com", password: "PantryPilot@01", type: "restaurant" };
    const supplierAdmin = { email: "jaryd.dev1@gmail.com", password: "PantryPilot@01", type: "supplier" };

    setTimeout(() => {
      if (email === restaurantAdmin.email && password === restaurantAdmin.password) {
        localStorage.setItem("userType", "restaurant");
        localStorage.setItem("userEmail", email);
        toast({
          title: "Welcome back!",
          description: "Signed in as Restaurant Admin",
        });
        navigate("/dashboard");
      } else if (email === supplierAdmin.email && password === supplierAdmin.password) {
        localStorage.setItem("userType", "supplier");
        localStorage.setItem("userEmail", email);
        toast({
          title: "Welcome back!",
          description: "Signed in as Supplier Admin",
        });
        navigate("/supplier-dashboard");
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl">PantryPilot</span>
            </Link>
            <h1 className="text-3xl font-bold mt-6">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup/restaurant" className="text-primary hover:underline font-medium">
                Sign up as Restaurant
              </Link>
              {" or "}
              <Link to="/signup/supplier" className="text-primary hover:underline font-medium">
                Supplier
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image/Brand */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 items-center justify-center p-8">
        <div className="text-white max-w-md text-center space-y-6">
          <ChefHat className="h-24 w-24 mx-auto" />
          <h2 className="text-4xl font-bold">Manage Your Kitchen with Ease</h2>
          <p className="text-white/90 text-lg">
            Track inventory, reduce waste, and optimize your restaurant operations all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
