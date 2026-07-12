import Image from "next/image";
import { ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/marketplace/star-rating";
import { avatarUrl, formatDate } from "@/lib/utils/format";
import type { Product, ProductReview } from "@/types/marketplace";

export function ProductReviews({ product, reviews }: { product: Product; reviews: ProductReview[] }) {
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { star, count, percent: reviews.length ? Math.round((count / reviews.length) * 100) : 0 };
  });

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr]">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-4xl font-bold">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">/ 5</span>
        </div>
        <StarRating rating={product.rating} size="md" />
        <p className="mt-1 text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} ratings</p>

        <div className="mt-5 flex flex-col gap-2">
          {distribution.map((row) => (
            <div key={row.star} className="flex items-center gap-2 text-xs">
              <span className="w-8 text-muted-foreground">{row.star} star</span>
              <Progress value={row.percent} className="h-2 flex-1" />
              <span className="w-8 text-right text-muted-foreground">{row.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col divide-y">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 py-5 first:pt-0">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image src={avatarUrl(review.customerName)} alt={review.customerName} fill />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{review.customerName}</p>
                <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
              </div>
              <StarRating rating={review.rating} size="xs" />
              {review.verifiedPurchase && (
                <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                  Verified Purchase
                </span>
              )}
              <p className="mt-2 text-sm font-medium">{review.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
              <Button variant="ghost" size="sm" className="mt-2 h-7 gap-1.5 px-2 text-xs text-muted-foreground">
                <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({review.helpfulCount})
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
