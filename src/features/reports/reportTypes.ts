export interface ReportLoan {
  id: string;
  loanReference: string;
  loanType: string;
  loanAmount: number;
  status: string;
  amountDisbursed: number;
  createdDate: string;
  disbursedDate?: string;
  teamMember: {
    fullName: string;
  };
}

export interface ReportSummary {
  totalLoans: number;
  totalLoanAmount: number;
  totalAmountDisbursed: number;
}

export interface MonthlyReportResponse {
  month: number;
  year: number;
  summary: ReportSummary;
  loans: ReportLoan[];
}