import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUser } from "@/lib/mock-data";
import { Building2, Bell, ShoppingCart, Package, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [loadingSave, setLoadingSave] = useState<string | null>(null);
  const [loadingInvite, setLoadingInvite] = useState(false);
  const [editingTeam, setEditingTeam] = useState<number | null>(null);

  const handleSave = async (section: string) => {
    setLoadingSave(section);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadingSave(null);
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated`,
    });
  };

  const handleInvite = async () => {
    setLoadingInvite(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoadingInvite(false);
    toast({
      title: "Invitation Sent",
      description: "Team member invitation has been sent",
    });
  };

  const handleEditTeam = async (index: number) => {
    setEditingTeam(index);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEditingTeam(null);
    toast({
      title: "Edit Mode",
      description: "Team member editing opened",
    });
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and restaurant preferences</p>
      </div>

      <Tabs defaultValue="restaurant" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ordering">Ordering</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="restaurant" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Restaurant Profile
              </CardTitle>
              <CardDescription>Basic information about your restaurant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input id="restaurant-name" defaultValue={mockUser.restaurant} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuisine">Cuisine Type</Label>
                  <Input id="cuisine" defaultValue="American" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street, New York, NY 10001" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="covers">Average Covers/Day</Label>
                  <Input id="covers" type="number" defaultValue="150" />
                </div>
              </div>
              <Button onClick={() => handleSave("Restaurant")} disabled={loadingSave === "Restaurant"}>
                {loadingSave === "Restaurant" ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Order Approval Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get notified when orders need your approval</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alerts when inventory is running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Waste Threshold Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notify when waste exceeds threshold</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Digest Email</Label>
                  <p className="text-sm text-muted-foreground">Summary of daily operations</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Report Email</Label>
                  <p className="text-sm text-muted-foreground">Weekly performance summary</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={() => handleSave("Notifications")} disabled={loadingSave === "Notifications"}>
                {loadingSave === "Notifications" ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ordering" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Ordering Preferences
              </CardTitle>
              <CardDescription>Configure default ordering behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order-frequency">Default Order Frequency</Label>
                <Input id="order-frequency" defaultValue="Daily" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-time">Default Lead Time (days)</Label>
                <Input id="lead-time" type="number" defaultValue="1" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Approve Orders Under $500</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve small orders</p>
                </div>
                <Switch />
              </div>
              <Button onClick={() => handleSave("Notifications")} disabled={loadingSave === "Notifications"}>
                {loadingSave === "Notifications" ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Settings
              </CardTitle>
              <CardDescription>Configure inventory tracking defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-shelf-life">Default Shelf Life (days)</Label>
                <Input id="default-shelf-life" type="number" defaultValue="7" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Photo Verification for Counts</Label>
                  <p className="text-sm text-muted-foreground">Require photos when logging inventory</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Variance Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert when count variance exceeds 15%</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={() => handleSave("Inventory")} disabled={loadingSave === "Inventory"}>
                {loadingSave === "Inventory" ? "Saving..." : "Save Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Management
                  </CardTitle>
                  <CardDescription>Invite and manage team members</CardDescription>
                </div>
                <Button onClick={handleInvite} disabled={loadingInvite}>
                  {loadingInvite ? "Sending..." : "Invite Team Member"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">{mockUser.name}</p>
                    <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{mockUser.role}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleEditTeam(0)} disabled={editingTeam === 0}>
                      {editingTeam === 0 ? "..." : "Edit"}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Jose Rodriguez</p>
                    <p className="text-sm text-muted-foreground">jose@thegourmetkitchen.com</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Kitchen Staff</span>
                    <Button variant="ghost" size="sm" onClick={() => handleEditTeam(1)} disabled={editingTeam === 1}>
                      {editingTeam === 1 ? "..." : "Edit"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
