import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import medicalRecordServices from "./medicalRecordServices";

const initialState = {
  medicalRecordList: [],
};

export const saveIPFSFile = createAsyncThunk(
  "medicalRecord/saveIPFSFile",
  async (payload) => {
    const params = payload;
    const medicalRecordService = new medicalRecordServices(params);
    const data = await medicalRecordService.saveFile(params);
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
    setMedicalRecordListOffsetPage: (state, action) => {
      const offset = action.payload;
      if (offset < 0) return;

      state.medicalRecordList.offset = offset;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveIPFSFile.fulfilled, (state, action) => {
      alert("Uploaded");
      console.log(action.payload);
    });
  },
});

export const {resetState, setMedicalRecordListOffsetPage} =
  medicalRecordSlice.actions;

export const medicalRecordState = (state) => state.medicalRecord;

export default medicalRecordSlice.reducer;
