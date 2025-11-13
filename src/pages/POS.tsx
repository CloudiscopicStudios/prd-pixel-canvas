import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPosData, mockMenuItems } from "@/lib/mock-data";
import { CheckCircle, RefreshCw, Settings, Link2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const POS = () => {
  const { toast } = useToast();
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [loadingSync, setLoadingSync] = useState(false);
  const [loadingReconnect, setLoadingReconnect] = useState(false);
  const [loadingBulkMap, setLoadingBulkMap] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [mappingItem, setMappingItem] = useState<string | null>(null);

  const handleSettings = async () => {
    setLoadingSettings(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoadingSettings(false);
    toast({
      title: "Settings Opened",
      description: "POS settings loaded",
    });
  };

  const handleSync = async () => {
    setLoadingSync(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoadingSync(false);
    toast({
      title: "Sync Complete",
      description: "POS data synchronized successfully",
    });
  };

  const handleReconnect = async () => {
    setLoadingReconnect(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoadingReconnect(false);
    toast({
      title: "Reconnected",
      description: "POS connection re-established",
    });
  };

  const handleMapItem = async (itemId: string, itemName: string) => {
    setMappingItem(itemId);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMappingItem(null);
    toast({
      title: "Item Mapped",
      description: `${itemName} has been mapped to inventory`,
    });
  };

  const handleBulkMap = async () => {
    setLoadingBulkMap(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setLoadingBulkMap(false);
    toast({
      title: "Bulk Mapping Complete",
      description: "Selected items have been mapped",
    });
  };

  const handleExport = async () => {
    setLoadingExport(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoadingExport(false);
    toast({
      title: "CSV Exported",
      description: "Menu items exported successfully",
    });
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">POS Management</h1>
          <p className="text-muted-foreground">Manage your Point of Sale integration and menu items</p>
        </div>
        <Button variant="outline" onClick={handleSettings} disabled={loadingSettings}>
          <Settings className="mr-2 h-4 w-4" />
          {loadingSettings ? "Loading..." : "POS Settings"}
        </Button>
      </div>

      {/* Connection Status */}
      <Card className="shadow-card border-success/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Connected to {mockPosData.provider} POS
              </CardTitle>
              <CardDescription className="mt-2">
                Your POS system is connected and syncing data automatically
              </CardDescription>
            </div>
            <Badge className="bg-success/10 text-success hover:bg-success/20">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Last Sync</p>
              <p className="text-lg font-semibold">{mockPosData.lastSync}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Sync</p>
              <p className="text-lg font-semibold">{mockPosData.nextSync}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Menu Items</p>
              <p className="text-lg font-semibold">{mockPosData.menuItemsCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-lg font-semibold">{mockPosData.categoriesCount}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button onClick={handleSync} disabled={loadingSync}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loadingSync ? 'animate-spin' : ''}`} />
              {loadingSync ? "Syncing..." : "Sync Now"}
            </Button>
            <Button variant="outline" onClick={handleReconnect} disabled={loadingReconnect}>
              <Link2 className="mr-2 h-4 w-4" />
              {loadingReconnect ? "Connecting..." : "Reconnect"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Mapping */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Menu Items Management</CardTitle>
          <CardDescription>Map your menu items to inventory ingredients for accurate predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Mapped To</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMenuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">${item.price}</TableCell>
                  <TableCell>
                    {item.mapped ? (
                      <Badge className="bg-success/10 text-success hover:bg-success/20">{item.mapped}</Badge>
                    ) : (
                      <Badge variant="secondary">Not Mapped</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.unit || "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMapItem(item.id, item.name)}
                      disabled={mappingItem === item.id}
                    >
                      {mappingItem === item.id ? "..." : item.mapped ? "Edit" : "Map"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={handleBulkMap} disabled={loadingBulkMap}>
              {loadingBulkMap ? "Mapping..." : "Bulk Map Selected"}
            </Button>
            <Button variant="outline" onClick={handleExport} disabled={loadingExport}>
              {loadingExport ? "Exporting..." : "Export CSV"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default POS;
