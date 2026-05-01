







import { getEpicTasks, getProjectTasks } from "@/lib/tasks";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ───── Thunks ───── */

export const fetchtasks = createAsyncThunk(
  "tasks/fetchtasks",
  async (
    {
      projectId,
      page,
      limit,
      status,
    }: {
      projectId: string;
      page?: number;
      limit?: number;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await getProjectTasks({
        project_id: projectId,
        page,
        limit,
        status,
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEpicTasks = createAsyncThunk(
  "tasks/fetchEpicTasks",
  async ({ epicId }: { epicId: string }, { rejectWithValue }) => {
    try {
      const data = await getEpicTasks(epicId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/* ───── State ───── */

interface taskState {
  tasks: any[];
  tasksByStatus: Record<string, any[]>;
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
  tasksByStatus: {},
  epicTasks: [],

  loadingTasks: false,
  loadingEpicTasks: false,

  error: null,

  currentPage: 1,
  limit: 10,
  totalCount: 0,
};

/* ───── Helper (dedupe) ───── */

const uniqueById = (arr: any[]) => {
  return Array.from(
    new Map(arr.map((item) => [item.id, item])).values()
  );
};

/* ───── Slice ───── */

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ───── FETCH TASKS ───── */
      .addCase(fetchtasks.pending, (state) => {
        state.loadingTasks = true;
        state.error = null;
      })

      .addCase(fetchtasks.fulfilled, (state, action) => {
        state.loadingTasks = false;

        const newTasks = action.payload.data;

        // merge + remove duplicates
        const merged =
          state.currentPage === 1
            ? newTasks
            : [...state.tasks, ...newTasks];

        state.tasks = uniqueById(merged);

        // grouping by status (based on clean data)
        const grouped: Record<string, any[]> = {};

        state.tasks.forEach((task) => {
          const status = task.status;

          if (!grouped[status]) {
            grouped[status] = [];
          }

          grouped[status].push(task);
        });

        state.tasksByStatus = grouped;

        state.totalCount = action.payload.totalCount;
      })

      .addCase(fetchtasks.rejected, (state, action) => {
        state.loadingTasks = false;
        state.error = action.payload as string;
      })

      /* ───── EPIC TASKS ───── */
      .addCase(fetchEpicTasks.pending, (state) => {
        state.loadingEpicTasks = true;
        state.error = null;
      })

      .addCase(fetchEpicTasks.fulfilled, (state, action) => {
        state.loadingEpicTasks = false;

        // safety: ensure array
        state.epicTasks = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })

      .addCase(fetchEpicTasks.rejected, (state, action) => {
        state.loadingEpicTasks = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;