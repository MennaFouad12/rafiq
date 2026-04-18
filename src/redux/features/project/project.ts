import { createProject, getProjects } from "@/lib/projects";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getProjects } from "@/services/projects";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProjects();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const addProject = createAsyncThunk(
  "projects/addProject",
  async (
    { name, description }: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await createProject(name, description);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface ProjectsState {
  projects: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(addProject.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(addProject.fulfilled, (state, action) => {
  state.loading = false;

  // مهم جدًا: تضيفي المشروع الجديد للـ state
  state.projects.push(action.payload);
})
.addCase(addProject.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
});
  },
});

export default projectsSlice.reducer;