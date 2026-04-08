import { useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeamMembers, updateTeamMember, deleteTeamMember } from "../../features/teamMembers/teamMembersSlice";
import { useState } from "react";
import { createTeamMember } from "../../features/teamMembers/teamMembersSlice";

export default function TeamMembersPage() {
    const dispatch = useAppDispatch();
    const { members, loading } = useAppSelector((state) => state.teamMembers);
    const token = useAppSelector((state) => state.auth.token);
    const [fullName, setFullName] = useState("");
    const [employmentNumber, setEmploymentNumber] = useState("");
    const [monthsInService, setMonthsInService] = useState<number | "">("");
    const [status, setStatus] = useState("ACTIVE");
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Token being sent:", token);
        if (!fullName || !employmentNumber) {
            alert("All fields are required");
            return;
        }
        
        if (loading) return;

        console.log("SENDING DATA:", {
          fullName,
          employmentNumber,
          monthsInService,
          status,
        });
        const data = {
          fullName,
          employmentNumber,
          monthsInService,
          status,
        };

        if (editingId) {
          //Update
          await dispatch(updateTeamMember({ id: editingId, data }));
          setEditingId(null);
        } else {
          //Create
          await dispatch(createTeamMember(data));
        }

        await dispatch(fetchTeamMembers());

        //clear form
        setFullName("");
        setEmploymentNumber("");
        setMonthsInService(0);
        setStatus("ACTIVE");
    };

    const handleEdit = (member: any) => {
      setEditingId(member.id);
      setFullName(member.fullName);
      setEmploymentNumber(member.employmentNumber);
      setMonthsInService(member.monthsInService);
      setStatus(member.status);
    };

    const handleDelete = async (id: string) => {
      const confirmDelete = window.confirm("Delete this member?");
      if (!confirmDelete) return;

      await dispatch(deleteTeamMember(id));
    }

    useEffect(() => {
        dispatch(fetchTeamMembers());
    }, [dispatch]);

    return (
        <AppLayout>

  {/*FORM*/}
  <div className="mb-6 bg-white p-4 rounded-lg border border-border">
    <h2 className="text-lg font-semibold mb-4">Add Team Member</h2>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
      
      <input
        name="fullName"
        type="text"
        placeholder="Full Name"
        className="border p-2 rounded"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        name="employmentNumber"
        type="text"
        placeholder="Employment Number"
        className="border p-2 rounded"
        value={employmentNumber}
        onChange={(e) => setEmploymentNumber(e.target.value)}
      />

      <input
        name="monthsInService"
        type="number"
        placeholder="Months in Service"
        className="border p-2 rounded"
        value={monthsInService}
        onChange={(e) => {
          const value = e.target.value;
          setMonthsInService(value === "" ? 0 : Number(value));
        }}
      />

      <select
        name="status"
        className="border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {editingId ? "Update Member" : "Add Member"}
      </button>
    </form>
  </div>

  {/* ✅TABLE */}
  {loading ? (
    <p>Loading...</p>
  ) : (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Employment No</th>
            <th className="p-3">Months</th>
            <th className="p-3">Status</th>
            <th className="p-3">Member ID</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-t">
              <td className="p-3">{member.fullName}</td>
              <td className="p-3">{member.employmentNumber}</td>
              <td className="p-3">{member.monthsInService}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    member.status === "ACTIVE"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {member.status}
                </span>
              </td>
              <td className="p-3">{member.id}</td>
              <td className="p-3 space-x-2">
                <button onClick={() => handleEdit(member)} className="text-blue-600" >
                  Edit
                </button>
                <button onClick={() => handleDelete(member.id)} className="text-red-600">
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