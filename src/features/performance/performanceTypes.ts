export interface AgentPerformance {
    teamMemberId: string;
    name: string;
    salesTarget: number;
    projectedTarget: number;
    paidSales: number;
    salesPercentage: number;
    pendings: number;
    deficient: number;
    targetOfLoans: number;
    loanDisbursementCount: number;
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

export interface MonthlyLoan {
    loanId: string;
    loanReference: string;
    agentName: string;
    loanType: string;
    loanAmount: number;
    status: string;
    amountDisbursed: number;
    createdDate: string;
    disbursedDate: string | null;
}