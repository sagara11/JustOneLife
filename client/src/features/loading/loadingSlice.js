import {createSlice} from "@reduxjs/toolkit";
import {refreshToken} from "../authentication/authenticationSlice";
import {
  getCurrentUserRole,
  setRoleManager,
  setRolePatient,
} from "../authorization/authorizationSlice";
import {fetchCurrentUser} from "../global/globalSlice";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    setLoading: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state, action) => true)
      .addCase(refreshToken.rejected, (state, action) => false)
      .addCase(refreshToken.fulfilled, (state, action) => false)
      .addCase(setRolePatient.pending, (state, action) => true)
      .addCase(setRolePatient.rejected, (state, action) => false)
      .addCase(setRolePatient.fulfilled, (state, action) => false)
      .addCase(setRoleManager.pending, (state, action) => true)
      .addCase(setRoleManager.rejected, (state, action) => false)
      .addCase(setRoleManager.fulfilled, (state, action) => false)
      .addCase(getCurrentUserRole.pending, (state, action) => true)
      .addCase(getCurrentUserRole.rejected, (state, action) => false)
      .addCase(getCurrentUserRole.fulfilled, (state, action) => false)
      .addCase(fetchCurrentUser.pending, (state, action) => true)
      .addCase(fetchCurrentUser.rejected, (state, action) => false)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => false);
  },
});

export const {setLoading} = loadingSlice.actions;

export const loadingState = (state) => state.loading;

export default loadingSlice.reducer;
