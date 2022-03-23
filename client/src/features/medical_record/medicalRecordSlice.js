import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import medicalRecordService from "./medicalRecordService";

const initialState = {

};

export const saveIPFSFile = createAsyncThunk(
  "medicalRecord/saveIPFSFile",
  async (payload) => {
    const params = payload;
    const medicalRecordServices = new medicalRecordService(params);
    const data = await medicalRecordServices.saveFile(params);
    return data;
  }
);

export const medicalRecordSlice = createSlice({
  name: "medicalRecord",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveIPFSFile.fulfilled, (state, action) => {
        alert("Uploaded");
        console.log(action.payload);
      })
  },
});

export const {resetState} = medicalRecordSlice.actions;

export const medicalRecordState = (state) => state.medicalRecord;

export default medicalRecordSlice.reducer;
