import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { StarRating } from "@/components/marketplace/star-rating";
import { EmptyState } from "@/components/shared/empty-state";
import { customerReviews } from "@/lib/data/customer";
import { formatDate } from "@/lib/utils/format";

export const metadata = { title: "My Reviews" };

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">My Reviews</h1>
        <p className="text-sm text-muted-foreground">Reviews you&apos;ve written for past purchases.</p>
      </div>

      {customerReviews.length === 0 ? (
        <EmptyState icon={Star} title="No reviews yet" description="Reviews you write will appear here." />
      ) : (
        <div className="flex flex-col gap-4">
          {customerReviews.map((review) => (
            <div key={review.id} className="rounded-2xl border bg-card p-5">
              <div className="flex items-start gap-4">
                <Link href={`/products/${review.productSlug}`} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={review.productImage} alt={review.productTitle} fill className="object-cover" />
                </Link>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link href={`/products/${review.productSlug}`} className="text-sm font-semibold hover:text-brand-red">
                      {review.productTitle}
                    </Link>
                    <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
                  </div>
                  <div className="mt-1">
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-2 text-sm font-medium">{review.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                  {review.vendorReply && (
                    <div className="mt-3 rounded-lg bg-muted/60 p-3 text-sm">
                      <p className="text-xs font-semibold text-brand-red">Vendor reply</p>
                      <p className="mt-1 text-muted-foreground">{review.vendorReply}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
