import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchDoctorListAPI} from "./doctorAPI";
import doctorServices from "./doctorServices";

const initialState = {
  doctorList: [],
};

export const getDoctorList = createAsyncThunk(
  "doctor/getDoctorList",
  async (payload) => {
    const doctorService = new doctorServices(payload);
    const userAddresses = await doctorService.getDoctorList();

    const {data} = await fetchDoctorListAPI(userAddresses);
    return data;
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDoctorList.fulfilled, (state, action) => {
      state.doctorList = action.payload;
    });
  },
});

export const {resetState} = doctorSlice.actions;

export const doctorState = (state) => state.doctor;

export default doctorSlice.reducer;
