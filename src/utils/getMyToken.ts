import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  const cookieStore = await cookies();
  const raw =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;
  if (!raw) return null;

  const decoded = await decode({
    token: raw,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return decoded?.token ?? null; // adjust to whatever your jwt callback stores
}