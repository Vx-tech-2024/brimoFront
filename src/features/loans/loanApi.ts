import axiosInstance from "../../lib/axios";

export const fetchLoansRequest = (params?: any) => {
    return axiosInstance.get("/loans", { 
        params: Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== "")
        ),
     });
};

export const createLoanRequest = (data: any) => {
    return axiosInstance.post("/loans", data);
};

export const updateLoanRequest = (id: string, data: any) => {
    return axiosInstance.put(`/loans/${id}`, data);
};

export const deleteLoanRequest = (id: string) => {
    return axiosInstance.delete(`/loans/${id}`);
};