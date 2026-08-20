import { useEffect, useMemo, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {  createDailyActivity,  deleteDailyActivity,  getDailyActivities, updateDailyActivity} from "../../features/dailyActivity/dailyActivitySlice";
import { fetchTeamMembersRequest } from "../../features/teamMembers/teamMembersApi";
import type { TeamMember } from "../../features/teamMembers/teamMembersTypes";

export default function DailyActivityPage() {
  const dispatch = useAppDispatch();

  const { activities, loading, error } =
    useAppSelector((state) => state.dailyActivity);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    []
  );

  const [teamMemberId, setTeamMemberId] =
    useState("");

  const [activityType, setActivityType] =
    useState<
      | "DATA_FOLLOW_UP"
      | "FIELD_WORK"
      | "INSTITUTIONAL_VISIT"
      | "OTHERS"
    >("DATA_FOLLOW_UP");

  const [prospectsGiven, setProspectsGiven] =
    useState<number | "">("");

  const [actualProspectsCalled, setActualProspectsCalled] =
    useState<number | "">("");

  const [loanCreated, setLoanCreated] =
    useState(false);

  const [loanId, setLoanId] = useState("");

  const [supervisorComment, setSupervisorComment] =
    useState("");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [editingId, setEditingId] = useState<string | null>(null);

    const variance = useMemo(() => {
    const given = Number(prospectsGiven) || 0;
    const called = Number(actualProspectsCalled) || 0;

    return given - called;
  }, [prospectsGiven, actualProspectsCalled]);

    useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const members =
          await fetchTeamMembersRequest();

        setTeamMembers(members);
      } catch (error) {
        console.error(
          "Failed to load team members",
          error
        );
      }
    };

    loadTeamMembers();

    dispatch(getDailyActivities());
  }, [dispatch]);

  const handleEdit = (activity: any) => {
    setEditingId(activity.id);
    setTeamMemberId(activity.teamMember.id);  
    setActivityType(activity.activityType);
    setProspectsGiven(activity.prospectsGiven);
    setActualProspectsCalled(activity.actualProspectsCalled);
    setLoanCreated(activity.loanCreated);
    setLoanId(activity.loanId ?? "");
    setSupervisorComment(activity.supervisorComment ?? "");
    setDate(activity.date.split("T")[0]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  };

    const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!teamMemberId) {
      alert("Please select a team member");
      return;
    }

    if (
      prospectsGiven === "" ||
      actualProspectsCalled === ""
    ) {
      alert("Please enter prospect numbers");
      return;
    }

    if (
      Number(actualProspectsCalled) >
      Number(prospectsGiven)
    ) {
      alert(
        "Actual prospects called cannot be greater than prospects given"
      );
      return;
    }
    
    if (editingId) {
      await dispatch(
        updateDailyActivity({
          id: editingId,
          data: {
            teamMemberId,
            activityType,
            prospectsGiven: Number(prospectsGiven),
            actualProspectsCalled: Number(actualProspectsCalled),
            loanCreated,
            loanId: loanCreated ? loanId : undefined,
            supervisorComment: supervisorComment || undefined,
            date,
          },
        })
      ).unwrap();
    }else {
    await dispatch(
      createDailyActivity({
        teamMemberId,

        activityType,

        prospectsGiven: Number(prospectsGiven),

        actualProspectsCalled:
          Number(actualProspectsCalled),

        loanCreated,

        loanId: loanCreated
          ? loanId
          : undefined,

        supervisorComment:
          supervisorComment || undefined,

        date,
      })
    ).unwrap();
  }

    // Reset form
    setEditingId(null);
    setTeamMemberId("");
    setActivityType("DATA_FOLLOW_UP");
    setProspectsGiven("");
    setActualProspectsCalled("");
    setLoanCreated(false);
    setLoanId("");
    setSupervisorComment("");

    setDate(
      new Date().toISOString().split("T")[0]
    );
  };

  const activityTypeLabels = {
  DATA_FOLLOW_UP: "Data Follow Up",
  FIELD_WORK: "Field Work",
  INSTITUTIONAL_VISIT: "Institutional Visit",
  OTHERS: "Others",
};



