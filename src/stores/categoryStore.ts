import { create } from 'zustand';
import axios from 'axios';

export const baseUrl = import.meta.env.VITE_API_BASE_URL


interface Category {
    id: number;
    name: string;
}

interface CategoryState {
    categories: Category[];
    fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    fetchCategories: async () => {
        try {

            const response = await axios.get(`${baseUrl}/categories`);
            set({ categories: response.data })
        } catch (err) {
            console.error('Error fetching categories', err);
        }
    }
}));