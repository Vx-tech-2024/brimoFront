import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createDailyActivityRequest, deleteDailyActivityRequest,
    fetchDailyActivitiesRequest, updateDailyActivityRequest,
    type CreateDailyActivityPayload, type DailyActivity,
    type UpdateDailyActivityPayload,
} from "./dailyActivityApi";

interface DailyActivityState {
  activities: DailyActivity[];

  loading: boolean;

  error: string | null;
}

const initialState: DailyActivityState = {
  activities: [],
  loading: false,
  error: null,
};

export const getDailyActivities = createAsyncThunk(
  "dailyActivity/getDailyActivities",
  async (
    params: {
      date?: string;
      teamMemberId?: string;
      activityType?: string;
    } | undefined,
    { rejectWithValue }
  ) => {
    try {
      return await fetchDailyActivitiesRequest(params);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch daily activities"
      );
    }
  }
);

export const createDailyActivity = createAsyncThunk(
  "dailyActivity/createDailyActivity",
  async (
    data: CreateDailyActivityPayload,
    { rejectWithValue }
  ) => {
    try {
      return await createDailyActivityRequest(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create daily activity"
      );
    }
  }
);

export const updateDailyActivity = createAsyncThunk(
  "dailyActivity/updateDailyActivity",
  async (
    payload: UpdateDailyActivityPayload,
    { rejectWithValue }
  ) => {
    try {
      return await updateDailyActivityRequest(payload);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update daily activity"
      );
    }
  }
);

export const deleteDailyActivity = createAsyncThunk(
  "dailyActivity/deleteDailyActivity",
  async (
    id: string,
    { rejectWithValue }
  ) => {
    try {
      return await deleteDailyActivityRequest(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete daily activity"
      );
    }
  }
);

const dailyActivitySlice = createSlice({
  name: "dailyActivity",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getDailyActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getDailyActivities.fulfilled,
        (state, action) => {
          state.loading = false;
          state.activities = action.payload;
        }
      )

      .addCase(
        getDailyActivities.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      // CREATE
      .addCase(
        createDailyActivity.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createDailyActivity.fulfilled,
        (state, action) => {
          state.loading = false;

          state.activities.unshift(action.payload);
        }
      )

      .addCase(
        createDailyActivity.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      // UPDATE
      .addCase(
        updateDailyActivity.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateDailyActivity.fulfilled,
        (state, action) => {
          state.loading = false;

          const index = state.activities.findIndex(
            (activity) =>
              activity.id === action.payload.id
          );

          if (index !== -1) {
            state.activities[index] = action.payload;
          }
        }
      )

      .addCase(
        updateDailyActivity.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      // DELETE
      .addCase(
        deleteDailyActivity.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteDailyActivity.fulfilled,
        (state, action) => {
          state.loading = false;

          state.activities =
            state.activities.filter(
              (activity) =>
                activity.id !== action.payload
            );
        }
      )

      .addCase(
        deleteDailyActivity.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default dailyActivitySlice.reducer;