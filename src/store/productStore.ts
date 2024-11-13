import { create } from 'zustand';
import axios from 'axios';

export const baseUrl = import.meta.env.VITE_API_BASE_URL

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    categoryName: string;
    categoryId: number;
}

export interface MinPrice {
    categoryId: number;
    minPrice: number;
}

export interface ProductFilter {
    name?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    offset?: number;
}

interface ProductState {
    products: Product[],
    randomProducts: Product[],
    minPrices: MinPrice[],
    filters: ProductFilter,
    setFilter: (key: keyof ProductFilter, value: any) => void;
    resetFilters: () => void;
    fetchProducts: () => Promise<void>,
    fetchRandomProducts: () => Promise<void>
    fetchMinPrices: () => Promise<void>
    fetchFilteredProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    randomProducts: [],
    minPrices: [],
    filters: {
        minPrice: 10,
        maxPrice: 1000,
    },

    setFilter: (key, value) => set((state) => ({
        filters: {
            ...state.filters,
            [key]: value,
        },
    })),

    resetFilters: () => set({
        filters: {
            minPrice: 10,
            maxPrice: 1000,
        },
    }),

    fetchProducts: async () => {
        try {

            const response = await axios.get(`${baseUrl}/products`);
            set({ products: response.data })
        } catch (err) {
            console.error('Error fetching products', err);
        }
    },
    fetchRandomProducts: async () => {
        try {
            const response = await axios.get(`${baseUrl}/products/random-products`);
            set({ randomProducts: response.data })
        } catch (err) {
            console.error('Error fetching random products', err);
        }
    },
    fetchMinPrices: async () => {
        try {
            const response = await axios.get(`${baseUrl}/categories/min-prices`);
            set({ minPrices: response.data })
        } catch (err) {
            console.error('Error fetching minimum prices for each category', err);
        }
    },

    fetchFilteredProducts: async () => {
        try {
            const { filters } = get();
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    params.append(key, value.toString());
                }
            });
            const response = await axios.get(`${baseUrl}/products`, { params });
            set({ products: response.data });
        } catch (err) {
            console.error('Error fetching filtered products', err);
        }
    }
}));