import { useLoginStore } from '@/stores/loginStore';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                useLoginStore.getState().logout();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                    { refreshToken }
                );

                const { accessToken } = res.data;

                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                useLoginStore.setState({
                    token: accessToken,
                    isLoggedIn: true,
                    error: null,
                });

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                useLoginStore.getState().logout();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
axiosInstance.interceptors.request.use((config) => {
    const token = useLoginStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});




export default axiosInstance;