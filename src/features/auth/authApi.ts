import axiosInstance from "../../lib/axios";
import type { AuthResponse } from "./authTypes";

export const loginRequest = async (data: {
    email: string;
    password: string;
}): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
};