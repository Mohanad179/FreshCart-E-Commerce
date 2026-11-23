import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  const cookieStore = await cookies();
  const raw =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!raw || !secret) return null;

  try {
    const decoded = await decode({ token: raw, secret });
    return typeof decoded?.accessToken === "string" ? decoded.accessToken : null;
  } catch {
    return null;
  }

}
