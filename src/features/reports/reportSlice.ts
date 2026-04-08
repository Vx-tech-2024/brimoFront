// src/features/reports/reportSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMonthlyReport } from "./reportApi";

export const getMonthlyReport = createAsyncThunk(
  "reports/getMonthly",
  async (params: any) => {
    return await fetchMonthlyReport(params);
  }
);

interface ReportState {
  monthlyReport: any;
  loading: boolean;
}

const initialState: ReportState = {
  monthlyReport: null,
  loading: false,
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMonthlyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyReport = action.payload;
      })
      .addCase(getMonthlyReport.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default reportSlice.reducer;