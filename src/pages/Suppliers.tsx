import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSuppliers } from "@/lib/mock-data";
import { Star, Mail, Phone, Plus, Eye, Edit } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Suppliers = () => {
  const { toast } = useToast();
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<string | null>(null);
  const [viewingSupplier, setViewingSupplier] = useState<string | null>(null);
  const [orderingSupplier, setOrderingSupplier] = useState<string | null>(null);

  const handleAddSupplier = async () => {
    setLoadingAdd(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoadingAdd(false);
    toast({
      title: "Supplier Added",
      description: "New supplier has been added successfully",
    });
  };

  const handleEditSupplier = async (supplierId: string, name: string) => {
    setEditingSupplier(supplierId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEditingSupplier(null);
    toast({
      title: "Edit Mode",
      description: `Editing ${name}`,
    });
  };

  const handleViewDetails = async (supplierId: string, name: string) => {
    setViewingSupplier(supplierId);
    await new Promise(resolve => setTimeout(resolve, 800));
    setViewingSupplier(null);
    toast({
      title: "Details Loaded",
      description: `Viewing details for ${name}`,
    });
  };

  const handleNewOrder = async (supplierId: string, name: string) => {
    setOrderingSupplier(supplierId);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOrderingSupplier(null);
    toast({
      title: "New Order Created",
      description: `Order created for ${name}`,
    });
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships and performance</p>
        </div>
        <Button onClick={handleAddSupplier} disabled={loadingAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {loadingAdd ? "Adding..." : "Add Supplier"}
        </Button>
      </div>

      {/* Suppliers List */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockSuppliers.map((supplier) => (
          <Card key={supplier.id} className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {supplier.preferred && <Star className="h-5 w-5 fill-warning text-warning" />}
                    <CardTitle className="text-xl">{supplier.name}</CardTitle>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Mail className="h-4 w-4" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4" />
                      <span>{supplier.phone}</span>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditSupplier(supplier.id, supplier.name)}
                    disabled={editingSupplier === supplier.id}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Contact Person</span>
                <span className="font-medium">{supplier.contact}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Order</span>
                <span className="font-medium">{supplier.lastOrder}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">YTD Spend</span>
                <span className="font-medium">${supplier.ytdSpend.toLocaleString()}</span>
              </div>
              
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                  <Badge className="bg-success/10 text-success hover:bg-success/20">
                    {supplier.onTimeRate}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Delivery Time</span>
                  <span className="text-sm font-medium">
                    {supplier.avgDeliveryDays === 0 ? "Pick-up" : `${supplier.avgDeliveryDays} days`}
                  </span>
                </div>
              </div>

              {supplier.notes && (
                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground italic">{supplier.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewDetails(supplier.id, supplier.name)}
                  disabled={viewingSupplier === supplier.id}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {viewingSupplier === supplier.id ? "Loading..." : "View Details"}
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => handleNewOrder(supplier.id, supplier.name)}
                  disabled={orderingSupplier === supplier.id}
                >
                  {orderingSupplier === supplier.id ? "Creating..." : "New Order"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
