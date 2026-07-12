"use client";

import { Heart } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { useAppSelector } from "@/store/hooks";

export function WishlistStatCard() {
  const count = useAppSelector((state) => state.wishlist.productIds.length);
  return <StatCard label="Wishlist Items" value={String(count)} icon={Heart} />;
}
