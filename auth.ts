import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/app/(auth)/login/schema";
import { findDemoUser } from "@/lib/data/demo-users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        // Demo accounts work without a database connection so the app is
        // immediately runnable. See docs/ASSUMPTIONS.md.
        const demoUser = findDemoUser(email);
        if (demoUser && demoUser.password === password) {
          return {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            image: demoUser.image,
            role: demoUser.role,
          };
        }

        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user?.passwordHash) return null;

          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
});
