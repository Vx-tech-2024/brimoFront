import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoansRequest, createLoanRequest, updateLoanRequest, deleteLoanRequest } from "./loanApi";


interface Loan {
  id: string;
  [key: string]: any;
}

interface LoanState {
  loans: Loan[];
  loading: boolean;
  error: string | null;
}

const initialState: LoanState = {
  loans: [],
  loading: false,
  error: null,
}

export const fetchLoans = createAsyncThunk(
  "loans/fetch",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await fetchLoansRequest(params);
      return res.data.loans;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


export const createLoan = createAsyncThunk(
  "loans/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await createLoanRequest(data);
      return res.data.loan;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateLoan = createAsyncThunk(
  "loans/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await updateLoanRequest(id, data);
      return res.data.loan;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteLoan = createAsyncThunk(
  "loans/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteLoanRequest(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const loanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })

      .addCase(createLoan.fulfilled, (state, action) => {
        state.loans.unshift(action.payload);
      })

      .addCase(updateLoan.fulfilled, (state, action) => {
        const index = state.loans.findIndex(
          (l) => l.id === action.payload.id
        );
        if (index !== -1) state.loans[index] = action.payload;
      })

      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.loans = state.loans.filter(
          (l) => l.id !== action.payload
        );
      });
  },
});

export default loanSlice.reducer;