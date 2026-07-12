import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  className,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
}) {
  const isPositive = (trend ?? 0) >= 0;

  return (
    <Card className={cn("shadow-brand-sm", className)}>
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-heading mt-1 text-2xl font-bold">{value}</p>
          {typeof trend === "number" && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}
            >
              {isPositive ? "+" : ""}
              {trend}% {trendLabel}
            </p>
          )}
        </div>
        <div className="bg-gradient-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardContent>
    </Card>
  );
}
