"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { findDemoUser } from "@/lib/data/demo-users";
import { registerSchema, type RegisterInput } from "@/app/(auth)/register/schema";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface RegisterResult {
  success: boolean;
  message: string;
}

export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid registration data.",
    };
  }

  const { name, email, password, role } = parsed.data;

  if (findDemoUser(email)) {
    return {
      success: false,
      message: "This email is reserved for a demo account. Please use a different email.",
    };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.$transaction(async (tx) => {
  const createdUser = await tx.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
    },
  });

  if (role === "VENDOR") {
    let slug = generateSlug(name);

    let count = 1;

    while (await tx.store.findUnique({ where: { slug } })) {
      slug = `${generateSlug(name)}-${count++}`;
    }

    await tx.store.create({
      data: {
        ownerId: createdUser.id,
        name: `${name}'s Store`,
        slug,
        status: "PENDING",
        kycStatus: "NOT_SUBMITTED",
      },
    });
  }

  return createdUser;
});

    return {
      success: true,
      message: "Account created! You can now sign in.",
    };
    } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong while creating your account.",
    };
  }
}
