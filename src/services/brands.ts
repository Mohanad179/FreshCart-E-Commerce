import { Brand } from "@/types/types";
import { BASE } from "./products";


export async function getAllBrands(): Promise<Brand | null> {
    try {
        const res = await fetch(`${BASE}/brands`);
        const allBrands = await res.json();
        return allBrands.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}