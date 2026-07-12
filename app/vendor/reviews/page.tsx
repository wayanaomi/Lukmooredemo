"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/shared/empty-state";
import { vendorReviews as initialReviews, type VendorReview } from "@/lib/data/vendor-dashboard";
import { formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

export default function VendorReviewsPage() {
  const [reviews, setReviews] = useState<VendorReview[]>(initialReviews);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  async function submitReply(id: string) {
    const reply = drafts[id]?.trim();
    if (!reply) return;
    setSubmittingId(id);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, vendorReply: reply } : r)));
    setSubmittingId(null);
    toast.success("Reply posted");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Customer Reviews</h1>
        <p className="text-sm text-muted-foreground">Respond to feedback on your products.</p>
      </div>

      {reviews.length === 0 ? (
        <EmptyState icon={Star} title="No reviews yet" description="Reviews from customers will appear here." />
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.customerAvatar} />
                    <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{review.customerName}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < review.rating ? "fill-warning text-warning" : "text-muted-foreground"
                          )}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/products/${review.productId}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-muted">
                    <Image src={review.productImage} alt={review.productTitle} fill className="object-cover" />
                  </div>
                  <span className="max-w-[140px] truncate">{review.productTitle}</span>
                </Link>
              </div>
              <p className="mt-3 text-sm font-medium">{review.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>

              {review.vendorReply ? (
                <div className="mt-3 rounded-xl bg-muted p-3">
                  <p className="text-xs font-semibold text-muted-foreground">Your reply</p>
                  <p className="mt-1 text-sm">{review.vendorReply}</p>
                </div>
              ) : (
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <Textarea
                    rows={1}
                    placeholder="Write a public reply..."
                    value={drafts[review.id] ?? ""}
                    onChange={(e) => setDrafts((prev) => ({ ...prev, [review.id]: e.target.value }))}
                    className="min-h-9 flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={submittingId === review.id || !drafts[review.id]?.trim()}
                    onClick={() => submitReply(review.id)}
                  >
                    {submittingId === review.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <MessageSquare className="h-3.5 w-3.5" />
                    )}
                    Reply
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
