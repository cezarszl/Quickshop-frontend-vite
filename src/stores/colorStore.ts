import { create } from "zustand";
import axios from "axios";


export const baseUrl = import.meta.env.VITE_API_BASE_URL

interface Color {
    id: number;
    name: string;
}

interface ColorState {
    colors: Color[];
    fetchColors: () => Promise<void>;
}

export const useColorStore = create<ColorState>((set) => ({
    colors: [],
    fetchColors: async () => {
        try {
            const response = await axios.get(`${baseUrl}/colors`);
            set({ colors: response.data })
        } catch (error) {
            console.error(`Error fetching colors`, error)
        }

    }
}));