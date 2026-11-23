"use client";
import { removeCartItem } from "@/services/cart";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RemoveCartItem({ productId }: { productId: string }) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleRemoveItem() {
    if (isRemoving) return;
    setIsRemoving(true);
    try {
      const result = await removeCartItem(productId);
      if (result.success) {
        toast.success("Item Removed Successfully!");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Could not remove item");
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <>
      <button
        onClick={handleRemoveItem}
        type="button"
        disabled={isRemoving}
        aria-label={`Remove Item from cart`}
        className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 disabled:cursor-wait disabled:opacity-60 sm:right-4"
      >
        <Trash2 className="size-4" />
      </button>
    </>
  );
}
