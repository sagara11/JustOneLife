import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {isEmpty} from "lodash";

import {fetchCurrentUserAPI} from "./globalAPI";

const initialState = {
  currentUser: null,
  web3: null,
  accounts: null,
  contract: null,
  storageValue: 0,
  hash_1: null,
  confirm: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "global/fetchCurrentUser",
  async () => {
    const {data} = await fetchCurrentUserAPI();
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
    setWeb3: (state, payload) => {
      state.web3 = payload.payload;
    },
    setAccounts: (state, payload) => {
      state.accounts = payload.payload;
    },
    setContract: (state, payload) => {
      state.contract = payload.payload;
    },
    setStorageValue: (state, payload) => {
      state.storageValue = payload.payload;
    },
    setHash_1: (state, payload) => {
      state.hash_1 = payload.payload;
    },
    setConfirm: (state, payload) => {
      state.confirm = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.currentUser = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = isEmpty(action.payload) ? null : action.payload;
      });
  },
});

export const {
  resetState,
  setWeb3,
  setAccounts,
  setContract,
  setStorageValue,
  setHash_1,
  setConfirm,
} = globalSlice.actions;

export const globalState = (state) => state.global;

export default globalSlice.reducer;
