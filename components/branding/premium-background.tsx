import { cn } from "@/lib/utils";

interface PremiumBackgroundProps {
  variant?: "default" | "hero" | "dashboard";
  className?: string;
}

/**
 * Global premium abstract background system for Lukmoore.
 * Composed of soft blurred gradient shapes, a subtle mesh gradient,
 * a faint rotated watermark of the brand mark, and a fine grid overlay —
 * never a stretched copy of the logo itself.
 */
export function PremiumBackground({
  variant = "default",
  className,
}: PremiumBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-50 overflow-hidden",
        className
      )}
    >
      {/* Base mesh gradient */}
      <div
        className="absolute inset-0 opacity-[0.55] dark:opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 8%, color-mix(in oklab, var(--brand-orange) 22%, transparent) 0%, transparent 42%), radial-gradient(circle at 88% 12%, color-mix(in oklab, var(--brand-red) 18%, transparent) 0%, transparent 45%), radial-gradient(circle at 50% 100%, color-mix(in oklab, var(--brand-orange) 14%, transparent) 0%, transparent 55%)",
        }}
      />

      {/* Floating blurred shapes */}
      <div className="animate-float-slow absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-brand opacity-[0.16] blur-3xl dark:opacity-[0.22]" />
      <div className="animate-float absolute top-1/3 -right-32 h-[380px] w-[380px] rounded-full bg-gradient-brand-radial opacity-[0.14] blur-3xl dark:opacity-[0.2]" />
      <div className="animate-float-slow absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full bg-brand-orange opacity-[0.1] blur-3xl dark:opacity-[0.16]" />

      {variant === "hero" && (
        <div className="animate-float absolute top-1/4 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-[0.12] blur-[100px] dark:opacity-[0.18]" />
      )}

      {/* Watermark brand mark, rotated, very low opacity */}
      <svg
        className="absolute top-1/2 right-[-6%] h-[70vh] w-[70vh] -translate-y-1/2 rotate-[-12deg] opacity-[0.035] dark:opacity-[0.05]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <rect x="32" y="58" width="140" height="122" rx="24" fill="currentColor" className="text-brand-red" />
        <path
          d="M78 66C78 40.5949 91.4315 24 108 24C124.569 24 138 40.5949 138 66"
          stroke="currentColor"
          className="text-brand-red"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Fine grid overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Base wash to keep content readable */}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
    </div>
  );
}
