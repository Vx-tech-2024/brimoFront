import { useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAgentPerformance, getTeamSummaryData } from "../../features/performance/performaceSlice";

export default function AgentPerformancePage() {
  const dispatch = useAppDispatch();
  const { agentTracker, teamSummary } = useAppSelector(
    (s) => s.performance
  );

  useEffect(() => {
    dispatch(getAgentPerformance({}));
    dispatch(getTeamSummaryData({}));
  }, [dispatch]);

  return (
    <AppLayout>
      <div className="space-y-10">

        {/*AGENT TABLE*/}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Agent Performance
          </h2>

          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-300">
                <tr>
                  <th className="p-3 text-start">Agent</th>
                  <th className="p-3 text-start">Target</th>
                  <th className="p-3 text-start">Disbursed</th>
                  <th className="p-3 text-start">Achievement %</th>
                  <th className="p-3 text-start">Deficit</th>
                  <th className="p-3 text-start">Loans</th>
                </tr>
              </thead>

              <tbody>
                {agentTracker.map((a: any) => (
                  <tr key={a.teamMemberId} className="border-t">
                    <td className="p-3 text-start">{a.name}</td>
                    <td className="p-3 text-start">{a.salesTarget}</td>
                    <td className="p-3 text-start">{a.paidSales}</td>
                    <td className="p-3 text-start">
                      <span className="font-semibold text-blue-600">
                        {a.salesPercentage.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-red-500 text-start">
                      {a.deficient}
                    </td>
                    <td className="p-3 text-start">
                      {a.loanDisbursementCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TEAM SUMMARY*/}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Team Performance Summary
          </h2>

          {teamSummary && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">

              <div className=" p-4 rounded-lg border bg-linear-to-b  from-blue-700 via-cyan-900 to-blue-300">
                <p className="text-sm text-white">Team Target</p>
                <h3 className="text-xl font-bold text-white">
                  {teamSummary.totalTeamTarget}
                </h3>
              </div>

              <div className="bg-linear-to-b  from-blue-700 via-cyan-900 to-blue-300 p-4 rounded-lg border">
                <p className="text-sm text-white">Total Disbursed</p>
                <h3 className="text-xl font-bold text-white">
                  {teamSummary.totalDisbursed}
                </h3>
              </div>

              <div className="bg-linear-to-b  from-blue-700 via-cyan-900 to-blue-300 p-4 rounded-lg border">
                <p className="text-sm text-white">Achievement</p>
                <h3 className="text-xl font-bold text-green-500">
                  {teamSummary.teamAchievedRate.toFixed(1)}%
                </h3>
              </div>

              <div className="bg-linear-to-b  from-blue-700 via-cyan-900 to-blue-300 p-4 rounded-lg border">
                <p className="text-sm text-white">Pending Amount</p>
                <h3 className="text-xl font-bold text-orange-600">
                  {teamSummary.totalPendingAmount}
                </h3>
              </div>

              <div className="bg-linear-to-b  from-blue-700 via-cyan-900 to-blue-300 p-4 rounded-lg border">
                <p className="text-sm text-white">Rejected Loans</p>
                <h3 className="text-xl font-bold text-red-600">
                  {teamSummary.totalRejectedCount}
                </h3>
              </div>

              <div className="bg-linear-to-b  from-blue-700 via-cyan-900 to-blue-300 p-4 rounded-lg border">
                <p className="text-sm text-white">Disbursement Count</p>
                <h3 className="text-xl font-bold text-white">
                  {teamSummary.totalDisbursementCount}
                </h3>
              </div>

              <div className="bg-linear-to-b  from-blue-700 via-cyan-900 to-blue-300 p-4 rounded-lg border">
                <p className="text-sm text-white">Target Loans</p>
                <h3 className="text-xl font-bold text-white">
                  {teamSummary.targetLoanCount}
                </h3>
              </div>

            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}