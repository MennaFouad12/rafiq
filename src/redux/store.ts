// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./features/user/userSlice";
import projectsReducer from "./features/project/project"; // 👈 ضيفي ده
// import projectsReducer from "./features/project/project";
import epicsReducer from "./features/epics/epic";
import tasksReducer from "./features/tasks/task";
import { userSliceReducer } from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    projects: projectsReducer,
    epics: epicsReducer,
    tasks:tasksReducer
  },
});

// types (important)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;