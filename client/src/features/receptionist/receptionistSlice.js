import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { updateAccountAPI } from '../authentication/authenticationAPI';
import { fetchReceptionistListAPI } from '../doctor/doctorAPI';

const initialState = {
  medicalRecordList: [],
  receptionist: {
    data: []
  }
};

export const addReceptionist = createAsyncThunk(
  "receptionist/addReceptionist",
  async (payload) => {
    const params = payload;
    const { data } = await updateAccountAPI(params);
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
      state.receptionist.data.push(action.payload);
    })
    builder.addCase(getReceptionist.fulfilled, (state, action) => {
      const data = action.payload;
      state.receptionist.data = data;
    });
  },
});

export const {resetState} =
receptionistSlice.actions;

export const receptionistState = (state) => state.receptionist;

export default receptionistSlice.reducer;
