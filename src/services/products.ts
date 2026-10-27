import { Product } from "@/types/types";

export const BASE = 'https://ecommerce.routemisr.com/api/v1';

export async function getAllProducts(): Promise<Product[] | null> {
    try {
        const res = await fetch(`${BASE}/products`, {
            cache: "force-cache"
        });
        const allProducts = await res.json();
        return allProducts.data;
    } catch (error) {
        console.log(error);
        return null;
    }
} 

export async function getProductById(id: string): Promise<Product | null>{
    try {
        const res = await fetch(`${BASE}/products/${id}`, {
            cache: "force-cache"
        });
        const finalRes = await res.json();
        return finalRes.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}