import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "@/components/Sidebar/helpers/axiosInstance";

interface User {
    id: number;
    email: string;
    name: string;
    googleId?: string;
}

interface LoginState {
    token: string | null;
    user: User | null;
    isLoggedIn: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    loginWithGoogle: () => void;
    logout: () => void;
}

export const useLoginStore = create<LoginState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isLoggedIn: false,
            error: null,

            login: async (email, password) => {
                try {
                    const response = await axiosInstance.post("/auth/login", { email, password });
                    const { token, user } = response.data;

                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    set({ token, user, isLoggedIn: true, error: null });
                } catch (error) {
                    set({ error: "Failed to log in" });
                    throw error;
                }
            },

            loginWithGoogle: () => {
                window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
            },

            register: async (name, email, password) => {
                try {
                    await axiosInstance.post("/auth/register", { name, email, password });
                } catch (error) {
                    set({ error: "Failed to register" });
                    throw error;
                }
            },

            logout: () => {
                localStorage.removeItem("auth-storage");
                set({ token: null, user: null, isLoggedIn: false, error: null });
                delete axiosInstance.defaults.headers.common["Authorization"];
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isLoggedIn: state.isLoggedIn,
            }),
        }
    )
);
