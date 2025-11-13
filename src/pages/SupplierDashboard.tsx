import { Package, TrendingUp, Users, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SupplierDashboard() {
  const { toast } = useToast();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (action: string) => {
    setLoadingAction(action);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoadingAction(null);
    toast({
      title: action,
      description: `${action} action completed`,
    });
  };
  const stats = [
    {
      title: "Active Orders",
      value: "23",
      change: "+4 from yesterday",
      icon: Package,
      trend: "up"
    },
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12% from last month",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Active Clients",
      value: "18",
      change: "+2 new this week",
      icon: Users,
      trend: "up"
    },
    {
      title: "Pending Deliveries",
      value: "7",
      change: "2 due today",
      icon: Clock,
      trend: "neutral"
    }
  ];

  const recentOrders = [
    { id: "ORD-2401", restaurant: "The Golden Spoon", items: "Fresh Produce, Dairy", amount: "$842", status: "Processing" },
    { id: "ORD-2402", restaurant: "Bella Italia", items: "Meat Products", amount: "$1,234", status: "Shipped" },
    { id: "ORD-2403", restaurant: "Sushi Masters", items: "Fresh Seafood", amount: "$2,150", status: "Delivered" },
    { id: "ORD-2404", restaurant: "Burger Haven", items: "Frozen Products", amount: "$678", status: "Processing" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Supplier Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your orders, deliveries, and client relationships
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{order.id}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{order.restaurant}</p>
                    <p className="text-xs text-muted-foreground">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => handleAction("View All Orders")}
              disabled={loadingAction === "View All Orders"}
            >
              {loadingAction === "View All Orders" ? "Loading..." : "View All Orders"}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => handleAction("Create New Order")}
              disabled={loadingAction === "Create New Order"}
            >
              <Package className="h-4 w-4 mr-2" />
              {loadingAction === "Create New Order" ? "Loading..." : "Create New Order"}
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => handleAction("Manage Clients")}
              disabled={loadingAction === "Manage Clients"}
            >
              <Users className="h-4 w-4 mr-2" />
              {loadingAction === "Manage Clients" ? "Loading..." : "Manage Clients"}
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => handleAction("View Analytics")}
              disabled={loadingAction === "View Analytics"}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              {loadingAction === "View Analytics" ? "Loading..." : "View Analytics"}
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => handleAction("Update Inventory")}
              disabled={loadingAction === "Update Inventory"}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {loadingAction === "Update Inventory" ? "Loading..." : "Update Inventory"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Top Clients This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "The Golden Spoon", orders: 12, revenue: "$8,450" },
              { name: "Bella Italia", orders: 9, revenue: "$6,230" },
              { name: "Sushi Masters", orders: 8, revenue: "$7,890" },
            ].map((client) => (
              <div key={client.name} className="p-4 border rounded-lg space-y-2">
                <h4 className="font-semibold">{client.name}</h4>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{client.orders} orders</span>
                  <span className="font-semibold text-foreground">{client.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
