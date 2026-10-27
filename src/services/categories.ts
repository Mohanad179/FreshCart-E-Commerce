import { Category } from "@/types/types";
import { BASE } from "./products";

export async function getAllCategories(): Promise<Category | null>{
    try {
        const res = await fetch(`${BASE}/categories`);
        const allCategories = await res.json();
        return allCategories.data;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}