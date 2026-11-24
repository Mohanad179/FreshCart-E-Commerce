"use client";
import { addToCart } from '@/services/cart';
import { LoaderCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCart } from '@/components/providers/CartContextProvider';

export default function AddToCartBtn({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const { refreshCartCount } = useCart();

  async function handleAddToCart() {
    if (isAdding) return;
    setIsAdding(true);

    try {
      const result = await addToCart(productId);
      if (result.success) {
        void refreshCartCount();
        toast.success('Product added to cart');
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Could not add product to cart');
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding}
        aria-label={isAdding ? 'Adding to cart' : 'Add to cart'}
        className="rounded-full cursor-pointer bg-primary p-2 text-primary-foreground hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60">
        {isAdding ? <LoaderCircle size={20} className="animate-spin" /> : <Plus size={20} />}
    </button>
  );
}
