import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {isEmpty} from "lodash";
import AuthorizeContract from "../../contracts/Authorize.json";
import authorizationServices from "./authorizationServices";

const initialState = {
  userRole: null,
};

export const setRolePatient = createAsyncThunk(
  "authorization/setRolePatient",
  async (payload) => {
    const {web3, accounts, currentUser} = payload;
    return await authorizationServices.handleSetRole(
      {web3, accounts, currentUser},
      AuthorizeContract
    );
  }
);

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setRolePatient.fulfilled, (state, action) => {
      const res = action.payload;
      if (res && isEmpty(state.userRole))
        state.userRole = process.env.REACT_APP_ROLE_PATIENT;
    });
  },
});

export const {resetState} = authorizationSlice.actions;

export const authorizationState = (state) => state.authorization;

export default authorizationSlice.reducer;
