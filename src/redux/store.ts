import { configureStore } from "@reduxjs/toolkit";
import { IUser } from "../models";
import userReducer from "./states/user";
import categoryReducer, { CategoryState } from "./states/categories";
import { IPrincipal } from "../models/principal.model";
import principalReducer from "./states/principal";
import projectReducer, { ProjectState } from "./states/projects";

export interface AppStore {
  user: IUser;
  principal: IPrincipal;
  category: CategoryState;
  project: ProjectState;
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    principal: principalReducer,
    category: categoryReducer,
    project: projectReducer,
  },
});
