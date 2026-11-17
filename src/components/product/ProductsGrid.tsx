import React from 'react'
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/types';

export default function ProductsGrid({products}: {products: Product[]}) {
  if (products.length === 0) {
    return (
      <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-muted">
          <PackageOpen className="size-10 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold">No Products Found</h2>
        <p className="mt-3 text-lg text-muted-foreground">
          No products are available in this category yet.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View All Products
        </Link>
      </section>
    );
  }

  return <>
    <div className="container grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5 px-3 py-10 mx-auto">
      {products.map( (product) => (
        <ProductCard key={product.id} product={product}/>
      ) )}
    </div>
  </>
}
