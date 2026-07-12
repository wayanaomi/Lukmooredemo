import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-gradient-brand text-xs font-bold tracking-[0.18em] uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {description && (
        <p className={cn("max-w-2xl text-sm text-muted-foreground sm:text-base", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
