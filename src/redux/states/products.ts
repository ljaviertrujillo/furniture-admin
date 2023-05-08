import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models";

export interface ProductState {
  data: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: [],
  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
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
    addProduct: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    updateProduct: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
    removeProduct: (state, action) => {
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
  addProduct,
  updateProduct,
  removeProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
