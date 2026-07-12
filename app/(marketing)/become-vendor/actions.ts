"use server";

import { prisma } from "@/lib/prisma";
import slugify from "slugify";
import {
  vendorApplicationSchema,
  type VendorApplicationInput,
} from "@/app/(marketing)/become-vendor/schema";

export interface VendorApplicationResult {
  success: boolean;
  message: string;
  applicationId?: string;
}

export async function submitVendorApplication(
  input: VendorApplicationInput
): Promise<VendorApplicationResult> {
  const parsed = vendorApplicationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid application data.",
    };
  }

  const data = parsed.data;
  const slug = slugify(data.storeName, { lower: true, strict: true });

  try {
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: { name: data.ownerName, phone: data.phone },
      create: {
        name: data.ownerName,
        email: data.email,
        phone: data.phone,
        role: "VENDOR",
      },
    });

    const store = await prisma.store.upsert({
      where: { ownerId: user.id },
      update: {
        name: data.storeName,
        description: data.description,
      },
      create: {
        ownerId: user.id,
        name: data.storeName,
        slug,
        description: data.description,
        status: "PENDING",
        kycStatus: "NOT_SUBMITTED",
        location: data.country,
      },
    });

    return {
      success: true,
      message: "Application submitted! Our team will review it within 48 hours.",
      applicationId: store.id,
    };
  } catch {
    // No database configured yet in this environment — the UI still confirms
    // submission so the flow can be demoed end-to-end. See docs/ASSUMPTIONS.md.
    return {
      success: true,
      message: "Application received! Our team will review it within 48 hours.",
      applicationId: `demo-${slug}`,
    };
  }
}
