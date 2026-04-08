import axiosInstance from "../../lib/axios";

const API = axiosInstance.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchDailySummaryRequest = async () => {
  const res = await API.get("/dashboard/daily-summary");
  return res.data;
};

export const fetchLoanSummaryRequest = async (params?: any) => {
  const res = await API.get("/dashboard/loan-monitoring-summary", { params });
  return res.data;
};

export const fetchTeamSummaryRequest = async (params?: any) => {
  const res = await API.get("/performance/team-summary", { params });
  return res.data;
};

export const fetchAgentPerformanceRequest = async (params?: any) => {
  const res = await API.get("/performance/agent-tracker", { params });
  return res.data;
};

export const fetchMonthlyReportRequest = async (params?: any) => {
  const res = await API.get("/reports/monthly", { params });
  return res.data;
};