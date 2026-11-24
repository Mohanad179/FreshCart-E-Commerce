import { Brand } from "@/types/types";
import { BASE } from "./API_BASE_URL";



export async function getAllBrands(): Promise<Brand[] | null> {
    try {
        const res = await fetch(`${BASE}/brands`, { cache: "no-store" });
        if (!res.ok) return null;
        const allBrands = await res.json();
        return allBrands.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
