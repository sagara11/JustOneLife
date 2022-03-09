import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {
  signupAPI,
  signinAPI,
  updateAccountAPI,
  checkExpiredAPI,
  refreshTokenAPI,
  signoutAPI,
} from "./authenticationAPI";

const initialState = {
  newUser: null,
  tokenValid: false,
};

export const signout = createAsyncThunk(
  "authentication/signout",
  async (payload) => {
    const {data} = await signoutAPI(payload);
    return data;
  }
);

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

export const checkExpired = createAsyncThunk(
  "authentication/checkExpired",
  async (payload) => {
    const {data} = await checkExpiredAPI(payload);
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
      .addCase(refreshToken.fulfilled, (state, action) => {
        const res = action.payload;
        localStorage.setItem("authToken", res.accessToken);
        state.tokenValid = true;
      })
      .addCase(signout.fulfilled, (state, action) => {
        const res = action.payload;
        if (res) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          state.tokenValid = false;
          window.location.href = "/login";
        }
      });
  },
});

export const {resetState, changeTokenValid} = authenticationSlice.actions;

export const authenticationState = (state) => state.authentication;

export default authenticationSlice.reducer;
