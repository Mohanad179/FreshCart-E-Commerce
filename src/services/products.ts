import { Product } from "@/types/types";

export async function getAllProducts(): Promise<Product[] | undefined> {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        const allProducts = await res.json();
        return allProducts.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
} 