"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border bg-muted">
        <Image src={images[active]} alt={title} fill priority className="object-cover" />
      </div>
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActive(index)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:h-20 sm:w-20",
              active === index ? "border-brand-red" : "border-transparent"
            )}
            aria-label={`View image ${index + 1}`}
          >
            <Image src={image} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
