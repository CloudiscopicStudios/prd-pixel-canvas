import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWasteData } from "@/lib/mock-data";
import { Plus, AlertCircle } from "lucide-react";
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
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const Waste = () => {
  const { toast } = useToast();
  const [loadingLogWaste, setLoadingLogWaste] = useState(false);

  const handleLogWaste = async () => {
    setLoadingLogWaste(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadingLogWaste(false);
    toast({
      title: "Waste Logged",
      description: "Waste entry has been recorded",
    });
  };
  const totalWasteCost = mockWasteData.reduce((sum, item) => sum + item.cost, 0);
  const totalWasteAmount = mockWasteData.reduce((sum, item) => sum + item.amount, 0);

  const wasteByReason = mockWasteData.reduce((acc, item) => {
    const existing = acc.find(r => r.name === item.reason);
    if (existing) {
      existing.value += item.cost;
    } else {
      acc.push({ name: item.reason, value: item.cost });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ["hsl(var(--destructive))", "hsl(var(--warning))", "hsl(var(--primary))"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Waste Tracking</h1>
          <p className="text-muted-foreground">Monitor and reduce food waste across your operations</p>
        </div>
        <Button onClick={handleLogWaste} disabled={loadingLogWaste}>
          <Plus className="mr-2 h-4 w-4" />
          {loadingLogWaste ? "Logging..." : "Log Waste"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Waste Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalWasteCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items Wasted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockWasteData.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Logged entries</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Waste Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <p className="text-xs text-muted-foreground mt-1">Of total inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Waste Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Waste by Reason</CardTitle>
            <CardDescription>Understanding why waste happens</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteByReason}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteByReason.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card border-warning/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Actions to reduce waste</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-semibold">1.</span>
                <div>
                  <p className="font-medium">Reduce Chicken Breast orders by 15%</p>
                  <p className="text-sm text-muted-foreground">High spoilage rate detected over the past 2 weeks</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">2.</span>
                <div>
                  <p className="font-medium">Implement FIFO for lettuce storage</p>
                  <p className="text-sm text-muted-foreground">First-in-first-out can reduce prep errors</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">3.</span>
                <div>
                  <p className="font-medium">Review Ground Beef order quantities</p>
                  <p className="text-sm text-muted-foreground">Consistent over-ordering pattern detected</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recent Waste Log */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Waste Log</CardTitle>
          <CardDescription>Detailed waste entries from the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWasteData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell className="text-right">{item.amount} lbs</TableCell>
                  <TableCell className="text-right text-destructive font-medium">${item.cost.toFixed(2)}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell className="text-muted-foreground">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Waste;
