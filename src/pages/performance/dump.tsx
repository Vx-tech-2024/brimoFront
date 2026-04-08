import { useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAgentPerformance } from "../../features/performance/performaceSlice";

export default function AgentPerformancePage() {
  const dispatch = useAppDispatch();
  const { agentTracker } = useAppSelector((s) => s.performance);

  useEffect(() => {
    dispatch(getAgentPerformance({}));
  }, [dispatch]);

  return (
    <AppLayout>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3">Agent</th>
              <th className="p-3">Target</th>
              <th className="p-3">Disbursed</th>
              <th className="p-3">Achievement %</th>
              <th className="p-3">Deficit</th>
              <th className="p-3">Loans</th>
            </tr>
          </thead>

          <tbody>
            {agentTracker.map((a: any) => (
              <tr key={a.teamMemberId} className="border-t">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.salesTarget}</td>
                <td className="p-3">{a.paidSales}</td>
                <td className="p-3">
                  <span className="font-semibold text-blue-600">
                    {a.salesPercentage.toFixed(1)}%
                  </span>
                </td>
                <td className="p-3 text-red-500">{a.deficient}</td>
                <td className="p-3">{a.loanDisbursementCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}