import { create } from "zustand";
import axiosInstance from "@/helpers/axiosInstance";

interface ProductDetails {
    name: string;
    price: number;
    imageUrl: string;
}

interface Favorite {
    productId: number;
    productDetails: ProductDetails;
}

interface FavoriteState {
    favorites: Favorite[];
    error: string | null;

    fetchFavorites: () => Promise<void>;
    addFavorite: (productId: number) => Promise<void>;
    removeFavorite: (productId: number) => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>()((set) => ({
    favorites: [],
    error: null,

    fetchFavorites: async () => {
        try {
            const { data: rawFavorites } = await axiosInstance.get("/favorites");

            const productDetailsPromises = rawFavorites.map((fav: any) =>
                axiosInstance.get(`/products/${fav.productId}`)
            );
            const productDetailsResponses = await Promise.all(productDetailsPromises);

            const favorites = rawFavorites.map((fav: any, i: number) => ({
                productId: fav.productId,
                productDetails: productDetailsResponses[i].data,
            }));

            set({ favorites });
        } catch (error) {
            set({ error: "Failed to fetch favorites" });
            console.error(error);
        }
    },

    addFavorite: async (productId: number) => {
        try {
            await axiosInstance.post("/favorites", { productId });

            const { data: productDetails } = await axiosInstance.get(
                `/products/${productId}`
            );

            set((state) => ({
                favorites: [...state.favorites, { productId, productDetails }],
            }));
        } catch (error) {
            set({ error: "Failed to add favorite" });
            console.error(error);
        }
    },

    removeFavorite: async (productId: number) => {
        try {
            await axiosInstance.delete(`/favorites/${productId}`);
            set((state) => ({
                favorites: state.favorites.filter((f) => f.productId !== productId),
            }));
        } catch (error) {
            set({ error: "Failed to remove favorite" });
            console.error(error);
        }
    },
}));
