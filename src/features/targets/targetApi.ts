import axiosInstance from "../../lib/axios";
import type { CreateAgentTargetPayload, updateAgentTargetPayload } from "./targetType";

export const fetchAgentTargetsRequest = async (params?: {
    month?: number;
    year?: number;
    teamMemberId?: string;
}) => {
    const res = await axiosInstance.get("/targets/agents", { params });
    return res.data.targets;
};

export const createAgentTargetRequest = async (
    data: CreateAgentTargetPayload
) => {
    const res = await axiosInstance.post("/targets/agents", data);
    return res.data.target;
};

export const updateAgentTargetRequest = async ({
    id,
    data,
}: updateAgentTargetPayload) => {
    const res = await axiosInstance.put(`/targets/agents/${id}`, data);
    return res.data.target;
};

export const deleteAgentTargetRequest = async (id: string) => {
    await axiosInstance.delete(`/targets/agents/${id}`);
    return id;
}

export const fetchTeamTargets = async (params?: any) => {
    const res = await axiosInstance.get("targets/team", {
        params,
    });
    return res.data.targets;
};

export const createTeamTarget = async ( data: any) => {
    const res = await axiosInstance.post("/targets/team", data);
    return res.data.targets;
};

export const updateTeamTarget = async (id: string, data: any) => {
    const res = await axiosInstance.put(`/targets/team/${id}`, data);
    return res.data.targets;
};

export const deleteTeamTarget = async (id: string) => {
    const res = await axiosInstance.delete(`/targets/team/${id}`, );
    return res.data.targets;
}