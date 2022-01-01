import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchCurrentUserAPI } from "./globalAPI";

const initialState = {
  currentUser: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "global/fetchCurrentUser",
  async () => {
    const { data } = await fetchCurrentUserAPI();
    return data;
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.currentUser = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data) {
          state.currentUser = data;
        }
      });
  },
});

export const { resetState } = globalSlice.actions;

export const globalState = (state) => state.global;

export default globalSlice.reducer;
