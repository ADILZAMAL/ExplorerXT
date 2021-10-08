import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app";
import dialogReducer from "./modal";
import authReducer from "./auth";
export const store = configureStore({
  reducer: {
    app: appReducer,
    dialog: dialogReducer,
    auth: authReducer,
  },
});
