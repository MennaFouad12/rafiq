import { getProjectEpics, getSingleEpic, createProjectEpic } from '@/lib/epics';
// import { addepic } from './epic';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchepics = createAsyncThunk(
  "epics/fetchepics",
  async (
    {
      page,
      limit,
      projectId,
      search,
    }: { page?: number; limit?: number; projectId: string; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const finalLimit = limit ?? 10;
      const finalPage = page ?? 1;

      const data = await getProjectEpics(
        finalPage,
        finalLimit,
        projectId,
        search
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const addepic = createAsyncThunk(
  "epics/addepic",
  async (
    { title, description, projectId, assignee_id, deadline }: { title: string; description: string, projectId: string, assignee_id: string | null
deadline: string | null; },
    { rejectWithValue }
  ) => {
    try {
      const data = await createProjectEpic( title, description, projectId, assignee_id, deadline);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleEpic = createAsyncThunk(
  "epics/fetchSingleEpic",
  async ({projectId,id}: {projectId: string, id: string}, { rejectWithValue }) => {
    try {
      const data = await getSingleEpic(projectId,id);
      console.log("API RESPONSE:from edit", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
interface epicsState {
  epics: any[];
  singleEpic: any | null;

  loadingEpic: boolean;
  loadingSingleEpic: boolean;

  addingEpic: boolean;

  error: string | null;

  currentPage: number;
  limit: number;
  totalCount: number;
}

const initialState: epicsState = {
  epics: [],
  singleEpic: null,

  loadingEpic: false,
  loadingSingleEpic: false,
  
  addingEpic: false,

  error: null,

  currentPage: 1,
  limit: 10,
  totalCount: 0,
};



const epicsSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {
    clearSingleEpic: (state) => {
      state.singleEpic = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== FETCH EPICS =====
      .addCase(fetchepics.pending, (state) => {
        state.loadingEpic = true;
        state.error = null;
      })
      .addCase(fetchepics.fulfilled, (state, action) => {
        state.loadingEpic = false;
      if (state.currentPage === 1) {
  state.epics = action.payload.data;
} else {
  state.epics = [...state.epics, ...action.payload.data];
}
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchepics.rejected, (state, action) => {
        state.loadingEpic = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSingleEpic.pending, (state) => {
              state.loadingSingleEpic = true;
              state.error = null;
            })
            .addCase(fetchSingleEpic.fulfilled, (state, action) => {
              console.log("PAYLOAD:", action.payload);
              state.loadingSingleEpic = false;
      
              
              state.singleEpic = action.payload;
            })
            .addCase(fetchSingleEpic.rejected, (state, action) => {
              state.loadingSingleEpic = false;
              state.error = action.payload as string;
            })

    // ===== ADD EPIC =====
    .addCase(addepic.pending, (state) => {
      state.addingEpic = true;
      state.error = null;
    })
    .addCase(addepic.fulfilled, (state, action) => {
      state.addingEpic = false;
      state.epics.push(action.payload[0]);
    })
    .addCase(addepic.rejected, (state, action) => {
      state.addingEpic = false;
      state.error = action.payload as string; 
    })

  },

    })

export const { clearSingleEpic } = epicsSlice.actions;
export default epicsSlice.reducer;
