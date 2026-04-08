export interface TeamMember {
    id: string;
    fullName: string;
    employmentNumber: number;
    monthsInService: number;
    status: "ACTIVE" | "INACTIVE";
}

export interface TeamMembersState {
    members: TeamMember[];
    loading: boolean;
    error: string | null;
}