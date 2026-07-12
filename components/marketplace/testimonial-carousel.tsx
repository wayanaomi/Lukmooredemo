"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { StarRating } from "@/components/marketplace/star-rating";
import { avatarUrl } from "@/lib/utils/format";

const testimonials = [
  {
    name: "Chiamaka O.",
    role: "Verified Buyer",
    quote:
      "I've ordered from six different vendors on Lukmoore and every single package arrived exactly as described, on time. The tracking updates are a game changer.",
    rating: 5,
  },
  {
    name: "Brian K.",
    role: "Verified Buyer",
    quote:
      "The checkout experience feels premium — Paystack integration was seamless and I got my invoice instantly. This feels like shopping on a much bigger platform.",
    rating: 5,
  },
  {
    name: "Farida A.",
    role: "Verified Buyer",
    quote:
      "Customer support resolved my refund request in under a day. Lukmoore's buyer protection genuinely works, not just marketing copy.",
    rating: 4.5,
  },
  {
    name: "Tendai M.",
    role: "Verified Buyer",
    quote:
      "As someone who shops mostly on mobile, the app-like experience and fast page loads make browsing categories actually enjoyable.",
    rating: 5,
  },
];

export function TestimonialCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className="!pb-10 mt-8"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.name}>
          <div className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-6">
            <StarRating rating={testimonial.rating} size="sm" />
            <p className="flex-1 text-sm text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                <Image src={avatarUrl(testimonial.name)} alt={testimonial.name} fill />
              </div>
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
