import { Product } from "@/types/types";
import { BASE } from "./API_BASE_URL";



export async function getAllProducts(): Promise<Product[] | null> {
    try {
        const res = await fetch(`${BASE}/products`, {
            cache: "no-store"
        });
        if (!res.ok) return null;
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
            cache: "no-store"
        });
        if (!res.ok) return null;
        const finalRes = await res.json();
        return finalRes.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
