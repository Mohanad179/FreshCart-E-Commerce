"use client";

import { FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import createCashOrder from "@/services/orders";
import { useCart } from "@/components/providers/CartContextProvider";

export default function CashOrderForm({
  cartId,
  children,
}: {
  cartId: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const { refreshCartCount } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      await createCashOrder(cartId, {
        details: String(formData.get("address") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        city: String(formData.get("city") ?? "").trim(),
        postalCode: String(formData.get("postalCode") ?? "").trim(),
      });
      toast.success("Your cash on delivery order was placed");
      await refreshCartCount();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not place your order");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
