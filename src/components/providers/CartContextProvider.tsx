"use client";

import { getCart } from "@/services/cart";
import { CartContextValue } from "@/types/types";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartContextProvider");
  return context;
}

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const { status } = useSession();

  const refreshCartCount = useCallback(async () => {
    const result = await getCart();
    if (!result.success) return;

    const payload = result.data;
    const count = payload?.data?.numOfCartItems ?? payload?.numOfCartItems;
    if (typeof count === "number") setNumberOfCartItems(count);
  }, []);

  const resetCartCount = useCallback(() => setNumberOfCartItems(0), []);

  useEffect(() => {
    if (status !== "authenticated") return;
    let isMounted = true;

    getCart().then((result) => {
      if (!isMounted || !result.success) return;
      const payload = result.data;
      const count = payload?.data?.numOfCartItems ?? payload?.numOfCartItems;
      if (typeof count === "number") setNumberOfCartItems(count);
    });

    return () => {
      isMounted = false;
    };
  }, [status]);

  return (
    <CartContext.Provider value={{ numberOfCartItems, refreshCartCount, resetCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
