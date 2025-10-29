import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingDown, 
  Package, 
  ShoppingCart,
  Package2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  MessageSquare
} from "lucide-react";
import { mockMetrics, mockPendingOrders, mockSalesData, mockActivity } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order": return Package2;
      case "sync": return RefreshCw;
      case "waste": return AlertCircle;
      case "approval": return CheckCircle;
      default: return Package2;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your inventory.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Food Cost %"
          value={`${mockMetrics.foodCostPercent.current}%`}
          change={{
            value: Math.abs(mockMetrics.foodCostPercent.change),
            type: "decrease",
            isPositive: true,
          }}
          icon={DollarSign}
          iconColor="text-primary"
        />
        <MetricCard
          title="Total Waste"
          value={`$${mockMetrics.wasteAmount.current.toLocaleString()}`}
          change={{
            value: Math.abs(mockMetrics.wasteAmount.change),
            type: "decrease",
            isPositive: true,
          }}
          icon={TrendingDown}
          iconColor="text-destructive"
        />
        <MetricCard
          title="Inventory Value"
          value={`$${mockMetrics.inventoryValue.current.toLocaleString()}`}
          change={{
            value: Math.abs(mockMetrics.inventoryValue.change),
            type: "increase",
            isPositive: false,
          }}
          icon={Package}
          iconColor="text-accent"
        />
        <MetricCard
          title="Pending Orders"
          value={mockMetrics.pendingOrders}
          icon={ShoppingCart}
          iconColor="text-warning"
        />
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features at your fingertips</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => navigate("/orders")} variant="default">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Review Pending Orders
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with AI Support
          </Button>
          <Button variant="outline" onClick={() => navigate("/inventory")}>
            <Package className="mr-2 h-4 w-4" />
            Run Inventory Count
          </Button>
          <Button variant="outline" onClick={() => navigate("/reports")}>
            <DollarSign className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Orders */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
            <CardDescription>Orders awaiting your approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPendingOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{order.supplier}</p>
                    <span className="inline-flex items-center rounded-full bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>${order.total.toFixed(2)}</span>
                    <span>•</span>
                    <span>{order.itemCount} items</span>
                    <span>•</span>
                    <span>{order.createdAt}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => navigate(`/orders/${order.id}`)}>
                    Review
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => navigate("/orders")}>
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Sales & Waste Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Sales & Waste Trend</CardTitle>
            <CardDescription>30-day overview of sales and waste</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Sales ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="waste" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Waste ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your restaurant operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
