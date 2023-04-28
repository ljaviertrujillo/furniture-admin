import { createSlice } from "@reduxjs/toolkit";
import { IPrincipal } from "../../models/principal.model";

export const EmptyPrincipal: IPrincipal = {
  title: "NOMBRE DE TU EMPRESA",
  slogan: "Slogan de tu empresa",
  image: "",
};

export const principalSlice = createSlice({
  name: "principal",
  initialState: EmptyPrincipal,
  reducers: {
    createPrincipal: (state, action) => {
      return action.payload;
    },
    updatePrincipal: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPrincipal: () => {
      return EmptyPrincipal;
    },
  },
});

export const { createPrincipal, updatePrincipal, resetPrincipal } =
  principalSlice.actions;

export default principalSlice.reducer;
