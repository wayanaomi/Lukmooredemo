import { z } from "zod";

export const vendorApplicationSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters").max(80),
  ownerName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  businessType: z.enum(["individual", "registered_business"]),
  category: z.string().min(1, "Select a primary category"),
  country: z.string().min(1, "Select your country"),
  description: z
    .string()
    .min(30, "Tell us a bit more (at least 30 characters)")
    .max(600, "Keep it under 600 characters"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the Vendor Terms to continue",
  }),
});

export type VendorApplicationInput = z.infer<typeof vendorApplicationSchema>;
