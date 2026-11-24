"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/CartContextProvider";

export default function CartIcon() {
  const { numberOfCartItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart${numberOfCartItems ? `, ${numberOfCartItems} items` : ""}`}
      className="relative inline-flex size-10 items-center justify-center rounded-md hover:bg-accent hover:text-primary"
    >
      <ShoppingCart className="size-6" />
      {numberOfCartItems > 0 && (
        <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold leading-none text-primary-foreground">
          {numberOfCartItems > 99 ? "99+" : numberOfCartItems}
        </span>
      )}
    </Link>
  );
}
