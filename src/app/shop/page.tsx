import React from 'react'
import { getAllProducts } from '@/services/products';
import ProductsGrid from '@/components/product/ProductsGrid';
import PageHeader from '@/components/shared/PageHeader';
import { Package } from 'lucide-react';

const allProducts = await getAllProducts();
console.log(allProducts);

export default async function page() {
  return <>
    <PageHeader 
      icon={Package} 
      title='All Products' 
      description='Explore our complete product collection'
      breadcrumbs={[{label: "All Products"}]}
    />

    <ProductsGrid products={allProducts || []}/>
  </>
}
