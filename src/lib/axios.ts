import axios from "axios";
console.log("API URL:", import.meta.env.VITE_API_BASE_URL);
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ,
    withCredentials: true,
});
console.log("API URL:", import.meta.env.VITE_API_BASE_URL);


let token: string | null = null;

export const setAuthToken = (newToken: string | null) => {
    token = newToken;
};

axiosInstance.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;