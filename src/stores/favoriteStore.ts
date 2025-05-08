import { create } from "zustand";
import axiosInstance from "@/helpers/axiosInstance";
import { useLoginStore } from "./loginStore";

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
    totalFavQuantity: number;
    error: string | null;

    fetchFavorites: () => Promise<void>;
    addFavorite: (productId: number) => Promise<void>;
    removeFavorite: (productId: number) => Promise<void>;
    resetFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()((set) => ({
    favorites: [],
    totalFavQuantity: 0,
    error: null,

    fetchFavorites: async () => {
        try {
            const token = useLoginStore.getState().token;

            if (!token) return;
            const { data: rawFavorites } = await axiosInstance.get("/favorites", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("📦 Fetched favorites from API:", rawFavorites);

            const productDetailsPromises = rawFavorites.map((fav: any) =>
                axiosInstance.get(`/products/${fav.productId}`)
            );
            const productDetailsResponses = await Promise.all(productDetailsPromises);

            const favorites = rawFavorites.map((fav: any, i: number) => ({
                productId: fav.productId,
                productDetails: productDetailsResponses[i].data,
            }));

            set({ favorites, totalFavQuantity: favorites.length });
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

            set((state) => {
                const updatedFavorites = [
                    ...state.favorites,
                    { productId, productDetails },
                ];
                return {
                    favorites: updatedFavorites,
                    totalFavQuantity: updatedFavorites.length,
                };
            });
        } catch (error) {
            set({ error: "Failed to add favorite" });
            console.error(error);
        }
    },

    removeFavorite: async (productId: number) => {
        try {
            await axiosInstance.delete(`/favorites/${productId}`);
            set((state) => {
                const updatedFavorites = state.favorites.filter(
                    (f) => f.productId !== productId
                );
                return {
                    favorites: updatedFavorites,
                    totalFavQuantity: updatedFavorites.length,
                };
            });
        } catch (error) {
            set({ error: "Failed to remove favorite" });
            console.error(error);
        }
    },
    resetFavorites: () => {
        set({ favorites: [], totalFavQuantity: 0, error: null });
    },
}));
