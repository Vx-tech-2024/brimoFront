export interface TeamMember {
    id: string;
    fullName: string;
}

export interface AgentTarget {
    id: string;
    teamMemberId: string;
    teamMember: TeamMember;

    month: number;
    year: number;

    targetAmount: number;
    targetLoanCount: number;

    createdAt: string;
}

export interface CreateAgentTargetPayload {
    teamMemberId: string;
    month: number;
    year: number;
    targetAmount: number;
    targetLoanCount: number;
}

export interface updateAgentTargetPayload {
    id: string;
    data: CreateAgentTargetPayload;
}

export interface TeamTarget {
    id: string;
    month: number;
    year: number;
    targetAmount: number;
    targetLoanCount: number;
    createdAt: string;
}

export interface TeamTargetResponse {
    targets: TeamTarget[];
}