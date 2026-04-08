import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAgentPerformance, fetchMonthlyLoans, fetchTeamSummary } from "./performanceApi";
import type { AgentPerformance, TeamSummary, MonthlyLoan } from "./performanceTypes";

interface PerformanceState {
    agentTracker: AgentPerformance[];
    monthlyLoans: MonthlyLoan[];
    teamSummary: TeamSummary | null;
    loading: boolean;
}

const initialState: PerformanceState = {
    agentTracker: [],
    monthlyLoans: [],
    teamSummary: null,
    loading: false,
};

export const getAgentPerformance = createAsyncThunk(
    "performance/getAgentPerformance",
    async (params: any) => {
        const res = await fetchAgentPerformance(params);
        return res.tracker;
    }
);

export const getMonthlyLoans = createAsyncThunk(
    "performance/getMonthlyLoans",
    async (params: any) => {
        const res = await fetchMonthlyLoans(params);
        return res.tracker;
    }
);

export const getTeamSummaryData = createAsyncThunk(
    "performace/getTeamSummary",
    async (params: any) => {
        const res = await fetchTeamSummary(params);
        return res.summary;
    }
);

const performanceSlice = createSlice({
    name: "performance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAgentPerformance.fulfilled, (state, action) => {
            state.agentTracker = action.payload;
          })
          .addCase(getMonthlyLoans.fulfilled, (state, action) => {
            state.monthlyLoans = action.payload;
          })
          .addCase(getTeamSummaryData.fulfilled, (state, action) => {
            state.teamSummary = action.payload;
          });
    },
});

export default performanceSlice.reducer;