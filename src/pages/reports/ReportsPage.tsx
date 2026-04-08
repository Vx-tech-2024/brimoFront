import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMonthlyReport } from "../../features/reports/reportSlice";
import { exportMonthlyCSV } from "../../features/reports/reportApi";

export default function ReportsPage() {
  const dispatch = useAppDispatch();
  const { monthlyReport } = useAppSelector((s) => s.reports);

  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");

  useEffect(() => {
    dispatch(getMonthlyReport({}));
  }, [dispatch]);

  const handleFilter = () => {
    dispatch(
      getMonthlyReport({
        month: Number(month) || undefined,
        year: Number(year) || undefined,
      })
    );
  };

  const handleExport = async () => {
    const blob = await exportMonthlyCSV({
      month,
      year,
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monthly-report.csv";
    a.click();
  };


  return (
    <AppLayout>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border mb-6 flex gap-4 items-end">
        <input
          type="number"
          placeholder="Month (1-12)"
          className="border p-2 rounded"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Year"
          className="border p-2 rounded"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>

        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      {monthlyReport && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-500 ">Total Loans</p>
            <p className="text-xl font-semibold">
              {monthlyReport.summary.totalLoans}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Total Loan Amount</p>
            <p className="text-xl font-semibold">
              {monthlyReport.summary.totalLoanAmount}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Total Disbursed</p>
            <p className="text-xl font-semibold">
              {monthlyReport.summary.totalAmountDisbursed}
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-300">
            <tr>
              <th className="p-3 text-start">Reference</th>
              <th className="p-3 text-start">Agent</th>
              <th className="p-3 text-start">Type</th>
              <th className="p-3 text-start">Amount</th>
              <th className="p-3 text-start">Status</th>
              <th className="p-3 text-start">Disbursed</th>
            </tr>
          </thead>

          <tbody>
            {monthlyReport?.loans?.map((loan: any) => (
              <tr key={loan.id} className="border-t">
                <td className="p-3 text-start">{loan.loanReference}</td>
                <td className="p-3 text-start">{loan.teamMember?.fullName}</td>
                <td className="p-3 text-start">{loan.loanType}</td>
                <td className="p-3 text-start">{loan.loanAmount}</td>
                <td className="p-3 text-start">{loan.status}</td>
                <td className="p-3 text-start">{loan.amountDisbursed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}