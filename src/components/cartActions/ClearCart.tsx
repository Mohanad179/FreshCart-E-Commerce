"use client";
import { clearCart } from "@/services/cart";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ClearCart() {
  const [isClearing, setisClearing] = useState(false);
  const router = useRouter();

  async function handleClearCart() {
    if (isClearing) return;
    setisClearing(true);
    try {
      const result = await clearCart();
      if (result.success) {
        toast.success("Cart items Cleared!");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Couldn't clear cart");
    } finally {
      setisClearing(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClearCart}
        className="inline-flex cursor-pointer items-center gap-1.5 text-slate-400 hover:text-red-500"
      >
        <Trash2 className="size-4" /> Clear all items
      </button>
    </>
  );
}
