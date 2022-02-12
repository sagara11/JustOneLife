import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setIsLoading} from "../global/globalSlice";

import {
  signupAPI,
  signinAPI,
  updateAccountAPI,
  refreshTokenAPI,
} from "./authenticationAPI";

const initialState = {
  newUser: null,
  tokenValid: false,
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

export const refreshToken = createAsyncThunk(
  "authentication/refreshToken",
  async (payload) => {
    const {data} = await refreshTokenAPI(payload);
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
    changeTokenValid: (state, action) => {
      state.tokenValid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        const res = action.payload;
        localStorage.setItem("authToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
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
      })
      .addCase(refreshToken.pending, (state, action) => {
        setIsLoading(true);
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const res = action.payload;
        localStorage.setItem("authToken", res.accessToken);
        console.log(res.accessToken);
        state.tokenValid = true;
        setIsLoading(false);
      });
  },
});

export const {resetState, changeTokenValid} = authenticationSlice.actions;

export const authenticationState = (state) => state.authentication;

export default authenticationSlice.reducer;
