// import { createProject, getProjects, getSingleProject } from "@/lib/projects";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { tr } from "zod/locales";


// export const fetchProjects = createAsyncThunk(
//   "projects/fetchProjects",
//   async ({ page, limit }: { page: number; limit: number } ,
//      { rejectWithValue }) => {
//     try {
//       const data = await getProjects(page, limit);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const fetchSingleProject = createAsyncThunk(
//   "projects/fetchSingle",
//   async (projectId: string,{ rejectWithValue}) => {
//     try {
//     const data = await getSingleProject(projectId);
//     return data
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const addProject = createAsyncThunk(
//   "projects/addProject",
//   async (
//     { name, description }: { name: string; description: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const data = await createProject(name, description);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// interface ProjectsState {
//   projects: any[];
//   singleProject: any | null; 
//   loading: boolean;
//   error: string | null;
//    currentPage: number;
//   limit: number;
//   totalCount: number;
// }

// const initialState: ProjectsState = {
//   projects: [],
//    singleProject: null,
//   loading: false,
//   error: null,
//   currentPage: 1,
//   limit: 10,
//   totalCount: 0
// };

// const projectsSlice = createSlice({
//   name: "projects",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProjects.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       builder.addCase(fetchProjects.fulfilled, (state, action) => {
//   state.loading = false;
//   state.projects = action.payload.data;
//   state.totalCount = action.payload.totalCount;
// })
//       .addCase(fetchProjects.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       }).addCase(addProject.pending, (state) => {
//   state.loading = true;
//   state.error = null;
// })
// .addCase(addProject.fulfilled, (state, action) => {
//   state.loading = false;

  
//   state.projects.push(action.payload);
// })
// .addCase(addProject.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload as string;
// }).addCase(fetchSingleProject.pending, (state) => {
//   state.loading = true;
//   state.error = null;
// })
// .addCase(fetchSingleProject.fulfilled, (state, action) => {
//   state.loading = false;
//   state.singleProject = action.payload; 
// })
// .addCase(fetchSingleProject.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload as string;
// })
//   },
// });

// export default projectsSlice.reducer;



import { createProject, getProjectMembers, getProjects, getSingleProject, updateProject } from "@/lib/projects";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ===================== THUNKS =====================

// export const fetchProjects = createAsyncThunk(
//   "projects/fetchProjects",
//   async (
//     { page, limit }: { page: number; limit: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const data = await getProjects(page, limit);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await getProjects({
        limit,
        offset: (page - 1) * limit,
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchSingleProject = createAsyncThunk(
  "projects/fetchSingle",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const data = await getSingleProject(projectId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchProjectMembers = createAsyncThunk(
  "projects/fetchProjectMembers",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const data = await getProjectMembers(projectId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (
    { name, description }: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await createProject({
        name,
        description,
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const editProject = createAsyncThunk(
  "projects/editProject",
  async (
    {
      projectId,
      name,
      description,
    }: { projectId: string; name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateProject(
        {
          name,
          description,
        },
        projectId
      );

      return { projectId, data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// ===================== STATE =====================

interface ProjectsState {
  projects: any[];
  singleProject: any | null;
projectMembers: any[];
  loadingProjects: boolean;
  loadingSingleProject: boolean;
  loadingMembers: boolean;
  addingProject: boolean;

  error: string | null;

  currentPage: number;
  limit: number;
  totalCount: number;
}

const initialState: ProjectsState = {
  projects: [],
  singleProject: null,
projectMembers: [],
  loadingProjects: false,
  loadingSingleProject: false,
  loadingMembers: false,
  addingProject: false,

  error: null,

  currentPage: 1,
  limit: 10,
  totalCount: 0,
};

// ===================== SLICE =====================

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearSingleProject: (state) => {
      state.singleProject = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== FETCH PROJECTS =====
      .addCase(fetchProjects.pending, (state) => {
        state.loadingProjects = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loadingProjects = false;
        state.projects = action.payload.projects;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loadingProjects = false;
        state.error = action.payload as string;
      })

      // ===== FETCH SINGLE PROJECT =====
      .addCase(fetchSingleProject.pending, (state) => {
        state.loadingSingleProject = true;
        state.error = null;
      })
      .addCase(fetchSingleProject.fulfilled, (state, action) => {
        state.loadingSingleProject = false;

        // ⚠️ لو API بيرجع { data: [...] } عدلي هنا
        state.singleProject = action.payload[0];
      })
      .addCase(fetchSingleProject.rejected, (state, action) => {
        state.loadingSingleProject = false;
        state.error = action.payload as string;
      })

      // ===== ADD PROJECT =====
      .addCase(addProject.pending, (state) => {
        state.addingProject = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.addingProject = false;
        state.projects.unshift(action.payload); // أحسن من push (يظهر فوق)
      })
      .addCase(addProject.rejected, (state, action) => {
        state.addingProject = false;
        state.error = action.payload as string;
      })

      // ============= updateProject =============
.addCase(editProject.pending, (state) => {
  state.loadingProjects = true;
  state.error = null;
})
.addCase(editProject.fulfilled, (state, action) => {
  state.loadingProjects = false;

  const updated = action.payload.data;

  // update في القائمة
  state.projects = state.projects.map((p) =>
    p.id === action.payload.projectId ? updated : p
  );

  // update single لو مفتوح
  if (state.singleProject?.id === action.payload.projectId) {
    state.singleProject = updated;
  }
})
.addCase(editProject.rejected, (state, action) => {
  state.loadingProjects = false;
  state.error = action.payload as string;
}).addCase(fetchProjectMembers.pending, (state) => {
  state.loadingMembers = true;
  state.error = null;
})
.addCase(fetchProjectMembers.fulfilled, (state, action) => {
  state.loadingMembers = false;
  state.projectMembers = action.payload; // حسب شكل ال API
})
.addCase(fetchProjectMembers.rejected, (state, action) => {
  state.loadingMembers = false;
  state.error = action.payload as string;
});
  },
});

export const { clearSingleProject } = projectsSlice.actions;

export default projectsSlice.reducer;