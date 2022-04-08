import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import authorizationReducer from "../features/authorization/authorizationSlice";
import globalReducer from "../features/global/globalSlice";
import doctorReducer from "../features/doctor/doctorSlice";
import vaccineReducer from "../features/vaccineCertificate/vaccineSlice";
import medicalRecordReducer from "../features/medicalRecord/medicalRecordSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    authorization: authorizationReducer,
    global: globalReducer,
    doctor: doctorReducer,
    vaccine: vaccineReducer,
    medicalRecord: medicalRecordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
