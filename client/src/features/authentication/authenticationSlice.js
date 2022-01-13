import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {signupAPI, signinAPI, updateAccountAPI} from "./authenticationAPI";

const initialState = {
  newUser: null
};

export const signin = createAsyncThunk(
  "authentication/signin",
  async (payload) => {
    const {data} = await signinAPI(payload);
    return data;
  }
);

export const signup = createAsyncThunk(
  "authentication/signup",
  async (payload) => {
    const {data} = await signupAPI(payload);
    return data;
  }
);

export const updateAccount = createAsyncThunk(
  "authentication/update",
  async (payload) => {
    const {data} = await updateAccountAPI(payload);
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
      .addCase(signin.fulfilled, (state, action) => {
        const res = action.payload;
        localStorage.setItem("authToken", res.accessToken);
        window.location.href = "/";
      })
      .addCase(signup.pending, (state, action) => {
        state.newUser = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const res = action.payload;
        if (res) {
          state.newUser = res;
        } else {
          state.newUser = null;
        }
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        const res = action.payload;
        if (res) window.location.href = "/";
      });
  },
});

export const {resetState} = authenticationSlice.actions;

export const authenticationState = (state) => state.authentication;

export default authenticationSlice.reducer;
