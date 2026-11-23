"use client";
import { updateCartItemQuantity } from "@/services/cart";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function UpdateCartItemQuantity({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  async function handleUpdateItemQuantity(nextCount: number) {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const result = await updateCartItemQuantity(productId, nextCount);
      if (result.success) {
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Couldn't update quantity");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 p-1">
      <button
        onClick={() => handleUpdateItemQuantity(count - 1)}
        type="button"
        aria-label="Decrease quantity"
        disabled={isUpdating || count <= 1}
        className="grid size-6 cursor-pointer place-items-center rounded-md text-slate-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="size-4" />
      </button>

      <span className="min-w-6 text-center text-base font-semibold text-slate-800">{count}</span>

      <button
        onClick={() => handleUpdateItemQuantity(count + 1)}
        type="button"
        aria-label="Increase quantity"
        disabled={isUpdating}
        className="grid size-6 cursor-pointer place-items-center rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-60"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
