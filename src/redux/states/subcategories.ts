import { createSlice } from "@reduxjs/toolkit";
import { SubCategory } from "../../models";

export interface SubCategoryState {
  data: SubCategory[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SubCategoryState = {
  data: [],
  isLoading: false,
  error: null,
};

export const subCategorySlice = createSlice({
  name: "subcategory",
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
    addSubCategory: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    updateSubCategory: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
    removeSubCategory: (state, action) => {
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
  addSubCategory,
  updateSubCategory,
  removeSubCategory,
} = subCategorySlice.actions;

export default subCategorySlice.reducer;