return (
  <AppLayout>
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Daily Activity & Prospects Tracking
        </h1>

        <p className="text-gray-500 mt-1">
          Record and monitor daily prospect activities.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Team Member */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Team Member
            </label>

            <select
              value={teamMemberId}
              onChange={(e) =>
                setTeamMemberId(e.target.value)
              }
              className="w-full border rounded p-2"
            >
              <option value="">
                Select Team Member
              </option>

              {teamMembers.map((member) => (
                <option
                  key={member.id}
                  value={member.id}
                >
                  {member.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Activity Type
            </label>

            <select
              value={activityType}
              onChange={(e) =>
                setActivityType(
                  e.target.value as typeof activityType
                )
              }
              className="w-full border rounded p-2"
            >
              <option value="DATA_FOLLOW_UP">
                Data Follow Up
              </option>

              <option value="FIELD_WORK">
                Field Work
              </option>

              <option value="INSTITUTIONAL_VISIT">
                Institutional Visit
              </option>

              <option value="OTHERS">
                Others
              </option>
            </select>
          </div>

          {/* Prospects Given */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Prospects Given
            </label>

            <input
              type="number"
              min="0"
              value={prospectsGiven}
              onChange={(e) =>
                setProspectsGiven(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }
              className="w-full border rounded p-2"
            />
          </div>

          {/* Actual Prospects Called */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Actual Prospects Called
            </label>

            <input
              type="number"
              min="0"
              value={actualProspectsCalled}
              onChange={(e) =>
                setActualProspectsCalled(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }
              className="w-full border rounded p-2"
            />
          </div>

          {/* Variance */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Variance
            </label>

            <input
              type="number"
              value={variance}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="w-full border rounded p-2"
            />
          </div>

          {/* Loan Created */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Loan Created
            </label>

            <select
              value={loanCreated ? "yes" : "no"}
              onChange={(e) =>
                setLoanCreated(
                  e.target.value === "yes"
                )
              }
              className="w-full border rounded p-2"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Loan ID */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Loan ID
            </label>

            <input
              type="text"
              value={loanId}
              disabled={!loanCreated}
              onChange={(e) =>
                setLoanId(e.target.value)
              }
              className="w-full border rounded p-2 disabled:bg-gray-100"
              placeholder={
                loanCreated
                  ? "Enter Loan ID"
                  : "Not applicable"
              }
            />
          </div>

        </div>

        {/* Supervisor Comment */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Supervisor Comment
          </label>

          <textarea
            value={supervisorComment}
            onChange={(e) =>
              setSupervisorComment(e.target.value)
            }
            rows={3}
            className="w-full border rounded p-2"
            placeholder="Enter supervisor comment..."
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Activity"
              : "Create Activity"}
          </button>
        </div>

      </form>

            <div className="bg-white rounded-lg border overflow-hidden">

        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">
            Daily Activity Records
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-200">
              <tr>

                <th className="p-3 text-left">
                  Team Member
                </th>

                <th className="p-3 text-left">
                  Activity Type
                </th>

                <th className="p-3 text-left">
                  Prospects Given
                </th>

                <th className="p-3 text-left">
                  Actual Prospects Called
                </th>

                <th className="p-3 text-left">
                  Variance
                </th>

                <th className="p-3 text-left">
                  Loan Created
                </th>

                <th className="p-3 text-left">
                  Loan ID
                </th>

                <th className="p-3 text-left">
                  Supervisor Comment
                </th>

                <th className="p-3 text-left">
                  Date
                </th>

                <th className="p-3 text-left">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {activities.map((activity) => (

                <tr
                  key={activity.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {activity.teamMember.fullName}
                  </td>

                  <td className="p-3">
                    {
                      activityTypeLabels[
                        activity.activityType
                      ]
                    }
                  </td>

                  <td className="p-3">
                    {activity.prospectsGiven}
                  </td>

                  <td className="p-3">
                    {activity.actualProspectsCalled}
                  </td>

                  <td className="p-3 font-semibold">
                    {activity.variance}
                  </td>

                  <td className="p-3">
                    {activity.loanCreated
                      ? "Yes"
                      : "No"}
                  </td>

                  <td className="p-3">
                    {activity.loanId || "-"}
                  </td>

                  <td className="p-3">
                    {activity.supervisorComment || "-"}
                  </td>

                  <td className="p-3">
                    {new Date(
                      activity.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => handleEdit(activity)} className="px-3 py-1 rounded text-blue-700 hover:bg-blue-100">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this activity?"
                          )
                        ) {
                          dispatch(
                            deleteDailyActivity(
                              activity.id
                            )
                          );
                        }
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  </td>

                </tr>

              ))}

              {activities.length === 0 && !loading && (
                <tr>

                  <td
                    colSpan={10}
                    className="p-8 text-center text-gray-500"
                  >
                    No daily activity records found.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  </AppLayout>
);
}