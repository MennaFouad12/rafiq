// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import projectsReducer from "./features/project/project"; // 👈 ضيفي ده
// import projectsReducer from "./features/project/project";
import epicsReducer from "./features/epics/epic";
export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    epics: epicsReducer
  },
});

// types (important)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;