import { LandingNav } from "@/components/LandingNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap,
  ChefHat,
  BarChart3,
  Users,
  Clock
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Smart inventory predictions and automated ordering"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track performance with live dashboards and reports"
    },
    {
      icon: Shield,
      title: "Waste Reduction",
      description: "Minimize food waste with intelligent tracking"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and efficiency"
    }
  ];

  const stats = [
    { icon: ChefHat, value: "500+", label: "Restaurants" },
    { icon: BarChart3, value: "30%", label: "Cost Savings" },
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: Clock, value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-8">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-1.5 text-sm font-medium">
              🎉 AI-Powered Inventory Management
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              The most advanced
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                Restaurant Inventory
              </span>
              <br />
              Management System
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered platform to optimize your restaurant operations with intelligent inventory tracking, automated ordering, and real-time insights.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="rounded-full h-12 px-8 bg-foreground text-background hover:bg-foreground/90 shadow-lg"
              >
                Get started free
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="rounded-full h-12 px-8"
              >
                View demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-0 shadow-2xl rounded-3xl overflow-hidden p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Mock Dashboard Preview */}
              <Card className="bg-slate-800/50 border-slate-700/50 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-400">Live</span>
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">Total Orders</p>
                  <p className="text-3xl font-bold text-white">$226.88</p>
                  <p className="text-sm text-green-500">+24% from last week</p>
                </div>
                <div className="mt-4 h-20 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <ChefHat className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Kitchen Manager</p>
                    <p className="text-xs text-slate-400">manager@restaurant.com</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">View Mode</span>
                    <Badge className="bg-slate-700 text-white hover:bg-slate-600 text-xs">
                      Chart view
                    </Badge>
                  </div>
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl"></div>
                </div>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Analytics</span>
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-purple-600"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-3/4"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-1/2"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500 w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 mb-4">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to manage
              <br />
              your restaurant inventory
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your operations and maximize profitability
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-8 border-0 shadow-card hover:shadow-elegant transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-primary via-purple-600 to-primary border-0 p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to optimize your restaurant?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join hundreds of restaurants already using PantryPilot
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="rounded-full h-12 px-8 bg-white text-primary hover:bg-white/90"
              >
                Start free trial
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 border-white text-white hover:bg-white/10"
              >
                Contact sales
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <span>PantryPilot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 PantryPilot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
