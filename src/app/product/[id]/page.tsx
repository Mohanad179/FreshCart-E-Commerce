import Link from "next/link";
import {
  Home,
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  Package,
  Truck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/services/products";
import { notFound } from "next/navigation";
import FeaturesStrip from "@/components/shared/FeaturesStrip";
import Slider from "@/components/shared/Slider";

export default async function Page({params}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if(!product) notFound()

  const unitPrice = product.priceAfterDiscount ?? product.price;
  const discount = product.priceAfterDiscount
    ? Math.round((1 - product.priceAfterDiscount / product.price) * 100)
    : 0;
  const inStock = product.quantity > 0;
  const subcategory = product.subcategory?.[0]?.name;

  return (
    <main className="container mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="flex items-center gap-1 hover:text-primary">
          <Home className="size-4" /> Home
        </Link>
        <ChevronRight className="size-4" />
        <span>{product.category.name}</span>
        {subcategory && (
          <>
            <ChevronRight className="size-4" />
            <span>{subcategory}</span>
          </>
        )}
        <ChevronRight className="size-4" />
        <span className="font-medium text-gray-900">{product.title}</span>
      </nav>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Gallery */}
        <div className="min-w-0 overflow-hidden rounded-xl border bg-white p-3 shadow-sm sm:p-4">
          <Slider
            imageOnly
            slidesPerView={1}
            spaceBetween={0}
            slides={(product.images?.length ? product.images : [product.imageCover]).map((image) => ({
              image,
              title: product.title,
            }))}
          />
        </div>

        {/* Info */}
        <div className="min-w-0 rounded-xl border bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-green-50 px-4 py-1.5 text-primary">
              {product.category.name}
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-gray-700">
              {product.brand.name}
            </span>
          </div>

          <h1 className="mt-4 text-xl font-bold leading-snug sm:text-2xl">
            {product.title}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`size-4 text-yellow-400 ${
                    i <= Math.round(product.ratingsAverage)
                      ? "fill-yellow-400"
                      : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.ratingsAverage} ({product.ratingsQuantity} reviews)
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-bold sm:text-3xl">
              {unitPrice} EGP
            </span>
            {discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {product.price} EGP
                </span>
                <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <span
            className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm ${
              inStock ? "bg-green-50 text-primary" : "bg-red-50 text-red-600"
            }`}
          >
            <span
              className={`size-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
            />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>

          <hr className="my-6" />
          <p className="text-sm leading-6 text-gray-700">{product.description}</p>

          <p className="mb-2 mt-6 text-sm font-medium">Quantity</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="p-3"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-12 text-center font-medium">1</span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="p-3"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {product.quantity} available
            </span>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-4">
            <span className="text-gray-700">Total Price:</span>
            <span className="text-xl font-bold text-primary sm:text-2xl">
              {unitPrice.toFixed(2)} EGP
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button disabled={!inStock} className="h-12 rounded-xl text-sm cursor-pointer">
              <ShoppingCart className="size-5" /> Add to Cart
            </Button>
            <Button
              disabled={!inStock}
              className="h-12 rounded-xl bg-slate-900 text-sm hover:bg-slate-800 cursor-pointer"
            >
              <Zap className="size-5" /> Buy Now
            </Button>
          </div>

          <div className="mt-3 flex gap-3">
            <Button
              variant="outline"
              className="h-12 flex-1 rounded-xl text-sm cursor-pointer"
            >
              <Heart className="size-5" /> Add to Wishlist
            </Button>
            <Button
              variant="outline"
              aria-label="Share"
              className="size-12 rounded-xl"
            >
              <Share2 className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs (details tab only) */}
      <section className="mt-10 overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex overflow-x-auto border-b">
          <button className="flex shrink-0 items-center gap-2 border-b-2 border-primary bg-green-50 px-6 py-4 font-medium text-primary">
            <Package className="size-4" /> Product Details
          </button>
          <button className="flex shrink-0 items-center gap-2 px-6 py-4 text-gray-600">
            <Star className="size-4" /> Reviews ({product.ratingsQuantity})
          </button>
          <button className="flex shrink-0 items-center gap-2 px-6 py-4 text-gray-600">
            <Truck className="size-4" /> Shipping &amp; Returns
          </button>
        </div>

        <div className="p-5 sm:p-8">
          <h2 className="text-xl font-semibold">About this Product</h2>
          <p className="mt-3 text-gray-700">{product.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-5">
              <h3 className="mb-3 font-semibold">Product Information</h3>
              {[
                ["Category", product.category.name],
                ["Subcategory", subcategory ?? "—"],
                ["Brand", product.brand.name],
                ["Items Sold", `${product.sold}+ sold`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-gray-50 p-5">
              <h3 className="mb-3 font-semibold">Key Features</h3>
              {[
                "Premium Quality Product",
                "100% Authentic Guarantee",
                "Fast & Secure Packaging",
                "Quality Tested",
              ].map((f) => (
                <p
                  key={f}
                  className="flex items-center gap-2 py-1.5 text-sm text-gray-600"
                >
                  <Check className="size-4 text-primary" /> {f}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturesStrip/>
    </main>
  );
}
