import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import globalReducer from "../features/global/globalSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    global: globalReducer,
  },
});
