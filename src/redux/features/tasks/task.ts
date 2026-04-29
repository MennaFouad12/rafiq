
import { getEpicTasks, getProjectTasks } from "@/lib/tasks";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchtasks = createAsyncThunk(
  "tasks/fetchtasks",
  async (
    {
      page,
      limit,
      projectId,
    }: { page?: number; limit?: number; projectId: string },
    { rejectWithValue }
  ) => {
    try {
      
      const finalLimit = limit ?? 1000;
      const finalPage = page ?? 1;
      const data = await getProjectTasks(finalPage, finalLimit, projectId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEpicTasks = createAsyncThunk(
  "tasks/fetchEpicTasks",
  async (
    {
    
      epicId,
    }: {  epicId: string },
    { rejectWithValue }
  ) => {
    try {
      
    
      const data = await getEpicTasks(epicId);
      console.log("API RESPONSE:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);




interface taskState {
  tasks: any[];
  epicTasks: any[];
loadingTasks: boolean;
loadingEpicTasks: boolean;



  error: string | null;

  currentPage: number;
  limit: number;
  totalCount: number;
}

const initialState: taskState = {
  tasks: [],
  
  epicTasks: [],
loadingTasks: false,
loadingEpicTasks: false,
  error: null,

  currentPage: 1,
  limit: 10,
  totalCount: 0,
};



const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder

      // ===== FETCH tasks =====
      .addCase( fetchtasks.pending, (state) => {
        state.loadingTasks = true;
        state.error = null;
      })
      .addCase(fetchtasks.fulfilled, (state, action) => {
        state.loadingTasks = false;
        state.tasks = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchtasks.rejected, (state, action) => {
        state.loadingTasks = false;
        state.error = action.payload as string;
      })

      .addCase( fetchEpicTasks.pending, (state) => {
        state.loadingEpicTasks = true;
        state.error = null;
      })
      .addCase(fetchEpicTasks.fulfilled, (state, action) => {
        state.loadingEpicTasks = false;
        state.epicTasks = action.payload;
      
      })
      .addCase(fetchEpicTasks.rejected, (state, action) => {
        state.loadingEpicTasks = false;
        state.error = action.payload as string;
      })


  },

    })


export default tasksSlice.reducer;