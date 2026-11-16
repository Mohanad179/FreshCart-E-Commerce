"use server";
import { cookies } from "next/headers";
import { BASE } from "@/services/API_BASE_URL";
import { loginSchema, LoginValues } from "@/schemas/auth";

export type LoginResult = { success: true } | { success: false; message: string };

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function loginActions(values: LoginValues): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: "Invalid email or password format." };
  }

  try {
    const res = await fetch(`${BASE}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: parsed.data.email.trim(),
        password: parsed.data.password,
      }),
      cache: "no-store",
    });

    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return { success: false, message: result?.message || "Email or password is incorrect." };
    }

    if (!result?.token) {
      return { success: false, message: "Signed in, but no authentication token was returned." };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      ...(parsed.data.remember ? { maxAge: 60 * 60 * 24 * 30 } : {}),
    });

    return { success: true };
  } catch {
    return { success: false, message: "Unable to connect. Please try again." };
  }
}
