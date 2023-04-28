import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/";
import { clearLocalStorage, persistLocalStorage } from "../../utilities";

export const EmptyUserState: IUser = {
  id: 0,
  name: "",
  email: "",
};

export const userKey = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorage<IUser>(userKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<IUser>(userKey, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(userKey);
      return EmptyUserState;
    },
  },
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
