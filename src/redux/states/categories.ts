import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../models";

export interface CategoryState {
  data: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: [],
  isLoading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
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
    addCategory: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    updateCategory: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
    removeCategory: (state, action) => {
      return {
        ...state,
        data: state.data.filter((category) => category.id !== action.payload),
      };
    },
  },
});

export const {
  fetchStart,
  fetchSucess,
  fetchError,
  addCategory,
  updateCategory,
  removeCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
