import ProductsGrid from "@/components/product/ProductsGrid";
import { getAllProducts } from "@/services/products";

export default async function Home() {
  
  const allProducts = await getAllProducts();

  return (
    <>
      <div className="text-3xl font-bold m-3">
        <h1>Featured Products</h1>
      </div>
      <ProductsGrid products={allProducts || []} />
    </>
  );
}
