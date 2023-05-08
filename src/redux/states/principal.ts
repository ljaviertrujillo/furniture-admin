import { createSlice } from "@reduxjs/toolkit";
import { Principal } from "../../models/principal.model";

export const EmptyPrincipal: Principal = {
  title: "NOMBRE DE TU EMPRESA",
  slogan: "Slogan de tu empresa",
  image: "",
  "logo-l": "",
  "logo-s": "",
  isNew: true,
  isUpdated: false,
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
