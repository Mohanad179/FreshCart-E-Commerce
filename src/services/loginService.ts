import { BASE } from "@/services/API_BASE_URL";

export type LoginUser = {
  // NextAuth requires an id; the API does not return one, so use the email.
  id: string;
  name: string;
  email: string;
  role?: string;
  accessToken: string;
};

type LoginApiResponse = {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    role?: string;
  };
};

// Checks the credentials with the store API. NextAuth calls this from authorize().
export async function loginRequest(email: string, password: string): Promise<LoginUser> {
  let response: Response;

  try {
    response = await fetch(`${BASE}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
      cache: "no-store",
    });
  } catch {
    throw new Error("Unable to connect. Please try again.");
  }

  // the final response of the endpoint
  const result = (await response.json().catch(() => null)) as LoginApiResponse | null;

  if (!response.ok) {
    throw new Error(result?.message || "Email or password is incorrect.");
  }

  if (!result?.token || !result?.user?.email || !result.user.name) {
    throw new Error("The login response was incomplete. Please try again.");
  }

  return {
    id: result.user.email,
    name: result.user.name,
    email: result.user.email,
    role: result.user.role,
    accessToken: result.token,
  };
}
