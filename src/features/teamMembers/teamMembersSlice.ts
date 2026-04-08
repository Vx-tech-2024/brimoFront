import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TeamMembersState } from "./teamMembersTypes";
import { fetchTeamMembersRequest, createTeamMemberRequest, updateTeammemberRequest, deleteTeamMemberRequest } from "./teamMembersApi";

const initialState: TeamMembersState = {
    members: [],
    loading: false,
    error: null,
};

export const fetchTeamMembers = createAsyncThunk(
    "teamMembers/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchTeamMembersRequest();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

export const createTeamMember = createAsyncThunk(
    "teamMembers/create",
    async (data: any, { rejectWithValue }) => {
        try {
            return await createTeamMemberRequest(data);
        } catch (err: any) {
            console.log("ERROR RESPONSE:", err.response?.data);
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

export const updateTeamMember = createAsyncThunk(
    "teamMembers/update",
    async (
        { id, data }: { id: string; data: any },
        { rejectWithValue }
    ) => {
        try {
            const res = await updateTeammemberRequest(id, data);
            return res.data;
        } catch (err:any) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

export const deleteTeamMember = createAsyncThunk(
    "teamMembers/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteTeamMemberRequest(id);
            return id;
        } catch (err:any) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

const teamMembersSlice = createSlice({
    name: "teamMembers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          //fetch
          .addCase(fetchTeamMembers.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchTeamMembers.fulfilled, (state, action) => {
            state.loading = false;
            state.members = action.payload;
          })
          .addCase(fetchTeamMembers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })

          //create
          .addCase(createTeamMember.pending, (state) => {
            state.loading = true;
          })
          .addCase(createTeamMember.fulfilled, (state, action) => {
            state.loading = false;
            state.members.push(action.payload);
          })
          .addCase(createTeamMember.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })

          //update
          .addCase(updateTeamMember.fulfilled, (state, action) => {
            const index = state.members.findIndex(
                (m) => m.id === action.payload.id
            );
            if (index !== -1) {
                state.members[index] = action.payload;
            }
          })

          //delete
          .addCase(deleteTeamMember.fulfilled, (state, action) => {
            state.members = state.members.filter(
                (m) => m.id !== action.payload
            );
          })
    },
});

export default teamMembersSlice.reducer;