import { type LucideIcon, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-16 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
        <Icon className="h-7 w-7 text-accent-foreground" />
      </div>
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}
