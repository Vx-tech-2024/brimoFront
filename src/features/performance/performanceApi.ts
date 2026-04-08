import axiosInstance  from "../../lib/axios";

export const fetchAgentPerformance = async (params?: {
    month?: number;
    year?: number;
    teamMemberId?: string;
}) => {
    const res = await axiosInstance.get("/performance/agent-tracker", { params })
    return res.data;
};

export const fetchMonthlyLoans = async (params?: any) => {
    const res = await axiosInstance.get("/performance/monthly-goal-tracker", {
        params,
    });
    return res.data;
};

export const fetchTeamSummary = async (params?: any) => {
    const res = await axiosInstance.get("/performance/team-summary", {
        params,
    });
    return res.data;
};