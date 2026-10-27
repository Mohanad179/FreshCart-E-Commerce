import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/types/types";


export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/products?brand=${brand._id}`}
      className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100 md:p-6"
    >
      <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-50 p-3 md:p-5">
        <div className="relative h-3/5 w-full bg-white">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            sizes="(min-width: 1024px) 15vw, (min-width: 768px) 22vw, 45vw"
            className="object-contain p-2"
          />
        </div>
      </div>

      <h3 className="mt-4 text-center font-medium text-gray-900 transition-colors group-hover:text-indigo-600">
        {brand.name}
      </h3>

      <span className="mt-2 flex items-center gap-1 text-sm text-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View Products <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}