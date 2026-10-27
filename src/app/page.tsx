import { lazy, Suspense } from "react";
import ProductsGrid from "@/components/product/ProductsGrid";
import { getAllProducts } from "@/services/products";
import image1 from "@/images/e-comm-1.jpg"
import image2 from "@/images/e-comm-2.jpg"
import image3 from "@/images/e-comm-3.jpg"
import Slider from "@/components/shared/Slider";
import Features from "@/components/shared/Features";
import CategoriesSkeleton from "@/components/home/CategoriesSkeleton";
// import categories as a lazy component
const CategoriesAsLazy = lazy(() => import("@/components/home/Categories"));


export default async function Home() {
  
  const allProducts = await getAllProducts();

  // const images = [image1.src, image2.src, image3.src];

  return (
    <>
    <Slider 
      // listOfImages={images} 
      slidesPerView={1} 
      spaceBetween={0}
      slides={[
      { image: image1.src, title: "Premium Quality Guaranteed", subtitle: "Get 20% off your first order", buttonText: "Shop Now", href: "/shop" },
      { image: image2.src, title: "Organic Produce", subtitle: "Straight from the farm", buttonText: "Explore", href: "/categories" },
      { image: image3.src, title: "Daily Deals", subtitle: "Up to 40% off", buttonText: "View Deals", href: "/shop" },
    ]}
    />

    <Features/>
    
    <Suspense fallback={<CategoriesSkeleton/>}>
      <CategoriesAsLazy/>
    </Suspense>

    <h2 className="px-4 mb-6 text-2xl font-bold sm:text-3xl">Featured <span className="text-primary"> Products</span></h2>
    <ProductsGrid products={allProducts || []} />
    </>
  );
}
