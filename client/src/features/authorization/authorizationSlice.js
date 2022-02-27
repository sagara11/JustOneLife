import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authorizationServices from "./authorizationServices";
import managerServices from "../manager/managerServices";
import globalServices from "../global/globalServices";
import {getUser, sendAuthorizeManagerMail} from "./authorizationAPI";
import doctorServices from "../doctor/doctorServices";

const initialState = {
  userRole: [],
};

export const setRolePatient = createAsyncThunk(
  "authorization/setRolePatient",
  async (payload) => {
    const params = payload;
    const authorizationService = new authorizationServices(params);
    const data = await authorizationService.setPatientRole();
    return data;
  }
);

export const setRoleManager = createAsyncThunk(
  "authorization/setRoleManager",
  async (payload) => {
    const params = payload;
    const hasUser = await getUser(payload);
    if (hasUser.data) {
      const managerService = new managerServices(params);
      const data = await managerService.updateRole();
      return data;
    } else {
      return Promise.reject("This account does not exist in the system");
    }
  }
);

export const setRoleDoctor = createAsyncThunk(
  "authorization/setRoleDoctor",
  async (payload) => {
    const params = payload;
    const hasUser = await getUser(payload);
    if (hasUser.data) {
      const doctorService = new doctorServices(params);
      const data = await doctorService.updateRole();
      return data;
    } else {
      return Promise.reject("This account does not exist in the system");
    }
  }
);

export const getCurrentUserRole = createAsyncThunk(
  "authorization/getCurrentUserRole",
  async (payload) => {
    const params = payload;
    const globalService = new globalServices(params);
    const data = await globalService.getRole();
    return data;
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
    builder
      .addCase(setRoleManager.fulfilled, (state, action) => {
        console.log(action.payload);
        alert("Successfully update manager role for account");

        let account = action.payload.events.RoleGranted.returnValues["account"];
        sendAuthorizeManagerMail(account);
      })
      .addCase(setRoleManager.rejected, (state, action) => {
        console.log(action.error.message);
        alert(action.error.message);
      })
      .addCase(getCurrentUserRole.fulfilled, (state, action) => {
        if (
          action.payload[0] === "1" &&
          !state.userRole.includes(process.env.REACT_APP_ROLE_PATIENT)
        ) {
          state.userRole.push(process.env.REACT_APP_ROLE_PATIENT);
        }
        if (
          action.payload[1] === "1" &&
          !state.userRole.includes(process.env.REACT_APP_ROLE_DOCTOR)
        ) {
          state.userRole.push(process.env.REACT_APP_ROLE_DOCTOR);
        }
        if (
          action.payload[2] === "1" &&
          !state.userRole.includes(process.env.REACT_APP_ROLE_MANAGER)
        ) {
          state.userRole.push(process.env.REACT_APP_ROLE_MANAGER);
        }
        if (
          action.payload[3] === "1" &&
          !state.userRole.includes(process.env.REACT_APP_ROLE_ADMIN)
        ) {
          state.userRole.push(process.env.REACT_APP_ROLE_ADMIN);
        }
        console.log(`Current user role: ${state.userRole}`);
      });
  },
});

export const {resetState} = authorizationSlice.actions;

export const authorizationState = (state) => state.authorization;

export default authorizationSlice.reducer;
