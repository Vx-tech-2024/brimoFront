import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import{ fetchAgentTargetsRequest, createAgentTargetRequest, updateAgentTargetRequest, deleteAgentTargetRequest } from "./targetApi";
import type { AgentTarget } from "./targetType";
import { fetchTeamTargets } from "./targetApi";
import type { TeamTarget } from "./targetType";

interface TargetState {
  agentTargets: AgentTarget[];
  teamTargets: TeamTarget[];
  loadingAgent: boolean;
  loadingTeam: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: TargetState = {
  agentTargets: [],
  teamTargets: [],
  loadingAgent: false,
  loadingTeam: false,
  error: null,
  loading: false,
};

/* THUNKS */

export const fetchAgentTargets = createAsyncThunk(
  "targets/fetchAgentTargets",
  async (params: any, { rejectWithValue }) => {
    try {
      return await fetchAgentTargetsRequest(params);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createAgentTarget = createAsyncThunk(
  "targets/createAgentTarget",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createAgentTargetRequest(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateAgentTarget = createAsyncThunk(
  "targets/updateAgentTarget",
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      return await updateAgentTargetRequest({ id, data });
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteAgentTarget = createAsyncThunk(
  "targets/deleteAgentTarget",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteAgentTargetRequest(id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getTeamTargets = createAsyncThunk(
  "targets/getTeamTargets",
  async (params: any, { rejectWithValue }) => {
    try {
    const res = await fetchTeamTargets(params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
}
);

/* SLICE */

const targetSlice = createSlice({
  name: "targets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentTargets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgentTargets.fulfilled, (state, action) => {
        state.loading = false;
        state.agentTargets = action.payload;
      })
      .addCase(fetchAgentTargets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createAgentTarget.fulfilled, (state, action) => {
        state.agentTargets.unshift(action.payload);
      })

      .addCase(updateAgentTarget.fulfilled, (state, action) => {
        const index = state.agentTargets.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) state.agentTargets[index] = action.payload;
      })

      .addCase(deleteAgentTarget.fulfilled, (state, action) => {
        state.agentTargets = state.agentTargets.filter(
          (t) => t.id !== action.payload
        );
      })

      .addCase(getTeamTargets.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTeamTargets.fulfilled, (state, action) => {
        state.loading = false;
        state.teamTargets = action.payload;
      })

      .addCase(getTeamTargets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default targetSlice.reducer;