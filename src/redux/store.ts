// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import projectsReducer from "./features/project/project"; // 👈 ضيفي ده

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
  },
});

// types (important)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;