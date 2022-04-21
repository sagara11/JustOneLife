import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import vaccineServices from "./vaccineServices";

const initialState = {
  vaccineList: [],
};

export const createNewVaccineCertificate = createAsyncThunk(
  "vaccine/createNewVaccineCertificate",
  async (payload) => {
    const vaccineService = new vaccineServices(payload);
    const data = await vaccineService.createNewVaccineCertificate();
    return data;
  }
);

export const getVaccineCertificateList = createAsyncThunk(
  "vaccine/getVaccineCertificateList",
  async (payload) => {
    const vaccineService = new vaccineServices(payload);
    const data = await vaccineService.getVaccineCertificateList();
    return data;
  }
);

export const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewVaccineCertificate.fulfilled, (state, action) => {
      state.vaccineList.push(action.payload);
      alert("Create successfully!");
    });
    builder.addCase(getVaccineCertificateList.fulfilled, (state, action) => {
      state.vaccineList = action.payload;
    });
  },
});

export const { resetState } = vaccineSlice.actions;

export const vaccineState = (state) => state.vaccine;

export default vaccineSlice.reducer;
