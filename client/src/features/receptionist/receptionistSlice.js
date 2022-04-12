import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { updateAccountAPI } from '../authentication/authenticationAPI';

const initialState = {
  medicalRecordList: [],
};

export const addReceptionist = createAsyncThunk(
  "receptionist/addReceptionist",
  async (payload) => {
    const params = payload;
    const { data } = await updateAccountAPI(params);
    return data;
  }
);

export const receptionistSlice = createSlice({
  name: "receptionist",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addReceptionist.fulfilled, (state, action) => {
      alert("Added");
      console.log(action.payload);
    });
  },
});

export const {resetState} =
receptionistSlice.actions;

export const receptionistState = (state) => state.receptionist;

export default receptionistSlice.reducer;
