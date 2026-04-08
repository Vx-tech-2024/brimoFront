import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/loginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import TeamMembersPage from "../pages/teamMembers/TeamMembersPage";
import LoanPage from "../pages/loans/LoanPage";
import AgentTargetsPage from "../pages/targets/AgentTargetsPage";
import AgentPerformancePage from "../pages/performance/AgentPerformancePage";
import ReportsPage from "../pages/reports/ReportsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
            path="/"
            element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
           } 
        />
        <Route 
          path="/team-members"
          element={
            <ProtectedRoute>
              <TeamMembersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <LoanPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/target"
          element={
            <ProtectedRoute>
              <AgentTargetsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/performance"
          element={
            <ProtectedRoute>
              <AgentPerformancePage />
            </ProtectedRoute>
          }
        />

        <Route
           path="/reports"
           element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
           }
          />

      </Routes>
    </BrowserRouter>
  );
}