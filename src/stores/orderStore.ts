import { create } from "zustand";
import axiosInstance from "@/helpers/axiosInstance";

interface OrderItem {
    productId: number;
    quantity: number;
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
            const response = await axiosInstance.get(`/orders/user/${userId}`);
            set({ orders: response.data });
        } catch (error) {
            set({ error: "Failed to fetch orders" });
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
