import { loginSchema } from "@/schemas/auth";
import { BASE } from "@/services/API_BASE_URL";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    // providers take options that are required, and the first one is the 'Credentials'
    Credentials({
      name: "FreshCart",

      credentials: {
        email: { placeholder: "name@example.com" },
        password: { placeholder: "*******" },
      },

      async authorize(credentials) {

        const parsed = loginSchema.safeParse(values);
        if (!parsed.success) {
          return { success: false, message: "Invalid email or password format." };
        }

        const res = await fetch(`${BASE}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: parsed.data.email.trim(),
            password: parsed.data.password,
          }),
          cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
          return {
            success: false,
            message: result?.message || "Email or password is incorrect.",
          };
        }

        if (!result?.token) {
          return {
            success: false,
            message: "Signed in, but no authentication token was returned.",
          };
        }
        return null;
      },
    }),
  ],
};
