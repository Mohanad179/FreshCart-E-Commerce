"use server";

import getMyToken from "@/utils/getMyToken"; // adjust path

const CART_URL_V2 = "https://ecommerce.routemisr.com/api/v2/cart";

async function cartRequest(path: string, method: string, body?: object) {
  try {
    const token = await getMyToken();
    if (!token) return { success: false, message: "Not authenticated" };

    const res = await fetch(`${CART_URL_V2}${path}`, {
      method,
      cache: "no-store",
      headers: { "Content-Type": "application/json", token: String(token) },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data?.message ?? "Request failed" };
    return { success: true, data };
  } catch {
    return { success: false, message: "Something went wrong" };
  }
}

export async function addToCart(productId: string) {
  return cartRequest("", "POST", { productId });
}

export async function getCart() {
  return cartRequest("", "GET");
}

export async function updateCartItemQuantity(productId: string, count: number) {
  return cartRequest(`/${productId}`, "PUT", { count });
}

export async function removeCartItem(productId: string) {
  return cartRequest(`/${productId}`, "DELETE");
}

export async function clearCart() {
  return cartRequest("", "DELETE");
}

export async function applyCoupon(couponName: string) {
  return cartRequest("/applyCoupon", "PUT", { couponName });
}