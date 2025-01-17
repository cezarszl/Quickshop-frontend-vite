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
    productDetails: ProductDetails;
}

interface CartState {
    cartId: string | null;
    cartItems: CartItem[];
    totalQuantity: number;
    error: string | null;

    initializeCart: () => Promise<string>;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    fetchCart: (cartId: string) => Promise<void>;
    clearCart: (cartId: string) => Promise<void>;

    removeItem: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    getCartTotal: () => number;

}

export const useCartStore = create<CartState>((set, get) => ({
    cartId: null,
    cartItems: [],
    totalQuantity: 0,
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

            const totalQuantity = itemsWithDetails.reduce(
                (total, item) => total + item.quantity,
                0
            );
            set({ cartItems: itemsWithDetails, cartId, totalQuantity });
        } catch (error) {
            set({ error: "Error fetching cart" });
            throw error;
        }
    },

    clearCart: async (cartId: string) => {
        try {
            await axiosInstance.delete(`/carts/${cartId}/clear`);
            set({ cartItems: [], totalQuantity: 0 });
            localStorage.removeItem("anonymousCartId");
        } catch (error) {
            set({ error: "Failed to clear cart" });
            throw error;
        }
    },
    removeItem: async (productId: number) => {
        const cartId = get().cartId;
        if (!cartId) return;

        try {
            const cartItems = get().cartItems;
            const isLastItem = cartItems.length === 1;

            await axiosInstance.delete(`/carts/${cartId}/items/${productId}`);
            if (isLastItem) {
                localStorage.removeItem('anonymousCartId');
                set({ cartId: null, cartItems: [], totalQuantity: 0 });
            } else {
                await get().fetchCart(cartId);
            }
        } catch (error) {
            set({ error: "Failed to remove item" });
            throw error;
        }
    },

    updateQuantity: async (productId: number, quantity: number) => {
        const cartId = get().cartId;
        if (!cartId) return;

        try {
            await axiosInstance.patch(`/carts/${cartId}/items/${productId}`, {
                quantity
            });
            await get().fetchCart(cartId);
        } catch (error) {
            set({ error: "Failed to update quantity" });
            throw error;
        }
    },

    getCartTotal: () => {
        return get().cartItems.reduce((total, item) => {
            if (item.productDetails) {
                return total + (item.productDetails.price * item.quantity);
            }
            return total;
        }, 0);
    },
}));