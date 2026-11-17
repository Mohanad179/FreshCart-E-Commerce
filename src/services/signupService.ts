// services/signupService.ts
import { signupSchema, SignupValues } from "@/schemas/auth";
import { BASE } from "./API_BASE_URL";

export type SignupResult = { success: true } | { success: false; message: string };

export async function signupActions(values: SignupValues): Promise<SignupResult> {
  const parsed = signupSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid form data." };
  }

  try {
    const res = await fetch(`${BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: parsed.data.name.trim(),
        email: parsed.data.email.trim(),
        password: parsed.data.password,
        rePassword: parsed.data.rePassword,
        phone: parsed.data.phone.trim().replace(/[\s()-]/g, ""),
      }),
      cache: "no-store",
    });

    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Could not create your account. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Unable to connect. Please try again." };
  }
}