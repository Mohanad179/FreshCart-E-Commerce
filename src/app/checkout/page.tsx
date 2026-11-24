import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  Check,
  CreditCard,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import FeaturesStrip from "@/components/shared/FeaturesStrip";
import { getCart } from "@/services/cart";
import { CartData } from "@/types/types";

const money = (amount: number) => new Intl.NumberFormat("en-US").format(amount);

export default async function CheckoutPage() {
  const result = await getCart();
  const response = "data" in result ? result.data as { data?: CartData } : null;
  const cart = response?.data;
  const items = cart?.products ?? [];
  const total = cart?.totalCartPrice ?? 0;
  const itemCount = cart?.numOfCartItems ?? items.reduce((sum, item) => sum + item.count, 0);

  return (
    <main className="min-h-[60vh] bg-gray-50/70 px-4 pt-6 pb-0 sm:px-6 lg:pt-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              <ShoppingBag className="size-6 text-emerald-600" /> Complete Your Order
            </h1>
            <p className="mt-1 text-sm text-slate-500">Review your items and complete your purchase</p>
          </div>
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="size-4" /> Back to Cart
          </Link>
        </div>

        {items.length === 0 ? (
          <section className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm">
            <ShoppingBag className="mx-auto size-9 text-gray-300" />
            <h2 className="mt-3 text-lg font-semibold text-slate-800">Your cart is empty</h2>
            <p className="mt-1 text-base text-slate-500">Add something you love before checking out.</p>
            <Link href="/shop" className="mt-4 inline-flex text-base font-medium text-emerald-600 hover:text-emerald-700">Continue Shopping</Link>
          </section>
        ) : (
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(300px,0.95fr)] lg:gap-5">
            <div className="space-y-4">
              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-emerald-600 to-green-700 px-4 py-3 text-white">
                  <h2 className="flex items-center gap-2 text-lg font-bold"><MapPin className="size-4" /> Shipping Address</h2>
                  <p className="mt-1 text-sm text-emerald-50">Where should we deliver your order?</p>
                </div>
                <div className="space-y-4 p-4 sm:p-5">
                  <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 text-sm text-emerald-800">
                    <p className="font-semibold">Delivery Information</p>
                    <p className="mt-0.5 text-xs text-emerald-700">Please make sure your address is accurate for smooth delivery.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span>
                      <input required name="name" autoComplete="name" placeholder="Enter your full name" className="mt-1.5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15" />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span>
                      <input required name="phone" type="tel" autoComplete="tel" placeholder="01xxxxxxxxx" className="mt-1.5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15" />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 sm:col-span-2">City <span className="text-red-500">*</span>
                      <input required name="city" autoComplete="address-level2" placeholder="e.g. Cairo, Alexandria, Giza" className="mt-1.5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15" />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 sm:col-span-2">Street Address <span className="text-red-500">*</span>
                      <textarea required name="address" autoComplete="street-address" placeholder="Street name, building number, floor, apartment..." rows={3} className="mt-1.5 w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15" />
                    </label>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-emerald-600 to-green-700 px-4 py-3 text-white">
                  <h2 className="flex items-center gap-2 text-lg font-bold"><CreditCard className="size-4" /> Payment Method</h2>
                  <p className="mt-1 text-sm text-emerald-50">Choose how you’d like to pay</p>
                </div>
                <div className="space-y-3 p-4 sm:p-5">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3.5 transition-colors has-checked:border-emerald-500 has-checked:bg-emerald-50/50">
                    <input type="radio" name="payment" value="cash" defaultChecked className="peer size-4 accent-emerald-600" />
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700"><Banknote className="size-5" /></span>
                    <span className="flex-1"><span className="block text-sm font-semibold text-slate-900">Cash on Delivery</span><span className="mt-0.5 block text-xs text-slate-500">Pay when your order arrives at your doorstep</span></span>
                    <span className="grid size-5 shrink-0 place-items-center rounded-full border border-gray-300 text-transparent peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white"><Check className="size-3.5" /></span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3.5 transition-colors has-checked:border-emerald-500 has-checked:bg-emerald-50/50">
                    <input type="radio" name="payment" value="online" className="peer size-4 accent-emerald-600" />
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-slate-500"><CreditCard className="size-5" /></span>
                    <span className="flex-1"><span className="block text-sm font-semibold text-slate-900">Pay Online</span><span className="mt-0.5 block text-xs text-slate-500">Secure payment with Credit/Debit Card via Stripe</span></span>
                    <span className="grid size-5 shrink-0 place-items-center rounded-full border border-gray-300 text-transparent peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white"><Check className="size-3.5" /></span>
                  </label>
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs text-emerald-700">
                    <ShieldCheck className="size-4 shrink-0" /> Secure &amp; encrypted checkout. Your payment information is protected.
                  </div>
                </div>
              </section>
            </div>

            <aside className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-5">
              <div className="bg-gradient-to-r from-emerald-600 to-green-700 px-4 py-3 text-white">
                <h2 className="flex items-center gap-2 text-lg font-bold"><LockKeyhole className="size-4" /> Order Summary</h2>
                <p className="mt-1 text-sm text-emerald-50">{itemCount} items</p>
              </div>
              <div className="space-y-4 p-4 sm:p-5">
                <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
                  {items.map(({ _id, count, price, product }) => (
                    <li key={_id} className="flex items-center gap-3 rounded-lg bg-gray-50 p-2.5">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-white">
                        <Image src={product.imageCover} alt={product.title} fill sizes="48px" className="object-contain p-1" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium text-slate-800">{product.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{count} × {money(price)} EGP</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-slate-800">{money(count * price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{money(total)} EGP</span></div>
                  <div className="flex justify-between text-slate-600"><span className="inline-flex items-center gap-1.5"><Truck className="size-4" /> Shipping</span><span className="font-medium text-emerald-600">FREE</span></div>
                  <div className="flex items-baseline justify-between border-t border-dashed border-gray-200 pt-3 text-slate-900">
                    <span className="font-semibold">Total</span><span><strong className="text-xl font-bold text-emerald-600">{money(total)}</strong><span className="ml-1 text-xs text-slate-500">EGP</span></span>
                  </div>
                </div>
                <button type="button" className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-700 text-base font-semibold text-white shadow-md shadow-emerald-700/15 hover:brightness-105">
                  <LockKeyhole className="size-4" /> Place Order
                </button>
                <div className="flex items-center justify-center gap-2.5 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5 text-emerald-500" /> Secure</span>
                  <span className="h-3 border-l border-gray-200" />
                  <span className="inline-flex items-center gap-1"><Truck className="size-3.5 text-blue-500" /> Fast Delivery</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
      <FeaturesStrip />
    </main>
  );
}
