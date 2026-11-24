import React from 'react'
import { getAllProducts } from '@/services/products';
import ProductsGrid from '@/components/product/ProductsGrid';
import PageHeader from '@/components/shared/PageHeader';
import { Package } from 'lucide-react';
import { getAllCategories } from '@/services/categories';

type ShopPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const [{ category: categoryParam }, allProducts, allCategories] = await Promise.all([
    searchParams,
    getAllProducts(),
    getAllCategories(),
  ]);
  const categoryId = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const selectedCategory = allCategories?.find((category) => category._id === categoryId);
  const products = (allProducts ?? []).filter((product) =>
    !categoryId || product.category?._id === categoryId
  );
  const title = selectedCategory?.name ?? 'All Products';

  return <>
    <PageHeader
      icon={Package} 
      title={title}
      description={selectedCategory ? `Explore our ${selectedCategory.name} collection` : 'Explore our complete product collection'}
      breadcrumbs={selectedCategory
        ? [{ label: 'Shop', href: '/shop' }, { label: selectedCategory.name }]
        : [{ label: 'All Products' }]}
    />

    <ProductsGrid products={products}/>
  </>
}
