import axiosInstance from "../../lib/axios";
import axios from "../../lib/axios";
import type { TeamMember } from "./teamMembersTypes";

export const fetchTeamMembersRequest = async (): Promise<TeamMember[]> => {
    const response = await axios.get("/team-members");
    return response.data.members;
};

export const createTeamMemberRequest = async (data: {
    fullName: string;
    employmentNumber: string;
    monthsInService: number;
    status: string;
}) => {
    const response = await axios.post("/team-members", data);
    return response.data.member;
};

export const updateTeammemberRequest = (id: string, data: any) => {
    return axiosInstance.put(`/team-members/${id}`, data);
};

export const deleteTeamMemberRequest = (id: string) => {
    return axiosInstance.delete(`/team-members/${id}`);
}