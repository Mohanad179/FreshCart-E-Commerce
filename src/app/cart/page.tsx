import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
} from "lucide-react";
import { getCart } from "@/services/cart";
import { CartData } from "@/types/types";
import RemoveCartItem from "@/components/cartActions/RemoveCartItem";
import ClearCart from "@/components/cartActions/ClearCart";
import UpdateCartItemQuantity from "@/components/cartActions/UpdateCartItemQuantity";
import FeaturesStrip from "@/components/shared/FeaturesStrip";

const money = (amount: number) => new Intl.NumberFormat("en-US").format(amount);

export default async function Cart() {
  const result = await getCart();
  const response = "data" in result ? result.data as { data?: CartData } : null;
  const cart = response?.data;
  const items = cart?.products ?? [];
  const total = cart?.totalCartPrice ?? 0;
  const itemCount = cart?.numOfCartItems ?? items.length;

  return (
    <main className="min-h-[60vh] bg-gray-50/70 px-4 pt-6 pb-0 sm:px-6 lg:pt-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(300px,0.95fr)] lg:gap-5">
        <section aria-label="Shopping cart items" className="min-w-0 space-y-3">
          {items.length > 0 ? (
            items.map((item) => {
              const product = item.product;
              const lineTotal = item.price * item.count;

              return (
                <article
                  key={item._id}
                  className="relative flex min-h-36 gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:gap-5"
                >
                  <div className="flex w-24 shrink-0 flex-col items-center gap-2">
                    <div className="relative size-24 overflow-hidden rounded-lg border border-gray-100 bg-white">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="96px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold leading-none text-white">
                      <Check className="size-3.5" /> In Stock
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col pb-0.5">
                    <h2 className="line-clamp-2 pr-10 text-lg font-semibold leading-6 text-slate-900 sm:line-clamp-1">
                      {product.title}
                    </h2>
                    {/* product category + the id sliced  */}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                        {product.category?.name ?? "Product"}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span>SKU: {product._id.slice(-6).toUpperCase()}</span>
                    </div>
                    <p className="mt-2 text-lg font-bold text-emerald-600">
                      {money(item.price)} EGP <span className="ml-1 text-xs font-normal text-slate-400">per unit</span>
                    </p>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-2">
                      <UpdateCartItemQuantity productId={product._id} count={item.count} />

                      <div className="mr-9 text-right">
                        <span className="block text-xs text-slate-400">Total</span>
                        <span className="text-lg font-bold leading-none text-slate-900">{money(lineTotal)}</span>
                        <span className="ml-0.5 text-[11px] text-slate-400">EGP</span>
                      </div>
                    </div>
                  </div>

                <RemoveCartItem productId={product.id}/>
                </article>
              );
            })
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm">
              <ShoppingBag className="mx-auto size-9 text-gray-300" />
              <h2 className="mt-3 text-lg font-semibold text-slate-800">Your cart is empty</h2>
              <p className="mt-1 text-base text-slate-500">Add something you love and it will show up here.</p>
              <Link href="/shop" className="mt-4 inline-flex text-base font-medium text-emerald-600 hover:text-emerald-700">
                Continue Shopping
              </Link>
            </div>
          )}

          {items.length > 0 && (
            <div className="flex items-center justify-between pt-2 text-base">
              <Link href="/shop" className="font-medium text-emerald-600 hover:text-emerald-700">← Continue Shopping</Link>
              <ClearCart/>
            </div>
          )}
        </section>

        <aside className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-emerald-600 to-green-700 px-4 py-3 text-white sm:px-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="size-4" /> Order Summary
            </h2>
            <p className="mt-1 text-sm text-emerald-50">{itemCount} items in your cart</p>
          </div>

          <div className="space-y-5 p-5">
            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-emerald-50 to-gray-100 px-3 py-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Truck className="size-4" />
              </span>
              <div>
                <p className="text-base font-semibold text-emerald-700">Free Shipping!</p>
                <p className="text-sm text-emerald-600">You qualify for free delivery</p>
              </div>
            </div>

            <div className="space-y-3 text-base">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{money(total)} EGP</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-emerald-600">FREE</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-2.5">
                <div className="flex items-baseline justify-between text-slate-800">
                  <span className="font-semibold">Total</span>
                  <span><strong className="text-xl font-bold">{money(total)}</strong><span className="ml-1 text-xs text-slate-500">EGP</span></span>
                </div>
              </div>
            </div>

            <button type="button" className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 text-sm text-slate-600 hover:bg-gray-50">
              <Tag className="size-4" /> Apply Promo Code
            </button>

            <Link href="/checkout" className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-700 text-base font-semibold text-white shadow-md shadow-emerald-700/15 hover:brightness-105">
              Secure Checkout
            </Link>

            <div className="flex items-center justify-center gap-2.5 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5 text-emerald-500" /> Secure Payment</span>
              <span className="h-3 border-l border-gray-200" />
              <span className="inline-flex items-center gap-1"><Truck className="size-3.5 text-blue-500" /> Fast Delivery</span>
            </div>

            <div className="text-center">
              <Link href="/shop" className="text-xs font-medium text-emerald-600 hover:text-emerald-700">← Continue Shopping</Link>
            </div>
          </div>
        </aside>
      </div>

      <FeaturesStrip/>
    </main>
  );
}
