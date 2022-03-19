import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchDoctorListAPI} from "./doctorAPI";
import doctorServices from "./doctorServices";

const initialState = {
  doctorList: {
    data: [],
    totalPage: 0,
    offset: 0,
  },
};

export const getDoctorList = createAsyncThunk(
  "doctor/getDoctorList",
  async (payload) => {
    const doctorService = new doctorServices(payload);
    const userAddresses = await doctorService.getDoctorList();

    const {data} = await fetchDoctorListAPI({
      userAddresses,
      perPage: payload.perPage,
      offset: payload.offset,
    });
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
    setDoctorListOffsetPage: (state, action) => {
      const offset = action.payload;
      if (offset < 0) return;

      state.doctorList.offset = offset;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDoctorList.fulfilled, (state, action) => {
      const {data, totalPage, offset} = action.payload;
      if (offset === state.doctorList.offset) {
        state.doctorList.data = data;
        state.doctorList.totalPage = totalPage;
      }
    });
  },
});

export const {resetState, setDoctorListOffsetPage} = doctorSlice.actions;

export const doctorState = (state) => state.doctor;

export default doctorSlice.reducer;
