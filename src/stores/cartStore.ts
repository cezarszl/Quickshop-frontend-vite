import { create } from "zustand";
import { persist } from "zustand/middleware";
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
    clearCart: () => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    getCartTotal: () => number;
    syncAfterLogin: (userId: number) => Promise<void>;
    resetCart: () => void;

}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartId: null,
            cartItems: [],
            totalQuantity: 0,
            error: null,

            initializeCart: async () => {
                const currentCartId = get().cartId;
                if (currentCartId) return currentCartId;

                try {
                    const { data } = await axiosInstance.post("/carts", {});
                    const newCartId = data.id;
                    set({ cartId: newCartId });
                    return newCartId;
                } catch (error) {
                    set({ error: "Failed to initialize cart" });
                    throw new Error("Failed to initialize cart");
                }
            },

            addToCart: async (productId: number, quantity: number) => {
                try {
                    let cartId = get().cartId;
                    if (!cartId) {
                        cartId = await get().initializeCart();
                    }

                    const response = await axiosInstance.post("/carts/items", {
                        cartId,
                        productId,
                        quantity,
                    });

                    if (response.status === 201) {
                        await get().fetchCart(cartId);
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

            clearCart: async () => {
                const cartId = get().cartId;
                if (!cartId) return;

                try {
                    await axiosInstance.delete(`/carts/${cartId}/clear`);
                    set({ cartId: null, cartItems: [], totalQuantity: 0 });
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
                        quantity,
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
                        return total + item.productDetails.price * item.quantity;
                    }
                    return total;
                }, 0);
            },
            syncAfterLogin: async (userId: number) => {
                const anonymousCartId = get().cartId ?? localStorage.getItem("anonymousCartId");

                if (anonymousCartId && typeof anonymousCartId === "string") {
                    try {
                        await axiosInstance.put("/carts/merge", {
                            userId,
                            anonymousCartId,
                        });
                        localStorage.removeItem("anonymousCartId");
                    } catch (error) {
                        console.error("Failed to merge carts:", error);
                    }
                }

                await get().loadUserCart(userId);
            },
            resetCart: () => {
                set({
                    cartId: null,
                    cartItems: [],
                    totalQuantity: 0,
                    error: null,
                });
            },

        }),
        {
            name: "cart-storage",
            partialize: (state) => ({
                cartId: state.cartId,
                cartItems: state.cartItems,
                totalQuantity: state.totalQuantity,
            }),
        }
    )
);
