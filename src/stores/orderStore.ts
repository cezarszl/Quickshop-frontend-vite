import { create } from "zustand";
import axiosInstance from "@/helpers/axiosInstance";

interface OrderItem {
    productId: number;
    quantity: number;
    productDetails?: {
        id: number;
        name: string;
        imageUrl: string;
        price: number;
    }
}

interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}

interface OrderState {
    orders: Order[];
    isCreating: boolean;
    error: string | null;
    fetchUserOrders: (userId: number) => Promise<void>;
    createOrder: (
        userId: number,
        items: OrderItem[],
        totalAmount: number
    ) => Promise<void>;
}

export const useOrderStore = create<OrderState>()((set) => ({
    orders: [],
    isCreating: false,
    error: null,

    fetchUserOrders: async (userId: number) => {
        try {
            const { data: ordersRaw } = await axiosInstance.get(`/orders/user/${userId}`);

            const enrichedOrders = await Promise.all(
                ordersRaw.map(async (order: any) => {
                    const enrichedItems = await Promise.all(
                        order.items.map(async (item: any) => {
                            const { data: productDetails } = await axiosInstance.get(`/products/${item.productId}`);
                            return {
                                ...item,
                                productDetails,
                            };
                        })
                    );

                    return {
                        ...order,
                        items: enrichedItems,
                    };
                })
            );

            set({ orders: enrichedOrders });
        } catch (error) {
            set({ error: "Failed to fetch user orders" });
            console.error(error);
        }
    },
    createOrder: async (userId, items, totalAmount) => {
        set({ isCreating: true, error: null });
        try {
            await axiosInstance.post("/orders", { userId, items, totalAmount });
        } catch (error) {
            set({ error: "Failed to create order" });
            console.error(error);
        } finally {
            set({ isCreating: false });
        }
    },
}));
