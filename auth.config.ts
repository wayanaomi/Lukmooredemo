import type { NextAuthConfig } from "next-auth";
type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN" | "SUPER_ADMIN";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
  if (user) {
    token.id = user.id as string;
    token.role = (user.role ?? "CUSTOMER") as UserRole;
  }
  return token;
},

session({ session, token }) {
  if (session.user) {
    session.user.id = token.id as string;
    session.user.role = (token.role as UserRole) ?? "CUSTOMER";
  }
  return session;
},
  },
};
