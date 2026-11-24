"use server";

import { ShippingAddressType } from "@/types/types";

import getMyToken from "@/utils/getMyToken";

export default async function createCashOrder(cartId: string, shippingAddress: ShippingAddressType) {
  const token = await getMyToken();
  if (!token) throw new Error("Please sign in to place your order");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json", token: String(token) },
    body: JSON.stringify({ shippingAddress }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to create cash order");
  return data;
}
