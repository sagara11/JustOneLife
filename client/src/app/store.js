import {configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import authorizationReducer from "../features/authorization/authorizationSlice";
import globalReducer from "../features/global/globalSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    authorization: authorizationReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
