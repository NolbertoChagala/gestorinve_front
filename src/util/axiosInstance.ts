import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { showToast } from "@/utils/toast";

const API_BASE_URL = "https://localhost:7126/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: { exp?: number } = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp && decoded.exp < currentTime) {
                    showToast("Tu sesión ha expirado. Inicia sesión nuevamente.", "error");
                    localStorage.removeItem("token");
                    localStorage.removeItem("rol");
                    localStorage.removeItem("usuario");
                    localStorage.removeItem("userId");
                    window.location.href = "/login";
                    return Promise.reject("Token expirado");
                }

                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("rol");
                localStorage.removeItem("usuario");
                localStorage.removeItem("userId");
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            showToast("Sesión expirada. Vuelve a iniciar sesión.", "error");
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
