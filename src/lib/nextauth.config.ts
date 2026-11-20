import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginRequest } from "@/services/loginService";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "FreshCart",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // safe checking for missing credentials, though NextAuth should prevent this from happening
        if (!credentials?.email || !credentials.password) return null;

        try {
          // Call the login service to validate credentials and get user data
          return await loginRequest(credentials.email, credentials.password);
        } catch {
          // Returning null tells NextAuth that these credentials were rejected.
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
