import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, DollarSign, AlertCircle, Package } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const reportTemplates = [
  {
    id: "food-cost",
    title: "Food Cost Report",
    description: "Total purchases, food cost %, breakdown by category, and trends over time",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    id: "waste-analysis",
    title: "Waste Analysis Report",
    description: "Total waste amount, waste %, top wasted items, and recommendations",
    icon: AlertCircle,
    color: "text-destructive",
  },
  {
    id: "supplier-performance",
    title: "Supplier Performance Report",
    description: "Spend by supplier, on-time delivery rates, price changes, and order frequency",
    icon: TrendingUp,
    color: "text-accent",
  },
  {
    id: "inventory-turnover",
    title: "Inventory Turnover Report",
    description: "Turnover rate by category, slow-moving items, stockout frequency",
    icon: Package,
    color: "text-warning",
  },
];

const Reports = () => {
  const { toast } = useToast();
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<number | null>(null);

  const handleCustomReport = async () => {
    setLoadingCustom(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoadingCustom(false);
    toast({
      title: "Custom Report",
      description: "Custom report builder opened",
    });
  };

  const handleGenerateReport = async (reportId: string, title: string) => {
    setGeneratingReport(reportId);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratingReport(null);
    toast({
      title: "Report Generated",
      description: `${title} has been generated successfully`,
    });
  };

  const handleDownloadReport = async (reportId: string, title: string) => {
    setDownloadingReport(reportId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDownloadingReport(null);
    toast({
      title: "Report Downloaded",
      description: `${title} has been downloaded`,
    });
  };

  const handleManageSchedule = async () => {
    setLoadingSchedule(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoadingSchedule(false);
    toast({
      title: "Schedule Manager",
      description: "Report schedule manager opened",
    });
  };

  const handleEditSchedule = async (index: number) => {
    setEditingSchedule(index);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEditingSchedule(null);
    toast({
      title: "Schedule Edited",
      description: "Report schedule updated",
    });
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate comprehensive reports for strategic insights</p>
        </div>
        <Button onClick={handleCustomReport} disabled={loadingCustom}>
          <FileText className="mr-2 h-4 w-4" />
          {loadingCustom ? "Loading..." : "Custom Report"}
        </Button>
      </div>

      {/* Report Templates */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="shadow-card hover:shadow-elegant transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${template.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription className="mt-2">{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => handleGenerateReport(template.id, template.title)}
                    disabled={generatingReport === template.id}
                  >
                    {generatingReport === template.id ? "Generating..." : "Generate Report"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDownloadReport(template.id, template.title)}
                    disabled={downloadingReport === template.id}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Statistics</CardTitle>
          <CardDescription>Key performance indicators at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Food Cost %</p>
              <p className="text-3xl font-bold">28.5%</p>
              <p className="text-xs text-success">-2.7% vs last month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Waste This Month</p>
              <p className="text-3xl font-bold">$4,982</p>
              <p className="text-xs text-success">-18% vs last month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Inventory Turnover</p>
              <p className="text-3xl font-bold">6.2x</p>
              <p className="text-xs text-muted-foreground">Per month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Orders Processed</p>
              <p className="text-3xl font-bold">47</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automatically generated and emailed reports</CardDescription>
            </div>
            <Button variant="outline" onClick={handleManageSchedule} disabled={loadingSchedule}>
              {loadingSchedule ? "Loading..." : "Manage Schedule"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Weekly Food Cost Summary</p>
                <p className="text-sm text-muted-foreground">Every Monday at 9:00 AM</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditSchedule(0)}
                disabled={editingSchedule === 0}
              >
                {editingSchedule === 0 ? "..." : "Edit"}
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Monthly Waste Analysis</p>
                <p className="text-sm text-muted-foreground">First day of each month at 8:00 AM</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditSchedule(1)}
                disabled={editingSchedule === 1}
              >
                {editingSchedule === 1 ? "..." : "Edit"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
