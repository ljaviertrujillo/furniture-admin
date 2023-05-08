import { createSlice } from "@reduxjs/toolkit";
import { IBenefit } from "../../models";

export interface BenefitState {
  data: IBenefit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BenefitState = {
  data: [],
  isLoading: false,
  error: null,
};

export const benefitSlice = createSlice({
  name: "benefit",
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
    addBenefit: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    updateBenefit: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
    removeBenefit: (state, action) => {
      return {
        ...state,
        data: state.data.filter((benefit) => benefit.id !== action.payload),
      };
    },
  },
});

export const {
  fetchError,
  fetchStart,
  fetchSucess,
  addBenefit,
  updateBenefit,
  removeBenefit,
} = benefitSlice.actions;
export default benefitSlice.reducer;
