import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  TrendingDown, 
  Package, 
  ShoppingCart,
  Search,
  Mail,
  Bell,
  ChevronRight,
  MoreVertical,
  Plus,
  Users,
  UserPlus
} from "lucide-react";
import { mockMetrics, mockPendingOrders, mockUser } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Dashboard = () => {
  const navigate = useNavigate();

  const chartData = [
    { date: "1-10 Aug", value: 40 },
    { date: "11-20 Aug", value: 48 },
    { date: "21-30 Aug", value: 60 },
    { date: "31-40 Aug", value: 42 },
  ];

  const mentors = [
    { name: "Padhang Satrio", role: "Mentor", avatar: "PS" },
    { name: "Zakir Horizontal", role: "Mentor", avatar: "ZH" },
    { name: "Leonardo Samuel", role: "Mentor", avatar: "LS" },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-screen">
      {/* Main Content */}
      <div className="xl:col-span-8 space-y-6">
        {/* Header with Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your inventory..."
              className="pl-10 bg-white border-border h-12 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3 pl-3 border-l">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-white font-semibold">
                  {mockUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold">{mockUser.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="shadow-elegant border-0 overflow-hidden">
          <div className="bg-gradient-hero p-8 lg:p-10 relative">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
                <path d="M0 200 Q200 100 400 200 T800 200" stroke="white" strokeWidth="2" opacity="0.3"/>
                <path d="M0 220 Q200 120 400 220 T800 220" stroke="white" strokeWidth="2" opacity="0.2"/>
              </svg>
            </div>
            <div className="relative z-10">
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4 border-0">
                INVENTORY MANAGEMENT
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Optimize Your Restaurant Inventory<br/>with AI-Powered Insights
              </h1>
              <Button className="mt-6 bg-black hover:bg-black/90 text-white rounded-full h-11 px-6">
                View Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-card border-0 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-1">{mockPendingOrders.length}/8 watched</p>
              <h3 className="text-lg font-bold">Pending Orders</h3>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-gradient-to-br from-pink-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10">
                <ShoppingCart className="h-6 w-6 text-pink-500" />
              </div>
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-1">3/8 watched</p>
              <h3 className="text-lg font-bold">Low Stock</h3>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-gradient-to-br from-cyan-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                <TrendingDown className="h-6 w-6 text-cyan-500" />
              </div>
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-1">6/10 watched</p>
              <h3 className="text-lg font-bold">Waste Items</h3>
            </CardContent>
          </Card>
        </div>

        {/* Continue Managing Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Continue Managing</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Button>
              <Button variant="default" size="icon" className="rounded-full">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPendingOrders.map((order, index) => (
              <Card 
                key={order.id} 
                className="shadow-card hover:shadow-elegant transition-all cursor-pointer border-0 overflow-hidden group"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="h-40 bg-gradient-to-br from-purple-100 to-purple-50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="h-16 w-16 text-purple-300" />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full h-9 w-9"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-2 text-xs">
                    {order.supplier.toUpperCase()}
                  </Badge>
                  <h3 className="font-semibold mb-2 line-clamp-2">Order #{order.id}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-muted">AI</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">AI Agent</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(index + 1) * 30}%` }}></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Your Orders Section */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Your Orders</CardTitle>
              <Button variant="link" className="text-primary" onClick={() => navigate("/orders")}>
                See all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPendingOrders.slice(0, 2).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-white text-xs">
                        {order.supplier.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{order.supplier}</p>
                      <p className="text-xs text-muted-foreground">{order.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      ORDER STATUS
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="xl:col-span-4 space-y-6">
        {/* Statistic Card */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Statistic</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-white font-bold text-lg">
                      {mockUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  92%
                </div>
              </div>
              <h3 className="text-lg font-bold mt-4">Good Morning {mockUser.name.split(' ')[0]} 🔥</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">
                Continue your learning to achieve your target!
              </p>
            </div>

            <div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem"
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Your Mentor Card */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Team</CardTitle>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mentors.map((mentor) => (
                <div key={mentor.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted font-semibold">
                        {mentor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{mentor.name}</p>
                      <p className="text-xs text-muted-foreground">{mentor.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Follow
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-primary">
              See All
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
