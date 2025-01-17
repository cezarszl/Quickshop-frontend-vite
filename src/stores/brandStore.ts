import { create } from "zustand";
import axios from "axios";


export const baseUrl = import.meta.env.VITE_API_BASE_URL

interface Brand {
    id: number;
    name: string;
}

interface BrandState {
    brands: Brand[];
    fetchBrands: () => Promise<void>;
}

export const useBrandStore = create<BrandState>((set) => ({
    brands: [],
    fetchBrands: async () => {
        try {
            const response = await axios.get(`${baseUrl}/brands`);
            set({ brands: response.data })
        } catch (error) {
            console.error(`Error fetching brands`, error)
        }

    }
}));