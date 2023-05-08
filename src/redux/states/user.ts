import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, persistLocalStorage } from "../../utilities";
import { User } from "../../models";

export const EmptyUserState: User = {
  id: 0,
  name: "",
  email: "",
  isNew: true,
  isUpdated: false,
};

export const userKey = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorage<User>(userKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<User>(userKey, result);
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
