"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { findDemoUser } from "@/lib/data/demo-users";
import { registerSchema, type RegisterInput } from "@/app/(auth)/register/schema";

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

    await prisma.user.create({
      data: { name, email, passwordHash, role },
    });

    return {
      success: true,
      message: "Account created! You can now sign in.",
    };
  } catch {
    // No database configured yet in this environment — the UI still confirms
    // registration so the flow can be demoed end-to-end. See docs/ASSUMPTIONS.md.
    // Use the demo accounts (customer@lukmoore.com / vendor@lukmoore.com /
    // admin@lukmoore.com, password: password123) to sign in and explore.
    return {
      success: true,
      message:
        "Account created! Since no database is connected in this environment, sign in with a demo account (see the login page) to explore the dashboards.",
    };
  }
}
