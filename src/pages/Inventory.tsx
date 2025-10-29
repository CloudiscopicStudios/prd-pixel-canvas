import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockInventoryItems } from "@/lib/mock-data";
import { AlertCircle, CheckCircle, Package, Camera } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Inventory = () => {
  const lowStockCount = mockInventoryItems.filter(item => item.status === "low").length;
  const totalValue = 12847.32;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">Monitor stock levels and conduct counts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Log Count
          </Button>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            Adjust Levels
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInventoryItems.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-warning/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-warning flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{lowStockCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
          <CardDescription>Real-time stock levels and predicted stockout dates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead className="text-right">Unit</TableHead>
                <TableHead className="text-right">Minimum Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Predicted Stockout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInventoryItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{item.current}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.unit}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.min}</TableCell>
                  <TableCell>
                    {item.status === "low" ? (
                      <Badge className="bg-warning/10 text-warning hover:bg-warning/20 flex items-center gap-1 w-fit">
                        <AlertCircle className="h-3 w-3" />
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge className="bg-success/10 text-success hover:bg-success/20 flex items-center gap-1 w-fit">
                        <CheckCircle className="h-3 w-3" />
                        Good
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.stockoutDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
