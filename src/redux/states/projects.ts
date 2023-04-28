import { createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../models";

export interface ProjectState {
  data: IProject[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  data: [],
  isLoading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSucess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addProject: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    updateProject: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
    removeProject: (state, action) => {
      return {
        ...state,
        data: state.data.filter(project => project === action.payload)
      }
    },
  },
});

export const { fetchStart, fetchError, fetchSucess, addProject, removeProject, updateProject } = projectSlice.actions;

export default projectSlice.reducer;
