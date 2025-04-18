import { create } from "zustand";
import axiosInstance from "@/components/Sidebar/helpers/axiosInstance";

interface User {
    id: number;
    email: string;
    name: string;
    googleId?: string;
}

interface LoginState {
    token: string | null;
    user: User | null
    isLoggedIn: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}



export const useLoginStore = create<LoginState>((set) => ({
    token: null,
    user: null,
    isLoggedIn: false,
    error: null,

    login: async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            const { token, user } = response.data

            localStorage.setItem("authToken", token);
            set({ token, user, isLoggedIn: true, error: null });
        } catch (error) {
            set({ error: 'Failed to log in' });
            throw error;

        }
    },

    register: async (name: string, email: string, password: string) => {
        try {
            await axiosInstance.post('/auth/register', { name, email, password });
        } catch (error) {
            set({ error: "Failed to register" });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("authToken");
        set({ token: null, user: null, isLoggedIn: false });
    },
}));



