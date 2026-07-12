import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  line1: z.string().min(3, "Enter your street address"),
  line2: z.string().optional(),
  city: z.string().min(1, "Enter your city"),
  state: z.string().min(1, "Enter your state/region"),
  country: z.string().min(1, "Select your country"),
  postalCode: z.string().min(1, "Enter your postal code"),
  paymentMethod: z.enum(["paystack", "flutterwave", "stripe"]),
  saveAddress: z.boolean().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
