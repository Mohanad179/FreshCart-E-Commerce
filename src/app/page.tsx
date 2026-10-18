import ProductsGrid from "@/components/product/ProductsGrid";
import { Product } from "@/types/types"



export default async function Home() {

  async function getAllProducts(): Promise<Product[]> {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    const allProducts = await res.json();
    console.log(allProducts.data);
    return allProducts.data;
  }

  const allProducts = await getAllProducts();

  return (
    <>
      <div className="text-3xl font-bold m-3">
        <h1>Featured Products</h1>
      </div>
      <ProductsGrid products={allProducts} />
    </>
  );
}
