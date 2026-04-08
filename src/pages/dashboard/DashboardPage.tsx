import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDashboardData } from "../../features/dashboard/dashboardSlice";
import Card from "./Card";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const {
    dailySummary,
    loanSummary,
    teamSummary,
    agentPerformance,
    monthlyReport,
    loading,
  } = useAppSelector((state) => state.dashboard);

  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchDashboardData({ month, year }));
  }, [dispatch, month, year]);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2">
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border p-2 rounded w-24 "
              placeholder="Month"
            />

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border p-2 rounded w-28"
              placeholder="Year"
            />
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card title="Total Disbursed" value={teamSummary?.totalDisbursed} />
          <Card title="Team Target" value={teamSummary?.totalTeamTarget} />
          <Card
            title="Achievement %"
            value={teamSummary?.teamAchievedRate?.toFixed(1)}
          />
          <Card title="Total Loans" value={loanSummary?.totalLoans} />
          <Card
            title="Pending Loans"
            value={loanSummary?.totalPendingLoans}
          />
          <Card
            title="Rejected Loans"
            value={loanSummary?.totalRejectedLoans}
          />
        </div>

        {/* DAILY SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-2xl font-semibold text-center">
          <Card
            title="Created Today"
            value={dailySummary?.loansCreatedToday}
          />
          <Card
            title="Disbursed Today"
            value={dailySummary?.loansDisbursedToday}
          />
          <Card
            title="Disbursed Amount Today"
            value={dailySummary?.totalAmountDisbursedToday}
          />
        </div>

        {/* AGENT PERFORMANCE TABLE */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-4 border-b font-semibold bg-gray-400 text-center">Agent Performance</div>

          <table className="w-full text-sm">
            <thead className="bg-gray-300">
              <tr>
                <th className="p-3 text-left">Agent</th>
                <th className="p-3">Target</th>
                <th className="p-3">Disbursed</th>
                <th className="p-3 bg-amber-300">Target Achieved</th>
                <th className="p-3">Loans</th>
              </tr>
            </thead>

            <tbody>
              {agentPerformance.map((a) => (
                <tr key={a.teamMemberId} className="border-t">
                  <td className="p-3">{a.name}</td>
                  <td className="p-3 text-center">{a.salesTarget}</td>
                  <td className="p-3 text-center">{a.paidSales}</td>
                  <td className="p-3 text-center bg-amber-400 text-green-900">
                    {a.salesPercentage.toFixed(1)}%
                  </td>
                  <td className="p-3 text-center">
                    {a.loanDisbursementCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RECENT LOANS TABLE */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-4 border-b font-semibold">Monthly Loans</div>

          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">Ref</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {monthlyReport?.totalLoans === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="text-center text-sm text-gray-500">
            Loading dashboard...
          </div>
        )}
      </div>
    </AppLayout>
  );
}