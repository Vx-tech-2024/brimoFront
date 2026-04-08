import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/reports`;


const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const fetchDailyReport = async (params: any) => {
  const res = await axios.get(`${API_URL}/daily`, { params, ...getAuthConfig(), });
  return res.data;
};

export const fetchWeeklyReport = async (params: any) => {
  const res = await axios.get(`${API_URL}/weekly`, { params, ...getAuthConfig(), });
  return res.data;
};

export const fetchMonthlyReport = async (params: any) => {
  const res = await axios.get(`${API_URL}/monthly`, { params, ...getAuthConfig(), });
  return res.data;
};

export const exportMonthlyCSV = async (params: any) => {
  const res = await axios.get(`${API_URL}/export/csv/monthly`, {
    params, ...getAuthConfig(),
    responseType: "blob", // important for file download
  });
  return res.data;
};