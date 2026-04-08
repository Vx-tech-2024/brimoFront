import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDailySummaryRequest, fetchLoanSummaryRequest, fetchTeamSummaryRequest, fetchAgentPerformanceRequest, fetchMonthlyReportRequest } from "./dashboardApi";
import type { DashboardState } from "./dashboardTypes";

const initialState: DashboardState = {
    dailySummary: null,
    loanSummary: null,
    teamSummary: null,
    agentPerformance: [],
    monthlyReport: null,
    loading: false,
    error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchAll",
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const [
        daily,
        loan,
        team,
        agents,
        report,
      ] = await Promise.all([
        fetchDailySummaryRequest(),
        fetchLoanSummaryRequest(params),
        fetchTeamSummaryRequest(params),
        fetchAgentPerformanceRequest(params),
        fetchMonthlyReportRequest(params),
      ]);

      return {
        daily: daily.summary,
        loan: loan.summary,
        team: team.summary,
        agents: agents.tracker,
        report: report.summary,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error fetching dashboard");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;

        state.dailySummary = action.payload.daily;
        state.loanSummary = action.payload.loan;
        state.teamSummary = action.payload.team;
        state.agentPerformance = action.payload.agents;
        state.monthlyReport = action.payload.report;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;