"use client";

import { addToCart } from "@/services/cart";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetailsActions({
  productId,
  availableQuantity,
  unitPrice,
}: {
  productId: string;
  availableQuantity: number;
  unitPrice: number;
}) {
  const [count, setCount] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  async function handleAddToCart(buyNow = false) {
    if (isAdding || availableQuantity < 1) return;
    setIsAdding(true);

    let addedCount = 0;
    try {
      for (let i = 0; i < count; i += 1) {
        const result = await addToCart(productId);
        if (!result.success) {
          toast.error(
            addedCount > 0
              ? `Added ${addedCount} of ${count} items. ${result.message}`
              : result.message,
          );
          if (addedCount > 0) router.refresh();
          return;
        }
        addedCount += 1;
      }

      toast.success(`${count} ${count === 1 ? "item" : "items"} added to cart`);
      if (buyNow) {
        router.push("/cart");
      } else {
        router.refresh();
      }
    } catch {
      toast.error(
        addedCount > 0
          ? `Added ${addedCount} of ${count} items. Could not finish adding to cart.`
          : "Could not add product to cart",
      );
      if (addedCount > 0) router.refresh();
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <>
      <p className="mb-2 mt-6 text-sm font-medium">Quantity</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setCount((current) => Math.max(1, current - 1))}
            disabled={count <= 1 || isAdding}
            className="cursor-pointer p-3 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center font-medium">{count}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setCount((current) => Math.min(availableQuantity, current + 1))}
            disabled={count >= availableQuantity || isAdding}
            className="cursor-pointer p-3 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <span className="text-sm text-gray-500">{availableQuantity} available</span>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-4">
        <span className="text-gray-700">Total Price:</span>
        <span className="text-xl font-bold text-primary sm:text-2xl">
          {(unitPrice * count).toFixed(2)} EGP
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          disabled={availableQuantity < 1 || isAdding}
          onClick={() => handleAddToCart()}
          className="h-12 cursor-pointer rounded-xl text-sm disabled:cursor-not-allowed"
        >
          {isAdding ? <LoaderCircle className="size-5 animate-spin" /> : <ShoppingCart className="size-5" />}
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
        <Button
          type="button"
          disabled={availableQuantity < 1 || isAdding}
          onClick={() => handleAddToCart(true)}
          className="h-12 cursor-pointer rounded-xl bg-slate-900 text-sm hover:bg-slate-800 disabled:cursor-not-allowed"
        >
          <Zap className="size-5" /> Buy Now
        </Button>
      </div>
    </>
  );
}
