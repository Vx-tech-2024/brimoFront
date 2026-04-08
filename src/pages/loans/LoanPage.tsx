import { useEffect, useState } from "react";
import { updateLoan, createLoan, fetchLoans, deleteLoan } from "../../features/loans/loanSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AppLayout from "../../components/layout/AppLayout";

export default function LoanPage() {
  const dispatch = useAppDispatch();
  const { loans, loading } = useAppSelector((state) => state.loans);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [teamMemberId, setTeamMemberId] = useState("");
  const [loanType, setLoanType] = useState("");
  const [loanAmount, setLoanAmount] = useState<number | "">("");
  const [amountDisbursed, setAmountDisbursed] = useState<number | "">("");
  const [status, setStatus] = useState("PENDING");
  const [createdDate, setCreatedDate] = useState("");
  const [disbursedDate, setDisbursedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      teamMemberId,
      loanType,
      loanAmount: Number(loanAmount),
      amountDisbursed:
        amountDisbursed === "" ? null : Number(amountDisbursed),
      status,
      createdDate,
      disbursedDate,
      notes,
    };

    if (editingId) {
      await dispatch(updateLoan({ id: editingId, data }));
      setEditingId(null);
    } else {
      await dispatch(createLoan(data));
    }

    await dispatch(fetchLoans({ status: filterStatus }));

    setTeamMemberId("");
    setLoanType("");
    setLoanAmount("");
    setAmountDisbursed("");
    setStatus("PENDING");
    setCreatedDate("");
    setDisbursedDate("");
    setNotes("");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this loan?")) return;
    await dispatch(deleteLoan(id));
    await dispatch(fetchLoans({ status: filterStatus }));
  };

  const handleEdit = (loan: any) => {
    setEditingId(loan.id);
    setTeamMemberId(loan.teamMemberId);
    setLoanType(loan.loanType);
    setLoanAmount(loan.loanAmount);
    setAmountDisbursed(loan.amountDisbursed || "");
    setStatus(loan.status);
    setCreatedDate(loan.createdDate.slice(0, 10));
    setDisbursedDate(loan.disbursedDate?.slice(0, 10) || "");
    setNotes(loan.notes || "");
  };

  useEffect(() => {
    if (status === "REJECTED") {
      setAmountDisbursed(0);
    }
  }, [status]);

  useEffect(() => {
    dispatch(fetchLoans ({ status: filterStatus }));
  }, [filterStatus, dispatch]);

  return (
    <AppLayout>
      {/* FILTER */}
      <div className="mb-6 bg-white p-4 rounded-lg border border-border flex items-center gap-4">
        <label className="text-sm font-medium">Filter by Status:</label>
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="DISBURSED">Disbursed</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* FORM */}
      <div className="mb-6 bg-white p-4 rounded-lg border border-border">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Loan" : "Add Loan"}
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
          <input
            placeholder="Team Member ID"
            className="border p-2 rounded"
            value={teamMemberId}
            onChange={(e) => setTeamMemberId(e.target.value)}
            required
          />

          <input
            placeholder="Loan Type"
            className="border p-2 rounded"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Loan Amount"
            className="border p-2 rounded"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value === "" ? "" : Number(e.target.value))}
            required
          />

          <input
            type="number"
            placeholder="Amount Disbursed"
            className="border p-2 rounded"
            value={amountDisbursed}
            onChange={(e) => setAmountDisbursed(e.target.value === "" ? "" : Number(e.target.value))}
            disabled={status === "REJECTED"}
          />

          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="DISBURSED">Disbursed</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <input
            type="date"
            className="border p-2 rounded"
            placeholder="Creation Date"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
            required
          />

          <input
            type="date"
            className="border p-2 rounded"
            placeholder="Disbursed Date"
            value={disbursedDate}
            onChange={(e) => setDisbursedDate(e.target.value)}
          />

          <textarea
            placeholder="Notes"
            className="border p-2 rounded md:col-span-3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            type="submit"
            className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update Loan" : "Add Loan"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-3">Ref</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Disbursed</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan: any) => (
                <tr key={loan.id} className="border-t">
                  <td className="p-3">{loan.loanReference}</td>
                  <td className="p-3">{loan.teamMember?.fullName}</td>
                  <td className="p-3">{loan.loanType}</td>
                  <td className="p-3">{loan.loanAmount}</td>
                  <td className="p-3">{loan.amountDisbursed || 0}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        loan.status === "DISBURSED"
                          ? "bg-green-100 text-green-600"
                          : loan.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(loan)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(loan.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppLayout>
  );
}