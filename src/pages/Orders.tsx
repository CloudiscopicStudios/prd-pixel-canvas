import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockOrders } from "@/lib/mock-data";
import { Search, Eye, Check, X, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Pending Approval</Badge>;
      case "Delivered":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Delivered</Badge>;
      case "Sent":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Sent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredOrders = mockOrders.filter(order =>
    order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track all your supplier orders</p>
        </div>
        <Button>Create Manual Order</Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by order number or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                    {getStatusBadge(order.status)}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{order.supplier}</span>
                    <span>•</span>
                    <span>{order.createdAt}</span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">{order.itemCount} items</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Expected Delivery: {order.expectedDelivery}</span>
                  <span>•</span>
                  <span>Created by: {order.createdBy}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/orders/${order.id}`)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  {order.status === "Pending Approval" && (
                    <>
                      <Button variant="default" size="sm">
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  )}
                  {order.status === "Delivered" && (
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
