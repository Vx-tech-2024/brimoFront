import axiosInstance from "../../lib/axios";

export interface DailyActivity {
    id: string;
    teamMemberId: string;
    teamMember: {
        id: string;
        fullName: string;
        employmentNumber: string;
    };

    activityType: 
    | "DATA_FOLLOW_UP"
    | "FIELD_WORK"
    | "INSTITUTIONAL_VISIT"
    | "OTHERS";
    prospectsGiven: number;
    actualProspectsCalled: number;
    variance: number;

    loanCreated: number;
    loanId: string | null;
    supervisorComment: string | null;

    date: string;

    createdAt: string;
    updatedAt: string;
}

export interface CreateDailyActivityPayload {
    teamMemberId: string;
    activityType:
     | "DATA_FOLLOW_UP"
     | "FIELD_WORK"
     | "INSTITUTIONAL_VISIT"
     | "OTHERS";
    prospectsGiven: number;
    actualProspectsCalled: number;

    loanCreated: boolean;
    loanId?: string;

    supervisorComment?: string;

    date: string;    
}

export interface UpdateDailyActivityPayload {
    id: string;
    data: Partial<CreateDailyActivityPayload>;
}

export const fetchDailyActivitiesRequest = async (params?: {
    date?: string;
    teamMemberId?: string;
    activityType?: string;
}) => {
    const response = await axiosInstance.get("/daily-activities", {params,});
    return response.data.activities as DailyActivity[];
};

export const createDailyActivityRequest = async (
  data: CreateDailyActivityPayload
) => {
  const response = await axiosInstance.post(
    "/daily-activities",
    data
  );

  return response.data.activity as DailyActivity;
};

export const updateDailyActivityRequest = async ({
  id,
  data,
}: UpdateDailyActivityPayload) => {
  const response = await axiosInstance.put(
    `/daily-activities/${id}`,
    data
  );

  return response.data.activity as DailyActivity;
};

export const deleteDailyActivityRequest = async (
  id: string
) => {
  await axiosInstance.delete(`/daily-activities/${id}`);

  return id;
};