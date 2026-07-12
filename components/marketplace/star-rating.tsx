import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  size = "sm",
  showValue = false,
  reviewCount,
}: {
  rating: number;
  size?: "xs" | "sm" | "md";
  showValue?: boolean;
  reviewCount?: number;
}) {
  const sizeClass = size === "xs" ? "h-3 w-3" : size === "md" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = rating >= index + 1;
          const half = !filled && rating > index && rating < index + 1;
          return (
            <span key={index} className="relative inline-flex">
              <Star className={cn(sizeClass, "text-muted-foreground/30")} />
              {(filled || half) && (
                <Star
                  className={cn(
                    sizeClass,
                    "absolute inset-0 fill-brand-orange text-brand-orange"
                  )}
                  style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
                />
              )}
            </span>
          );
        })}
      </div>
      {showValue && <span className="text-xs font-medium text-muted-foreground">{rating.toFixed(1)}</span>}
      {typeof reviewCount === "number" && (
        <span className="text-xs text-muted-foreground">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
