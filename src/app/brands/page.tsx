import React from 'react'
import PageHeader from '@/components/shared/PageHeader';
import { Tags } from 'lucide-react';
import { getAllBrands } from '@/services/brands';
import BrandCard from '@/components/brand/BrandCard';

const allBrands = await getAllBrands();

export default async function Brands() {
  return <>
    <PageHeader
      gradient='from-orange-600 to-orange-400'
      icon={Tags} 
      title='All Brands' 
      description='Shop from your favorite brands'
      breadcrumbs={[{label: "All Brands"}]}
    />

    <section className="mx-auto max-w-full px-4 py-8">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {allBrands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </section>
  </>
}
