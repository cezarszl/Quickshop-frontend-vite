import { create } from "zustand";
import axiosInstance from "@/helpers/axiosInstance";

interface ProductDetails {
    name: string;
    price: number;
    imageUrl: string;
}

interface CartItem {
    cartId: string;
    productId: number;
    quantity: number;
    productDetails?: ProductDetails;
}

interface CartState {
    cartId: string | null;
    cartItems: CartItem[];
    error: string | null;

    initializeCart: () => Promise<string>;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    fetchCart: (cartId: string) => Promise<void>;
    clearCart: (cartId: string) => Promise<void>;

}

export const useCartStore = create<CartState>((set, get) => ({
    cartId: null,
    cartItems: [],
    error: null,

    initializeCart: async () => {
        const existingCartId = localStorage.getItem("anonymousCartId");
        if (existingCartId) {
            set({ cartId: existingCartId });
            return existingCartId;
        }

        try {
            const { data } = await axiosInstance.post('/carts', {});
            const newCartId = data.id;
            localStorage.setItem("anonymousCartId", newCartId);
            set({ cartId: newCartId });
            return newCartId;
        } catch (error) {
            set({ error: "Failed to initialize cart" });
            throw new Error("Failed to initialize cart");
        }
    },

    addToCart: async (productId: number, quantity: number) => {
        try {
            let currentCartId = localStorage.getItem('anonymousCartId');

            if (!currentCartId) {
                currentCartId = await get().initializeCart();
            }

            const response = await axiosInstance.post('/carts/items', {
                cartId: currentCartId,
                productId,
                quantity,
            });

            if (response.status === 201) {
                await get().fetchCart(currentCartId);
            }
        } catch (error) {
            set({ error: "Failed to add item to cart" });
            throw error;
        }
    },

    fetchCart: async (cartId: string) => {

        try {
            const cartResponse = await axiosInstance.get(`/carts/${cartId}`);
            const cartItems: CartItem[] = cartResponse.data;

            const productDetailsPromises = cartItems.map((item) =>
                axiosInstance.get(`/products/${item.productId}`)
            );

            const productDetailsResponses = await Promise.all(productDetailsPromises);

            const itemsWithDetails = cartItems.map((item, index) => ({
                ...item,
                productDetails: productDetailsResponses[index].data,
            }));

            set({ cartItems: itemsWithDetails, cartId });
        } catch (error) {
            set({ error: "Error fetching cart" });
            throw error;
        }
    },

    clearCart: async (cartId: string) => {

        try {
            await axiosInstance.delete(`/carts/${cartId}/clear`);
            set({ cartItems: [] });
            localStorage.removeItem("anonymousCartId");
        } catch (error) {
            set({ error: "Failed to clear cart" });
            throw error;
        }
    },
}));