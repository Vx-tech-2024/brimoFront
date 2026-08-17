import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import teamMembersReducer from "../features/teamMembers/teamMembersSlice";
import loanReducer from "../features/loans/loanSlice";
import targetReducer from "../features/targets/targetSlice";
import performanceReducer from "../features/performance/performaceSlice";
import reportsReducer from "../features/reports/reportSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import dailyActivityReducer from "../features/dailyActivity/dailyActivitySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        teamMembers: teamMembersReducer,
        loans: loanReducer,
        targets: targetReducer,
        performance: performanceReducer,
        reports: reportsReducer,
        dashboard: dashboardReducer,
        dailyActivity: dailyActivityReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;