export interface DailySummary {
  loansCreatedToday: number;
  loansDisbursedToday: number;
  totalAmountCreatedToday: number;
  totalAmountDisbursedToday: number;
  pendingLoansToday: number;
  rejectedLoansToday: number;
}

export interface LoanMonitoringSummary {
  totalLoans: number;
  totalPendingLoans: number;
  totalDisbursedLoans: number;
  totalRejectedLoans: number;
  totalLoanAmount: number;
  totalAmountDisbursed: number;
  totalAmountPending: number;
  disbursementRate: number;
  averageLoanAmount?: number;
}

export interface TeamSummary {
  totalTeamTarget: number;
  totalDisbursed: number;
  teamAchievedRate: number;
  totalPendingAmount: number;
  totalRejectedCount: number;
  totalDisbursementCount: number;
  targetLoanCount: number;
}

export interface AgentPerformance {
  teamMemberId: string;
  name: string;
  salesTarget: number;
  paidSales: number;
  salesPercentage: number;
  pendings: number;
  deficient: number;
  targetOfLoans: number;
  loanDisbursementCount: number;
}

export interface MonthlyReportSummary {
  totalLoans: number;
  totalLoanAmount: number;
  totalAmountDisbursed: number;
  totalDisbursedCount: number;
}

export interface DashboardState {
  dailySummary: DailySummary | null;
  loanSummary: LoanMonitoringSummary | null;
  teamSummary: TeamSummary | null;
  agentPerformance: AgentPerformance[];
  monthlyReport: MonthlyReportSummary | null;
  loading: boolean;
  error: string | null;
}