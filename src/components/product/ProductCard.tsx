import { Product } from "@/types/types";
import Image from "next/image";
import { Eye, Heart, Plus, RefreshCw, Star } from "lucide-react";

export default function ProductCard({ item }: { item: Product }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_15px_-8px_rgba(0,0,0,0.25)]">
      {/* Image + floating icons */}
      <div className="relative aspect-square">
        <Image
          src={item.imageCover}
          alt={item.title}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
          className="object-contain"
        />
        <div className="absolute right-0 top-0 flex flex-col gap-2">
          {[Heart, RefreshCw, Eye].map((Icon, i) => (
            <button
              key={i}
              className="rounded-full bg-white p-2 shadow hover:text-primary"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <span className="text-sm text-gray-500">{item.category.name}</span>
        <h4 className="line-clamp-1 font-semibold">{item.title}</h4>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.round(item.ratingsAverage)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-yellow-400"
              }
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">
            {item.ratingsAverage} ({item.ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <h3 className="text-lg font-bold">{item.price} EGP</h3>
          <button className="rounded-full cursor-pointer bg-primary p-2 text-primary-foreground hover:bg-primary/90">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}