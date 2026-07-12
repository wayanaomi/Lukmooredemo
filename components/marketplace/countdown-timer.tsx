"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function getTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: diff <= 0,
  };
}

export function CountdownTimer({ endsAt, className }: { endsAt: string; className?: string }) {
  const [time, setTime] = useState(() => getTimeLeft(endsAt));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(endsAt)), 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  if (time.expired) {
    return <span className={cn("text-xs font-medium text-muted-foreground", className)}>Sale ended</span>;
  }

  return (
    <div className={cn("flex items-center gap-1 font-mono text-xs font-semibold tabular-nums", className)}>
      {[time.hours, time.minutes, time.seconds].map((unit, index) => (
        <span key={index} className="flex items-center gap-1">
          <span className="rounded-md bg-foreground/90 px-1.5 py-0.5 text-background">
            {unit.toString().padStart(2, "0")}
          </span>
          {index < 2 && <span>:</span>}
        </span>
      ))}
    </div>
  );
}
