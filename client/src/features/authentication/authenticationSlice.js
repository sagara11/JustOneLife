import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginAPI } from "./authenticationAPI";

const initialState = {
  errors: [],
};

export const login = createAsyncThunk(
  "authentication/login",
  async (payload) => {
    const { data } = await loginAPI(payload);
    return data;
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const res = action.payload;
        if (res.success) {
          state.errors = [];
          localStorage.setItem("authToken", res.token);
          window.location.href = "http://localhost:3000/";
        }
      })
      .addCase(login.rejected, (state) => {
        state.errors = [{ message: "Invalid Credentials!" }];
      });
  },
});

export const { resetState } = authenticationSlice.actions;

export const authenticationState = (state) => state.authentication;

export default authenticationSlice.reducer;
