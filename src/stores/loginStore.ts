import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "@/helpers/axiosInstance";
import { useCartStore } from "./cartStore";
import { useFavoriteStore } from "./favoriteStore";

interface User {
    id: number;
    email: string;
    name: string;
    googleId?: string;
}

interface LoginState {
    token: string | null;
    refreshToken?: string | null;
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
                    const { accessToken, refreshToken, user } = response.data;

                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                    localStorage.setItem("refreshToken", refreshToken);
                    set({
                        token: accessToken,
                        refreshToken,
                        user, isLoggedIn: true,
                        error: null
                    });
                    console.log("✅ Logged in, now fetching favorites...");
                    useFavoriteStore.getState().fetchFavorites();
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
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("auth-storage");
                localStorage.removeItem("anonymousCartId");
                set({ token: null, user: null, isLoggedIn: false, error: null });
                delete axiosInstance.defaults.headers.common["Authorization"];
                useCartStore.getState().resetCart();
                useFavoriteStore.getState().resetFavorites();
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
