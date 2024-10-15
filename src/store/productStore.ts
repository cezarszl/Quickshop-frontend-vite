import { create } from 'zustand';
import axios from 'axios';

const baseUrl = process.env.VITE_API_BASE_URL

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
interface ProductState {
    products: Product[],
    randomProducts: Product[],
    minPrices: MinPrice[],
    fetchProducts: () => Promise<void>,
    fetchRandomProducts: () => Promise<void>
    fetchMinPrices: () => Promise<void>

}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    randomProducts: [],
    minPrices: [],
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
    }
}));