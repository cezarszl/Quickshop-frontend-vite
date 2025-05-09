import { create } from "zustand";
import axiosInstance from "@/helpers/axiosInstance";

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface SearchState {
    query: string;
    results: Product[];
    loading: boolean;
    error: string | null;

    setQuery: (q: string) => void;
    fetchResults: (q: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>()((set) => ({
    query: "",
    results: [],
    loading: false,
    error: null,

    setQuery: (q) => set({ query: q }),

    fetchResults: async (q) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axiosInstance.get("/products", {
                params: { name: q, limit: 50 },
            });
            set({ results: data.products, loading: false });
        } catch (error) {
            set({ error: "Search failed", loading: false });
            console.error(error);
        }
    },
}));
