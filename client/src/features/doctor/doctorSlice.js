import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchDoctorListAPI, fetchReceptionistListAPI} from "./doctorAPI";
import doctorServices from "./doctorServices";

const initialState = {
  doctorList: {
    data: [],
    totalPage: 0,
    offset: 0,
  },
  receptionist: {
    data: []
  }
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

export const getReceptionist = createAsyncThunk(
  "doctor/getReceptionist",
  async (payload) => {
    const { managerId } = payload;
    const {data} = await fetchReceptionistListAPI(managerId);
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
    })
    builder.addCase(getReceptionist.fulfilled, (state, action) => {
      const data = action.payload;
      state.receptionist.data = data;
    });
  },
});

export const {resetState, setDoctorListOffsetPage} = doctorSlice.actions;

export const doctorState = (state) => state.doctor;

export default doctorSlice.reducer;
