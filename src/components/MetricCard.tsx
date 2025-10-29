import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
    isPositive?: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
}

export function MetricCard({ title, value, change, icon: Icon, iconColor = "text-primary" }: MetricCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center gap-1 mt-1">
            {change.type === "increase" ? (
              <ArrowUp className={`h-4 w-4 ${change.isPositive ? "text-success" : "text-destructive"}`} />
            ) : (
              <ArrowDown className={`h-4 w-4 ${change.isPositive ? "text-success" : "text-destructive"}`} />
            )}
            <span className={`text-sm font-medium ${change.isPositive ? "text-success" : "text-destructive"}`}>
              {Math.abs(change.value)}
            </span>
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
