"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/lib/data/categories";
import { formatCurrency } from "@/lib/utils/format";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("min") ?? 0),
    Number(searchParams.get("max") ?? 400),
  ]);

  const activeCategories = searchParams.get("categories")?.split(",").filter(Boolean) ?? [];
  const minRating = searchParams.get("rating");

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function toggleCategory(slug: string) {
    const next = activeCategories.includes(slug)
      ? activeCategories.filter((c) => c !== slug)
      : [...activeCategories, slug];
    updateParam("categories", next.length > 0 ? next.join(",") : null);
  }

  function applyPriceRange() {
    updateParam("min", priceRange[0] > 0 ? String(priceRange[0]) : null);
    updateParam("max", priceRange[1] < 400 ? String(priceRange[1]) : null);
  }

  function clearFilters() {
    router.push("?", { scroll: false });
    setPriceRange([0, 400]);
  }

  const content = (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Category</h3>
        <div className="flex flex-col gap-2.5">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={activeCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Price range</h3>
        <Slider
          min={0}
          max={400}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          onValueCommit={applyPriceRange}
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatCurrency(priceRange[0])}</span>
          <span>{formatCurrency(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Minimum rating</h3>
        <div className="flex flex-col gap-2.5">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={minRating === String(rating)}
                onCheckedChange={(checked) => updateParam("rating", checked ? String(rating) : null)}
              />
              {rating}+ stars
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={searchParams.get("freeShipping") === "1"}
            onCheckedChange={(checked) => updateParam("freeShipping", checked ? "1" : null)}
          />
          Free shipping only
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={searchParams.get("sale") === "1"}
            onCheckedChange={(checked) => updateParam("sale", checked ? "1" : null)}
          />
          On sale
        </label>
      </div>

      <Button variant="outline" onClick={clearFilters}>
        Clear all filters
      </Button>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border bg-card p-5">{content}</div>
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">{content}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
