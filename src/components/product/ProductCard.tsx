import { Product } from "@/types/types";
import Image from "next/image";
import { Eye, Heart, RefreshCw, Star } from "lucide-react";
import Link from "next/link";
import AddToCartBtn from "../cartActions/AddToCartBtn";

export default function ProductCard({ product }: { product: Product }) {

  const iconBtn = "rounded-full bg-white p-2 shadow cursor-pointer hover:text-primary";


  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_15px_-8px_rgba(0,0,0,0.25)]">
      {/* Image + floating icons */}
      <div className="relative aspect-square">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
          className="object-contain"
        />
        <div className="absolute right-0 top-0 flex flex-col gap-2">
          <Link href={`/product/${product.id}`} aria-label="View details" className={iconBtn}>
            <Eye size={16} />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <span className="text-sm text-gray-500">{product.category.name}</span>
        <Link href={`/product/${product.id}`} className="line-clamp-1 font-semibold">{product.title}</Link>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.round(product.ratingsAverage)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-yellow-400"
              }
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <h3 className="text-lg font-bold">{product.price} EGP</h3>
          <AddToCartBtn productId={product.id}/>
        </div>
      </div>
    </div>
  );
}