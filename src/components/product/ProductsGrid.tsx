import React from 'react'
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/types';

export default function ProductsGrid({products}: {products: Product[]}) {
  return <>
    <div className="container grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5 px-3 py-10 mx-auto">
      {products.map( (product) => (
        <ProductCard key={product.id} product={product}/>
      ) )}
    </div>
  </>
}
