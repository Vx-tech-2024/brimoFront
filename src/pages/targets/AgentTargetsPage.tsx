import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAgentTargets, createAgentTarget, updateAgentTarget, deleteAgentTarget, getTeamTargets } from "../../features/targets/targetSlice";
import { createTeamTarget, updateTeamTarget, deleteTeamTarget } from "../../features/targets/targetApi";

export default function AgentTargetsPage() {
  const dispatch = useAppDispatch();
  const { agentTargets, teamTargets } = useAppSelector(
    (s) => s.targets
  );

  /* AGENT STATE  */
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [teamMemberId, setTeamMemberId] = useState("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [targetLoanCount, setTargetLoanCount] = useState<number | "">("");

  /*  TEAM STATE */
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamMonth, setTeamMonth] = useState<number | "">("");
  const [teamYear, setTeamYear] = useState<number | "">("");
  const [teamTargetAmount, setTeamTargetAmount] = useState<number | "">("");
  const [teamTargetLoanCount, setTeamTargetLoanCount] = useState<number | "">("");

  /* FETCH DATA */
  useEffect(() => {
    dispatch(fetchAgentTargets({}));
    dispatch(getTeamTargets({}));
  }, [dispatch]);

  /* AGENT HANDLERS */
  const handleAgentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamMemberId || !month || !year || !targetAmount) {
      alert("All fields are required");
      return;
    }

    const data = {
      teamMemberId,
      month: Number(month),
      year: Number(year),
      targetAmount: Number(targetAmount),
      targetLoanCount: Number(targetLoanCount),
    };

    if (editingAgentId) {
      await dispatch(updateAgentTarget({ id: editingAgentId, data }));
      setEditingAgentId(null);
    } else {
      await dispatch(createAgentTarget(data));
    }

    dispatch(fetchAgentTargets({}));

    setTeamMemberId("");
    setMonth("");
    setYear("");
    setTargetAmount("");
    setTargetLoanCount("");
  };

  const handleAgentEdit = (t: any) => {
    setEditingAgentId(t.id);
    setTeamMemberId(t.teamMemberId);
    setMonth(t.month);
    setYear(t.year);
    setTargetAmount(t.targetAmount);
    setTargetLoanCount(t.targetLoanCount);
  };

  const handleAgentDelete = async (id: string) => {
    if (!window.confirm("Delete target?")) return;
    await dispatch(deleteAgentTarget(id));
  };

  /*TEAM HANDLERS */
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamMonth || !teamYear || !teamTargetAmount) {
      alert("All team fields are required");
      return;
    }

    const data = {
      month: Number(teamMonth),
      year: Number(teamYear),
      targetAmount: Number(teamTargetAmount),
      targetLoanCount: Number(teamTargetLoanCount),
    };

    if (editingTeamId) {
      await updateTeamTarget(editingTeamId, data);
      setEditingTeamId(null);
    } else {
      await createTeamTarget(data);
    }

    dispatch(getTeamTargets({}));

    setTeamMonth("");
    setTeamYear("");
    setTeamTargetAmount("");
    setTeamTargetLoanCount("");
  };

  const handleTeamEdit = (t: any) => {
    setEditingTeamId(t.id);
    setTeamMonth(t.month);
    setTeamYear(t.year);
    setTeamTargetAmount(t.targetAmount);
    setTeamTargetLoanCount(t.targetLoanCount);
  };

  const handleTeamDelete = async (id: string) => {
    if (!window.confirm("Delete team target?")) return;
    await deleteTeamTarget(id);
    dispatch(getTeamTargets({}));
  };

  return (
    <AppLayout>
      <div className="space-y-10">
        {/*AGENT TARGETS*/}
        <div>
          {/* Form */}
          <div className="bg-white p-4 rounded-lg border mb-6">
            <form
              onSubmit={handleAgentSubmit}
              className="grid md:grid-cols-5 gap-4"
            >
              <input
                placeholder="Team Member ID"
                className="border p-2 rounded"
                value={teamMemberId}
                onChange={(e) => setTeamMemberId(e.target.value)}
              />

              <input
                type="number"
                placeholder="Month"
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

              <input
                type="number"
                placeholder="Target Amount"
                className="border p-2 rounded"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
              />

              <input
                type="number"
                placeholder="Target Loans"
                className="border p-2 rounded"
                value={targetLoanCount}
                onChange={(e) =>
                  setTargetLoanCount(Number(e.target.value))
                }
              />

              <button className="md:col-span-5 bg-blue-600 text-white py-2 rounded">
                {editingAgentId ? "Update Target" : "Create Target"}
              </button>
            </form>
          </div>

          {/* Table */}
          <table className="w-full border text-sm">
            <thead className="bg-gray-300">
              <tr>
                <th className="p-2 text-start">Agent</th>
                <th className="p-2 text-start">Month</th>
                <th className="p-2 text-start">Year</th>
                <th className="p-2 text-start">Amount</th>
                <th className="p-2 text-start">Loans</th>
                <th className="p-2 text-start">Actions</th>
              </tr>
            </thead>

            <tbody>
              {agentTargets.map((t: any) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2 text-start">{t.teamMember?.fullName}</td>
                  <td className="p-2 text-start">{t.month}</td>
                  <td className="p-2 text-start">{t.year}</td>
                  <td className="p-2 text-start">{t.targetAmount}</td>
                  <td className="p-2 text-start">{t.targetLoanCount}</td>
                  <td className="p-2 flex gap-4">
                    <button className="text-blue-600" onClick={() => handleAgentEdit(t)}>Edit</button>
                    <button className="text-red-600" onClick={() => handleAgentDelete(t.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*TEAM TARGETS*/}
        <div>
          <h1 className="text-2xl font-bold mb-4">Team Targets</h1>

          {/* Form */}
          <div className="bg-white p-4 rounded-lg border mb-6">
            <form
              onSubmit={handleTeamSubmit}
              className="grid md:grid-cols-4 gap-4"
            >
              <input
                type="number"
                placeholder="Month"
                className="border p-2 rounded"
                value={teamMonth}
                onChange={(e) => setTeamMonth(Number(e.target.value))}
              />

              <input
                type="number"
                placeholder="Year"
                className="border p-2 rounded"
                value={teamYear}
                onChange={(e) => setTeamYear(Number(e.target.value))}
              />

              <input
                type="number"
                placeholder="Target Amount"
                className="border p-2 rounded"
                value={teamTargetAmount}
                onChange={(e) =>
                  setTeamTargetAmount(Number(e.target.value))
                }
              />

              <input
                type="number"
                placeholder="Target Loans"
                className="border p-2 rounded"
                value={teamTargetLoanCount}
                onChange={(e) =>
                  setTeamTargetLoanCount(Number(e.target.value))
                }
              />

              <button className="md:col-span-4 bg-green-600 text-white py-2 rounded">
                {editingTeamId ? "Update Team Target" : "Create Team Target"}
              </button>
            </form>
          </div>

          {/* Table */}
          <table className="w-full border text-sm">
            <thead className="bg-gray-300">
              <tr>
                <th className="p-2 text-start">Month</th>
                <th className="p-2 text-start">Year</th>
                <th className="p-2 text-start">Amount</th>
                <th className="p-2 text-start">Loans</th>
                <th className="p-2 text-start">Actions</th>
              </tr>
            </thead>

            <tbody>
              {teamTargets.map((t: any) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2">{t.month}</td>
                  <td className="p-2">{t.year}</td>
                  <td className="p-2">{t.targetAmount}</td>
                  <td className="p-2">{t.targetLoanCount}</td>
                  <td className="p-2 flex gap-4">
                    <button className="text-blue-600" onClick={() => handleTeamEdit(t)}>Edit</button>
                    <button className="text-red-600" onClick={() => handleTeamDelete(t.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}